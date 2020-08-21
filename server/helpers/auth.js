const admin = require('firebase-admin');

const serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://gqlreactnode-66.firebaseio.com',
});

exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log('current user', currentUser);
    return currentUser;
  } catch (error) {
    console.log('AUTH CHECK ERROR', error);
    throw new Error('Invalid or expired token');
  }
};

/* 練習用
exports.authCheck = (req, res, next = (f) => f) => {
  if (!req.headers.authtoken) throw new Error('unauthorized');
  // token validity check

  const valid = req.headers.authtoken === 'secret';

  if (!valid) {
    throw new Error('unauthorized');
  } else {
    next();
  }
};
*/
