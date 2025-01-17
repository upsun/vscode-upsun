import { assert } from 'chai';
import { PshContext } from '../../../command/base';

const prj = 'projectIDValue';
const env = 'environmentValue';

suite('PshContext Test Suite', () => {
    test('PshContext.projectId', () => {
        const ctx = new PshContext(prj, null, null);
        const expected = ` -p ${prj}`;

        assert.strictEqual(ctx.projectId, prj);
        assert.strictEqual(ctx.projectParameter(), expected);
        assert.strictEqual(ctx.allParameter(), expected);
        assert.strictEqual(ctx.toString(), expected);
    });

    test('PshContext.environment', () => {
        const ctx = new PshContext(null, env, null);
        const expected = ` -e ${env}`;

        assert.strictEqual(ctx.environment, env);
        assert.strictEqual(ctx.environmentParameter(), expected);
        assert.strictEqual(ctx.allParameter(), expected);
        assert.strictEqual(ctx.toString(), expected);
    });

    test('PshContext.projectIdAndEnvironment', () => {
        const ctx = new PshContext(prj, env, null);
        const expected = ` -p ${prj} -e ${env}`;

        assert.strictEqual(ctx.projectId, prj);
        assert.strictEqual(ctx.environment, env);
        assert.strictEqual(ctx.projectParameter(), ` -p ${prj}`);
        assert.strictEqual(ctx.environmentParameter(), ` -e ${env}`);
        assert.strictEqual(ctx.allParameter(), expected);
        assert.strictEqual(ctx.toString(), expected);
    });
});
