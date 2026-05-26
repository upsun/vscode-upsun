import { assert } from 'chai';
import {
    Architecture,
    getArchitecture,
    getOSType,
    OSType,
    shellEscape,
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

    test('Platform.getArchitecture.empty', () => {
        assert.strictEqual(getArchitecture(''), Architecture.unknown);
    });

    test('Platform.getArchitecture.undefine', () => {
        // Base on current curring machine
        assert.strictEqual(getArchitecture('undefined'), Architecture.x64);
    });
});

suite('Platform.shellEscape Test Suite', () => {
    test('shellEscape.normal_branch', () => {
        assert.strictEqual(shellEscape('main'), "'main'");
    });

    test('shellEscape.hyphen_branch', () => {
        assert.strictEqual(shellEscape('feature-branch-1'), "'feature-branch-1'");
    });

    test('shellEscape.slash_hierarchical', () => {
        assert.strictEqual(shellEscape('feature/foo'), "'feature/foo'");
    });

    test('shellEscape.injection_dollar_paren', () => {
        // PoC payload from report #3654942
        assert.strictEqual(
            shellEscape('main$(env>/tmp/upsun_full_env)'),
            "'main$(env>/tmp/upsun_full_env)'"
        );
    });

    test('shellEscape.injection_ifs', () => {
        // ${IFS} substitution trick (replaces space in branch names)
        assert.strictEqual(
            shellEscape('main${IFS}foo'),
            "'main${IFS}foo'"
        );
    });

    test('shellEscape.injection_semicolon_pipe', () => {
        assert.strictEqual(
            shellEscape('main;curl|sh'),
            "'main;curl|sh'"
        );
    });

    test('shellEscape.injection_backtick', () => {
        assert.strictEqual(
            shellEscape('main`id`'),
            "'main`id`'"
        );
    });

    test('shellEscape.single_quote_in_value', () => {
        // Embedded single quote must be properly escaped
        assert.strictEqual(shellEscape("feat'evil"), "'feat'\\''evil'");
    });

    test('shellEscape.full_poc_payload', () => {
        const payload =
            'main$(env>/tmp/upsun_full_env;printf${IFS}%s${IFS}"$UPSUN_CLI_TOKEN">/tmp/upsun_token_leak)';
        const escaped = shellEscape(payload);
        // Must be wrapped in single quotes — shell treats content as literal
        assert.match(escaped, /^'.*'$/);
        // Must not contain unquoted shell expansion triggers
        assert.notMatch(escaped, /^[^']*\$\(/);
        assert.notMatch(escaped, /^[^']*`/);
    });
});
