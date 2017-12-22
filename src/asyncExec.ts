import { exec } from "child_process";

export async function asyncExec(cmd: string) {
  return new Promise<string>((resolve, reject) => {
    exec(cmd, function(err, stdout, stderr) {
      if (err) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}
