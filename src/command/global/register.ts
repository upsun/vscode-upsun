'use strict';

import * as vscode from 'vscode';
import { PshStorage } from '../../pshstore';
import {
    URI_EXTENSION,
    URI_EXTENSION_SETTING,
    URI_EXTENSION_SETTING_TOKEN,
    URI_INSTALL_CLI,
    URI_INSTALL_FASTSUN,
} from '../../constants/extension';
// import { WebAppPanel } from '../../utils/WebAppPanel';

/**
 * Register handlers for Global setting of Console
 * @param context
 */
export async function registerGlobal(context: vscode.ExtensionContext) {
    registerSetting(context);
    registerSettingToken(context);
    registerFastSun(context);
}

async function registerSetting(context: vscode.ExtensionContext) {
    console.debug(`Register Setting Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_EXTENSION_SETTING, async () => {
            vscode.commands.executeCommand(
                'workbench.action.openSettings',
                URI_EXTENSION,
            );
        }),
    );
}

async function registerSettingToken(context: vscode.ExtensionContext) {
    console.debug(`Register Setting Token Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(
            URI_EXTENSION_SETTING_TOKEN,
            async () => {
                const store = new PshStorage(context);
                await store.setToken();
            },
        ),
    );
}

async function registerInstallCli(context: vscode.ExtensionContext) {
    console.debug(`Register Install CLI Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_INSTALL_CLI, async () => {
            //TODO
        }),
    );
}

async function registerFastSun(context: vscode.ExtensionContext) {
    console.debug(`Register FastSun Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_INSTALL_FASTSUN, async () => {
            // WebAppPanel.createOrShow(context.extensionUri, 'FastSun');
            throw new Error('Method not implemented.');
        }),
    );
}
