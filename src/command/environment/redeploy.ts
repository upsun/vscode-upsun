'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from '../base';

const CLI_CMD = 'environment:redeploy';
export class RedeployCommand extends PshContextCommand {
    displayMessage(): string {
        return `Redeploying environment ${this.context.environment}`;
    }

    prepare(): string {
        return `${CLI_CMD} -y ${this.context}`;
    }

    toArgArray(): string[] {
        return [CLI_CMD, '-y', ...this.context.allArgArray()];
    }

    process(param: any): any {
        vscode.window.showInformationMessage(
            `Environment ${this.context.environment} redeployed.`,
        );
    }
}
