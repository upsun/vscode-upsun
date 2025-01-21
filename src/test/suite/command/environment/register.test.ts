import * as path from 'path';
import { assert } from 'chai';
import * as vscode from 'vscode';
// import { registerEnvironment } from '../../../../command/environment/register';

// export const rootPath = path.resolve(__dirname, '../../../');
// const packageJSON: any = require(path.resolve(rootPath, 'package.json'));
// export const extensionId = `${packageJSON.publisher}.${packageJSON.name}`;

// suite('Env Test Suite', () => {
//     test('Environement.register', async () => {
//         const ext = vscode.extensions.getExtension(extensionId);
//         if (ext) {
//             //const extCtx = await ext.activate();
//             //const extCtx = await vscode.commands.executeCommand("getContext") as vscode.ExtensionContext;
//             //registerEnvironment(extCtx);
//             // assert.isDefined(extCtx.subscriptions.push() )
//             // assert.strictEqual(ctx.projectId, prj);
//             // assert.strictEqual(ctx.toString(), ` -p ${prj}`);
//         } else {
//             assert.fail();
//         }
//     });
// });
