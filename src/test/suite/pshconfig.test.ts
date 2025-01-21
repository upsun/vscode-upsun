import { assert } from 'chai';
import * as path from 'path';
import { ConfigBase, ConfigFactory } from '../../pshconfig';

const testPathPsh = path.resolve(
    __dirname,
    '../../../src/test/fixtures/fake-upsun/',
);
const projectId = 'erwlgagf6enrq';

suite('PshConfig Test Suite', () => {
    let config: ConfigBase;

    setup(() => {
        config = ConfigFactory.createConfig(testPathPsh);
    });

    test('PshConfig.pshProjectId', () => {
        assert.equal(config.projectId, projectId);
    });
});
