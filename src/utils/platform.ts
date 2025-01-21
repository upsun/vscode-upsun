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
export function getArchitecture(arch: string = process.arch): Architecture {
    const fromProc = architectures[arch];
    if (fromProc !== undefined) {
        return fromProc;
    }

    // Fallback
    const archModule = require('arch');
    return architectures[archModule()] || Architecture.unknown;
}

export function getBrowserCommand(platform: string = process.platform): string {
    let cmd: string;

    switch (getOSType(platform)) {
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

export function getGithubFileTag(
    platform: string = process.platform,
    arch: string = process.arch,
): [string, string, string] {
    let _os: string;
    let _arch: string;
    let _ext: string = 'tar.gz';
    let _cmd: string = 'tar -xvzf';
    let _dest: string = '~/.upsun-cli/addons';

    switch (getOSType(platform)) {
        case OSType.windows:
            _os = OSType.windows.toLowerCase();
            _cmd = 'powershell Expand-Archive -Path'; //TODO need to test
            _ext = 'zip';
            _dest = '%USER%/.upsun-cli/addons';
            break;
        case OSType.osx:
            _os = 'darwin';
            break;
        case OSType.linux:
        default:
            _os = OSType.linux.toLowerCase();
            break;
    }

    switch (getArchitecture(arch)) {
        case Architecture.x64:
            _arch = 'amd64';
            break;
        case Architecture.arm64:
            _arch = 'arm64';
            break;
        case Architecture.arm:
        case Architecture.x86:
        case Architecture.unknown:
            throw new Error('Not supported');
    }

    const _item: string = `-${_os}-${_arch}.${_ext}`;
    return [_cmd, _item, _dest];
}
