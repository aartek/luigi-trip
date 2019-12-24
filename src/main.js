import '@kyma-project/luigi-core/luigi'
import "./scss/main.scss"

function createContext(){
    return {
        idToken: window.localStorage.getItem('luigi.auth') ?
                    JSON.parse(window.localStorage.getItem('luigi.auth')).idToken : null 
    }
}

const nodes = [{
    pathSegment: 'trip',
    hideFromNav: true,
    anonymousAccess: true,
    children: [{
            pathSegment: 'weather',
            label: 'Weather',
            icon: 'weather-proofing',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: 'http://pogoda.aknakn.eu',
            anonymousAccess: true
        },
        {
            pathSegment: 'todo',
            label: 'To-Do',
            icon: 'list',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: 'http://localhost:8082',
            context: createContext()
        },
        {
            pathSegment: 'car',
            label: 'My car',
            icon: 'car-rental',
            viewUrl: 'http://localhost:8081',
            context: createContext()
        },
        {
            pathSegment: 'calculator',
            label: 'Trip calculator',
            icon: 'simulate',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: 'http://localhost:4200',
            anonymousAccess: true,
            context: createContext()
        }
    ]
}];

const config = {
    settings: {
        responsiveNavigation: 'semiCollapsible',
        header: {
            // logo: "/assets/images/logo.svg",
            logo: '',
            title: "Trip"
        }
    },
    routing: {
        // uses hash based navigation if set to true
        useHashRouting: true,
        nodeParamPrefix: "~"
    },
    // navigation structure and settings
    navigation: {
        nodes: nodes
    },
    auth: {
        use: 'oAuth2ImplicitGrant',
        oAuth2ImplicitGrant: {
            authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            logoutUrl: '/',
            oAuthData: {
                client_id: '720905686784-vds0igf53jlbkilm8cq0t3fg3m3u5kka.apps.googleusercontent.com',
                scope: 'openid https://www.googleapis.com/auth/userinfo.email profile',
                redirect_uri: '/callback.html',
                response_type: 'id_token token',
                nonce: 'blah'
            },
            logoutFn: async (settings, authData, logoutCallback) => {
                await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${authData.accessToken}`)
                logoutCallback()
            }
        },
        disableAutoLogin: true,
    }
};
window.Luigi.setConfig(config);