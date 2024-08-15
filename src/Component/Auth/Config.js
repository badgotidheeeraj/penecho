const isLocalhost = window.location.hostname === "localhost";

export const config = {
    appId: "f8448f27-dd2a-4a38-937b-3ceca9cfd89f",
    redirectUri: isLocalhost ? "http://localhost:3000" : "https://penecho.vercel.app",
    scopes: [
        'user.read'
    ],
    authority: "https://login.microsoftonline.com/common",
};
