import { assert } from 'chai';
import { PshCommand } from '../../command/base';
import { PshCli } from '../../pshcli';

class MockCommand extends PshCommand {
    prepare(): string {
        return " > /dev/null ; echo -n success";
    }

    process(param: any): void { }
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

    test('PshCli.executeStr.ok', async () => {
        const rawResult = await cli.executeStr(" > /dev/null ; echo -n success");
        assert.strictEqual(rawResult, 'success');
    });

    // TODO fix me
    // test('PshCli.executeStr.ko', async () => {
    //     const rawResult = await cli.executeStr(" > /dev/null ; fail");
    //     assert.strictEqual(rawResult, '');
    // });

    test('PshCli.executeObj.ok', async () => {
        const rawResult = await cli.executeObj(new MockCommand());
        assert.strictEqual(rawResult, 'success');
    });
});
