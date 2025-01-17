'use strict';

import * as path from 'path';
import * as fs from 'fs';
import { load } from 'js-yaml';

const PSH_FOLDER = 'platform';
const UPS_FOLDER = 'upsun';
const LOCAL_PATH = 'local/project.yaml';

function getPrivatePath(folder: string): string {
    return `.${folder}`;
}

/**
 * Configuration factory.
 */
export abstract class ConfigFactory {
    static createConfig(root: string): ConfigBase {
        let result = null;

        if (fs.existsSync(path.join(root, getPrivatePath(PSH_FOLDER)))) {
            result = new PshConfig(root);
        } else if (fs.existsSync(path.join(root, getPrivatePath(UPS_FOLDER)))) {
            result = new UpsConfig(root);
        }

        return result as ConfigBase;
    }
}

/**
 * Common configuration.
 */
export abstract class ConfigBase {
    readonly folder!: string;
    readonly projectId!: string;
    readonly local!: unknown;

    constructor(
        private readonly root: string,
        private readonly cliProvider: string,
    ) {
        this.folder = path.join(this.root, getPrivatePath(this.cliProvider));
        console.debug(`Config Project Folder : ${this.folder}`);

        this.local = load(
            fs.readFileSync(path.join(this.folder, LOCAL_PATH), 'utf8'),
        );

        this.projectId = (this.local as any).id.toString();
        console.debug(`Config Project ID : ${this.projectId}`);
    }
}

/**
 * Platform.sh configuration.
 */
class PshConfig extends ConfigBase {
    constructor(root: string) {
        super(root, PSH_FOLDER);
    }
}

/**
 * Upsun configuration.
 */
export class UpsConfig extends ConfigBase {
    constructor(root: string) {
        super(root, UPS_FOLDER);
    }
}
