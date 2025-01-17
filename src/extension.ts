import * as vscode from 'vscode';

import { URI_EXTENSION } from './constants/extension';

import { registerGlobal } from './command/global/register';
import { registerApplication } from './command/app/register';
import { registerProject } from './command/project/register';
import { registerEnvironment } from './command/environment/register';

import { registerViewEnvironment } from './provider/envs';
import { registerViewApplication } from './provider/apps';
import { registerViewRelationship } from './provider/rels';

export async function activate(context: vscode.ExtensionContext) {
    //HACK for Unit Test.
    (global as any).testExtensionContext = context;

    // Get Global commands.
    registerGlobal(context);

    // Common commands.
    registerProject(context);
    registerEnvironment(context);
    registerApplication(context);

    // View commands.
    registerViewEnvironment(context);
    registerViewApplication(context);
    registerViewRelationship(context);

    // Debug commands.
    const allCommands = await vscode.commands.getCommands(true);
    const extensionCommands = allCommands
        .filter((command) => command.startsWith(URI_EXTENSION))
        .sort();
    console.debug(
        'Commands available :\n {0}',
        JSON.stringify(extensionCommands, null, 2),
    );
}

export function deactivate() {}
