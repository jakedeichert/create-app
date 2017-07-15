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

const cloneProject = async (dir, repoName) => {
  const repoUrl = `https://github.com/jakedeichert/${repoName}/archive/master.zip`;
  const zipPath = path.join(dir, `${repoName}.zip`);
  await download(repoUrl, zipPath);
  await unzip(zipPath, dir);
  fs.unlinkSync(zipPath);
};

const download = async (url, filepath) => {
  return new Promise((resolve, reject) => {
    const stream = request(url).pipe(fs.createWriteStream(filepath));
    stream.on('finish', resolve);
    stream.on('error', () => {
      fs.unlinkSync(filepath);
      reject();
    });
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

module.exports = {
  createDir,
  cloneProject,
  download,
  unzip,
};
