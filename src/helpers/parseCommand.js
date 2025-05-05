export function parseCommand(input) {
    const trimmedInput = input.trim();
    const [command, ...args] = trimmedInput.split(' ');
    return {
        command,
        args
    }
}
