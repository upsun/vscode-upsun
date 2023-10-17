'use strict';

import * as vscode from 'vscode';
import { PshContext, PshContextCommand } from "../base";

const LOGS_LINES = 100;

const CLI_CMD = 'environment:logs';
export class LogsCommand extends PshContextCommand {

    app: string|null;

    constructor(context: PshContext, app: string|null = null) {
        super(context);
        this.app = app;
    }

    displayMessage(): string {
        return `Display logs of ${this.context.environment}`;
    }

    prepare(): string {
        return '';
    }

    process(param: any): any {
        const title = `psh - log : ${this.context.environment} > ${this.app}`;
        let term = vscode.window.terminals.find( (x) => {
            return x.name === title;
        });

        if (!term) {
            const pshBin = vscode.workspace.getConfiguration().get('psh-cli.binaryPath');
            let cmd = `${pshBin} ${CLI_CMD} --lines 100 --tail ${this.context}`;

            if (this.app) {
                cmd += ` -A ${this.app}`;
            }

            term = vscode.window.createTerminal(title);
            term.sendText(`${cmd} ; exit > /dev/null`);
        }
        term.show();
    }

    isCli(): boolean {
        return false;
    }
}
