'use strict';

import * as vscode from 'vscode';
import { PshStorage } from '../../pshstore';

/**
 * Register handlers for Global setting of Console
 * @param context
 */
export async function registerGlobal(context: vscode.ExtensionContext) {
    registerSetting(context);
    registerSettingToken(context);
}


async function registerSetting(context: vscode.ExtensionContext) {
    console.debug(`Register Setting Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand('upsun-cli.ext.setting', async () => {
            vscode.commands.executeCommand( 'workbench.action.openSettings', 'upsun-cli' );
        })
    );
}

async function registerSettingToken(context: vscode.ExtensionContext) {
    console.debug(`Register Setting Token Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand('upsun-cli.ext.setting.token', async () => {
            const store = new PshStorage(context);
            await store.setToken();
        })
    );
}
