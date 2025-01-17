'use strict';

import * as vscode from 'vscode';
import { PshContext, PshContextCommand } from '../base';
import { KEY_CLI_PATH } from '../../constants/extension';
import { PshStorage } from '../../pshstore';

const LOGS_LINES = 100;

const CLI_CMD = 'environment:logs';
export class LogsCommand extends PshContextCommand {
    app: string | null;

    constructor(context: PshContext, app: string | null = null) {
        super(context);
        this.app = app;
    }

    displayMessage(): string {
        return `Display logs of ${this.context.environment}`;
    }

    prepare(): string {
        return '';
    }

    async process(param: any): Promise<any> {
        const title = `Upsun - log : ${this.context.environment} > ${this.app}`;
        let term = vscode.window.terminals.find((x) => {
            return x.name === title;
        });

        if (!term) {
            const pshBin = vscode.workspace
                .getConfiguration()
                .get(KEY_CLI_PATH);
            let cmd = `${pshBin} ${CLI_CMD} --lines 100 --tail ${this.context}`;

            if (this.app) {
                cmd += ` -A ${this.app}`;
            }

            const token =
                (await new PshStorage(this.context.vscontext!).getToken()) ||
                '';
            const options: vscode.TerminalOptions = {
                name: title,
                env: {
                    ...process.env,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    UPSUN_CLI_TOKEN: token,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    PLATFORMSH_CLI_TOKEN: token,
                },
            };

            term = vscode.window.createTerminal(options);
            term.sendText(`${cmd} ; exit > /dev/null`);
        }
        term.show();
    }

    isCli(): boolean {
        return false;
    }
}
