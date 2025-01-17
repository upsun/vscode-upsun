'use strict';

import * as vscode from 'vscode';

/**
 * Extend/Aggregate VSCode Context with PSH specific context
 */
export class PshContext {
    constructor(
        public readonly projectId: string | null | undefined,
        public readonly environment: string | null | undefined,
        public readonly vscontext: vscode.ExtensionContext | null | undefined,
    ) {}

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

/**
 * Generic Base of Command
 *
 * Life cycle :
 * - check isCli()
 * - call displayMessage() (in progress message only)
 * - call prepare()
 * - execute CLI commande (generic call)
 * - call convert() to normalize data
 * - call process() to apply next step of workflow
 * - (can be return result for sub-call)
 */
export abstract class PshCommand {
    /**
     * Prepare CLi command and parameters.
     */
    abstract prepare(): string;

    /**
     * Execute process of command.
     * @param param to submit to command
     */
    abstract process(param: any): any;

    // Hack because https://platformsh.slack.com/archives/C0JE8AE13/p1639572899034600
    /**
     * Normalize data.
     * @param raw result from CLI
     * @returns Normalized result
     */
    convert(raw: string): any {
        return raw;
    }

    /**
     * Tag the command
     * @returns Tag command is for CLI (platform/upsun/ibexa/symfony)
     */
    isCli(): boolean {
        //TODO switch to enum (special case)
        return true;
    }

    public toString = (): string => {
        return this.prepare();
    };

    /**
     * Display notify (on result)
     */
    abstract displayMessage(): string;
}

/**
 * PSH Base of Command
 */
export abstract class PshContextCommand extends PshCommand {
    constructor(public readonly context: PshContext) {
        super();
    }
}

export interface PshSelector {}
export abstract class PshSelectorContextCommand
    extends PshContextCommand
    implements PshSelector
{
    constructor(
        context: PshContext,
        public readonly isSelector: boolean = false,
    ) {
        super(context);
    }
}
