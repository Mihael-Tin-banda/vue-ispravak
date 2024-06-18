const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(
  '786268764964-07k8euka1hg47u2amgl6fe5u4fko9j81.apps.googleusercontent.com', // Replace with your client ID
  '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', // Replace with your client secret
  'https://developers.google.com/oauthplayground' // This is a standard redirect URI; you can replace it if you have a custom one
);

exports.refreshToken = functions.https.onCall(async (data, context) => {
  const refreshToken = data.refreshToken;

  const {tokens} = await client.refreshToken(refreshToken);
  return {accessToken: tokens.access_token};
});
