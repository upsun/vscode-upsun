'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { PshCli } from '../../pshcli';
import { SshCommand } from './ssh';
import { UrlCommand } from './url';

export async function registerEnvironment(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:url', async () => {
            const ctx = Tools.makeContext();
            const pshCli = new PshCli();
            await pshCli.executeObj(new UrlCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:ssh', async () => {
            const ctx = Tools.makeContext();
            const pshCli = new PshCli();
            await pshCli.executeObj(new SshCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );
}
