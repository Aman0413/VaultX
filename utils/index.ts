import CryptoJS from "crypto-js";

const secretKey = process.env.ENCRYPTION_SECRET!;

export const handlePassword = (
  password: string,
  operation: "encrypt" | "decrypt" = "encrypt"
) => {
  if (operation === "encrypt") {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  } else if (operation === "decrypt") {
    const bytes = CryptoJS.AES.decrypt(password, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    throw new Error("Invalid operation. Please use 'encrypt' or 'decrypt'.");
  }
};
