

import * as vscode from 'vscode';
import { PshContext } from "./command/base";
import { GitManager } from "./gitmanager";
import { PshConfig } from "./pshconfig";


export abstract class Tools {

    static makeContext() {
        let rootPath;
        // Replace deprecated : vscode.workspace.rootPath
        if (vscode.workspace.workspaceFolders) {
            rootPath = vscode.workspace.workspaceFolders[0].uri.path;
            console.debug(`Root Path : ${rootPath}`);
        } else {
            console.debug('No Workspace to load !');
        }

        let pshConfig, branch;
        if (rootPath) {
            pshConfig = new PshConfig(rootPath);

            const gitManager = new GitManager();
            branch = gitManager.currentBranch();
        }

        return new PshContext(pshConfig?.pshProjectId, branch);
    }

}
