'use strict';

import * as vscode from 'vscode';

export class PshContext {

    constructor(
        public readonly projectId: string|null|undefined,
        public readonly environment: string|null|undefined,
        public readonly vscontext: vscode.ExtensionContext|null|undefined) { }

    toString(): string {
        return this.allParameter();
    }

    allParameter(): string {
        return this.projectParameter() + this.environmentParameter();
    }

    projectParameter(): string {
        let result = '';
        if (this.projectId) {
            result += ` -p ${this.projectId}`;
        }
        return result;
    }

    environmentParameter(): string {
        let result = '';
        if (this.environment) {
            result += ` -e ${this.environment}`;
        }
        return result;
    }

}

export abstract class PshCommand {

    abstract prepare(): string;

    abstract process(param: any): any;

    // Hack because https://platformsh.slack.com/archives/C0JE8AE13/p1639572899034600
    convert(raw: string): any {
        return raw;
    }

    isCli(): boolean {
        return true;
    }

    public toString = () : string => {
        return this.prepare();
    };

    abstract displayMessage(): string;
}

export interface PshSelector {}

export abstract class PshContextCommand extends PshCommand {

    constructor(
        public readonly context: PshContext) {
        super();
    }
}

export abstract class PshSelectorContextCommand extends PshContextCommand implements PshSelector {

    constructor(context: PshContext,
        public readonly isSelector: boolean = false) {
        super(context);
    }
}
