import { jwtVerify, SignJWT } from "jose";
import {verify} from 'jsonwebtoken'

async function GenAccessToken(data) {
  var token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    // .setExpirationTime("1d")
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
}

async function VerifyToken(token) {
  try {
    const {payload} = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );


    return payload;
  } catch (error) {
    return false;
  }
}

export { GenAccessToken, VerifyToken };
