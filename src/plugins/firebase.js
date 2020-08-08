import Vue from 'vue'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

const firebaseApp = firebase.initializeApp({
  // ここにfirebaseのapi情報をコピペします。
  apiKey: "AIzaSyBE_Rm6QanzA-VZTu8qCWM1bQUMLMnp6ow",
  authDomain: "vue-bord-39ce4.firebaseapp.com",
  databaseURL: "https://vue-bord-39ce4.firebaseio.com",
  projectId: "vue-bord-39ce4",
  storageBucket: "vue-bord-39ce4.appspot.com",
  messagingSenderId: "442754989670",
  appId: "1:442754989670:web:f84d0fdf5c3a72d61ab7a7",
  measurementId: "G-VV6KM1K06G"

});

export const db = firebaseApp.firestore();