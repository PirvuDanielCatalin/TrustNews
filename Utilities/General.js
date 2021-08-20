// Utilities
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function execute(command) {
  const exec = require('child_process').exec

  var output = exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout);
  })

  console.log(output);
}

module.exports = { sleep, execute };