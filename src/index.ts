import * as commander from "commander";
import { exec } from "child_process";

commander
  .version("1.0.0")
  .option("-m, --message <n>", "Please input message!")
  .parse(process.argv);

let commitMessage = commander.message;


let child = exec('git add .', function(err, stdout, stderr) {
  if (err) throw err;
  console.log(stdout);
});