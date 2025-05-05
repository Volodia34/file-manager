import { parseCommand } from '../helpers/parseCommand.js';
import { cd, ls, up } from '../services/navigation.js';
import {
    cat,
    add,
    mkdir,
    rn,
    cp,
    mv,
    rm
} from '../services/files.js';
import {
    showEOL,
    showCPUs,
    showHomedir,
    showUsername,
    showArchitecture
} from '../services/osInfo.js';

export async function handleCommand(input, state) {
    const { command, args } = parseCommand(input);

    try {
        switch (command) {
            case 'up':
                state.currentDir = up(state.currentDir);
                break;

            case 'cd':
                if (args.length === 0) {
                    console.log('❌ cd: missing path argument');
                } else {
                    const newPath = await cd(args[0], state.currentDir);
                    if (newPath) {
                        state.currentDir = newPath;
                    }
                }
                break;

            case 'ls':
                await ls(state.currentDir);
                break;

            case 'cat':
                if (args.length === 0) {
                    console.log('❌ cat: missing file path');
                } else {
                    await cat(args[0], state.currentDir);
                }
                break;

            case 'add':
                if (args.length === 0) {
                    console.log('❌ add: missing file name');
                } else {
                    await add(args[0], state.currentDir);
                }
                break;

            case 'mkdir':
                if (args.length === 0) {
                    console.log('❌ mkdir: missing folder name');
                } else {
                    await mkdir(args[0], state.currentDir);
                }
                break;

            case 'rn':
                if (args.length < 2) {
                    console.log('❌ rn: missing arguments');
                } else {
                    await rn(args[0], args[1], state.currentDir);
                }
                break;

            case 'cp':
                if (args.length < 2) {
                    console.log('❌ cp: missing arguments');
                } else {
                    await cp(args[0], args[1], state.currentDir);
                }
                break;

            case 'mv':
                if (args.length < 2) {
                    console.log('❌ mv: missing arguments');
                } else {
                    await mv(args[0], args[1], state.currentDir);
                }
                break;

            case 'rm':
                if (args.length === 0) {
                    console.log('❌ rm: missing file path');
                } else {
                    await rm(args[0], state.currentDir);
                }
                break;

            case 'os':
                switch (args[0]) {
                    case '--EOL':
                        showEOL();
                        break;
                    case '--cpus':
                        showCPUs();
                        break;
                    case '--homedir':
                        showHomedir();
                        break;
                    case '--username':
                        showUsername();
                        break;
                    case '--architecture':
                        showArchitecture();
                        break;
                    default:
                        console.log('❌ Invalid OS option');
                }
                break;

            case '.exit':
                break;

            default:
                console.log('❌ Invalid input');
        }
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    }

    return state;
}
