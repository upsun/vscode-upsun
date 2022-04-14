import * as assert from 'assert';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { PshConfig } from '../../pshconfig';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

    test('PshConfig.load', () => {
        const testPath = path.resolve(__dirname, '../fixtures/fake-project1/');
        const config = new PshConfig(testPath);

        assert.strictEqual(config.pshProjectId, '8888888888888');
    });
});
