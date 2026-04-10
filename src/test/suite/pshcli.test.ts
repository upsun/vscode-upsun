import { assert } from 'chai';
import { PshContext, PshContextCommand } from '../../command/base';
import { PshCli } from '../../pshcli';

class MockCommand extends PshContextCommand {
    constructor() {
        super(new PshContext('', '', null));
    }

    displayMessage(): string {
        return 'mock';
    }

    prepare(): string {
        return '';
    }

    toArgArray(): string[] {
        return [];
    }

    isCli(): boolean {
        return false;
    }

    process(param: any): any {
        return 'success';
    }
}

suite('PshCli Test Suite', () => {
    let cli: PshCli;

    setup('PshCli setup', () => {
        cli = new PshCli();
    });

    teardown('PshCli setup', () => {
        cli.dispose();
    });

    test('PshCli.constructor', async () => {
        assert.isDefined(cli);
    });

    test('PshCli.dispose', async () => {
        cli.dispose();
    });

    test('PshCli.executeObj.ok', async () => {
        // MockCommand.isCli() returns false so no subprocess is spawned;
        // process() returns 'success' directly.
        const rawResult = await cli.executeObj(new MockCommand());
        assert.strictEqual(rawResult, 'success');
    });
});
