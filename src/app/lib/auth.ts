import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest } from 'next';

// Initialize Firebase Admin SDK once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

/**
 * Verifies a Firebase ID token passed in the Authorization header.
 * Throws an error if the token is missing or invalid.
 */
export async function verifyToken(req: NextApiRequest): Promise<string> {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) throw new Error('Unauthorized');

  const decodedToken = await getAuth().verifyIdToken(token);
  return decodedToken.uid;
}
