import fs from 'fs';
import path from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

export async function compress(filePath, destination, currentDir) {
    try {
        const input = path.resolve(currentDir, filePath);
        const output = path.resolve(currentDir, destination);

        const readStream = fs.createReadStream(input);
        const writeStream = fs.createWriteStream(output);
        const brotli = createBrotliCompress();

        await pipeline(readStream, brotli, writeStream);
        console.log('✅ File compressed successfully');
    } catch (err) {
        console.log('❌ Operation failed');
    }
}

export async function decompress(filePath, destination, currentDir) {
    try {
        const input = path.resolve(currentDir, filePath);
        const output = path.resolve(currentDir, destination);

        const readStream = fs.createReadStream(input);
        const writeStream = fs.createWriteStream(output);
        const brotli = createBrotliDecompress();

        await pipeline(readStream, brotli, writeStream);
        console.log('✅ File decompressed successfully');
    } catch (err) {
        console.log('❌ Operation failed');
    }
}
