'use strict';

// Base on https://github.com/microsoft/vscode-python/blob/main/src/client/common/utils/platform.ts

export enum Architecture {
    unknown = 0,
    arm = 1,
    arm64 = 2,
    x86 = -1,
    x64 = 12,
}
export enum OSType {
    unknown = 'Unknown',
    windows = 'Windows',
    osx = 'OSX',
    linux = 'Linux',
}

// Return the OS type for the given platform string.
export function getOSType(platform: string = process.platform): OSType {
    if (/^win/.test(platform)) {
        return OSType.windows;
    } else if (/^darwin/.test(platform)) {
        return OSType.osx;
    } else if (/^linux/.test(platform)) {
        return OSType.linux;
    } else {
        return OSType.unknown;
    }
}

const architectures: Record<string, Architecture> = {
    x86: Architecture.x86, // 32-bit
    x64: Architecture.x64, // 64-bit
    arm: Architecture.arm,
    arm64: Architecture.arm64,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '': Architecture.unknown,
};

/**
 * Identify the host's native architecture/bitness.
 */
export function getArchitecture(archIdx: string = process.arch): Architecture {
    const fromProc = architectures[archIdx];
    if (fromProc !== undefined) {
        return fromProc;
    }

    // Fallback
    const arch = require('arch');
    return architectures[arch()] || Architecture.unknown;
}

export function getBrowserCommand(): string {
    switch (getOSType()) {
        case OSType.windows:
            return 'start';
        case OSType.osx:
            return 'open';
        case OSType.linux:
        default:
            return 'xdg-open';
    }
}

/**
 * Returns [bin, args] ready for execFile() to open `url` in the
 * system default browser.  Encapsulates all platform differences so
 * callers never need to import OSType.
 *
 * On Windows, getBrowserCommand() returns 'start' which is a cmd.exe
 * built-in (not a standalone binary), so we route through cmd.exe /c.
 * On all other platforms the command returned by getBrowserCommand() is
 * a real executable that accepts the URL as its sole argument.
 */
export function getBrowserArgs(url: string): [string, string[]] {
    if (getOSType() === OSType.windows) {
        return ['cmd.exe', ['/c', getBrowserCommand(), '', url]];
    }
    return [getBrowserCommand(), [url]];
}

/**
 * Escapes a string for safe use as a single shell argument.
 *
 * Wraps the value in POSIX single quotes and escapes any embedded
 * single-quote characters, neutralising all shell metacharacters
 * including $, (, ), ;, &, |, ` and ${IFS} substitution tricks.
 *
 * Safe for any POSIX-compatible shell (bash, sh, zsh, …).
 * Must NOT be used for Windows cmd.exe or PowerShell.
 *
 * @param arg The raw string to escape.
 * @returns The shell-safe, single-quoted argument.
 */
export function shellEscape(arg: string): string {
    return `'${arg.replace(/'/g, "'\\''")}'`;
}

export function getGithubFileTag(): [string, string, string] {
    let os: string;
    let arch: string;
    let ext: string = 'tar.gz';
    let cmd: string = 'tar -xvzf';
    let dest: string = '~/.upsun-cli/addons';

    switch (getOSType()) {
        case OSType.windows:
            os = OSType.windows.toLowerCase();
            cmd = 'powershell Expand-Archive -Path '; //TODO need to test
            ext = 'zip';
            dest = '%USERQ%/.upsun-cli/addons';
            break;
        case OSType.osx:
            os = 'darwin';
            break;
        case OSType.linux:
        default:
            os = OSType.linux.toLowerCase();
            break;
    }

    switch (getArchitecture()) {
        case Architecture.x64:
            arch = 'amd64';
            break;
        case Architecture.arm64:
            arch = 'arm64';
            break;
        case Architecture.arm:
        case Architecture.x86:
        case Architecture.unknown:
            throw new Error('Not supported');
    }

    const item: string = `-${os}-${arch}.${ext}`;
    return [cmd, item, dest];
}
