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

async function run(commitMessage: string) {
  let resultMsg = await asyncExec("git", ["status", "-s", "-uno"]);
  console.log(chalk.blue.bold('File Changed list:'));
  resultMsg.split("\n").map(msg => {
    console.log(chalk.green.bold(msg));
  });


  resultMsg = await asyncExec("git", ["add", "."]);
  console.log(chalk.green.bold(resultMsg));
  resultMsg = await asyncExec("git", ["commit", "-m", `${commitMessage}`]);
  console.log(chalk.green.bold(resultMsg));
  resultMsg = await asyncExec("git", ["push"]);
  console.log(chalk.green.bold(resultMsg));
}

run(argv.m)
  .then(() => {
    console.log(chalk.green.bold("Success!"));
  })
  .catch(err => {
    console.log(chalk.red.bold(err));
  });
