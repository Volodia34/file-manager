import os from 'os';

export const showEOL = () => {
    console.log(JSON.stringify(os.EOL));
};

export const showCPUs = () => {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, speed: ${cpu.speed / 1000} GHz`);
    });
};

export const showHomedir = () => {
    console.log(os.homedir());
};

export const showUsername = () => {
    console.log(os.userInfo().username);
};

export const showArchitecture = () => {
    console.log(os.arch());
};
