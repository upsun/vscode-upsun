'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";


const CLI_CMD = 'environment:activate';
export class ActivateCommand extends PshContextCommand {

    prepare(): string {
        return `${CLI_CMD} ${this.context}`;
    }

    process(param: any): any {
        vscode.window.showInformationMessage(`Activated ${this.context.environment}`);
    }

}
