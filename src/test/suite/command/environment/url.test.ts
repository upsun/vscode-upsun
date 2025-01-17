import { assert } from 'chai';
import { PshCommand, PshContext } from '../../../../command/base';
import { UrlCommand } from '../../../../command/environment/url';

suite('Env/URL Test Suite', () => {
    let cmd: PshCommand;

    setup(() => {
        const ctx = new PshContext(null, null, null);
        cmd = new UrlCommand(ctx);
    });

    test('Env/URL.prepare', () => {
        assert.isDefined(cmd);
        assert.strictEqual(cmd.prepare(), 'environment:url --pipe ');
    });

    test('Env/URL.isCli', () => {
        assert.isDefined(cmd);
        assert.isTrue(cmd.isCli());
    });

    test('Env/URL.convert', () => {
        const input = 'foo\nbar\nfoobar\n';
        const output = cmd.convert(input);

        assert.strictEqual(output.length, 3);
    });

    test('Env/URL.process', async () => {
        try {
            await cmd.process(['no', 'url']);
            await cmd.process([' ']);
            await cmd.process('no url');
        } catch (e) {
            assert.fail();
        }
    });
});
