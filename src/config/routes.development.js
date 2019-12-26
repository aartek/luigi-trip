export const nodes = [{
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
        },
        {
            pathSegment: 'car',
            label: 'My car',
            icon: 'car-rental',
            viewUrl: 'http://localhost:8081',
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
        }
    ]
}];
