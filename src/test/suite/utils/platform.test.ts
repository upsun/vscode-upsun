import { assert } from 'chai';
import { Architecture, getArchitecture, getOSType, OSType } from '../../../utils/platform';

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

    test('Platform.getArchitecture.empty', () => {
        assert.strictEqual(getArchitecture(''), Architecture.unknown);
    });

    test('Platform.getArchitecture.undefine', () => {
        // Base on current curring machine
        assert.strictEqual(getArchitecture('undefined'), Architecture.x64);
    });
});
