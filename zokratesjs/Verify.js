const { initialize } = require("zokrates-js/node");
const util = require("util");
var fs = require("fs");

var vk = fs.readFileSync("vk.json", "utf8");
vk = JSON.parse(vk);

var proof = fs.readFileSync("proof.json", "utf8");
proof = JSON.parse(pk);

var zokrates = initialize().then((zokratesProvider) => {
  // Verify proof
  const verif_proof = zokratesProvider.verify(vk, proof);
  console.log(verif_proof);

  return;
});
