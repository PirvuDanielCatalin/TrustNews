const { initialize } = require("zokrates-js/node");
var fs = require("fs");

var zokrates = initialize().then((zokratesProvider) => {
  const source =
    "def main(private u32 chosen_site_prime_nr, u32 product_of_primes) -> bool: \n" +
    "  return product_of_primes % chosen_site_prime_nr == 0 \n";

  // Compilation
  const program = zokratesProvider.compile(source);

  fs.writeFile("program.json", JSON.stringify(program), function (err) {
    if (err) {
      console.log(err);
    }
  });

  //Setup
  const keypair = zokratesProvider.setup(program.program);

  fs.writeFile("pk.json", JSON.stringify(keypair.pk), function (err) {
    if (err) {
      console.log(err);
    }
  });

  fs.writeFile("vk.json", JSON.stringify(keypair.vk), function (err) {
    if (err) {
      console.log(err);
    }
  });

  return;
});
