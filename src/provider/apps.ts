import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { ListCommand, PshApplication } from '../command/app/list';
import { ProviderBase } from './common';
import { SshCommand } from '../command/environment/ssh';
import { LogsCommand } from '../command/environment/logs';
import { PshStorage } from '../pshstore';

export function registerViewApplication(context: vscode.ExtensionContext) {
    const provider = new AppsProvider(Tools.getRootPath(), context);
    const tree = Tools.registerTreeview(
        provider,
        'upsun-cli.nodes.apps',
        'upsun-cli.nodes.apps.refreshEntry'
    );

    tree.onDidChangeSelection(e => {
        if (e.selection.length > 0) {
            console.debug(`slected : ${e.selection[0]}`);
            new PshStorage(context).setDefaultApp(e.selection[0].item.name);
            vscode.commands.executeCommand("upsun-cli.nodes.rels.refreshEntry");
        }
    });

    vscode.commands.registerCommand("upsun-cli.nodes.apps.sshEntry", async (res: PshApplicationItem) => {
        const [pshCli, ctx] = Tools.makeCliContext(context);
        await pshCli.executeObj(new SshCommand(ctx, res.item.name)).then(resultRaw => {
            console.debug(resultRaw);
        });
        pshCli.dispose();
    });
    vscode.commands.registerCommand("upsun-cli.nodes.apps.logEntry", async (res: PshApplicationItem) => {
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
        // if (this.isHighlight){
        //     this.label = { label: item.name, highlights: [[0, item.name.length]]} as vscode.TreeItemLabel;
        // }

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
        if (!this.workspaceRoot /* //TODO check if env exist! */) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new ListCommand(ctx));
    }

    refresh(): void {
        super.refresh();
        vscode.commands.executeCommand("upsun-cli.nodes.rels.refreshEntry");
    }
}
