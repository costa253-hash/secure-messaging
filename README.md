# Secure Messaging API - Backend Coding Challenge

This project is a solution to the Backend Coding Challenge from Swizil Ltd. It is designed to test backend skills, including API design, encryption, debugging, and secure data handling.

### 🔐 Challenge Overview
The task was to build a secure messaging backend with the following features:
1. Store encrypted messages for users using AES encryption.
2. Allow only the original user to decrypt and retrieve their messages.
3. Debug and fix a broken decryption function.

### ⏱ Time Limit
The challenge is designed to be completed within **60-90 minutes**. However, additional time can be spent refining and improving the solution.

### 🎯 Objectives:
1. Store encrypted messages per user using AES encryption.
2. Decrypt messages only for the original user who encrypted them.
3. Fix the broken decryption logic.

---

## 📦 Required Endpoints

1. POST /messages
   - Stores an encrypted message for a user.
   - Encrypts the message using AES-256 encryption before storage.

2. GET /messages/:userId
   - Retrieves all messages for the specified user.
   - Decrypts messages before returning them to the user.

3. POST /debug/decrypt
   - Fixes the broken decryption function provided in the task.
   - Provides an explanation of the fix.

---

## 🔐 Encryption Rules
- Encryption method: AES (AES-256) encryption.
- Encryption library: `crypto` (Node.js).
- IV (Initialization Vector): A random IV is generated per message and embedded in the encrypted payload for decryption.

The encrypted values are stored in base64 format.

---

## 🧠 Design Considerations

1. Encryption Method:
   I chose AES-256-CBC because it is widely considered secure and is commonly used for encrypting sensitive data. The CBC (Cipher Block Chaining) mode ensures that the encryption is not deterministic and requires an IV for each message.

2. Ensuring Original User Access:
   Each user’s message is encrypted with a key derived from the user’s userId. Only the user with the correct `userId` will be able to decrypt the message.

3. IV Storage:
   The IV is stored within the encrypted message so it can be extracted and used during the decryption process. The IV is random for each message to ensure that identical messages encrypted multiple times do not produce the same ciphertext.

4. Preventing User ID Spoofing:
   By using a user-specific key derived from the user’s `userId`, the system ensures that only users with the correct `userId` can decrypt their messages. Additionally, any unauthorized access attempts will result in decryption failures.

---

## 🐞 Debugging Task

A broken decryption function was provided in the challenge. I have identified and fixed the issues in the function and written test cases to validate the fix.

---

## ✅ Evaluation Criteria

- Encryption/Decryption Logic: The encryption and decryption logic is fully functional, and only the user who encrypted the message can decrypt it.
- Code Structure: The code is clean, modular, and follows best practices.
- Security: Secure handling of messages and per-user access is ensured through AES encryption and proper IV management.
- Design Explanation: A thoughtful explanation of the design decisions is provided in the comments and the README.

---

## 🚀 Bonus (Optional)

- Message Expiry: I implemented a feature to automatically delete messages after 10 minutes of creation.
- Authentication: Basic token-based authentication was added.
- Unit Tests: Unit tests were written for encryption, storage, and retrieval.

---

## 📥 Submission

To run this project locally, follow these steps:

### Prerequisites
- Node.js (>=12.0.0)
- npm (>=6.0.0)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/costa253-hash/secure-messaging.git
   ```

2. Navigate into the project folder:
   ```bash
   cd secure-messaging
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. The API will be running on `http://localhost:3000`.

---

### Answers to Design Questions:

1. Encryption Method: I used AES-256-CBC for encryption, as it is widely regarded as secure. I used the `crypto` module in Node.js for encryption and decryption.
2. User Access: Each user’s messages are encrypted using a key derived from their `userId`. This ensures only the user with the correct ID can decrypt their messages.
3. IV Handling: A random IV is generated for each message and stored along with the message to be used during decryption.
4. User ID Spoofing Prevention: The key for AES encryption is based on the user's `userId`, which ensures that only the authorized user can decrypt their own messages.

---

## Assumptions and Constraints:

- The `userId` is unique for each user.
- The system handles only one user at a time, and it is assumed that the user will provide valid `userId` values for storing and retrieving messages.

---

### License

MIT License
