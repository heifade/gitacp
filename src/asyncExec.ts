import { spawnSync } from "child_process";

export async function asyncExec(cmd: string, args?: string[]) {
  return new Promise<string>((resolve, reject) => {
    let childProcess = spawnSync(cmd, args);
    let resultMessage = "";

    console.log(resultMessage);


    resolve(resultMessage);



    // childProcess.stdout.on("data", data => {
    //   resultMessage += "\n" + data;
    // });

    // childProcess.stderr.on("data", data => {
    //   resultMessage += "\n" + data;
    // });

    // childProcess.on("close", code => {
    //   if (code == 0) {
    //     console.log(cmd, args, resultMessage);
    //     resolve(resultMessage);
    //   } else {
    //     reject(resultMessage);
    //   }
    // });
  });
}
