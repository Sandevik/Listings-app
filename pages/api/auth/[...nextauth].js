import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyDtOGh5KQFWYY6xsKYEn_-el4-q370MOME",
    authDomain: "rent-me-183b4.firebaseapp.com",
    projectId: "rent-me-183b4",
    storageBucket: "rent-me-183b4.appspot.com",
    messagingSenderId: "455505220850",
    appId: "1:455505220850:web:ea263a9163d4437a656c6b",
    measurementId: "G-5BBQXRWVGE"
    // Optional emulator config (see below for options)
    
  }),
  // ...
});