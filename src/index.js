const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

console.log(`Welcome to the File Manager, ${username}!`);

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
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
}
