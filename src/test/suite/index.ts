import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export async function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        timeout: 10 * 1000,
    });

    // Code coverage.
    let nyc;
    if (shouldGenerateCoverage()) {
        nyc = setupCoverage();
    }

    // Tests runner
    const testsRoot = path.resolve(__dirname, '..');
    const options = { cwd: testsRoot };
    const files = glob.sync('**/**.test.js', options);

    // Add files to the test suite
    files.forEach((file) => mocha.addFile(path.resolve(testsRoot, file)));

    try {
        await new Promise<void>((c, e) => {
            mocha.run((failures) => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        });
    } finally {
        if (nyc !== undefined) {
            nyc.writeCoverageFile();
            await nyc.report();
        }
    }
}

function shouldGenerateCoverage(): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return (
        (process.env.ASK_TOOLKIT_NO_COVERAGE || 'false').toLowerCase() !==
        'true'
    );
}

function setupCoverage() {
    const NYC = require('nyc');
    const nyc = new NYC({
        // set the project root
        cwd: path.join(__dirname, '..', '..'),
        extension: ['.ts', '.js'],
        include: ['**/*.js', '**/*.ts'],
        exclude: ['**/test/**', '.vscode-test/**'],
        sourceMap: true,
        reporter: ['html', 'text', 'text-summary'],
        tempDir: path.join(__dirname, '..', '..', 'coverage', '.nyc_output'),
        all: true,
        cache: false,
        instrument: true,
        hookRequire: true,
        hookRunInContext: true,
        hookRunInThisContext: true,
    });

    nyc.reset();
    nyc.wrap();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return nyc;
}
