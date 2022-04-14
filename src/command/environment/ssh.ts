'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";


const CLI_CMD = 'environment:ssh';
export class SshCommand extends PshContextCommand {
    
    prepare(): string {
        return ``;
    }

    process(param: any): void {
        const pshBin = vscode.workspace.getConfiguration().get('psh-cli.binaryPath');
        const term = vscode.window.createTerminal(`Platform.sh [${this.context.environment}]`);
        term.sendText(`${pshBin} ${CLI_CMD} ${this.context}`);
        term.show();
    }
    
    convert(raw: string) {
        return super.convert(raw);
    }

    isCli(): boolean {
        return false;
    }
}
