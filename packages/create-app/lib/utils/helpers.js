const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const request = require('request');

exports.createDir = name => {
  return new Promise((resolve, reject) => {
    fs.mkdir(name, err => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.download = async (url, filepath) => {
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

// Spawn a child process and stream the output.
exports.spawnStream = (
  cmd,
  args = [],
  { stdio = 'pipe', shell = true, cwd }
) => {
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

exports.doesFileExist = path => {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
};

exports.getPath = path => {
  const linkedLibModule = `node_modules/@jakedeichert/create-app-cli/node_modules/@jakedeichert/create-app/node_modules/${path}`;
  if (exports.doesFileExist(linkedLibModule)) return linkedLibModule;
  const linkedCliModule = `node_modules/@jakedeichert/create-app-cli/node_modules/${path}`;
  if (exports.doesFileExist(linkedCliModule)) return linkedCliModule;
  const linkedEslintModule = `node_modules/@jakedeichert/create-app-cli/node_modules/@jakedeichert/create-app/node_modules/@jakedeichert/eslint-config-create-app/node_modules/${path}`;
  if (exports.doesFileExist(linkedEslintModule)) return linkedEslintModule;
  const rootModule = `node_modules/${path}`;
  return rootModule;
};

exports.setEnv = (cmdName, varName, value) => {
  const cmd = cmdName.toUpperCase();
  const name = varName.toUpperCase();
  process.env[`CREATE_APP_CMD_${cmd}_${name}`] = value;
};

exports.getEnv = (cmdName, varName) => {
  const cmd = cmdName.toUpperCase();
  const name = varName.toUpperCase();
  const val = process.env[`CREATE_APP_CMD_${cmd}_${name}`];
  if (val === 'true') return true;
  if (val === 'false') return false;
  return val;
};
