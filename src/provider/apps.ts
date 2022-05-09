import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { ListCommand, PshApplication } from '../command/app/list';
import { ProviderBase } from './common';
import { SshCommand } from '../command/environment/ssh';
import { LogsCommand } from '../command/environment/logs';

export function registerViewApplication(context: vscode.ExtensionContext) {
    Tools.registerTreeview(
        new AppsProvider(Tools.getRootPath(), context),
        'psh-cli.nodes.apps',
        'psh-cli.nodes.apps.refreshEntry'
    );

    vscode.commands.registerCommand("psh-cli.nodes.apps.sshEntry", async (res: PshApplicationItem) => {
        const [pshCli, ctx] = Tools.makeCliContext(context);
        await pshCli.executeObj(new SshCommand(ctx, res.item.name)).then(resultRaw => {
            console.debug(resultRaw);
        });
        pshCli.dispose();
    });
    vscode.commands.registerCommand("psh-cli.nodes.apps.logEntry", async (res: PshApplicationItem) => {
        const [pshCli, ctx] = Tools.makeCliContext(context);
        await pshCli.executeObj(new LogsCommand(ctx, res.item.name)).then(resultRaw => {
            console.debug(resultRaw);
        });
        pshCli.dispose();
    });

}

export class PshApplicationItem extends vscode.TreeItem {
    constructor(
        private readonly context: vscode.ExtensionContext,
        public readonly item: PshApplication,
        public readonly isHighlight: boolean = false,
      ) {
        super(item.name);
        this.contextValue = 'application';

        // Is current
        if (this.isHighlight){
            this.label = { label: item.name, highlights: [[0, item.name.length]]} as vscode.TreeItemLabel;
        }

        const typeSplitted = this.item.type.toLowerCase().split(':');
        const typeName = typeSplitted[0];
        const typeVersion = typeSplitted[1];

        this.iconPath = {
            light: this.context.asAbsolutePath(path.join('resources', 'logo', `${typeName}.png`)),
            dark: this.context.asAbsolutePath(path.join('resources', 'logo', `${typeName}.png`))
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

    getChildren(element?: PshApplicationItem): vscode.ProviderResult<PshApplicationItem[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new ListCommand(ctx));
    }
}
