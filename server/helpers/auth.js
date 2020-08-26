const admin = require('firebase-admin');

const serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://gqlreactnode-66.firebaseio.com',
});

exports.authCheck = async (req) => {
  try {
    // firebase authのユーザー情報
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log('current user', currentUser);
    return currentUser;
  } catch (error) {
    console.log('AUTH CHECK ERROR', error);
    throw new Error('Invalid or expired token');
  }
};

exports.authCheckMiddleware = (req, res, next) => {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((result) => {
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.json({ error: 'unauthorized' });
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
