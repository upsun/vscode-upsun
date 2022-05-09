import { assert } from 'chai';
import * as path from 'path';
import { PshConfig } from '../../pshconfig';

const testPath1 = path.resolve(__dirname, '../../../src/test/fixtures/fake-project1/');

suite('PshConfig Test Suite', () => {
    let config: PshConfig;

    setup(() => {
        config = new PshConfig(testPath1);
    });

    test('PshConfig.pshProjectId', () => {
        assert.equal(config.pshProjectId, '6q5ffgcj3ieeo');
    });

    test('PshConfig.pshHost', () => {
        assert.strictEqual(config.pshHost, 'eu-1.platform.sh');
    });

    test('PshConfig.pshRoutes', () => {
        assert.isDefined(config.pshRoutes);
    });

    test('PshConfig.pshServices', () => {
        assert.isDefined(config.pshServices);
    });
});
