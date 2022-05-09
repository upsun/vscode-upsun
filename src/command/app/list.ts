'use strict';

import * as vscode from 'vscode';
import { PshSelectorContextCommand } from "../base";
import { PshApplicationItem } from '../../provider/apps';

const STORAGE_DEFAULT_APP = 'default_application';

const CLI_CMD = 'app:list';
export class ListCommand extends PshSelectorContextCommand {

    prepare(): string {
        return `${CLI_CMD} --format=csv --no-header ${this.context}`;
    }

    convert(raw: string): any {
        const subRaw = raw.replace(/\n$/, "");  // Remove last \n (only)
        const rowRaw = subRaw.split("\n");
        const arr = [];

        for(var row of rowRaw) {
            const cols = row.split(',');
            const item = new PshApplication(cols[0], cols[1], cols[2]);
            arr.push(item);
        }

        return arr;
    }

    async process(param: any): Promise<any> {

        if (this.isSelector) {
            const items = param.map((item: PshApplication) => ({ label: item.name }));
            const pick = await vscode.window.showQuickPick(items);

            return pick;
        }

        //if (this.isTreeItem) {
            const items = [];
            let pos = 0;
            let found = false;
            const vsctx = this.context.vscontext as vscode.ExtensionContext;
            const defaultApp = await vsctx.workspaceState.get(STORAGE_DEFAULT_APP, null);

            for(var app of param) {
                let isActive = (defaultApp === app.name);
                if (defaultApp === null && pos === 0) {
                    isActive = true;
                    await vsctx.workspaceState.update(STORAGE_DEFAULT_APP, app.name);
                }
                if (isActive) {
                    found = true;
                }
                const item = new PshApplicationItem(vsctx, app, isActive);
                items.push(item);
                pos += 1;
            }

            if (!found) {
                await vsctx.workspaceState.update(STORAGE_DEFAULT_APP, null);
            }

            return items;
        //}

        return param;
    }

}

export class PshApplication {
    name: string;
    type: string;
    path: string;

    constructor (name: string, type: string, path: string) {
        this.name = name;
        this.type = type;
        this.path = path;
    }
}
