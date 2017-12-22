import { spawn } from "child_process";

export async function asyncExec(cmd: string, args?: string[]) {
  return new Promise<string>((resolve, reject) => {
    let childProcess = spawn(cmd, args);
    let resultMessage = "";

    



    childProcess.stdout.on("data", data => {
      resultMessage += "\n" + data;
    });

    childProcess.stderr.on("data", data => {
      resultMessage += "\n" + data;
    });

    childProcess.on("exit", code => {
      if (code == 0) {
        console.log(cmd, args, resultMessage);
        resolve(resultMessage);
      } else {
        reject(resultMessage);
      }
    });
  });
}
