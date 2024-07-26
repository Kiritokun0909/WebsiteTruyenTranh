const admin = require('firebase-admin');
const serviceAccount = require('./firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://storage-manga-website.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
