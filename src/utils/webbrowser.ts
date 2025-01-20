'use strict';

import { getBrowserCommand } from './platform';
const { exec } = require('child_process');

export abstract class WebBrowser {
    static open(url: string) {
        let cmd: string = getBrowserCommand();

        const icmd = `${cmd} ${url}`;
        exec(
            icmd,
            (
                error: Error,
                stdout: string | Buffer,
                stderr: string | Buffer,
            ) => {
                if (stdout) {
                    console.debug(stdout);
                }
                if (error) {
                    console.error(stderr);
                }
            },
        );
    }
}
