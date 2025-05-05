import { parseCommand } from '../helpers/parseCommand.js';
import { cd, ls, up } from '../services/navigation.js';

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
            case '.exit':
                // Можна опрацювати окремо в readline
                break;
            default:
                console.log('❌ Invalid input');
        }
    } catch (err) {
        console.log(`❌ Error: ${err.message}`);
    }

    return state;
}
