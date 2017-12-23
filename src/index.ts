import { option } from "yargs";
import { asyncExec } from "./asyncExec";
import chalk from "chalk";
import { readFileSync, writeFileSync } from "fs";

let pars = option("m", {
  alias: "message",
  demand: false,
  default: "no message",
  describe: "Please input message!",
  type: "string"
}).option("v", {
  alias: "addVersion",
  demand: false,
  default: false,
  describe: "Is auto add version",
  type: "boolean"
}).argv;

async function print(title: string, msg: string, showIndex: boolean) {
  console.log(chalk.blue.bold(`${title}`));
  if (msg) {
    msg.split("\n").map((msg, index) => {
      let text;
      if (showIndex) {
        text = `    ${index + 1}  ${msg.trim()}`;
      } else {
        text = `    ${msg.trim()}`;
      }
      console.log(chalk.green(text));
    });
  }
}

async function gitacp(commitMessage: string) {
  let resultMsg = await asyncExec("git", ["status", "-s"]);
  await print("git status -s", resultMsg, true);

  resultMsg = await asyncExec("git", ["add", "."]);
  await print("git add .", resultMsg, false);

  resultMsg = await asyncExec("git", ["commit", "-m", `${commitMessage}`]);
  await print(`git commit -m "${commitMessage}"`, resultMsg, false);

  resultMsg = await asyncExec("git", ["push"]);
  await print(`git push`, resultMsg, false);
}

/**
 * 版本号加1
 * <pre>
 * 如果原版本号为10.2.2 处理后：10.2.3
 * 如果原版本号为10.2.2-beta5 处理后：10.2.2-beta6
 * </pre>
 * @param {boolean} isAddVersion
 */
async function addVersion(isAddVersion: boolean) {
  if (isAddVersion) {
    let packageFile = "./package.json";
    let json = JSON.parse(readFileSync(packageFile, { encoding: "utf-8" }));
    let version = json.version as string;

    console.log(chalk.blue.bold("version changed:"));

    let versionNew;
    if (version.match(/beta/i)) {
      versionNew = version.replace(/(beta)([0-9]*)/i, (w, a, b, c) => {
        return `${a.toLocaleLowerCase()}${Number(b) + 1}`;
      });
    } else {
      versionNew = version.replace(/(.*?)([0-9]*)$/, (w, a, b) => {
        return `${a}${Number(b) + 1}`;
      });
    }
    json.version = versionNew;

    writeFileSync(packageFile, JSON.stringify(json, null, 2));

    console.log(chalk.green(`    ${version} => ${versionNew}`));
  }
}

async function run() {
  await addVersion(pars.v);
  await gitacp(pars.m);
}

run()
  .then(() => {
    console.log(chalk.green.bold("Success!"));
  })
  .catch(err => {
    console.log(chalk.red.bold(err));
  });
