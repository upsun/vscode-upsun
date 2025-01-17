'use strict';

import * as vscode from 'vscode';

export class GitManager {
    repo: any;

    constructor() {
        const ext = vscode.extensions.getExtension('vscode.git');
        if (ext) {
            console.debug('Git loading extension');
            let gitExtension: any | undefined;
            if (ext.isActive) {
                gitExtension = ext.exports;
            } else {
                ext.activate().then((result) => {
                    gitExtension = result;
                });
            }
            const api = gitExtension.getAPI(1);

            console.debug('Git loading repository');
            this.repo = api.repositories[0];
            if (!this.repo) {
                const msg =
                    'No Git repository. Upsun uses Git, please init your project';
                vscode.window.showInformationMessage(msg);
                console.info(msg);
            }
        } else {
            const msg =
                'No Git extension. Upsun uses Git, please install Git extension on VScode';
            vscode.window.showInformationMessage(msg);
            console.info(msg);
        }
    }

    currentBranch(): string | undefined {
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
