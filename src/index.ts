import * as yargs from "yargs";
import { asyncExec } from "./asyncExec";
import chalk from "chalk";

let argv = yargs.option("m", {
  alias: "message",
  demand: false,
  default: "no message",
  describe: "Please input message!",
  type: "string"
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

async function run(commitMessage: string) {
  let resultMsg = await asyncExec("git", ["status", "-s", "-uno"]);
  await print("git status -s -uno", resultMsg, true);

  resultMsg = await asyncExec("git", ["add", "."]);
  await print("git add .", resultMsg, false);

  resultMsg = await asyncExec("git", ["commit", "-m", `${commitMessage}`]);
  await print(`git commit -m "${commitMessage}"`, resultMsg, false);

  resultMsg = await asyncExec("git", ["push"]);
  await print(`git push`, resultMsg, false);
}

run(argv.m)
  .then(() => {
    console.log(chalk.green.bold("Success!"));
  })
  .catch(err => {
    console.log(chalk.red.bold(err));
  });
