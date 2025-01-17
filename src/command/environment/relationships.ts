'use strict';

import * as vscode from 'vscode';
import { PshContext, PshSelectorContextCommand } from '../base';
import { PshRelationshipItem } from '../../provider/rels';
import { version } from 'process';

const CLI_CMD = 'environment:relationships';
export class RelationshipsCommand extends PshSelectorContextCommand {
    app: string | null;

    constructor(context: PshContext, app: string | null = null) {
        super(context);
        this.app = app;
    }

    displayMessage(): string {
        return `Listing relationship of application ${this.app}`;
    }

    prepare(): string {
        return `${CLI_CMD} ${this.context.allParameter()} -A ${this.app}`;
    }

    static convertInsert(
        arr: PshRelationships[],
        id: string | undefined,
        type: string | undefined,
        scheme: string | undefined,
        service: string | undefined,
        version: string | undefined,
        url: string | undefined,
    ) {
        if (id !== undefined) {
            // Hack for GEN2
            if (type === undefined) {
                type = scheme;
            }
            if (service === undefined) {
                service = id;
            }

            const item = new PshRelationships(
                id as string,
                service as string,
                type as string,
                version as string,
                url as string,
            );
            arr.push(item);
        }
    }

    convert(raw: string): any {
        const subRaw = raw.replace(/\n$/, ''); // Remove last \n (only)
        const rowRaw = subRaw.split('\n');
        const arr = [] as PshRelationships[];

        let id,
            type,
            version,
            service,
            scheme,
            url = undefined;
        for (var line of rowRaw) {
            if (line.charAt(0) !== ' ') {
                RelationshipsCommand.convertInsert(
                    arr,
                    id,
                    type,
                    scheme,
                    service,
                    version,
                    url,
                );
                type = version = scheme = url = undefined;
                id = line.slice(0, -1);
            }
            if (id !== null) {
                if (line.includes('type:')) {
                    const typeRaw = line
                        .replace(/ *type: /, '')
                        .replace(/'/gm, '');
                    const typeSplit = typeRaw.split(':');
                    type = typeSplit[0];
                    version = typeSplit[1];
                }
                if (line.includes('service:')) {
                    service = line.replace(/ *service: /, '');
                }
                if (line.includes('scheme:')) {
                    scheme = line.replace(/ *scheme: /, '');
                }
                if (line.includes('url:')) {
                    url = line.replace(/ *url: /, '').replace(/'/gm, '');
                }
            }
        }
        RelationshipsCommand.convertInsert(
            arr,
            id,
            type,
            scheme,
            service,
            version,
            url,
        );

        return arr;
    }

    async process(param: any): Promise<any> {
        if (this.isSelector) {
            const items = param.map((item: PshRelationships) => ({
                label: item.id,
            }));
            const pick = await vscode.window.showQuickPick(items);

            return pick;
        }

        //if (this.isTreeItem) {
        const items = [];
        for (var app of param) {
            const vsctx = this.context.vscontext as vscode.ExtensionContext;
            const item = new PshRelationshipItem(vsctx, app);
            items.push(item);
        }
        return items;
        //}

        return param;
    }
}

export class PshRelationships {
    constructor(
        public readonly id: string, // root
        public readonly title: string, // service:
        public readonly type: string, // type:value:yyyy
        public readonly version: string, // type:xxxx:version
        public readonly machine: string, // url:
    ) {}
}
