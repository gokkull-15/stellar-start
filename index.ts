import { Horizon, Keypair, Networks, TransactionBuilder, Operation, Asset, BASE_FEE } from "stellar-sdk";

// Use testnet for development
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

async function main(): Promise<void> {
  try {
    // Generate two keypairs for sender and receiver
    const senderKeypair: Keypair = Keypair.random();
    const receiverKeypair: Keypair = Keypair.random();

    console.log("Sender Public Key:", senderKeypair.publicKey());
    console.log("Sender Secret:", senderKeypair.secret());
    console.log("Receiver Public Key:", receiverKeypair.publicKey());

    // Fund both accounts using Friendbot (testnet only)
    const friendbotUrlSender: string = `https://friendbot.stellar.org?addr=${senderKeypair.publicKey()}`;
    const friendbotUrlReceiver: string = `https://friendbot.stellar.org?addr=${receiverKeypair.publicKey()}`;
    await fetch(friendbotUrlSender);
    await fetch(friendbotUrlReceiver);
    console.log("Accounts funded with 10,000 XLM each on testnet");

    // Load sender's account
    const senderAccount: Horizon.AccountResponse = await server.loadAccount(senderKeypair.publicKey());

    // Create a payment transaction
    const transaction = new TransactionBuilder(senderAccount, {
      fee: BASE_FEE, // Use base fee for testnet
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: receiverKeypair.publicKey(),
          asset: Asset.native(), // XLM
          amount: "100", // Send 100 XLM
        })
      )
      .setTimeout(30)
      .build();

    // Sign the transaction
    transaction.sign(senderKeypair);

    // Submit the transaction
    const result = await server.submitTransaction(transaction);
    console.log("Payment successful! Transaction hash:", result.hash);
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
}

// Run the main function
main().catch((error) => console.error("Unexpected error:", error));