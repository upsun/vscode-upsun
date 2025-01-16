'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import { PshContextCommand } from './command/base';
import { PshStorage } from './pshstore';
import { KEY_CLI_PATH } from './constants/extension';

const exec = util.promisify(require('child_process').exec);
const PSH_CLI_HOME = 'psh-vsc';

export class PshCli {

    tmpDir: string;

    constructor() {
        // try {
            this.tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), PSH_CLI_HOME));
            console.debug(`Folder : ${this.tmpDir}`);
        // }
        // catch (e) {
        //     console.error(`An error has occurred Error: ${e}`);
        // }
    }

    public async executeObj(command: PshContextCommand) : Promise<any> {
        let raw: any = null;
        const token = await (new PshStorage(command.context.vscontext!)).getToken() || '';

        if (command.isCli()) {
            await vscode.window.withProgress({
                cancellable: false,
                location: vscode.ProgressLocation.Notification,
                title: 'Upsun',
                } as vscode.ProgressOptions, async (progress) => {
                    progress.report({
                        message: command.displayMessage(),
                    });
                    raw = await this.executeStr(`${command}`, token);
                });
        }
        const param = command.convert(raw);
        const result = await command.process(param);

        return result;
    }

    public async executeStr(command: string, pshKey: string = '') : Promise<string> {
        let result = 'no command run';
        const pshBin = vscode.workspace.getConfiguration().get(KEY_CLI_PATH);

        const options = {
            env: {
                ...process.env,
                'UPSUN_CLI_TOKEN': pshKey,
                'UPSUN_CLI_HOME': this.tmpDir,
                'PLATFORMSH_CLI_TOKEN': pshKey,
                'PLATFORMSH_CLI_HOME': this.tmpDir
            }
        };

        const fullCmd = `${pshBin} ${command}`;
        console.debug(`CLI Command : ${fullCmd}`);
        const {err, stdout, stderr} = await exec(fullCmd, options);

        if (err) {
            console.error('error: ' + err);
            console.error('stderr:\n' + stderr);
            result = stderr;
        } else {
            console.debug('CLI stdout:\n' + stdout);
            result = stdout;
        }

        return result;
    }

    public dispose(): void {
        try {
            if (this.tmpDir) {
                fs.rmSync(this.tmpDir, { recursive: true });
            }
        }
        catch (e) {
            console.error(`CLI An error has occurred while removing the temp folder at ${this.tmpDir}. Please remove it manually. Error: ${e}`);
        }
    }
}
