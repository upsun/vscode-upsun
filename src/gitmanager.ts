'use strict';

import * as vscode from 'vscode';

export class GitManager {
    repo: any;

    constructor() {
        const ext =  vscode.extensions.getExtension('vscode.git');
        if (ext) {

            const gitExtension = ext.exports;
            const api = gitExtension.getAPI(1);

            this.repo = api.repositories[0];
            if (! this.repo) {
                vscode.window.showInformationMessage('No Git repository. Platform.sh use Git, please run on PSH projet or init your project');
            }
        } else {
            vscode.window.showInformationMessage('No Git extension. Platform.sh use Git, please install Git extension on VScode');
        }
    }

    currentBranch() : string {
        return this.repo.state.HEAD.name;
    }
}
