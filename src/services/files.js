import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export const cat = async (filePath) => {
    try {
        const stream = fs.createReadStream(filePath, 'utf-8');
        stream.pipe(process.stdout);
        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });
    } catch {
        console.log('Operation failed');
    }
};


export const add = async (filename, currentDir) => {
    const filePath = path.join(currentDir, filename);
    try {
        await fs.promises.writeFile(filePath, '');
    } catch {
        console.log('Operation failed');
    }
};


export const rn = async (filePath, newName) => {
    try {
        const dir = path.dirname(filePath);
        const newPath = path.join(dir, newName);
        await fs.promises.rename(filePath, newPath);
    } catch {
        console.log('Operation failed');
    }
};


export const cp = async (src, dest) => {
    try {
        const srcStream = fs.createReadStream(src);
        const destStream = fs.createWriteStream(path.join(dest, path.basename(src)));
        await pipeline(srcStream, destStream);
    } catch {
        console.log('Operation failed');
    }
};


export const mv = async (src, dest) => {
    try {
        await cp(src, dest);
        await fs.promises.unlink(src);
    } catch {
        console.log('Operation failed');
    }
};

