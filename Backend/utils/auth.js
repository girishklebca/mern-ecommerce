import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPasswordFunction = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Hashed password :true`);
    return hash;
  } catch (error) {
    console.log(error.message);
  }
};

const comparePasswordFunction = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    console.log(error.message);
  }
};

const generateTokenFunction = async (payload) => {
  try {
    const token = jwt.sign({ payload }, "MySecret", { expiresIn: "24h" });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

export { hashPasswordFunction, comparePasswordFunction, generateTokenFunction };
