const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const functions = require('firebase-functions');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  '786268764964-ls87mqsuecs253qcs9k20cu103o49vsp.apps.googleusercontent.com', // Replace with your client ID
  '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', // Replace with your client secret
  'https://steps-da687.firebaseapp.com/__/auth/handler' // Redirect URI for Firebase Auth
);

exports.refreshToken = functions.https.onCall(async (data, context) => {
  const refreshToken = data.refreshToken;

  try {
    const { tokens } = await client.refreshToken(refreshToken);
    return { accessToken: tokens.access_token };
  } catch (error) {
    logger.error('Error refreshing token:', error);
    throw new functions.https.HttpsError('unauthenticated', 'Failed to refresh access token');
  }
});
