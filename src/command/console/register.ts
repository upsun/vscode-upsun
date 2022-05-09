'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { WebCommand } from './web';

export async function registerConsole(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.console.open', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new WebCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );
}
