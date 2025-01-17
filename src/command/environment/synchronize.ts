'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from '../base';

const CLI_CMD = 'environment:synchronize';
export class SynchronizeCommand extends PshContextCommand {
    displayMessage(): string {
        return `Synchronize environment ${this.context.environment}`;
    }

    prepare(): string {
        return `${CLI_CMD} data ${this.context}`;
    }

    process(param: any): any {
        vscode.window.showInformationMessage(
            `Environment ${this.context.environment} synchronized.`,
        );
    }
}
