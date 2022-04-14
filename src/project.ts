

import * as vscode from 'vscode';
import { PshContext } from "./command/base";
import { GitManager } from "./gitmanager";
import { PshConfig } from "./pshconfig";


export function makeContext() {
    let rootPath;
    // Replace deprecated : vscode.workspace.rootPath
    if (vscode.workspace.workspaceFolders) {
        rootPath = vscode.workspace.workspaceFolders[0].uri.path;
    }
    
    let pshConfig;
    if (rootPath) {
        pshConfig = new PshConfig(rootPath);
    }

    const gitManager = new GitManager();
    const branch = gitManager.currentBranch();

    return new PshContext(pshConfig?.pshProjectId, branch);
}
