"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stellar_sdk_1 = require("stellar-sdk");
// Use testnet for development
const server = new stellar_sdk_1.Horizon.Server("https://horizon-testnet.stellar.org");
async function main() {
    try {
        // Generate two keypairs for sender and receiver
        const senderKeypair = stellar_sdk_1.Keypair.random();
        const receiverKeypair = stellar_sdk_1.Keypair.random();
        console.log("Sender Public Key:", senderKeypair.publicKey());
        console.log("Sender Secret:", senderKeypair.secret());
        console.log("Receiver Public Key:", receiverKeypair.publicKey());
        // Fund both accounts using Friendbot (testnet only)
        const friendbotUrlSender = `https://friendbot.stellar.org?addr=${senderKeypair.publicKey()}`;
        const friendbotUrlReceiver = `https://friendbot.stellar.org?addr=${receiverKeypair.publicKey()}`;
        await fetch(friendbotUrlSender);
        await fetch(friendbotUrlReceiver);
        console.log("Accounts funded with 10,000 XLM each on testnet");
        // Load sender's account
        const senderAccount = await server.loadAccount(senderKeypair.publicKey());
        // Create a payment transaction
        const transaction = new stellar_sdk_1.TransactionBuilder(senderAccount, {
            fee: stellar_sdk_1.BASE_FEE, // Use base fee for testnet
            networkPassphrase: stellar_sdk_1.Networks.TESTNET,
        })
            .addOperation(stellar_sdk_1.Operation.payment({
            destination: receiverKeypair.publicKey(),
            asset: stellar_sdk_1.Asset.native(), // XLM
            amount: "100", // Send 100 XLM
        }))
            .setTimeout(30)
            .build();
        // Sign the transaction
        transaction.sign(senderKeypair);
        // Submit the transaction
        const result = await server.submitTransaction(transaction);
        console.log("Payment successful! Transaction hash:", result.hash);
    }
    catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}
// Run the main function
main().catch((error) => console.error("Unexpected error:", error));
