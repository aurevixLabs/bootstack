import {exec} from "child_process";
import {promisify} from "util";

const execAsync = promisify(exec);

export async function runCommand(command, cwd) {
  return execAsync(command, {
    cwd,
    timeout: 5 * 60 * 1000,
    maxBuffer: 1024 * 1024 * 50,
  });
}
