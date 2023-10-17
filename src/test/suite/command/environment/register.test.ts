import { assert } from 'chai';
import * as vscode from 'vscode';
import { registerEnvironment } from '../../../../command/environment/register';

suite('Env Test Suite', () => {

    test('Environement.register', async () => {
        const ext = vscode.extensions.getExtension('platform.sh.psh-cli');
        if (ext) {
            //const extCtx = await ext.activate();
            //const extCtx = await vscode.commands.executeCommand("getContext") as vscode.ExtensionContext;
            //registerEnvironment(extCtx);

            // assert.isDefined(extCtx.subscriptions.push() )
            // assert.strictEqual(ctx.projectId, prj);
            // assert.strictEqual(ctx.toString(), ` -p ${prj}`);

        } else {
            assert.fail();
        }
    });
});
