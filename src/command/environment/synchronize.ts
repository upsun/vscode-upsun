'use strict';

import * as vscode from 'vscode';
import { PshContextCommand } from "../base";


const CLI_CMD = 'environment:synchronize';
export class SynchronizeCommand extends PshContextCommand {

    prepare(): string {
        return `${CLI_CMD} data ${this.context}`;
    }

    process(param: any): any {
        throw new Error('Method not implemented.');
    }

}
