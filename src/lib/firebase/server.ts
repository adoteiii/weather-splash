"use server";
import crypto from "crypto";

// import { PayStackVerificationDataResponse } from "@/payment/paystackapi/paystacktypes";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { WriteBatch, getFirestore } from "firebase-admin/firestore";


import toast from "react-hot-toast";
import { v4 } from "uuid";

const PAYMENT_TIMEOUT = 90; // 1:30 minutes
var credentials = {
  type: process.env.ADMIN_TYPE,
  project_id: process.env.ADMIN_PROJECT_ID,
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_PRIVATE_KEY,
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: process.env.ADMIN_AUTH_URI,
  token_uri: process.env.ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_CLIENT_CERT_URL,
  universe_domain: process.env.ADMIN_UNIVERSE_DOMAIN,
};

const apps = getApps();
// console.log(apps);

const serverapps = apps.filter((item) =>
  item.name === "[DEFAULT]" ? true : false
);
if (!serverapps.length) {
  // console.log("initized");
  initializeApp({
    credential: cert(credentials as any),
  });
} else {
  // console.log("Already init");
}

const db = getFirestore();

