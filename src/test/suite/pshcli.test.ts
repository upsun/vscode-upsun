import { assert } from 'chai';
import * as vscode from 'vscode';
import { PshContext, PshContextCommand } from '../../command/base';
import { PshCli } from '../../pshcli';
import { ExtensionContext, extensions } from 'vscode';

//TODO refactor
import * as path from 'path';
export const rootPath = path.resolve(__dirname, '../../../');
const packageJSON: any = require(path.resolve(rootPath, 'package.json'));
export const extensionId = `${packageJSON.publisher}.${packageJSON.name}`;

class MockCommand extends PshContextCommand {
    constructor(ext: vscode.ExtensionContext) {
        super(new PshContext('', '', ext));
    }

    displayMessage(): string {
        return 'display mock';
    }

    prepare(): string {
        return ' &> /dev/null ; echo -n success';
    }

    process(param: any): any {
        return param;
    }
}

suite('PshCli Test Suite', () => {
    let cli: PshCli;
    let extensionContext: ExtensionContext;

    suiteSetup('PshStore suite setup', async () => {
        await extensions.getExtension(extensionId)?.activate();
        extensionContext = (global as any).testExtensionContext;
    });

    setup('PshCli setup', () => {
        cli = new PshCli();
    });

    teardown('PshCli setup', () => {
        cli.dispose();
    });

    test('PshCli.constructor', async () => {
        assert.isDefined(cli);
    });

    // Close by Teardown cannot be test.
    // test('PshCli.dispose', async () => {
    //     cli.dispose();
    // });

    test('PshCli.executeStr.ok', async () => {
        const rawResult = await cli.executeStr(
            ' > /dev/null ; echo -n success',
        );
        assert.strictEqual(rawResult, 'success');
    });

    // TODO fix me
    // test('PshCli.executeStr.ko', async () => {
    //     const rawResult = await cli.executeStr(" > /dev/null ; fail");
    //     assert.strictEqual(rawResult, '');
    // });

    test('PshCli.executeObj.ok', async () => {
        const rawResult = await cli.executeObj(
            new MockCommand(extensionContext),
        );
        assert.strictEqual(rawResult, 'success');
    });
});
