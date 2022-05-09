import * as vscode from 'vscode';
import { registerApp } from './command/app/register';
import { registerConsole } from './command/console/register';
import { registerEnvironment } from './command/environment/register';
import { AppsProvider, registerViewApplication } from './provider/apps';
import { EnvsProvider, registerViewEnvironment } from './provider/envs';
import { Tools } from './project';
import { registerViewRelationship, RelsProvider } from './provider/rels';


export async function activate(context: vscode.ExtensionContext) {
    const gitExtensionName = 'vscode.git';
    // guide the users to install Microsoft Python extension.
    // const gitExtension = vscode.extensions.getExtension(gitExtensionName);
    // if (!gitExtension && vscode.workspace.getConfiguration().get('recommendGit', true)) {
    //     const message = 'It is recommended to install Microsoft Python extension. Do you want to install it now?';
    //     const choice = await vscode.window.showInformationMessage(message, 'Install', 'Not now', 'Do not show again');
    //     if (choice === 'Install') {
    //         await vscode.commands.executeCommand('extension.open', gitExtensionName); // open Extension tab and show extension details.
    //         await vscode.commands.executeCommand('workbench.extensions.installExtension', gitExtensionName); // install the extension.
    //     } else if (choice === 'Do not show again') {
    //         //vscode.workspace.getConfiguration().set('recommendGit', false);
    //     }
    // }

    // Get Global config

    registerApp(context);
    registerConsole(context);
    registerEnvironment(context);

    registerViewEnvironment(context);
    registerViewApplication(context);
    registerViewRelationship(context);
}

export function deactivate() {}
