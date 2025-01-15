import { assert } from 'chai';
import * as vscode from 'vscode';
import { activate } from '../../extension';

import * as path from "path";
export const rootPath = path.resolve(__dirname, "../");
const packageJSON: any = require(path.resolve(rootPath, "package.json"));
export const extensionId = `${packageJSON.publisher}.${packageJSON.name}`;

suite('Extension Test Suite', () => {

    test('Extension.activate', async () => {
        const ext = vscode.extensions.getExtension(extensionId);
        let gitExtension: any|undefined;

        if (ext) {
            if (!ext.isActive) {
                ext.activate().then( () => {
                    new Promise(f => setTimeout(f, 1000));
                    assert.isTrue(ext.isActive);
                });
            }

            assert.isTrue(ext.isActive);
        } else {
            assert.fail();
        }
    });
});
