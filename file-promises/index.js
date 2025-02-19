const fsp = require('fs').promises;

async function writeFileExample() {
    try {
        await fsp.writeFile('promises.txt', 'Hello, this is a test file!');
        console.log('File written successfully!');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

writeFileExample();

async function readFileExample() {
    try {
        const content = await fsp.readFile('promises.txt', 'utf-8');
        console.log('read file', content);
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

readFileExample();

async function appendFileExample() {
    try {
        await fsp.appendFile('promises.txt', 'append a new line');
        console.log('append file');
    } catch (error) {
        console.error('Error append file:', error);
    }
}

appendFileExample();

async function deleteFileExample() {
    try {
        await fsp.unlink('promises.txt');
        console.log('delete file');
    } catch (error) {
        console.error('Error delete file:', error);
    }
}

// deleteFileExample();


async function isExistsFileExample() {
    try {
        await fsp.access('promises.txt');
        console.log('the file exists');
    } catch (error) {
        console.error('Error access file:', error);
    }
}

isExistsFileExample();

async function renameFileExample() {
    try {
        await fsp.rename('promises.txt', 'rename-promises.txt');
        console.log('the file was renamed');
    } catch (error) {
        console.error('Error rename file:', error);
    }
}

// renameFileExample();

async function makeDirExample() {
    try {
        await fsp.mkdir('promises');
        console.log('make the directory');
    } catch (error) {
        console.error('Error rename file:', error);
    }
}

makeDirExample();

const fs = require('fs');
const dirPath = './myDirectory';
const filePath = `${dirPath}/myFile.txt`;

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(filePath, 'Chandra ma');
const content = fs.readFileSync(filePath, 'utf-8');
console.log('content', content)

console.log('File created successfully!');


async function readDirExample() {
    try {
        const readDir = await fsp.readdir('myDirectory');
        console.log('readDir', readDir)
        readDir.forEach(async (dir) => {
            console.log('dir', `${dirPath}/${dir}`)
            const readFile = await fsp.readFile(`${dirPath}/${dir}`, 'utf-8');
            console.log('readFile---', readFile)
        })
        console.log('read the directory');
    } catch (error) {
        console.error('Error rename file:', error);
    }
}

readDirExample();

