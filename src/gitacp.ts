import { run } from "./git-common";
import chalk from "chalk";

run(true)
  .then(() => {
    console.log(chalk.green.bold("Success!"));
  })
  .catch(err => {
    console.log(chalk.red.bold(err));
  });
