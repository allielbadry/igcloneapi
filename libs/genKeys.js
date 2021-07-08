const crypto = require("crypto");
const fs = require("fs");
const { join } = require("path");

/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */

function generateKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Private Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });
  // create the public key
  fs.writeFileSync(
    join(__dirname, "..", "/keys/rsa_id_pub.pem"),
    keyPair.publicKey
  );
  // create the private key
  fs.writeFileSync(
    join(__dirname, "..", "/keys/rsa_id_priv.pem"),
    keyPair.privateKey
  );
}

// run the function to generate the keys
generateKeyPair();
