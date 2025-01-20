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
    let cmd: string;

    switch (getOSType()) {
        case OSType.windows:
            cmd = 'start';
            break;
        case OSType.osx:
            cmd = 'open';
            break;
        case OSType.linux:
        default:
            cmd = 'xdg-open';
            break;
    }

    return cmd;
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
