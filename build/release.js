/**
 How to do a release:
 1. Make sure you have publish access for all packages:
 2. Run `npm release`, follow prompts
 3A. If everything works properly, the tag should have been auto-pushed and a
 local changelog commit should have been generated. Go to 4.
 3B. If the publish fails half-way, things have gotten hairy. Now you need to
 go to npm to check which packages have been published and manually publish
 the ones that have not been published yet. After all have been published:
 3B.1. Push the release git tag to GitHub.
 3B.2. Run `npm changelog` to generate changelog commit.
 4. Push the changelog commit to `next` branch.
 5. Go to GitHub and verify that the changelog is live.
 6. Go to GitHub releases page and publish the release.
 */

// 在 bug 的基础上发 bug
//  <major> "." <minor> "." <patch> "-" <[a, b, c, d, ...]>
const fs = require('fs'); // Or `import fs from "fs";` with ESM
// const execa = require('execa');
let execa;
(async () => {
  execa = (await import('execa')).execaSync;
})();

const semver = require('semver');
const inquirer = require('inquirer');

const simpleGit = require('simple-git');

process.env.NODE_ENV = 'production';

const pkgJson = require('../package.json');

const curVersion = pkgJson.version;

if (!pkgJson.publishConfig) {
  console.error(`Please config package.json:
  "publishConfig": {
    "registry": "https://mirrors.tencent.com/npm/"
  }
  `);
  return;
}
// const curVersion = pkgJson.version;
const pkgName = pkgJson.name;
const RELEASE_REGISTRY = pkgJson.publishConfig.registry;
// const RELEASE_PROXY = pkgJson.publishConfig.proxy;

// Paths
const archiveFileName = `${pkgName}.tar.gz`;
let cwd = process.cwd();
cwd = `${cwd}/dist`;

const archiveTar = async () => {
  const shell = 'zsh';
  // let tmp = '.temp';
  const options = { shell, cwd };
  // let archiveArguments = ['-cvzf', `${archiveFileName}`, '-C', tmp, '.'];
  const archiveArguments = ['-cvzf', `${archiveFileName}`, '*'];

  console.log(`tar ${archiveArguments.join(' ')} | cwd: ${cwd}`);

  await execa('rm', ['-rf', archiveFileName], options);
  await execa(`tar`, archiveArguments, options);
  // await execa('rm', ['-rf', tmp], options);
  await execa('tar', ['-tf', archiveFileName], options);
  console.log('tar archive complete.\n');
};

const release = async () => {
  console.log(`Current version: ${curVersion}`);

  const bumps = ['patch', 'minor', 'major', 'prerelease', 'premajor'];
  const versions = {};
  bumps.forEach((b) => {
    versions[b] = semver.inc(curVersion, b);
  });
  const bumpChoices = bumps.map((b) => ({ name: `${b} (${versions[b]})`, value: b }));

  function getVersion(answers) {
    return answers.customVersion || versions[answers.bump];
  }

  function isPreRelease(version) {
    return !!semver.prerelease(version);
  }

  function getNpmTags(version) {
    console.log(version);
    if (isPreRelease(version)) {
      return ['next', 'latest'];
    }
    return ['latest', 'next'];
  }

  const { bump, customVersion, npmTag, archiveVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [...bumpChoices, { name: 'custom', value: 'custom' }, { name: 'archive docs', value: 'archive' }],
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: (answers) => answers.bump === 'custom',
    },
    {
      name: 'archiveVersion',
      message: `Build and archive files?`,
      type: 'list',
      choices: ['N', 'Y'],
      when: (answers) => answers.bump === 'archive',
    },
    {
      name: 'npmTag',
      message: 'Input npm tag:',
      type: 'list',
      default: (answers) => getNpmTags(getVersion(answers))[0],
      choices: (answers) => getNpmTags(getVersion(answers)),
    },
  ]);

  if (archiveVersion === 'N') {
    console.log('[archive] cancelled.');
    return;
  }
  if (archiveVersion === 'Y') {
    await execa('npm', ['run', 'build:docs'], { stdio: 'inherit' });
    archiveTar().catch((err) => {
      console.error(err);
      process.exit(1);
    });
    return;
  }
  // check npm login
  try {
    const { stdout } = await execa('npm', ['whoami', '--registry', RELEASE_REGISTRY]);
    console.log(`npm username: ${stdout}`);
  } catch (error) {
    const { stderr } = error;
    // console.log(stderr);
    if (/E500/.test(stderr) && /ECONNREFUSED/.test(stderr)) {
      console.log(`registry does not support npm access, skipping permission checks...`);
      // return;
    }
    if (/ENEEDAUTH/.test(stderr)) {
      const { npmLogin } = await inquirer.prompt([
        {
          name: 'npmLogin',
          message: `Do you need npm login?`,
          type: 'list',
          choices: ['N', 'Y'],
        },
      ]);
      if (npmLogin === 'Y') {
        const npmLoginArguments = [
          'login',
          '--registry',
          // 'http://r.tnpm.oa.com',
          RELEASE_REGISTRY,
          '--scope',
          '@tencent',
          // '--proxy',
          // 'http://127.0.0.1:12639'
          // RELEASE_PROXY
        ];

        console.log(`npm ${npmLoginArguments.join(' ')}`);
        await execa('npm', npmLoginArguments, { stdio: 'inherit' });
      } else {
        console.log('You must be logged in to publish packages. Use `npm login` and try again.');
        return;
      }
    }
  }
  const version = customVersion || versions[bump];
  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Confirm releasing ${version} (${npmTag})?`,
      type: 'list',
      choices: ['N', 'Y'],
    },
  ]);

  if (yes === 'N') {
    console.log('[release] cancelled.');
    return;
  }
  // 修改package.json
  pkgJson.version = version;
  fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2));
  // 运行build
  await execa('npm', ['run', 'build'], { stdio: 'inherit' });
  // 打tag
  await execa('git', ['tag', '-a', `v${version}`, '-m', `version v${version}`], { stdio: 'inherit' });
  // 生成changelog推送远程
  await execa('npm', ['run', 'changelog']);
  await execa('git', ['add', '-A'], { stdio: 'inherit' });
  await execa('git', ['commit', '-m', `chore: ${version} changelog`], { stdio: 'inherit' });
  // # publish
  // git push origin refs/tags/v"$VERSION"
  await execa('git', ['push', 'origin', `refs/tags/v${version}`], { stdio: 'inherit' });
  await execa('git', ['push'], { stdio: 'inherit' });
  await execa('npm', ['publish'], { stdio: 'inherit' });
};

const getBranch = async () => {
  const git = simpleGit();
  const status = await git.status();
  const currentBranch = status.tracking;

  // return status.tracking;
  // };
  // const currentBranch = getBranch();
  if (currentBranch !== 'origin/master') {
    console.error(`当前分支：${currentBranch},请合并到主干分支再发布。`);
    return;
  }

  release().catch((err) => {
    console.error(err);
    process.exit(1);
  });
};

getBranch();
