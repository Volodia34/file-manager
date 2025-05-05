import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { chdir, cwd } from 'process';

export function up(currentDir) {
    const root = os.platform() === 'win32' ? path.parse(currentDir).root : '/';
    const parentDir = path.dirname(currentDir);

    if (parentDir === root) {
        console.log(`Cannot go above root directory. Current directory remains ${currentDir}`);
        return currentDir; // залишити поточну директорію
    }

    console.log(`Moved up to ${parentDir}`);
    return parentDir;

}

export async function cd(targetPath, currentDir) {
    const fullPath = path.isAbsolute(targetPath)
        ? targetPath
        : path.resolve(currentDir, targetPath);

    try {
        const stats = await fs.stat(fullPath);
        if (!stats.isDirectory()) throw new Error();

        chdir(fullPath);
        return cwd();
    } catch {
        console.log('❌ Operation failed');
        return currentDir;
    }
}

export async function ls(currentDir) {
    try {
        const files = await fs.readdir(currentDir, { withFileTypes: true });

        const formatted = files
            .map(dirent => ({
                Name: dirent.name,
                Type: dirent.isDirectory() ? 'directory' : 'file'
            }))
            .sort((a, b) => {
                if (a.Type === b.Type) return a.Name.localeCompare(b.Name);
                return a.Type === 'directory' ? -1 : 1;
            });

        console.table(formatted);
    } catch {
        console.log('❌ Operation failed');
    }
}
