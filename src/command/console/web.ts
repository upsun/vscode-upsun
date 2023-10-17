'use strict';

import { WebBrowser } from "../../utils/webbrowser";
import { PshContextCommand } from "../base";

const CLI_CMD = 'web';
export class WebCommand extends PshContextCommand {

    displayMessage(): string {
        return `Open Console of ${this.context.projectId}`;
    }

    prepare(): string {
        return `${CLI_CMD} --pipe ${this.context}`;
    }

    convert(raw: string) {
        return raw.replace(/\n$/, "");  // Remove last \n (only)
    }

    async process(param: any): Promise<any> {
        WebBrowser.open(param);
    }
}
