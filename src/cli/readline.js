import readline from 'readline';
import { getByeMessage } from '../constants/messages.js';


export function initCLI(username, currentDir) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    console.log(`You are currently in ${currentDir}`)

    rl.on('line', (input) => {
        const trimmedInput = input.trim();

        if (trimmedInput === '.exit') {
            exitApp(username, rl);
        } else {
            console.log(`You are currently in ${currentDir}`);
        }
    })
    rl.on('SIGINT', () => {
        exitApp(username, rl);
    });

    rl.prompt();
}

function exitApp(username, rl) {
    console.log(getByeMessage(username));
    rl.close();
    process.exit(0);
}
