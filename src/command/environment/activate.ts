'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from '../base';

const CLI_CMD = 'environment:activate';
export class ActivateCommand extends PshContextCommand {
    displayMessage(): string {
        return `Activating environment ${this.context.environment}`;
    }

    prepare(): string {
        return `${CLI_CMD} -y ${this.context}`;
    }

    process(param: any): any {
        vscode.window.showInformationMessage(
            `Environment ${this.context.environment} activated.`,
        );
    }
}
