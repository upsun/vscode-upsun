import { assert } from 'chai';
import { PshCommand, PshContext } from '../../../../command/base';
import { LogsCommand } from '../../../../command/environment/logs';
import { shellEscape } from '../../../../utils/platform';

suite('Env/Logs Test Suite', () => {
    let cmd: PshCommand;

    setup(() => {
        const ctx = new PshContext(null, null, null);
        cmd = new LogsCommand(ctx);
    });

    test('Env/Logs.prepare', () => {
        assert.isDefined(cmd);
        assert.strictEqual(cmd.prepare(), '');
    });

    test('Env/Logs.isCli', () => {
        assert.isDefined(cmd);
        assert.isFalse(cmd.isCli());
    });

    test('Env/Logs.process', async () => {
        try {
            await cmd.process('');

            assert.isDefined(cmd);
        } catch (e) {
            assert.fail();
        }
    });

    test('Env/Logs.environment_injection_escaped', () => {
        // Verify that a branch name containing shell metacharacters is
        // shell-escaped before reaching the terminal, preventing injection.
        const maliciousBranch =
            'main$(env>/tmp/upsun_full_env;printf${IFS}%s${IFS}"$UPSUN_CLI_TOKEN">/tmp/upsun_token_leak)';
        const ctx = new PshContext('my-project', maliciousBranch, null);
        const paramStr = ctx.toString();

        // Must contain the escaped form (wrapped in single quotes)
        assert.include(paramStr, ` -e '${maliciousBranch}'`);
        // Must NOT contain the raw unquoted form that the shell would expand
        assert.notInclude(paramStr, ` -e ${maliciousBranch}`);
    });

    test('Env/Logs.environment_normal_branch_unchanged', () => {
        // Escaping must not mangle valid branch names
        const ctx = new PshContext('my-project', 'feature-branch-1', null);
        assert.include(ctx.toString(), "-e 'feature-branch-1'");
    });

    test('Env/Logs.app_injection_escaped', () => {
        // Verify shellEscape applied to app names with metacharacters
        const maliciousApp = 'app$(id)';
        assert.strictEqual(shellEscape(maliciousApp), `'app$(id)'`);
    });
});
