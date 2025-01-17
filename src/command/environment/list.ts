'use strict';

import * as vscode from 'vscode';
import { PshSelectorContextCommand } from '../base';
import { PshEnvironmentItem } from '../../provider/envs';

const CLI_CMD = 'environment:list';
export class ListCommand extends PshSelectorContextCommand {
    displayMessage(): string {
        return `List environment of ${this.context.projectId}`;
    }

    prepare(): string {
        return `${CLI_CMD} --format=csv --no-header --columns=id,machine_name,title,status,type,created,updated ${this.context.projectParameter()}`;
    }

    convert(raw: string): any {
        const subRaw = raw.replace(/\n$/, ''); // Remove last \n (only)
        const rowRaw = subRaw.split('\n');
        const arr = [];

        for (var row of rowRaw) {
            const cols = row.split(',');
            const item = new PshEnvironment(
                cols[0],
                cols[1],
                cols[2],
                cols[3] as EnvStatus,
                cols[4] as EnvType,
                new Date(cols[5]),
                new Date(cols[6]),
            );
            arr.push(item);
        }

        return arr;
    }

    async process(param: any): Promise<any> {
        if (this.isSelector) {
            const items = param.map((item: PshEnvironment) => ({
                label: item.id,
            }));
            const pick = await vscode.window.showQuickPick(items);

            return pick;
        }

        //if (this.isTreeItem) {
        const vsctx = this.context.vscontext as vscode.ExtensionContext;
        const items = [];
        for (var app of param) {
            const isActive = this.context.environment === app.id;
            const item = new PshEnvironmentItem(vsctx, app, isActive);
            items.push(item);
        }
        return items;
        //}

        return param;
    }
}

export enum EnvStatus {
    unknown = 'Unknown',
    active = 'Active',
    inatcive = 'Inactive',
    progess = 'In progress',
}

export enum EnvType {
    unknown = 'Unknown',
    production = 'production',
    development = 'development',
}

export class PshEnvironment {
    constructor(
        public readonly id: string,
        public readonly machine: string,
        public readonly title: string,
        public readonly status: EnvStatus = EnvStatus.unknown,
        public readonly type: EnvType = EnvType.unknown,
        public readonly created: Date,
        public readonly updated: Date,
    ) {}
}
