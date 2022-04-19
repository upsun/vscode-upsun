import { assert } from 'chai';
import { PshContext } from '../../../command/base';

const prj = 'projectIDValue';
const env = 'environmentValue';

suite('PshContext Test Suite', () => {

    test('PshContext.projectId', () => {
        const ctx = new PshContext(prj, null);

        assert.strictEqual(ctx.projectId, prj);
        assert.strictEqual(ctx.toString(), ` -p ${prj}`);
    });

    test('PshContext.environment', () => {
        const ctx = new PshContext(null, env);

        assert.strictEqual(ctx.environment, env);
        assert.strictEqual(ctx.toString(), ` -e ${env}`);
    });

    test('PshContext.projectIdAndEnvironment', () => {
        const ctx = new PshContext(prj, env);

        assert.strictEqual(ctx.projectId, prj);
        assert.strictEqual(ctx.environment, env);
        assert.strictEqual(ctx.toString(), ` -p ${prj} -e ${env}`);
    });
});
