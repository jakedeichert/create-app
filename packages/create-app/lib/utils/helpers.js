const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const yauzl = require('yauzl');

const createDir = name => {
  return new Promise((resolve, reject) => {
    fs.mkdir(name, err => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const loadProjectConfig = workingDir => {
  const configPath = path.join(workingDir, 'createapp.config.js');
  return require(configPath);
};

const download = async (url, filepath) => {
  return new Promise((resolve, reject) => {
    request(url)
      .on('response', response => {
        response.statusCode !== 200 && reject(response);
      })
      .on('error', () => {
        fs.unlinkSync(filepath);
        reject();
      })
      .pipe(fs.createWriteStream(filepath))
      .on('finish', resolve);
  });
};

const unzip = async (zipFile, destDir) => {
  return new Promise((resolve, reject) => {
    yauzl.open(
      zipFile,
      { lazyEntries: true, autoClose: true },
      (err, zipped) => {
        if (err) return reject(err);
        zipped.readEntry();
        zipped.on('entry', entry => {
          // Remove the first directory from the file name
          const fileName = entry.fileName.slice(entry.fileName.indexOf('/'));
          const isDirectory = /\/$/.test(fileName);
          if (isDirectory) {
            mkdirp.sync(path.join(destDir, fileName));
            return zipped.readEntry();
          }
          zipped.openReadStream(entry, (err, readStream) => {
            if (err) return reject(err);
            readStream.on('end', () => {
              zipped.readEntry();
            });
            readStream.pipe(fs.createWriteStream(path.join(destDir, fileName)));
          });
        });
        zipped.on('error', err => {
          if (err) return reject(err);
        });
        zipped.on('end', () => {
          resolve();
        });
      }
    );
  });
};

// Spawn a child process and stream the output.
const spawnStream = (cmd, args = [], { stdio = 'pipe', shell = true, cwd }) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio, cwd, shell });
    child.on('error', reject);
    if (stdio === 'pipe') {
      child.stdout.on('data', data => resolve(data.toString()));
      child.stderr.on('data', data => resolve(data.toString()));
    } else if (stdio === 'inherit') {
      child.on('close', exitCode => {
        if (exitCode === 0) return resolve();
        reject(`Exit Code: ${exitCode}`);
      });
    }
  });
};

module.exports = {
  loadProjectConfig,
  createDir,
  download,
  unzip,
  spawnStream,
};