const { exec } = require("child_process");
const utilities = require("../Utilities/General.js");

const util = require("util");
const fs = require("fs");

function VerifyProof(proof) {
  fs.writeFileSync(
    "./ZoKratesCLI/GeneratedInfo/proof_verified.json",
    JSON.stringify(proof),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  utilities.sleep(1000);

  verify_cmd =
    "zokrates verify" +
    " --proof-path ./ZoKratesCLI/GeneratedInfo/proof_verified.json" +
    " --verification-key-path ./ZoKratesCLI/PublicInfo/verification.key";

  exec(verify_cmd, (error, stdout, stderr) => {
    if (error) {
      console.log("Error: " + error.message);
      return;
    }
    if (stderr) {
      console.log("Stderr: " + stderr);
      return;
    }
    console.log(stdout);
  });
}

module.exports = { VerifyProof };
