'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from '../base';

const CLI_CMD = 'environment:redeploy';
export class RedeployCommand extends PshContextCommand {
    displayMessage(): string {
        return `Redeploy environment ${this.context.environment}`;
    }

    prepare(): string {
        return `${CLI_CMD} -y ${this.context}`;
    }

    process(param: any): any {
        vscode.window.showInformationMessage(
            `Environment ${this.context.environment} redeployed.`,
        );
    }
}
