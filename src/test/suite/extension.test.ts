import { assert } from 'chai';
import * as vscode from 'vscode';
import { activate } from '../../extension';

suite('Extension Test Suite', () => {

    test('Extension.activate', async () => {
        const ext = vscode.extensions.getExtension('platform.sh.psh-cli');
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
