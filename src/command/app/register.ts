'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { ListCommand } from './list';

/**
 * Register handlers for commands of App
 * @param context 
 */
export async function registerApp(context: vscode.ExtensionContext) {
    console.debug(`Register App handler`);

    context.subscriptions.push(
        vscode.commands.registerCommand('upsun-cli.app.list', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new ListCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );
}
