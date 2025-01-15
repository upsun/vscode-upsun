import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { ProviderBase } from './common';
import { PshRelationships, RelationshipsCommand } from '../command/environment/relationships';
import { PshStorage } from '../pshstore';

export function registerViewRelationship(context: vscode.ExtensionContext) {
    Tools.registerTreeview(
        new RelsProvider(Tools.getRootPath(), context),
        'upsun-cli.nodes.rels',
        'upsun-cli.nodes.rels.refreshEntry'
    );
}

export class PshRelationshipItem extends vscode.TreeItem {
    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly item: PshRelationships
    ) {
        super(item.id);
        this.contextValue = 'relationship';

        this.iconPath = {
            light: this.context.asAbsolutePath(path.join('resources', 'logo', `${this.item.type}.png`)),
            dark: this.context.asAbsolutePath(path.join('resources', 'logo', `${this.item.type}.png`))
        };
        this.description = `${this.item.type}:${this.item.version} `;
        this.tooltip = this.item.machine;
    }
}

export class RelsProvider extends ProviderBase<PshRelationshipItem> {

    getChildren(element?: PshRelationshipItem): vscode.ProviderResult<PshRelationshipItem[]> {
        const defaultApp = new PshStorage(this.vscontext).getDefaultApp();

        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace.');
            return Promise.resolve([]);
        }

        if (!defaultApp) {
            vscode.window.showInformationMessage('No relation found.');
            return Promise.resolve([]);
        }

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new RelationshipsCommand(ctx, defaultApp));
    }
}
