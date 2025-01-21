'use strict';

import * as vscode from 'vscode';
import { PshStorage } from '../../pshstore';
import {
    URI_EXTENSION,
    URI_EXTENSION_SETTING,
    URI_EXTENSION_SETTING_TOKEN,
    URI_INSTALL_CLI,
    URI_INSTALL_CLONSUN,
    URI_INSTALL_CONVSUN,
    URI_INSTALL_FASTSUN,
} from '../../constants/extension';
import { getGithubFileTag } from '../../utils/platform';
// import { WebAppPanel } from '../../utils/WebAppPanel';

const CMD_INSTALL_CLI =
    'curl -fsSL https://raw.githubusercontent.com/platformsh/cli/main/installer.sh | VENDOR=upsun bash';

/**
 * Register handlers for Global setting of Console
 * @param context
 */
export async function registerGlobal(context: vscode.ExtensionContext) {
    registerSetting(context);
    registerSettingToken(context);
    registerInstallCli(context);
    registerInstallClonsun(context);
    registerInstallConvsun(context);
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
                await store.setTokenInteractive();
            },
        ),
    );
}

async function registerInstallCli(context: vscode.ExtensionContext) {
    console.debug(`Register Install CLI Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_INSTALL_CLI, async () => {
            const title = 'Install Upsun CLI';
            downloadInstall(title, CMD_INSTALL_CLI);
        }),
    );
}

async function registerInstallClonsun(context: vscode.ExtensionContext) {
    console.debug(`Register Install ClonSun Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_INSTALL_CLONSUN, async () => {
            fetch(
                'https://api.github.com/repos/upsun/clonsun/releases/latest',
            ).then(async (response: Response) => {
                if (response.ok) {
                    const [binUnzip, item, dest] = getGithubFileTag();

                    const json = (await response.json()) as any;
                    const url = json.assets.find((e: any) =>
                        e.name.includes(item),
                    ).browser_download_url;

                    const title = 'Install ClonSun tool';
                    const final = `mkdir -p tmp ${dest} && cd tmp && curl -LJo clonsun${item} ${url} && ${binUnzip} clonsun${item} && mv clonsun ${dest} && cd .. && rm -r tmp`;
                    downloadInstall(title, final);
                }
            });
        }),
    );
}

async function registerInstallConvsun(context: vscode.ExtensionContext) {
    console.debug(`Register Install ConvSun Handlers`);

    context.subscriptions.push(
        vscode.commands.registerCommand(URI_INSTALL_CONVSUN, async () => {
            fetch(
                'https://api.github.com/repos/upsun/convsun/releases/latest',
            ).then(async (response: Response) => {
                if (response.ok) {
                    const [binUnzip, item, dest] = getGithubFileTag();

                    const test = (await response.json()) as any;
                    const url = test.assets.find((e: any) =>
                        e.name.includes(item),
                    ).browser_download_url;

                    const title = 'Install ConvSun tool';
                    const final = `mkdir -p tmp ${dest} && cd tmp && curl -LJo convsun${item} ${url} && ${binUnzip} convsun${item} && mv convsun ${dest} && cd .. && rm -r tmp`;
                    downloadInstall(title, final);
                }
            });
        }),
    );
}

function downloadInstall(title: string, cmd: string) {
    let term = vscode.window.terminals.find((x) => {
        return x.name === title;
    });
    const options: vscode.TerminalOptions = {
        name: title,
        // message: 'Please do close this terminal !',
        // iconPath
        env: {
            ...process.env,
        },
    };
    term = vscode.window.createTerminal(options);
    term.sendText(`${cmd}`);
    term.show();
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
