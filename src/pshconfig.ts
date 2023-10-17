'use strict';

import * as path from 'path';
import * as fs  from 'fs';
import { load } from "js-yaml";

const PSH_FOLDER = '.platform';
const PSH_LOCAL = 'local/project.yaml';
const PSH_ROUTES = 'routes.yaml';
const PSH_SERVICES = 'services.yaml';

export class PshConfig {
    readonly pshFolder: string;
    readonly pshProjectId: string;
    readonly pshHost: string;
    readonly pshRoutes: any;
    readonly pshServices: any;

    constructor(root: string) {
        this.pshFolder = path.join(root, PSH_FOLDER);
        console.debug(`Project Folder : ${this.pshFolder}`);

        this.pshRoutes = load(fs.readFileSync(path.join(this.pshFolder, PSH_ROUTES), "utf8"));
        this.pshServices = load(fs.readFileSync(path.join(this.pshFolder, PSH_SERVICES), "utf8"));
        const pshLocal = load(fs.readFileSync(path.join(this.pshFolder, PSH_LOCAL), "utf8"));

        this.pshProjectId = (pshLocal as any).id.toString();
        console.debug(`Project ID : ${this.pshProjectId}`);

        this.pshHost = (pshLocal as any).host;
        console.debug(`Project Host : ${this.pshHost}`);
    }
}
