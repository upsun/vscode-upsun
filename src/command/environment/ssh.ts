'use strict';

import * as vscode from 'vscode';
import { PshContext, PshContextCommand } from '../base';
import { KEY_CLI_PATH } from '../../constants/extension';
import { PshStorage } from '../../pshstore';

const CLI_CMD = 'environment:ssh';
export class SshCommand extends PshContextCommand {
    app: string | null;

    constructor(context: PshContext, app: string | null = null) {
        super(context);
        this.app = app;
    }

    displayMessage(): string {
        return `Opening SSH tunnel on ${this.context.environment} - ${this.app}`;
    }

    prepare(): string {
        return '';
    }

    async process(param: any): Promise<any> {
        const title = `Upsun - ssh : ${this.context.environment} > ${this.app}`;
        let term = vscode.window.terminals.find((x) => {
            return x.name === title;
        });

        if (!term) {
            const pshBin = vscode.workspace
                .getConfiguration()
                .get(KEY_CLI_PATH);
            let cmd = `${pshBin} ${CLI_CMD} ${this.context}`;

            if (this.app) {
                cmd += ` -A ${this.app}`;
            }

            // TODO refactor this !!
            const token =
                (await new PshStorage(this.context.vscontext!).getToken()) ||
                '';
            const options: vscode.TerminalOptions = {
                name: title,
                message: 'Be carrefull!',
                // iconPath
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

        return 'SSH tunnel opened';
    }

    isCli(): boolean {
        return false;
    }
}
