'use strict';

// Base on https://github.com/microsoft/vscode-python/blob/main/src/client/common/utils/platform.ts

export enum Architecture {
    unknown = 1,
    x86 = 2,
    x64 = 3,
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

    const arch = require('arch');
    return architectures[arch()] || Architecture.unknown;
}
