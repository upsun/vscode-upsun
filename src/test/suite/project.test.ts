import { assert } from 'chai';
import { Tools } from '../../project';

suite('Tools Test Suite', () => {
    test('Tools.makeContext', () => {
        const ctx = Tools.makeContext(null);

        assert.isDefined(ctx);
        assert.isDefined(ctx.projectId);
        assert.isDefined(ctx.environment);
    });

    test('Tools.makeCliContext', () => {
        const [pshCli, ctx] = Tools.makeCliContext(null);

        assert.isDefined(pshCli);
        assert.isDefined(ctx);
        assert.isDefined(ctx.projectId);
        assert.isDefined(ctx.environment);

        pshCli.dispose();
    });
});
