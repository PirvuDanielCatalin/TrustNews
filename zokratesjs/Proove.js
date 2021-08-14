const { initialize } = require("zokrates-js/node");
const util = require("util");
var fs = require("fs");

var program = fs.readFileSync("program.json", "utf8");
program = JSON.parse(program);

var pk = fs.readFileSync("pk.json", "utf8");
pk = JSON.parse(pk);

var zokrates = initialize().then((zokratesProvider) => {
  // Computation
  const { witness, output } = zokratesProvider.computeWitness(program, [
    "5",
    "19635",
  ]);

  // Generate proof
  const proof = zokratesProvider.generateProof(program.program, witness, pk);

  fs.writeFile("vk.json", JSON.stringify(proof), function (err) {
    if (err) {
      console.log(err);
    }
  });

  return;
});
