import * as vscode from 'vscode';

import { registerApp } from './command/app/register';
import { registerConsole } from './command/console/register';
import { registerEnvironment } from './command/environment/register';

import { registerViewApplication } from './provider/apps';
import { registerViewEnvironment } from './provider/envs';
import { registerViewRelationship } from './provider/rels';


export async function activate(context: vscode.ExtensionContext) {
    //HACK for Unit Test.
    (global as any).testExtensionContext = context;

    // Get Global config
    registerApp(context);
    registerConsole(context);
    registerEnvironment(context);

    registerViewEnvironment(context);
    registerViewApplication(context);
    registerViewRelationship(context);
}

export function deactivate() {}
