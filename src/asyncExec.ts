import { spawn } from "child_process";

export async function asyncExec(cmd: string, args?: string[]) {
  return new Promise<string>((resolve, reject) => {
    let childProcess = spawn(cmd, args, {
      stdio: 'inherit'
    });
    let resultMessage = "";

    process.stdout.on("data", data => {
      resultMessage += "\n" + data;
    });

    process.stderr.on("data", data => {
      resultMessage += "\n" + data;
    });

    childProcess.on("close", code => {
      if (code == 0) {
        resolve(resultMessage);
      } else {
        reject(resultMessage);
      }
    });
  });
}
