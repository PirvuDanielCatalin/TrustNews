const driver = require("bigchaindb-driver");
const base58 = require("bs58");
const crypto = require("crypto");
const { Ed25519Sha256 } = require("crypto-conditions");

const util = require("util");

// const bigchaindb = require("./BigchainDBSingleNode/Create&Transfer.js");

const BigchainDB_API_Endpoint = "http://localhost:39984/api/v1/";
const BigchainDB_Connection = new driver.Connection(BigchainDB_API_Endpoint);

function CreateNews(
  title,
  content_of_news,
  proof,
  current_owner_public_key,
  current_owner_private_key
) {
  var asset = {
    title: title,
    content: content_of_news,
    proof: proof,
    datetime: new Date().toString(),
  };
  var metadata = null;
  var outputs = [
    driver.Transaction.makeOutput(
      driver.Transaction.makeEd25519Condition(current_owner_public_key)
    ),
  ];
  var issuers = current_owner_public_key;

  var tx = driver.Transaction.makeCreateTransaction(
    asset,
    metadata,
    outputs,
    issuers
  );

  var tx_signed = driver.Transaction.signTransaction(
    tx,
    current_owner_private_key
  );

  console.log();
  console.log(util.inspect(tx_signed, false, null, true));
  console.log();

  BigchainDB_Connection.postTransactionCommit(tx_signed).then((tx_received) => {
    console.log(
      "CREATE Transaction " + tx_received.id + " successfully posted."
    );
  });

  return tx_signed;
}

function TransferNews(inputs, new_owner_public_key, current_owner_private_key) {
  var metadata = null;
  var outputs = [
    driver.Transaction.makeOutput(
      driver.Transaction.makeEd25519Condition(new_owner_public_key)
    ),
  ];

  var tx = driver.Transaction.makeTransferTransaction(
    inputs,
    outputs,
    metadata
  );

  var tx_signed = driver.Transaction.signTransaction(
    tx,
    current_owner_private_key
  );
  // console.log();
  // console.log(util.inspect(tx_signed, false, null, true));
  // console.log();

  BigchainDB_Connection.postTransactionCommit(tx_signed).then((tx_received) => {
    console.log(
      "TRANSFER Transaction " + tx_received.id + " successfully posted."
    );
  });

  return tx_signed.id;
}

module.exports = { CreateNews, TransferNews };
