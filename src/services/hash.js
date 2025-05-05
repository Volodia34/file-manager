import fs from 'fs';
import crypto from 'crypto';

export const calculateHash = async (path) => {
    try {
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(path);

        input.on('error', () => {
            console.log('Operation failed');
        });

        input.on('data', (chunk) => {
            hash.update(chunk);
        });

        input.on('end', () => {
            const result = hash.digest('hex');
            console.log(result);
        });
    } catch (err) {
        console.log('Operation failed');
    }
};
