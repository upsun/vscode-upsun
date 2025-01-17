'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { ActivateCommand } from './activate';
import { DeactivateCommand } from './deactivate';
import { ListCommand as AppListCommand } from '../app/list';
import { LogsCommand } from './logs';
import { RedeployCommand } from './redeploy';
import { SshCommand } from './ssh';
import { SynchronizeCommand } from './synchronize';
import { UrlCommand } from './url';
import {
    URI_CMD_ENVIRONMENT_ACTIVATE,
    URI_CMD_ENVIRONMENT_DESACTIVATE,
    URI_CMD_ENVIRONMENT_LOG,
    URI_CMD_ENVIRONMENT_REDEPLOY,
    URI_CMD_ENVIRONMENT_SSH,
    URI_CMD_ENVIRONMENT_SYNCHRONIZE,
    URI_CMD_ENVIRONMENT_URL,
} from '../../constants/envs';

/**
 * Register handlers for commands of Environment
 * @param context
 */
export async function registerEnvironment(context: vscode.ExtensionContext) {
    console.debug(`Register Environment handler`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_CMD_ENVIRONMENT_URL, async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new UrlCommand(ctx)).then((resultRaw) => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_CMD_ENVIRONMENT_SSH, async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli
                .executeObj(new AppListCommand(ctx, true))
                .then(async (selection) => {
                    if (selection) {
                        await pshCli
                            .executeObj(new SshCommand(ctx, selection.label))
                            .then((resultRaw2) => {
                                console.debug(resultRaw2);
                            });
                    }
                });
            pshCli.dispose();
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            URI_CMD_ENVIRONMENT_ACTIVATE,
            async () => {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                await pshCli
                    .executeObj(new ActivateCommand(ctx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            },
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            URI_CMD_ENVIRONMENT_DESACTIVATE,
            async () => {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                await pshCli
                    .executeObj(new DeactivateCommand(ctx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            },
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_CMD_ENVIRONMENT_LOG, async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new LogsCommand(ctx)).then((resultRaw) => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        }),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            URI_CMD_ENVIRONMENT_REDEPLOY,
            async () => {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                await pshCli
                    .executeObj(new RedeployCommand(ctx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            },
        ),
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            URI_CMD_ENVIRONMENT_SYNCHRONIZE,
            async () => {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                await pshCli
                    .executeObj(new SynchronizeCommand(ctx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            },
        ),
    );
}
