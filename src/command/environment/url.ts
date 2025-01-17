'use strict';

import * as vscode from 'vscode';
import { PshSelectorContextCommand } from '../base';
import { WebBrowser } from '../../utils/webbrowser';

const CLI_CMD = 'environment:url';
export class UrlCommand extends PshSelectorContextCommand {
    displayMessage(): string {
        return `Opening ${this.context.environment} URL`;
    }

    prepare(): string {
        return `${CLI_CMD} --pipe ${this.context}`;
    }

    convert(raw: string): any {
        const subRaw = raw.replace(/\n$/, ''); // Remove last \n (only)
        return subRaw.split('\n');
    }

    async process(param: any) {
        let url;
        if (Array.isArray(param)) {
            if (param.length > 1) {
                const items = param.map((label: string) => ({ label }));
                const pick = await vscode.window.showQuickPick(items);

                if (pick) {
                    url = pick.label;
                }
            } else {
                url = param[0];
            }
        } else {
            url = param;
        }

        if (url && !this.isSelector) {
            WebBrowser.open(url);
        }

        return url;
    }
}
