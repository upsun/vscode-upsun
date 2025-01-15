'use strict';

import * as path from 'path';
import * as fs  from 'fs';
import { load } from "js-yaml";

const PSH_FOLDER = '.platform';
const PSH_LOCAL = 'local/project.yaml';
const PSH_ROUTES = 'routes.yaml';
const PSH_SERVICES = 'services.yaml';

const UPS_FOLDER = '.upsun';
const UPS_CONFIG = 'config.yaml';
const UPS_LOCAL = PSH_LOCAL;


export abstract class ConfigFactory{

    static createConfig(root: string): ConfigBase {
        let result = null;

        if (fs.existsSync(path.join(root, PSH_FOLDER))) {
            result = new PshConfig(root);
        }

        else if (fs.existsSync(path.join(root, UPS_FOLDER))) {
            result = new UpsConfig(root);
        }

        return (result as ConfigBase);
    }

}

export abstract class ConfigBase {
    folder!: string;
    projectId!: string;
    local!: unknown;
    host!: string;
    cliProvider!: string;

    loadLocal() : void {
        this.projectId = (this.local as any).id.toString();
        console.debug(`Project ID : ${this.projectId}`);

        this.host = (this.local as any).host;
        console.debug(`Project Host : ${this.host}`);
    }
}

export class PshConfig extends ConfigBase {
    readonly pshRoutes: any;
    readonly pshServices: any;

    constructor(root: string) {
        super();
        this.cliProvider = 'platform';

        this.folder = path.join(root, PSH_FOLDER);
        console.debug(`Project Folder : ${this.folder}`);

        this.local = load(fs.readFileSync(path.join(this.folder, PSH_LOCAL), "utf8"));
        this.loadLocal();

        this.pshRoutes = load(fs.readFileSync(path.join(this.folder, PSH_ROUTES), "utf8"));
        this.pshServices = load(fs.readFileSync(path.join(this.folder, PSH_SERVICES), "utf8"));
    }
}

export class UpsConfig extends ConfigBase {

    constructor(root: string) {
        super();
        this.cliProvider = 'upsun';
        
        this.folder = path.join(root, UPS_FOLDER);
        console.debug(`Project Folder : ${this.folder}`);

        this.local = load(fs.readFileSync(path.join(this.folder, UPS_LOCAL), "utf8"));
        this.loadLocal();
    }

}
