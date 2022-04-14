'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";
import { WebBrowser } from '../../utils/webbrowser';


const CLI_CMD = 'environment:url';
export class UrlCommand extends PshContextCommand {

    prepare(): string {
        return `${CLI_CMD} --pipe ${this.context}`;
    }

    convert(raw: string) {
        return raw.split("\n");
    }
    
    process(param: any) {
        const quickPick = vscode.window.createQuickPick();
		quickPick.items = param.map((label: string) => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
                const url = selection[0].label;
                WebBrowser.open(url);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();

        return `Avalialable urls ${param}`;
    }
}
