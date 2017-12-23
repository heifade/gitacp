import { spawn } from "child_process";

export async function asyncExec(cmd: string, args?: string[]) {
  return new Promise<string>((resolve, reject) => {
    let childProcess = spawn(cmd, args, {
      stdio: ["pipe", "pipe", "pipe"]
    });
    let resultMessage = "";

    childProcess.stdout.on("data", data => {
      resultMessage += "\n" + data;
    });

    childProcess.stderr.on("data", data => {
      resultMessage += "\n" + data;
    });

    process.stdout.on('data', message => {
      console.log(11, message);
    });
    process.on('message', code => {
      console.log(code);
    })
    

    childProcess.on("close", code => {
      // console.log('close', code);
      // if (code == 0) {
      //   resolve(resultMessage);
      // } else {
      //   reject(resultMessage);
      // }

      setTimeout(() => {
        resolve(resultMessage);
      }, 5000);
    });
  });
}
