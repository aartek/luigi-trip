import '@kyma-project/luigi-core/luigi'
import "./scss/main.scss"

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
            pathSegment: 'car',
            label: 'My car',
            icon: 'car-rental',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: ''
        },
        {
            pathSegment: 'calculator',
            label: 'Trip calculator',
            icon: 'simulate',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: '',
            anonymousAccess: true
        },
        {
            pathSegment: 'todo',
            label: 'To-Do',
            icon: 'list',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: 'http://localhost:8081',
            context: {
                identity: JSON.parse(window.localStorage.getItem('luigi.auth.identity'))
            }
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
                // optional parameters
                redirect_uri: '/callback.html',
                response_type: 'token',
                // all specified values inside oAuthData will be added to the oauth call, i.e display="popup",
            },
            // optional functions
            nonceFn: () => {},
            userInfoFn: async function(){
                const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + authData.accessToken
                    }
                })
                const json = await response.json()
                window.localStorage.setItem('luigi.auth.identity', JSON.stringify(json))
            },
            logoutFn: async (settings, authData, logoutCallback) => {
                await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${authData.accessToken}`)
                logoutCallback()
            },
            accessTokenExpiringNotificationTime: 60,
            expirationCheckInterval: 5
        },
        disableAutoLogin: true
    }
};

console.log(config)
window.Luigi.setConfig(config);