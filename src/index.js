import { getWelcomeMessage, getByeMessage } from './constants/messages.js';
import { initCLI } from './cli/readline';
import os from 'os'

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';
let currentDir = os.homedir()

console.log(getWelcomeMessage(username));
showDir();


initCLI(username, currentDir);


process.on('SIGINT', () => {
    exitApp();
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const input = data.trim();
    if (input === '.exit') {
        exitApp();
    } else {

    }
    showDir()
});



function exitApp() {
    console.log(getByeMessage(username));
    process.exit(0);
}
function showDir() {
    console.log(`You are currently in ${currentDir}`);
}
