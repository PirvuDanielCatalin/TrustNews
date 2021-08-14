const driver = require("bigchaindb-driver");
const base58 = require("bs58");
const crypto = require("crypto");
const util = require("util");
const { Ed25519Sha256 } = require("crypto-conditions");
const fs = require("fs");

const BigchainDB_API_Endpoint = "http://localhost:9981/api/v1/";
const BigchainDB_Connection = new driver.Connection(BigchainDB_API_Endpoint);

// Initial key generation
// const extractor_keys = new driver.Ed25519Keypair();

// fs.writeFile("keys.json", JSON.stringify(extractor_keys), function (err) {
//   if (err) {
//     console.log(err);
//   }
// });

// return

// Use the same generated key pair
var extractor_keys = fs.readFileSync("keys.json", "utf8");
extractor_keys = JSON.parse(extractor_keys);

function CreateNews(content_of_news, proof) {
  var asset = {
    content: content_of_news,
    proof: proof,
    datetime: new Date().toString(),
  };
  var metadata = null;
  var outputs = [
    driver.Transaction.makeOutput(
      driver.Transaction.makeEd25519Condition(extractor_keys.publicKey)
    ),
  ];
  var issuers = extractor_keys.publicKey;

  var tx = driver.Transaction.makeCreateTransaction(
    asset,
    metadata,
    outputs,
    issuers
  );

  var tx_signed = driver.Transaction.signTransaction(
    tx,
    extractor_keys.privateKey
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

function TransferNews(inputs, new_owner_public_key) {
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
    extractor_keys.privateKey
  );
  console.log();
  console.log(util.inspect(tx_signed, false, null, true));
  console.log();

  BigchainDB_Connection.postTransactionCommit(tx_signed).then((tx_received) => {
    console.log(
      "TRANSFER Transaction " + tx_received.id + " successfully posted."
    );
  });

  return tx_signed.id;
}

function Main_Example() {
  var content_of_news =
    'An innocent campaigner arrested after downloading and tweeting documents he says he found in a Google search, says the experience was "horrendous".' + "\n" +
    "Police suspected Robert Hutchinson had breached the Computer Misuse Act by downloading board meeting minutes and other documents he found online." + "\n" +
    "Mr Hutchinson says the Leathermarket Community Benefit Society (CBS) documents were publicly accessible. After an investigation, police found no offences had been committed." + "\n" +
    "Leathermarket CBS is a community-led housing partnership, whose purpose is to provide council homes for local residents." + "\n" +
    "It is proposing to build new council homes on an outdoor sports court at the Elim Estate in Bermondsey. South London." + "\n" +
    "Mr Hutchinson, who says he has the support of the majority of residents, opposes the development." + "\n" +
    "He says he discovered board meeting minutes and other Leathermarket CBS documents online in February, using a Google search of the open web, and downloaded them." + "\n" +
    "None of the documents had any marking to suggest that they were confidential, nor were they protected by a password, he says." + "\n" +
    "He believed they were the type of material an organisation like Leathermarket CBS would and should publish." + "\n" +
    "A screengrab taken by Mr Hutchinson and shared with The Register appears to show Leathermarket minutes appearing in Google results." + "\n" +
    "Mr Hutchinson saw no issue downloading what he regarded as public documents, but the CBS disagrees." + "\n" +
    'Leathermarket said in a statement that the documents "were stored on a password protected page on the CBS website for directors".' + "\n" +
    'It added: "When it came to the CBS\'s attention that confidential information had been accessed and subsequently shared via Twitter, the CBS reported the data breach to the police - who requested a full log of visitor access to the website before deciding whether or not to progress.";';

  var proof = {
    proof: {
      a: [
        "0x2be64987ee12ee38c5ca17c28c1c9729866ad21e1c9f0a930b05cf46a1e50d2d",
        "0x032972fff2834b4c1d7ebae9e27e89e2de8617308a3ffbe20ab66c529474cf55",
      ],
      b: [
        [
          "0x2958312a8f523b5430d9632289c253d607653fba8d344ae2c2921a1f4b2ec06f",
          "0x2938b0e17880fdcafa9010b96e2b964f82db13470bf37feeccb4e83c81dca424",
        ],
        [
          "0x297ef92862770827b53a9e7295c2d3d4f184a22c5c95d8564df7f8a700e8bfe1",
          "0x10ff398747888cefe5bb35dfefbf836ef5c11183028059bc37536f7a4e0fb72b",
        ],
      ],
      c: [
        "0x0054a1f4b1803aace424ad18f40403600352fecc23c55b6fc06635926f2e60e7",
        "0x2a9951b1958900fefbec560b4c2670d79b7a116ac3175a22c49febfbae604798",
      ],
    },
    inputs: [
      "0x0000000000000000000000000000000000000000000000000000000000004cb3",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ],
  };

  var create_tx_id = CreateNews(content_of_news, proof);
}

Main_Example();
