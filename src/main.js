const { Command } = window.__TAURI__.shell
const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

async function run () {
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
  // const command1 = new Command('run-npm-install', { cwd: "../node_modules/datdot-service" })
  // const child1 = await command1.execute();
  const command = new Command('run-datdot-service')
  // const command = Command.sidecar('run-datdot-service')
  command.stderr.on('data', line => console.error(`datdot stderr: "${line}"`));
  // command.stdout.on('data', line => console.log(`datdot stdout: "${line}"`));

  const child = await command.execute();
  setTimeout(()=> {
    child.kill()
  }, 10_000)
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    run();
  });
});