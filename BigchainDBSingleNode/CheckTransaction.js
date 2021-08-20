const axios = require("axios");
const util = require("util");

const BigchainDB_API_Endpoint = "http://localhost:39984";

async function CheckTransaction(transaction_id) {
  let check_request = await axios
    .get(BigchainDB_API_Endpoint + "/api/v1/transactions/" + transaction_id)
    .then((response) => {
      console.log(
        "> ######################################################################"
      );
      console.log(util.inspect(response.data, false, null, true));
      console.log(
        "> ######################################################################"
      );
    });
}

module.exports = { CheckTransaction };
