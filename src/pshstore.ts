'use strict';

import * as vscode from 'vscode';

const STORAGE_DEFAULT_APP = 'default_application';

export class PshStorage {

    constructor(private readonly context: vscode.ExtensionContext) { }

    getDefaultApp(): string | undefined {
        return this.context.workspaceState.get(STORAGE_DEFAULT_APP);
    }

    setDefaultApp(appName: string) {
        this.context.workspaceState.update(STORAGE_DEFAULT_APP, appName);
    }

    resetDefaultApp() {
        this.context.workspaceState.update(STORAGE_DEFAULT_APP, null);
    }
}
