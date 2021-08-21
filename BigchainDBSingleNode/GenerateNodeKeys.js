const driver = require("bigchaindb-driver");
const base58 = require("bs58");
const crypto = require("crypto");
const util = require("util");
const { Ed25519Sha256 } = require("crypto-conditions");
const fs = require("fs");

const BigchainDB_API_Endpoint = "http://localhost:39984/api/v1/";
const BigchainDB_Connection = new driver.Connection(BigchainDB_API_Endpoint);

// Initial key generation
const extractor_keys = new driver.Ed25519Keypair();

fs.writeFileSync(
  "./BigchainDBSingleNode/Keys/node_keys.json",
  JSON.stringify(extractor_keys),
  function (err) {
    if (err) {
      console.log(err);
    }
  }
);
