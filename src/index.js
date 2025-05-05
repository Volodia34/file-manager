import { getWelcomeMessage, getByeMessage } from './constants/messages.js';


const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

console.log(getWelcomeMessage(username));


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
});

function exitApp() {
    console.log(getByeMessage(username));
    process.exit(0);
}
