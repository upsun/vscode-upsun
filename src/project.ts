

import * as vscode from 'vscode';
import { PshContext } from "./command/base";
import { GitManager } from "./gitmanager";
import { ProviderBase } from './provider/common';
import { PshCli } from './pshcli';
import { ConfigBase, ConfigFactory } from "./pshconfig";

export abstract class Tools {

    static getRootPath() : string|undefined {
        let rootPath = undefined;

        // Replace deprecated : vscode.workspace.rootPath
        if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
            rootPath = vscode.workspace.workspaceFolders[0].uri.path;
            console.debug(`Tools Root Path : ${rootPath}`);
        } else {
            console.debug('Tools no workspace to load !');
        }

        return rootPath;
    }

    static makeContext(vscontext: vscode.ExtensionContext|null|undefined) {
        const rootPath = Tools.getRootPath();

        let config: ConfigBase | undefined, branch: string | undefined;
        if (rootPath) {
            config = ConfigFactory.createConfig(rootPath);

            const gitManager = new GitManager();
            branch = gitManager.currentBranch();
        }

        return new PshContext(config?.projectId, branch, vscontext);
    }

    static makeCliContext(vscontext: vscode.ExtensionContext|null|undefined) {
        const uctx = Tools.makeContext(vscontext);
        const pshCli = new PshCli();

        return [pshCli, uctx] as const;
    }

    static registerTreeview(
        provider: ProviderBase<any>,
        treeviewName: string,
        refreshName: string|null|undefined): vscode.TreeView<any> {

        vscode.window.registerTreeDataProvider(
            treeviewName,
            provider
        );

        if (refreshName) {
            vscode.commands.registerCommand(refreshName, () =>
                provider.refresh()
            );
        }

        const options = {
            treeDataProvider: provider,
            showCollapseAll: false
        };
        const tree = vscode.window.createTreeView(treeviewName, options);
        return tree;
    }
}
