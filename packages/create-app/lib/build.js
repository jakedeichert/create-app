const { send } = require('./utils/event-logger');
const { spawnStream, getPath, setEnv } = require('./utils/helpers');
const { loadProjectConfig } = require('./utils/configHelpers');
exports.events = {
  lifeCycleBegin: 'build.lifeCycle.begin',
  lifeCycleEnd: 'build.lifeCycle.end',
  commandFail: 'build.command.fail',
};

exports.build = async (workingDir, isDevMode, infoAnalyzer, keepProptypes) => {
  setEnv('build', 'info', !!infoAnalyzer);
  setEnv('build', 'keepProptypes', !!keepProptypes);
  send(exports.events.lifeCycleBegin);
  const config = loadProjectConfig(workingDir);
  await run(workingDir, isDevMode, config.type);
  send(exports.events.lifeCycleEnd);
};

const run = async (workingDir, isDevMode, projectType) => {
  switch (projectType) {
    case 'js-lib':
      await cleanDistDirectory(workingDir);
      await cleanCacheDirectories(workingDir);
      await runMicrobundle(workingDir);
      break;
    case 'typescript-lib':
      await cleanDistDirectory(workingDir);
      await cleanCacheDirectories(workingDir);
      await runMicrobundle(workingDir);
      await fixTypeScriptDist(workingDir);
      break;
    case 'typescript-react':
    case 'react':
      await cleanDistDirectory(workingDir);
      await runWebpack(workingDir, isDevMode, projectType);
      break;
    case 'react-electron':
      await copyElectronConfig(workingDir, 'production');
      await runWebpack(workingDir, isDevMode, projectType);
      await buildElectronPackage(workingDir);
      break;
  }
};

const cleanDistDirectory = async workingDir => {
  return spawnStream(`rm -rf dist`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const cleanCacheDirectories = async workingDir => {
  return spawnStream(`rm -rf .rpt2_cache`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const fixTypeScriptDist = async workingDir => {
  // Moves all d.ts files to the root and deletes the test directory
  // that microbundle builds for some reason.
  return spawnStream(`mv dist/src/* dist && rm -rf dist/src dist/test`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const runMicrobundle = async workingDir => {
  const microbundleBinPath = getPath('microbundle/dist/cli.js');
  return spawnStream(`${microbundleBinPath}`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

// https://webpack.js.org/guides/production/
const runWebpack = async (workingDir, isDevMode, projectType) => {
  const env = !isDevMode ? 'NODE_ENV=production ' : '';
  const configPath = getPath(
    `@jakedeichert/create-app/lib/env-configs/${projectType}/webpack.config.js`
  );
  const webpackBinPath = getPath('webpack-cli/bin/cli.js');
  return spawnStream(`${env} ${webpackBinPath}`, [`--config ${configPath}`], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const copyElectronConfig = async (workingDir, env) => {
  return spawnStream(`cp config/${env}.json electron/config.json`, [], {
    stdio: 'inherit',
    cwd: workingDir,
  }).catch(commandFail);
};

const buildElectronPackage = async workingDir => {
  const env = 'NODE_ENV=production';
  const electronPackagerPath = getPath('electron-packager/cli.js');
  // NOTE: packageManager needs to be yarn until they fix npm prune --production
  return spawnStream(
    `${env} ${electronPackagerPath} .`,
    [
      '--out package --electronVersion 1.6.11 --overwrite --packageManager yarn',
    ],
    {
      stdio: 'inherit',
      cwd: workingDir,
    }
  ).catch(commandFail);
};

const commandFail = err => {
  send(exports.events.commandFail, { err });
  throw err;
};
