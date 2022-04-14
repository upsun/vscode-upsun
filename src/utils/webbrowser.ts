'use strict';

import { getOSType, OSType } from "./platform";
const { exec } = require('child_process');

export abstract class WebBrowser{

    static open(url: string) {
        let cmd: string;
        switch (getOSType()) {
            case OSType.Windows:
                cmd = 'start'; break;
            case OSType.OSX:
                cmd = 'open'; break;
            case OSType.Linux:
            default: 
                cmd = 'xdg-open'; break;
        }

        const icmd = `${cmd} ${url}`;
        exec(icmd, (error: Error, stdout: string|Buffer, stderr: string|Buffer) => {
            console.debug(stdout);
            if (error) {
                console.debug(stderr);
            }
        });
    }
}
