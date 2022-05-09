'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { ListCommand } from './list';

export async function registerApp(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.app.list', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new ListCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );
}
