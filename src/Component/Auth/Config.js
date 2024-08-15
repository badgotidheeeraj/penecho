export const config = {
    appId:"f8448f27-dd2a-4a38-937b-3ceca9cfd89f",
    //    redirectUri: "http://localhost:3000",
   redirectUri: `${process.env.REACT_APP_BASE_URL_OF_OWN}`,
    scopes: [
        'user.read'
    ],
    authority: "https://login.microsoftonline.com/common",
};

