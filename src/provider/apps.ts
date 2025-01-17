import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { ListCommand, PshApplication } from '../command/app/list';
import { ProviderBase } from './common';
import { SshCommand } from '../command/environment/ssh';
import { LogsCommand } from '../command/environment/logs';
import { PshStorage } from '../pshstore';
import { URI_NODE_RELATION_REFRESH } from '../constants/rels';
import {
    URI_NODE_APPLICATION,
    URI_NODE_APPLICATION_LOG,
    URI_NODE_APPLICATION_REFRESH,
    URI_NODE_APPLICATION_SSH,
} from '../constants/apps';

const COMPONENT_CTX = 'application';

export function registerViewApplication(context: vscode.ExtensionContext) {
    console.debug(`Register Application View handler`);

    const provider = new AppsProvider(Tools.getRootPath(), context);
    const tree = Tools.registerTreeview(
        provider,
        URI_NODE_APPLICATION,
        URI_NODE_APPLICATION_REFRESH,
    );

    tree.onDidChangeSelection((e) => {
        if (e.selection.length > 0) {
            console.debug(`selected : ${e.selection[0]}`);

            new PshStorage(context).setDefaultApp(e.selection[0].item.name);
            vscode.commands.executeCommand(URI_NODE_RELATION_REFRESH);
        }
    });

    vscode.commands.registerCommand(
        URI_NODE_APPLICATION_SSH,
        async (res: PshApplicationItem) => {
            console.debug(`Run ${URI_NODE_APPLICATION_SSH}`);

            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli
                .executeObj(new SshCommand(ctx, res.item.name))
                .then((resultRaw) => {
                    console.debug(resultRaw);
                });
            pshCli.dispose();
        },
    );

    vscode.commands.registerCommand(
        URI_NODE_APPLICATION_LOG,
        async (res: PshApplicationItem) => {
            console.debug(`Run ${URI_NODE_APPLICATION_LOG}`);

            const [pshCli, ctx] = Tools.makeCliContext(context);
            await pshCli
                .executeObj(new LogsCommand(ctx, res.item.name))
                .then((resultRaw) => {
                    console.debug(resultRaw);
                });
            pshCli.dispose();
        },
    );
}

export class PshApplicationItem extends vscode.TreeItem {
    constructor(
        private readonly context: vscode.ExtensionContext,
        public readonly item: PshApplication,
        public readonly isHighlight: boolean = false,
    ) {
        super(item.name);
        this.contextValue = COMPONENT_CTX;

        // Is current
        // if (this.isHighlight){
        //     this.label = { label: item.name, highlights: [[0, item.name.length]]} as vscode.TreeItemLabel;
        // }

        const typeSplitted = this.item.type.toLowerCase().split(':');
        const typeName = typeSplitted[0];
        const typeVersion = typeSplitted[1];

        this.iconPath = {
            light: vscode.Uri.parse(
                this.context.asAbsolutePath(
                    path.join('resources', 'logo', `${typeName}.png`),
                ),
            ),
            dark: vscode.Uri.parse(
                this.context.asAbsolutePath(
                    path.join('resources', 'logo', `${typeName}.png`),
                ),
            ),
        };
        this.description = this.item.type.toLowerCase();
        this.tooltip = this.item.type.toLowerCase();
        this.tooltip =
            `Name: ${this.item.name}\n` +
            `Language: ${typeName}\n` +
            `Version: ${typeVersion}`;
    }
}

export class AppsProvider extends ProviderBase<PshApplicationItem> {
    getChildren(
        element?: PshApplicationItem,
    ): vscode.ProviderResult<PshApplicationItem[]> {
        console.debug(`Run ${URI_NODE_APPLICATION} provider load`);

        if (!this.workspaceRoot /* //TODO check if env exist! */) {
            vscode.window.showInformationMessage(
                'No dependencies in empty workspace',
            );
            return Promise.resolve([]);
        }

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new ListCommand(ctx));
    }

    refresh(): void {
        super.refresh();
        vscode.commands.executeCommand(URI_NODE_RELATION_REFRESH);
    }
}
