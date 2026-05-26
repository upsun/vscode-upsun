'use strict';

import * as vscode from 'vscode';

export class GitManager {
    private api: any;

    constructor() {
        const ext = vscode.extensions.getExtension('vscode.git');
        if (ext) {
            console.debug('Git loading extension');
            if (ext.isActive) {
                this.api = ext.exports.getAPI(1);
            } else {
                // Activation is async — store the API once it resolves.
                // currentBranch() reads this.api lazily so the delay is safe.
                ext.activate().then((exports) => {
                    this.api = exports.getAPI(1);
                });
            }
        } else {
            const msg =
                'No Git extension. Upsun uses Git, please install Git extension on VScode';
            vscode.window.showInformationMessage(msg);
            console.info(msg);
        }
    }

    currentBranch(): string | undefined {
        if (!this.api) {
            const msg =
                'No Git repository. Upsun uses Git, please init your project';
            vscode.window.showInformationMessage(msg);
            console.info(msg);
            console.debug('Git Branch : undefined');
            return undefined;
        }

        console.debug('Git loading repository');

        // Prefer the repository whose root matches the open workspace folder so
        // that the correct repo is selected when VS Code knows about several
        // (e.g. extension-development host + test workspace open simultaneously).
        const workspaceRoot =
            vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        const repo: any = workspaceRoot
            ? (this.api.repositories.find(
                  (r: any) => r.rootUri.fsPath === workspaceRoot,
              ) ?? this.api.repositories[0])
            : this.api.repositories[0];

        if (!repo) {
            const msg =
                'No Git repository. Upsun uses Git, please init your project';
            vscode.window.showInformationMessage(msg);
            console.info(msg);
            console.debug('Git Branch : undefined');
            return undefined;
        }

        let result: string | undefined;
        if (repo.state.HEAD) {
            result = repo.state.HEAD.name;
        } else {
            console.error('No data from repository');
        }

        // Defence-in-depth: warn if the branch name contains shell metacharacters.
        // Callers shell-escape the value before passing it to a terminal, but an
        // unusual branch name may indicate a malicious repository.
        if (result && /[$`();&|{}<>!]/.test(result)) {
            const msg =
                'Upsun: the current Git branch name contains shell metacharacters. This may indicate a malicious repository.';
            console.warn(msg);
            vscode.window.showWarningMessage(msg);
        }

        console.debug(`Git Branch : ${result}`);
        return result;
    }
}
