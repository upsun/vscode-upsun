import { assert } from 'chai';
import { GitManager } from '../../gitmanager';

suite('GitManager Test Suite', () => {

    test('GitManager.currentBranch', () => {
        const gitManager = new GitManager();
        assert.isDefined(gitManager);

        const branch = gitManager.currentBranch();
        assert.isDefined(branch);
    });
});
