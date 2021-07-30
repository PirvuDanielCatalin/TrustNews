// Dependencies
const driver = require("bigchaindb-driver");
const base58 = require("bs58");
const crypto = require("crypto");
const util = require('util')
const {Ed25519Sha256} = require("crypto-conditions");

// Constrants
const BigchainDB_API_Endpoint = "http://localhost:9981/api/v1/";
const BigchainDB_Connection = new driver.Connection(BigchainDB_API_Endpoint);

const extractor = new driver.Ed25519Keypair();

function CreateNews(content_of_news) {
    var asset = {
        content: content_of_news,
        datetime: new Date().toString()
    };
    var metadata = null;
    var outputs = [
        driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(extractor.publicKey)
        ),
    ];
    var issuers = extractor.publicKey;

    var tx = driver.Transaction.makeCreateTransaction(asset, metadata, outputs, issuers);

    // console.log()
    // console.log(util.inspect(tx, false, null, true));
    // console.log()

    var tx_signed = driver.Transaction.signTransaction(tx, extractor.privateKey);
    console.log()
    console.log()
    console.log(util.inspect(tx_signed, false, null, true));
    console.log()
    console.log()

    BigchainDB_Connection
        .postTransactionCommit(tx_signed)
        .then((tx_received) => {
                console.log("CREATE Transaction ", tx_received.id, " successfully posted.")
            }
        )

    // return tx_signed.id;
    return tx_signed;

}

function TransferNews(inputs, new_owner_public_key) {
    var metadata = null;
    var outputs = [
        driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(new_owner_public_key)
        )
    ];

    var tx = driver.Transaction.makeTransferTransaction(inputs, outputs, metadata);
    // console.log(tx);

    var tx_signed = driver.Transaction.signTransaction(tx, extractor.privateKey);
    console.log()
    console.log()
    console.log(util.inspect(tx_signed, false, null, true));
    console.log()
    console.log()

    BigchainDB_Connection
        .postTransactionCommit(tx_signed)
        .then((tx_received) => {
                console.log("TRANSFER Transaction ", tx_received.id, " successfully posted.")
            }
        )
    return tx_signed.id;
}

var content_of_news = "The content of a news story taken from a trusted site";
var create_tx_id = CreateNews(content_of_news)
// var create_tx = BigchainDB_Connection.getTransaction(create_tx_id)
var create_tx = create_tx_id

var inputs = [{tx: create_tx, output_index: 0}];
const extractor2 = new driver.Ed25519Keypair();
var new_owner_public_key = extractor2.privateKey;
var transfer_tx = TransferNews(inputs, new_owner_public_key);

return 0;