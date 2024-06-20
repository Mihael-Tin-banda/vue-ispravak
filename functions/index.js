const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
  '786268764964-ls87mqsuecs253qcs9k20cu103o49vsp.apps.googleusercontent.com', // Replace with your client ID
  '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', // Replace with your client secret
  'https://www.googleapis.com/oauth2/v1/userinfo?alt=json' // This is a standard redirect URI; you can replace it if you have a custom one
);

exports.refreshToken = functions.https.onCall(async (data, context) => {
  const refreshToken = data.refreshToken;

  const {tokens} = await client.refreshToken(refreshToken);
  return {accessToken: tokens.access_token};
});
