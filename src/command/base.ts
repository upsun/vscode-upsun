'use strict';

export class PshContext {
    projectId: string|null|undefined;
    environment: string|null|undefined;

    constructor(projectId: string|null|undefined, environment: string|null|undefined) {
        this.projectId = projectId;
        this.environment = environment;
    }

    toString(): string {
        let result = '';

        if (this.projectId) {
            result += ` -p ${this.projectId}`;
        }

        if (this.environment) {
            result += ` -e ${this.environment}`;
        }

        return result;
    }
}

export abstract class PshCommand {

    abstract prepare(): string;

    abstract process(param: any): void;

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
}

export abstract class PshContextCommand extends PshCommand {
    context: PshContext;

    constructor(context: PshContext) {
        super();
        this.context = context;
    }
}
