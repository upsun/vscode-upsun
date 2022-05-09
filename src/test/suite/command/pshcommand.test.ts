import { assert } from 'chai';
import { PshContext, PshContextCommand } from '../../../command/base';


class TestPshContextCommand extends PshContextCommand {
    prepare(): string {
        throw new Error('Method not implemented.');
    }
    process(param: any): void {
        throw new Error('Method not implemented.');
    }
}

suite('PshCommand Test Suite', () => {

    test('PshContextCommand.PshContext', () => {
        const ctx = new PshContext(null, null, null);
        const cmd = new TestPshContextCommand(ctx);

        assert.strictEqual(cmd.context, ctx, 'Context is not stored in PshCommandContext !');
    });

});
