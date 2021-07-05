
const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://yskre30ma7.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_nMl2Znmzc",
    APP_CLIENT_ID: "236mk422u8t3r46a552r1i4js0",
    DOMAIN: 'https:/ayusha-countdown.auth.us-east-1-amazoncognito.com',
    SIGNIN_REDIRECT_URL: 'http://localhost:3000/',
    SIGNOUT_REDIRECT_URL: 'http://localhost:3000/'
  }
};

export default prod;