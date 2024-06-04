<template>
    <div>
      <button id="Authenticate" @click="authenticate">Authenticate</button>
      <button id="Get_KK" @click="handleRequest">Get KK</button>
    </div>
  </template>
  
  <script>
  import { updateUserCoins } from './data.js';
  
  export default {
    data() {
      return {
        config: {
          web: {
            client_id: "786268764964-07k8euka1hg47u2amgl6fe5u4fko9j81.apps.googleusercontent.com",
            project_id: "pristine-ally-417110",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_secret: "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",
            redirect_uris: ["https://mihael-tin-banda.github.io"],
            javascript_origins: ["https://mihael-tin-banda.github.io"],
          },
        },
        steps_sub: 0,
        Balance: 0,
      };
    },
    methods: {
      getParameterByName(name) {
        var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      },
      authenticate() {
        var clientId = this.config.web.client_id;
        var redirectUri = this.config.web.redirect_uris[0];
        var scope = "https://www.googleapis.com/auth/fitness.activity.read";
        var authUrl =
          this.config.web.auth_uri +
          "?client_id=" +
          clientId +
          "&redirect_uri=" +
          redirectUri +
          "&scope=" +
          scope +
          "&response_type=token";
        window.location.href = authUrl;
      },
      handleRequest() {
        // Your handleRequest function here
      },
      refreshToken() {
        // Your refreshToken function here
      },
    },
    mounted() {
      var accessToken = this.getParameterByName('access_token');
      console.log('Access token from URL:', accessToken);
      if (accessToken) {
          sessionStorage.setItem('access_token', accessToken);
      }
      setInterval(() => {
        var now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          this.steps_sub = 0;
        }
      }, 60000); // Check every minute
    },
  };
  </script>
  
  <style>
  </style>