
import * as vscode from 'vscode';

export abstract class ProviderBase<T> implements vscode.TreeDataProvider<T> {

    private _onDidChangeTreeData: vscode.EventEmitter<T | undefined | null | void> = new vscode.EventEmitter<T | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<void | T | T[] | null | undefined> = this._onDidChangeTreeData.event;

    constructor(
        protected readonly workspaceRoot: string|undefined,
        protected readonly vscontext: vscode.ExtensionContext) { }

    getTreeItem(element: T): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element as vscode.TreeItem | Thenable<vscode.TreeItem>;
    }

    getChildren(element?: T): vscode.ProviderResult<T[]> {
        throw new Error('Method not implemented.');
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}
