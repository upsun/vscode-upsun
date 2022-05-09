'use strict';

import * as vscode from 'vscode';

export class GitManager {
    repo: any;

    constructor() {
        const ext =  vscode.extensions.getExtension('vscode.git');
        if (ext) {
            console.debug('Load GIT API...');
            let gitExtension: any|undefined;
            if (ext.isActive) {
                gitExtension = ext.exports;
            } else {
                ext.activate().then( result => {
                    gitExtension = result;
                });
            }
            const api = gitExtension.getAPI(1);

            console.debug('Load repository...');
            this.repo = api.repositories[0];
            if (! this.repo) {
                vscode.window.showInformationMessage('No Git repository. Platform.sh use Git, please run on PSH projet or init your project');
            }
        } else {
            vscode.window.showInformationMessage('No Git extension. Platform.sh use Git, please install Git extension on VScode');
        }
    }

    currentBranch() : string|undefined {
        let result = undefined;
        if (this.repo) {
            if (this.repo.state.HEAD) {
                result = this.repo.state.HEAD.name;
            } else {
                console.error('No data from repository');
            }
        }

        console.debug(`Git Branch : ${result}`);
        return result;
    }
}
