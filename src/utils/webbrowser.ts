'use strict';

import { getOSType, OSType } from "./platform";
const { exec } = require('child_process');

export abstract class WebBrowser{

    static open(url: string) {
        let cmd: string;
        switch (getOSType()) {
            case OSType.windows:
                cmd = 'start'; break;
            case OSType.osx:
                cmd = 'open'; break;
            case OSType.linux:
            default:
                cmd = 'xdg-open'; break;
        }

        const icmd = `${cmd} ${url}`;
        exec(icmd, (error: Error, stdout: string|Buffer, stderr: string|Buffer) => {
            if (stdout) {
                console.debug(stdout);
            }
            if (error) {
                console.error(stderr);
            }
        });
    }
}
