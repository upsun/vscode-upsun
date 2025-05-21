import path = require('path');
import * as vscode from 'vscode';
import { Tools } from '../project';
import {
    EnvStatus,
    ListCommand,
    PshEnvironment,
} from '../command/environment/list';
import { ProviderBase } from './common';
import { UrlCommand } from '../command/environment/url';
import { PshContext } from '../command/base';
import { ActivateCommand } from '../command/environment/activate';
import { DeactivateCommand } from '../command/environment/deactivate';
import { RedeployCommand } from '../command/environment/redeploy';
import { URI_NODE_APPLICATION_REFRESH } from '../constants/apps';
import { URI_NODE_RELATION_REFRESH } from '../constants/rels';
import {
    URI_NODE_ENVIRONMENT,
    URI_NODE_ENVIRONMENT_ACTIVATE,
    URI_NODE_ENVIRONMENT_DESACTIVATE,
    URI_NODE_ENVIRONMENT_REDEPLOY,
    URI_NODE_ENVIRONMENT_REFRESH,
    URI_NODE_ENVIRONMENT_URL,
} from '../constants/envs';

const COMPONENT_CTX = 'environment';

export function registerViewEnvironment(context: vscode.ExtensionContext) {
    console.debug(`Register Environment View handler`);

    const provider = new EnvsProvider(Tools.getRootPath(), context);
    Tools.registerTreeview(
        provider,
        URI_NODE_ENVIRONMENT,
        URI_NODE_ENVIRONMENT_REFRESH,
    );

    vscode.commands.registerCommand(
        URI_NODE_ENVIRONMENT_ACTIVATE,
        async (res: PshEnvironmentItem) => {
            console.debug(`Run ${URI_NODE_ENVIRONMENT_ACTIVATE}`);

            try {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                const currentCtx = new PshContext(
                    ctx.projectId,
                    res.item.id,
                    context,
                );
                await pshCli
                    .executeObj(new ActivateCommand(currentCtx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            } finally {
                provider.refresh();
            }
        },
    );

    vscode.commands.registerCommand(
        URI_NODE_ENVIRONMENT_DESACTIVATE,
        async (res: PshEnvironmentItem) => {
            console.debug(`Run ${URI_NODE_ENVIRONMENT_DESACTIVATE}`);

            try {
                const [pshCli, ctx] = Tools.makeCliContext(context);
                const currentCtx = new PshContext(
                    ctx.projectId,
                    res.item.id,
                    context,
                );
                await pshCli
                    .executeObj(new DeactivateCommand(currentCtx))
                    .then((resultRaw) => {
                        console.debug(resultRaw);
                    });
                pshCli.dispose();
            } finally {
                provider.refresh();
            }
        },
    );

    vscode.commands.registerCommand(
        URI_NODE_ENVIRONMENT_REDEPLOY,
        async (res: PshEnvironmentItem) => {
            console.debug(`Run ${URI_NODE_ENVIRONMENT_REDEPLOY}`);

            const [pshCli, ctx] = Tools.makeCliContext(context);
            const currentCtx = new PshContext(
                ctx.projectId,
                res.item.id,
                context,
            );
            await pshCli
                .executeObj(new RedeployCommand(currentCtx))
                .then((resultRaw) => {
                    console.debug(resultRaw);
                });
            pshCli.dispose();
        },
    );

    vscode.commands.registerCommand(
        URI_NODE_ENVIRONMENT_URL,
        async (res: PshEnvironmentItem) => {
            console.debug(`Run ${URI_NODE_ENVIRONMENT_URL}`);

            const [pshCli, ctx] = Tools.makeCliContext(context);
            const currentCtx = new PshContext(
                ctx.projectId,
                res.item.id,
                context,
            );
            await pshCli
                .executeObj(new UrlCommand(currentCtx))
                .then((resultRaw) => {
                    console.debug(resultRaw);
                });
            pshCli.dispose();
        },
    );
}

export class PshEnvironmentItem extends vscode.TreeItem {
    constructor(
        private readonly context: vscode.ExtensionContext,
        public readonly item: PshEnvironment,
        public readonly isHighlight: boolean = false,
    ) {
        super(item.id);
        this.contextValue = COMPONENT_CTX;

        // Is current
        if (this.isHighlight) {
            this.label = {
                label: item.id,
                highlights: [[0, item.id.length]],
            } as vscode.TreeItemLabel;
        }

        // Is active
        const isActive =
            this.item.status === EnvStatus.active ||
            this.item.status === EnvStatus.progess;
        const fileName = isActive ? 'circle-filled.svg' : 'circle-outline.svg';
        if (isActive) {
            this.contextValue += '.active';
        }

        //item.status
        this.iconPath = {
            light: vscode.Uri.parse(
                this.context.asAbsolutePath(
                    path.join('resources', 'light', `${fileName}`),
                ),
            ),
            dark: vscode.Uri.parse(
                this.context.asAbsolutePath(
                    path.join('resources', 'dark', `${fileName}`),
                ),
            ),
        };
        this.description = this.item.type;
        this.tooltip =
            `State: ${this.item.status}\n` +
            `Machine: ${this.item.machine}\n` +
            `Type: ${this.item.type}\n` +
            `Created: ${this.item.created.toLocaleDateString()}\n` +
            `Updated: ${this.item.updated.toLocaleDateString()}`;
    }
}

export class EnvsProvider extends ProviderBase<PshEnvironmentItem> {
    getChildren(
        element?: PshEnvironmentItem,
    ): vscode.ProviderResult<PshEnvironmentItem[]> {
        console.debug(`Run ${URI_NODE_ENVIRONMENT} provider load`);

        if (!this.workspaceRoot) {
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
        vscode.commands.executeCommand(URI_NODE_APPLICATION_REFRESH);
        vscode.commands.executeCommand(URI_NODE_RELATION_REFRESH);
    }
}
