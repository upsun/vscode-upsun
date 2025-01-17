'use strict';

import * as vscode from 'vscode';
import { Tools } from '../../project';
import { WebCommand } from './web';
import { URI_PROJECT_CONSOLE } from '../../constants/project';

/**
 * Register handlers for commands of Project
 * @param context
 */
export async function registerProject(context: vscode.ExtensionContext) {
    console.debug(`Register Project Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_PROJECT_CONSOLE, async () => {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli.executeObj(new WebCommand(ctx)).then((resultRaw) => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        }),
    );
}
