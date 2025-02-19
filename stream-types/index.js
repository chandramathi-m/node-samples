const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt'); // Create writable stream
writeStream.write('Hello, this is a writable stream!\n'); // Write data
writeStream.end(); // Close stream
console.log('Data written successfully!');

const readStream = fs.createReadStream('output.txt', 'utf8'); // Create readable stream
readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});
readStream.on('end', () => {
    console.log('Finished reading.');
});

const { Duplex } = require('stream');

const duplexStream = new Duplex({
    read(size) {
        this.push('Hello from Duplex Stream!\n');
        this.push(null); // Signal end
    },
    write(chunk, encoding, callback) {
        console.log('Received:', chunk.toString());
        callback();
    }
});

duplexStream.on('data', (chunk) => console.log('Reading:', chunk.toString()));
duplexStream.write('Writing to Duplex Stream!');

const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

process.stdin.pipe(transformStream).pipe(process.stdout);
