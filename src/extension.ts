import * as vscode from 'vscode';
import { registerApp } from './command/app/register';
import { registerConsole } from './command/console/register';
import { registerEnvironment } from './command/environment/register';


export async function activate(context: vscode.ExtensionContext) {

    // Test only
	context.subscriptions.push(
        vscode.commands.registerCommand('psh-cli.test', async () => {
            vscode.window.showInformationMessage('Hello World from Psh CLI!');
        })
    );
    context.subscriptions.push(vscode.commands.registerCommand('getContext', () => context));

    registerApp(context);
    registerConsole(context);
    registerEnvironment(context);
}

export function deactivate() {}
