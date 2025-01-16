import * as vscode from 'vscode';

import { URI_EXTENSION }            from './constants/extension';

import { registerApp }              from './command/app/register';
import { registerConsole }          from './command/project/register';
import { registerEnvironment }      from './command/environment/register';
import { registerGlobal }           from './command/global/register';

import { registerViewApplication }  from './provider/apps';
import { registerViewEnvironment }  from './provider/envs';
import { registerViewRelationship } from './provider/rels';


export async function activate(context: vscode.ExtensionContext) {
    //HACK for Unit Test.
    (global as any).testExtensionContext = context;

    // Get Global commands.
    registerGlobal(context);

    // Common commands.
    registerApp(context);
    registerConsole(context);
    registerEnvironment(context);

    // View commands.
    registerViewEnvironment(context);
    registerViewApplication(context);
    registerViewRelationship(context);

    // Debug Commands.
    const allCommands = await vscode.commands.getCommands(true);
    const extensionCommands = allCommands.filter(command => command.startsWith(URI_EXTENSION)).sort();
    console.debug('Commands availables :\n {0}', JSON.stringify(extensionCommands, null, 2));
}

export function deactivate() {}
