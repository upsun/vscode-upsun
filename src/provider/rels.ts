import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { ProviderBase } from './common';
import { PshRelationships, RelationshipsCommand } from '../command/environment/relationships';

const STORAGE_DEFAULT_APP = 'default_application';

export function registerViewRelationship(context: vscode.ExtensionContext) {
    Tools.registerTreeview(
        new RelsProvider(Tools.getRootPath(), context),
        'psh-cli.nodes.rels',
        'psh-cli.nodes.rels.refreshEntry'
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
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        const defaultApp = this.vscontext.workspaceState.get(STORAGE_DEFAULT_APP, null);

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new RelationshipsCommand(ctx, defaultApp));
    }
}
