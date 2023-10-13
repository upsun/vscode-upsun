import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import { EnvStatus, ListCommand, PshEnvironment } from '../command/environment/list';
import { ProviderBase } from './common';
import { UrlCommand } from '../command/environment/url';
import { PshContext } from '../command/base';
import { ActivateCommand } from '../command/environment/activate';
import { DeactivateCommand } from '../command/environment/deactivate';
import { RedeployCommand } from '../command/environment/redeploy';

export function registerViewEnvironment(context: vscode.ExtensionContext) {
    const provider = new EnvsProvider(Tools.getRootPath(), context);
    Tools.registerTreeview(
        provider,
        'psh-cli.nodes.envs',
        'psh-cli.nodes.envs.refreshEntry'
    );

    vscode.commands.registerCommand("psh-cli.nodes.envs.activateEntry", async (res: PshEnvironmentItem) => {
        try {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            const currentCtx = new PshContext(ctx.projectId, res.item.id, context);
            await pshCli.executeObj(new ActivateCommand(currentCtx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        }
        finally {
            provider.refresh();
        }
    });
    vscode.commands.registerCommand("psh-cli.nodes.envs.deactivateEntry", async (res: PshEnvironmentItem) => {
        try {
            const [pshCli, ctx] = Tools.makeCliContext(context);
            const currentCtx = new PshContext(ctx.projectId, res.item.id, context);
            await pshCli.executeObj(new DeactivateCommand(currentCtx)).then(resultRaw => {
                console.debug(resultRaw);
            });
            pshCli.dispose();
        }
        finally {
            provider.refresh();
        }
    });
    vscode.commands.registerCommand("psh-cli.nodes.envs.redeployEntry", async (res: PshEnvironmentItem) => {
        const [pshCli, ctx] = Tools.makeCliContext(context);
        const currentCtx = new PshContext(ctx.projectId, res.item.id, context);
        await pshCli.executeObj(new RedeployCommand(currentCtx)).then(resultRaw => {
            console.debug(resultRaw);
        });
        pshCli.dispose();
    });
    vscode.commands.registerCommand("psh-cli.nodes.envs.urlEntry", async (res: PshEnvironmentItem) => {
        const [pshCli, ctx] = Tools.makeCliContext(context);
        const currentCtx = new PshContext(ctx.projectId, res.item.id, context);
        await pshCli.executeObj(new UrlCommand(currentCtx)).then(resultRaw => {
            console.debug(resultRaw);
        });
        pshCli.dispose();
    });
}

export class PshEnvironmentItem extends vscode.TreeItem {
    constructor(
        private readonly context: vscode.ExtensionContext,
        public readonly item: PshEnvironment,
        public readonly isHighlight: boolean = false,
      ) {
        super(item.id);
        this.contextValue = "environment";

        // Is current
        if (this.isHighlight){
            this.label = { label: item.id, highlights: [[0, item.id.length]]} as vscode.TreeItemLabel;
        }

        // Is active
        const isActive = this.item.status === EnvStatus.active || this.item.status === EnvStatus.progess;
        const fileName = (isActive) ? "circle-filled.svg" : "circle-outline.svg";
        if (isActive){
            this.contextValue += ".active";
        }

        //item.status
        this.iconPath = {
            light: this.context.asAbsolutePath(path.join('resources', 'light', `${fileName}`)),
            dark: this.context.asAbsolutePath(path.join('resources', 'dark',`${fileName}`))
        };
        this.description = this.item.type;
        this.tooltip =
            `State: ${this.item.status}\n` +
            `Machine: ${this.item.machine}\n` +
            `Type: ${this.item.type}\n` +
            `Created: ${this.item.created.toLocaleDateString()}\n` +
            `Update: ${this.item.updated.toLocaleDateString()}`;
      }

}

export class EnvsProvider extends ProviderBase<PshEnvironmentItem> {

    getChildren(element?: PshEnvironmentItem): vscode.ProviderResult<PshEnvironmentItem[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        const [pshCli, ctx] = Tools.makeCliContext(this.vscontext);
        return pshCli.executeObj(new ListCommand(ctx));
    }
}
