const { initialize } = require("zokrates-js/node");
const fs = require("fs");
const util = require("util");

var zokrates = initialize().then((zokratesProvider) => {
  const source =
    "def main(private u32 chosen_site_prime_nr, u32 product_of_primes) -> bool: \n" +
    "  return product_of_primes % chosen_site_prime_nr == 0 \n";

  // Compilation
  const program = zokratesProvider.compile(source);

  //Setup
  const keypair = zokratesProvider.setup(program.program);

  // Computation
  const { witness, output } = zokratesProvider.computeWitness(program, [
    "5",
    "19635",
  ]);

  // Generate proof
  const proof = zokratesProvider.generateProof(
    program.program,
    witness,
    keypair.pk
  );
  console.log("\n");
  console.log(util.inspect(proof, false, null, true));
  console.log("\n");

  // Verify proof
  const verif_proof = zokratesProvider.verify(keypair.vk, proof);

  return;
});
