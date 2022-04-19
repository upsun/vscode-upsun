import { assert } from 'chai';
import { Tools } from '../../project';

suite('Tools Test Suite', () => {

    test('Tools.makeContext', () => {
        const ctx = Tools.makeContext();

        assert.isDefined(ctx);
        assert.isDefined(ctx.projectId);
        assert.isDefined(ctx.environment);
    });
});
