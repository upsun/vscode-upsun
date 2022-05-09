'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";


const CLI_CMD = 'environment:redeploy';
export class RedeployCommand extends PshContextCommand {

    prepare(): string {
        return `${CLI_CMD} -y ${this.context}`;
    }

    process(param: any): any {
        throw new Error('Method not implemented.');
    }

}
