
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken"

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options)); //실행한 결과물을 client에 할당
  return client.sendMail(email); //sendmail은 promise 함수 return
};

export const sendSecretMail = (adress, secret) => { 
    const email = {
        from: "choi@prismagram.com",
        to: adress,
        subject : "Login Secret for Prismagram",
        html: `Hello! Your login secret is <h1>${secret}</h1>.<br/> Copy paste on the app/website to log in`
    };
    return sendMail(email) //sendMail을 return
}

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);