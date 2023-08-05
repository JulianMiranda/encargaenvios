import auth from '@react-native-firebase/auth';
export const getToken = async (): Promise<string> => {
  try {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged(user => {
        if (user) {
          user
            .getIdToken()
            .then(function (idToken) {
              resolve(idToken);
            })
            .catch(() => resolve(''));
        } else {
          resolve('');
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    return '';
  }
};
export const getHeaders = async () => {
  const token = await getToken();
  const headers = new Headers({'Content-Type': 'application/json'});
  headers.set('Access-Control-Allow-Origin', '*');
  if (token) headers.set('x-token', token);
  return headers;
};

export const getPermissions = async (): Promise<{}> => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const {claims} = await user.getIdTokenResult();
        if (claims) resolve(claims);
        else resolve('');
      } else {
        resolve('');
      }
    });
  });
};
