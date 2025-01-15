'use strict';

import * as vscode from 'vscode';

const STORAGE_DEFAULT_APP = 'upsun-cli.application_selected';
const SECRET_TOKEN = 'upsun-cli.token';

export class PshStorage {
    private readonly secretStorage: vscode.SecretStorage;
    private readonly publicStorage: vscode.Memento;

    constructor(private readonly context: vscode.ExtensionContext) {
        this.secretStorage = this.context.secrets;
        this.publicStorage = this.context.workspaceState;
    }

    getDefaultApp(): string | undefined {
        return this.publicStorage.get(STORAGE_DEFAULT_APP);
    }

    setDefaultApp(appName: string) {
        this.publicStorage.update(STORAGE_DEFAULT_APP, appName);
    }

    resetDefaultApp() {
        this.publicStorage.update(STORAGE_DEFAULT_APP, null);
    }

    /**
     * Define Token into settings(boolean) and SecretStorage(value).
     *
     * Open InputBox to enter the token value.
     */
    async setToken() {
        const token: string = await vscode.window.showInputBox({
            password: true,
            title: "Upsun Token"
        }) ?? '';

        if (token !== '') {
            this.secretStorage.store(SECRET_TOKEN, token);
            vscode.workspace.getConfiguration().update(SECRET_TOKEN, true);
        }
    }

    /**
     * @returns The token value.
     */
    async getToken(): Promise<string | undefined> {
        return await this.secretStorage.get(SECRET_TOKEN);
    }
}
