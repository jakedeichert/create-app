const fs = require('fs');
const path = require('path');
const { send } = require('./utils/event-logger');
const utils = require('./utils/helpers');
const reposByProjectType = {
  react: 'react-starter',
  tsreact: 'typescript-react-starter',
};
const events = {
  lifeCycleBegin: 'init.lifeCycle.begin',
  lifeCycleEnd: 'init.lifeCycle.end',
  createDirFail: 'init.createDir.fail',
  createDirSuccess: 'init.createDir.success',
  cloneProjectFail: 'init.cloneProject.fail',
  cloneProjectSuccess: 'init.cloneProject.success',
};

const initProject = async (workingDir, dirName, projectType) => {
  send(events.lifeCycleBegin);
  if (!reposByProjectType[projectType]) return;
  const dir = path.join(workingDir, dirName);
  await utils.createDir(dirName).catch(createDirFail);
  send(events.createDirSuccess);
  await cloneProject(dir, projectType).catch(cloneProjectFail);
  send(events.cloneProjectSuccess);
  send(events.lifeCycleEnd);
};

const cloneProject = async (dir, projectType) => {
  const repoName = reposByProjectType[projectType];
  const repoUrl = `https://github.com/jakedeichert/${repoName}/archive/master.zip`;
  const zipPath = path.join(dir, `${repoName}.zip`);
  await utils.download(repoUrl, zipPath);
  await utils.unzip(zipPath, dir);
  fs.unlinkSync(zipPath);
};

const createDirFail = err => {
  send(events.createDirFail, { err });
  throw err;
};

const cloneProjectFail = err => {
  send(events.cloneProjectFail, { err });
  throw err;
};

module.exports = {
  events,
  initProject,
};
