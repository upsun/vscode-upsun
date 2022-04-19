import { assert } from 'chai';
import { PshCommand, PshContext } from '../../../../command/base';
import { SshCommand } from '../../../../command/environment/ssh';

suite('Env/SSH Test Suite', () => {

    let cmd: PshCommand;

    setup(() => {
        const ctx = new PshContext(null, null);
        cmd = new SshCommand(ctx);
    });

    test('Env/SSH.prepare', () => {
        assert.isDefined(cmd);
        assert.strictEqual(cmd.prepare(), '');
    });

    test('Env/SSH.isCli', () => {
        assert.isDefined(cmd);
        assert.isFalse(cmd.isCli());
    });

    test('Env/SSH.process', async () => {
        try {
            await cmd.process('');

            assert.isDefined(cmd);
        } catch (e) {
            assert.fail();
        }
    });

});
