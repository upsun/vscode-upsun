'use strict';

import * as vscode from 'vscode';
import { PshContext, PshContextCommand } from "../base";


const CLI_CMD = 'environment:ssh';
export class SshCommand extends PshContextCommand {

    app: string|null;

    constructor(context: PshContext, app: string|null = null) {
        super(context);
        this.app = app;
    }

    prepare(): string {
        return '';
    }

    async process(param: any): Promise<any> {
        const title = `psh - ssh : ${this.context.environment} > ${this.app}`;
        let term = vscode.window.terminals.find( (x) => {
            return x.name === title;
        });

        if (!term) {
            const pshBin = vscode.workspace.getConfiguration().get('psh-cli.binaryPath');
            let cmd = `${pshBin} ${CLI_CMD} ${this.context}`;

            if (this.app) {
                cmd += ` -A ${this.app}`;
            }

            term = vscode.window.createTerminal(title);
            term.sendText(`${cmd} ; exit > /dev/null`);
        }
        term.show();

        return 'SSH opened';
    }

    isCli(): boolean {
        return false;
    }
}
