import { assert } from 'chai';
import { ExtensionContext, extensions } from 'vscode';
import { PshStorage } from '../../pshstore';

import * as path from 'path';
export const rootPath = path.resolve(__dirname, '../');
const packageJSON: any = require(path.resolve(rootPath, 'package.json'));
export const extensionId = `${packageJSON.publisher}.${packageJSON.name}`;

suite('PshStore Test Suite', () => {
    const valueDefaultApp = 'value_deafult_app';
    let extensionContext: ExtensionContext;

    suiteSetup('PshStore suite setup', async () => {
        await extensions.getExtension(extensionId)?.activate();
        extensionContext = (global as any).testExtensionContext;
    });

    test('PshStore.reset', async () => {
        const store = new PshStorage(extensionContext);
        store.resetDefaultApp();
        assert.isNull(store.getDefaultApp());
    });

    test('PshStore.setget', async () => {
        const store = new PshStorage(extensionContext);
        store.setDefaultApp(valueDefaultApp);
        assert.equal(store.getDefaultApp(), valueDefaultApp);
    });
});
