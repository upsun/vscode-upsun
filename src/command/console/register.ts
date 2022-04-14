'use strict';

import * as vscode from 'vscode';
import { makeContext } from '../../project';
import { WebBrowser } from '../../utils/webbrowser';

export async function registerConsole(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.console.open', async () => {
            const ctx = makeContext();
            const url = `https://console.platform.sh/org/${ctx.projectId}/${ctx.environment}/`;
            WebBrowser.open(url);
        })
    );
}
