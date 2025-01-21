import { assert } from 'chai';
import {
    Architecture,
    getArchitecture,
    getBrowserCommand,
    getGithubFileTag,
    getOSType,
    OSType,
} from '../../../utils/platform';

suite('Platform Test Suite', () => {
    test('Platform.getOSType.Linux', () => {
        assert.strictEqual(getOSType('linux'), OSType.linux);
    });

    test('Platform.getOSType.OSX', () => {
        assert.strictEqual(getOSType('darwin'), OSType.osx);
    });

    test('Platform.getOSType.Win', () => {
        assert.strictEqual(getOSType('win'), OSType.windows);
    });

    test('Platform.getOSType.Other', () => {
        assert.strictEqual(getOSType('foo'), OSType.unknown);
    });

    test('Platform.getArchitecture.x86', () => {
        assert.strictEqual(getArchitecture('x86'), Architecture.x86);
    });

    test('Platform.getArchitecture.x64', () => {
        assert.strictEqual(getArchitecture('x64'), Architecture.x64);
    });

    test('Platform.getArchitecture.arm', () => {
        assert.strictEqual(getArchitecture('arm'), Architecture.arm);
    });

    test('Platform.getArchitecture.arm64', () => {
        assert.strictEqual(getArchitecture('arm64'), Architecture.arm64);
    });

    test('Platform.getArchitecture.empty', () => {
        assert.strictEqual(getArchitecture(''), Architecture.unknown);
    });

    test('Platform.getArchitecture.undefine', () => {
        // Base on current curring machine
        assert.strictEqual(getArchitecture('undefined'), Architecture.x64);
    });

    test('Platform.getBrowserCommand.Linux', () => {
        assert.strictEqual(getBrowserCommand('linux'), 'xdg-open');
    });

    test('Platform.getBrowserCommand.OSX', () => {
        assert.strictEqual(getBrowserCommand('darwin'), 'open');
    });

    test('Platform.getBrowserCommand.Win', () => {
        assert.strictEqual(getBrowserCommand('windows'), 'start');
    });

    test('Platform.getGithubFileTag.Linux_amd64', () => {
        const [cmd, item, dest] = getGithubFileTag('linux', 'x64');

        assert.strictEqual(cmd, 'tar -xvzf');
        assert.strictEqual(item, '-linux-amd64.tar.gz');
        assert.strictEqual(dest, '~/.upsun-cli/addons');
    });

    test('Platform.getGithubFileTag.Linux_arm64', () => {
        const [cmd, item, dest] = getGithubFileTag('linux', 'arm64');

        assert.strictEqual(cmd, 'tar -xvzf');
        assert.strictEqual(item, '-linux-arm64.tar.gz');
        assert.strictEqual(dest, '~/.upsun-cli/addons');
    });

    test('Platform.getGithubFileTag.OSX_arm64', () => {
        const [cmd, item, dest] = getGithubFileTag('darwin', 'arm64');

        assert.strictEqual(cmd, 'tar -xvzf');
        assert.strictEqual(item, '-darwin-arm64.tar.gz');
        assert.strictEqual(dest, '~/.upsun-cli/addons');
    });

    test('Platform.getGithubFileTag.Win_amd64', () => {
        const [cmd, item, dest] = getGithubFileTag('win', 'x64');

        assert.strictEqual(cmd, 'powershell Expand-Archive -Path');
        assert.strictEqual(item, '-windows-amd64.zip');
        assert.strictEqual(dest, '%USER%/.upsun-cli/addons');
    });

    test('Platform.getGithubFileTag.Win_x86', () => {
        try {
            getGithubFileTag('win', 'x86');

            assert.fail();
        } catch (e) {
            assert.strictEqual(1, 1);
        }
    });

    test('Platform.getGithubFileTag.Win_arm', () => {
        try {
            getGithubFileTag('win', 'arm');

            assert.fail();
        } catch (e) {
            assert.strictEqual(1, 1);
        }
    });
});
