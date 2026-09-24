import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[36m%s\x1b[0m', '⚖️ Starting NyayaGuide AI Full-Stack Environment...');

// Start backend
const serverProcess = spawn(npmCmd, ['--prefix', 'server', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Start frontend
const clientProcess = spawn(npmCmd, ['--prefix', 'client', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

const killProcessTree = (proc) => {
  if (!proc || !proc.pid) return;
  if (isWindows) {
    try {
      execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: 'ignore' });
    } catch {}
  } else {
    try {
      proc.kill('SIGTERM');
    } catch {}
  }
};

const cleanup = () => {
  console.log('\n\x1b[33m%s\x1b[0m', 'Shutting down NyayaGuide AI services...');
  killProcessTree(serverProcess);
  killProcessTree(clientProcess);
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
