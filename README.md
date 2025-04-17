# stellar-start

Project Structure:

stellar-project/
├── index.ts              # TypeScript source code (Stellar application logic)
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript compiler configuration
├── node_modules/         # Installed dependencies
└── dist/
    └── index.js          # Compiled JavaScript (executable by Node.js)

Commands to Run the Project
Follow these steps in the Terminal to run the Stellar project.


1. Navigate to the Project Directory
bash

cd ~/Desktop/Projects/stellar-project
Purpose: Changes the working directory to stellar-project where index.ts and other files are located.
Verify: Check that index.ts, package.json, and tsconfig.json exist:
bash

ls
Expected output:
text

index.ts  package.json  tsconfig.json
You may also see node_modules/ and dist/ if previously set up.


2. Install Dependencies
bash

npm install
Purpose: Installs required packages (stellar-sdk, typescript, @types/node) listed in package.json.
Verify: Ensure node_modules/ is created and contains stellar-sdk:
bash

ls node_modules | grep stellar-sdk
If node_modules/ is missing or empty, check package.json for:
json

"dependencies": {
  "stellar-sdk": "^12.x.x",
  "@types/node": "^20.x.x",
  "typescript": "^5.x.x"
}
If dependencies are missing, install them explicitly:
bash

npm install stellar-sdk typescript @types/node


3. Verify tsconfig.json
Purpose: Ensure the TypeScript compiler is configured to compile index.ts to dist/index.js.
Command: Check tsconfig.json content:
bash

cat tsconfig.json
Expected Content:
json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  }
}
Fix: If tsconfig.json is missing, create it:
bash

npx tsc --init
Then edit tsconfig.json to match the above content using a text editor (e.g., nano tsconfig.json).


4. Compile the TypeScript Code
bash

npx tsc
Purpose: Compiles index.ts to dist/index.js using the TypeScript compiler (tsc) and settings from tsconfig.json.
Verify: Check that dist/index.js was created:
bash

ls dist
Expected output:
text

index.js
Fix: If compilation fails or dist/index.js is missing:
Check for errors in the Terminal output.
Ensure index.ts exists and has no syntax errors (it should match the provided code).
Run npx tsc --noEmit to diagnose TypeScript errors without generating files.


5. Run the Compiled JavaScript
bash

node dist/index.js
Purpose: Executes the compiled dist/index.js, which runs the Stellar application (creates accounts, funds them, and sends a 100 XLM payment).
Expected Output:
text

Sender Public Key: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Sender Secret: SXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Receiver Public Key: GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Accounts funded with 10,000 XLM each on testnet
Payment successful! Transaction hash: <transaction-hash>


Fix: If you get an error:
Module Not Found: Ensure dist/index.js exists and dependencies are installed.
Network Errors: Check internet connectivity or Stellar testnet status (status.stellar.org).
Share the error message for further debugging.