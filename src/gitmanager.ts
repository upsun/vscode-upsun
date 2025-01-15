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
                const msg = 'No Git repository. Upsun use Git, please run on upsun projet or init your project';
                vscode.window.showInformationMessage(msg);
                console.info(msg);
            }
        } else {
            const msg = 'No Git extension. Upsun use Git, please install Git extension on VScode';
            vscode.window.showInformationMessage(msg);
            console.info(msg);
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
