'use strict';

import { execFile } from 'child_process';
import { getBrowserArgs } from './platform';

export abstract class WebBrowser {
    /**
     * Open a URL in the default browser.
     *
     * Only http/https URLs are accepted. Non-HTTP URLs are rejected to
     * prevent protocol injection (file://, javascript:, data:, …).
     * Uses execFile (shell:false) to prevent command injection via the URL.
     * Platform-specific binary selection is handled by getBrowserArgs().
     */
    static open(url: string) {
        if (!/^https?:\/\//i.test(url)) {
            console.error(`WebBrowser: refused to open non-HTTP URL: ${url}`);
            return;
        }

        const [bin, args] = getBrowserArgs(url);
        execFile(bin, args, (error, stdout, stderr) => {
            if (stdout) {
                console.debug(stdout);
            }
            if (error) {
                console.error(stderr);
            }
        });
    }
}
