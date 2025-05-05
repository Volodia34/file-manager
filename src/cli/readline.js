import readline from 'readline';
import { getByeMessage } from '../constants/messages.js';
import { handleCommand } from './handleCommand.js';
import { parseCommand } from '../helpers/parseCommand.js';

export function initCLI(username, currentDir) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    console.log(`You are currently in ${currentDir}`);

    rl.on('line', async (input) => {
        const trimmedInput = input.trim();

        if (trimmedInput === '.exit') {
            exitApp(username, rl);
        } else {
            const state = { username, currentDir };
            await handleCommand(trimmedInput, state);
            currentDir = state.currentDir;
            console.log(`You are currently in ${currentDir}`);
        }

        rl.prompt();
    });

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
