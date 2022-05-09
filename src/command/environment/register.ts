'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { ActivateCommand } from './activate';
import { DeactivateCommand } from './deactivate';
import { ListCommand as AppListCommand } from '../app/list';
import { ListCommand } from './list';
import { LogsCommand } from './logs';
import { RedeployCommand } from './redeploy';
import { SshCommand } from './ssh';
import { SynchronizeCommand } from './synchronize';
import { UrlCommand } from './url';

export async function registerEnvironment(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:url', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new UrlCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:ssh', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new AppListCommand(ctx, true)).then(async (selection) => {
                if (selection) {
                    await pshCli.executeObj(new SshCommand(ctx, selection.label)).then(resultRaw2 => {
                        console.debug(resultRaw2);
                    });
                }
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:activate', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new ActivateCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:deactivate', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new DeactivateCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:logs', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new LogsCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:redeploy', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new RedeployCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:synchronize', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new SynchronizeCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.environment:list', async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new ListCommand(ctx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        })
    );
}
