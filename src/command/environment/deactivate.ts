'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";


const CLI_CMD = 'environment:deactivate';
export class DeactivateCommand extends PshContextCommand {

    prepare(): string {
        return `${CLI_CMD} --no-delete-branch ${this.context}`;
    }

    process(param: any): any {
        vscode.window.showInformationMessage(`Desactivated ${this.context.environment}`);
    }

}
