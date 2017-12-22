import * as yargs from "yargs";

import { asyncExec } from "./asyncExec";

let argv = yargs.option("m", {
  alias: "message",
  demand: false,
  default: "no message",
  describe: "Please input message!",
  type: "string"
}).argv;

async function run(commitMessage: string) {
  let resultMsg = await asyncExec("git add .");
  console.log(1, resultMsg);
  resultMsg = await asyncExec(`git commit -m "${commitMessage}"`);
  console.log(2, resultMsg);
  resultMsg = await asyncExec(`git push`);
  console.log(3, resultMsg);
}

run(argv.m)
  .then()
  .then(err => {
    console.log('e', err);
  });
