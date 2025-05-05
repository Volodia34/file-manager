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


