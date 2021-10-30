import {
  getApps,
  initializeApp,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount: ServiceAccount = {
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  ),
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
};

export const adminFirebase = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : getApp();

export const adminAuth = getAuth(adminFirebase);
