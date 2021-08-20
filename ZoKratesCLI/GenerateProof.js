const { exec } = require("child_process");
const utilities = require("../Utilities/General.js");

const util = require("util");
const fs = require("fs");

function GenerateProof(witness) {
  compute_witness_cmd =
    "zokrates compute-witness" +
    " --abi-spec ./ZoKratesCLI/PublicInfo/abi.json" +
    " --input ./ZoKratesCLI/PublicInfo/out" +
    " --output ./ZoKratesCLI/GeneratedInfo/witness" +
    " --arguments " +
    witness;

  exec(compute_witness_cmd);

  utilities.sleep(1000);

  generate_proof_cmd =
    "zokrates generate-proof" +
    " --input ./ZoKratesCLI/PublicInfo/out" +
    " --proof-path ./ZoKratesCLI/GeneratedInfo/proof.json" +
    " --proving-key-path ./ZoKratesCLI/PublicInfo/proving.key" +
    " --witness ./ZoKratesCLI/GeneratedInfo/witness";

  exec(generate_proof_cmd);

  utilities.sleep(1000);

  var proof = fs.readFileSync("./ZoKratesCLI/GeneratedInfo/proof.json", "utf8");

  proof = JSON.parse(proof);

  return proof;
}

module.exports = { GenerateProof };
