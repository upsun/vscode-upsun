

import * as vscode from 'vscode';
import { PshContext } from "./command/base";
import { GitManager } from "./gitmanager";
import { ProviderBase } from './provider/common';
import { PshCli } from './pshcli';
import { PshConfig } from "./pshconfig";

export abstract class Tools {

    static getRootPath() : string|undefined {
        let rootPath = undefined;

        // Replace deprecated : vscode.workspace.rootPath
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            rootPath = vscode.workspace.workspaceFolders[0].uri.path;
            console.debug(`Root Path : ${rootPath}`);
        } else {
            console.debug('No Workspace to load !');
        }

        return rootPath;
    }

    static makeContext(vscontext: vscode.ExtensionContext|null|undefined) {
        const rootPath = Tools.getRootPath();

        let pshConfig, branch;
        if (rootPath) {
            pshConfig = new PshConfig(rootPath);

            const gitManager = new GitManager();
            branch = gitManager.currentBranch();
        }

        return new PshContext(pshConfig?.pshProjectId, branch, vscontext);
    }

    static makeCliContext(vscontext: vscode.ExtensionContext|null|undefined) {
        const ctx = Tools.makeContext(vscontext);
        const pshCli = new PshCli();

        return [pshCli, ctx] as const;
    }

    static registerTreeview(
        provider: ProviderBase<any>,
        treeviewName: string,
        refreshName: string|null|undefined) {

        vscode.window.registerTreeDataProvider(
            treeviewName,
            provider
        );

        if (refreshName) {
            vscode.commands.registerCommand(refreshName, () =>
                provider.refresh()
            );
        }
    }
}
