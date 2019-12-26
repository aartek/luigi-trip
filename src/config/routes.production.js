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
            viewUrl: 'https://trip-todo.web.app',
        },
        {
            pathSegment: 'car',
            label: 'My car',
            icon: 'car-rental',
            viewUrl: 'https://trip-calculator.web.app',
        },
        {
            pathSegment: 'calculator',
            label: 'Trip calculator',
            icon: 'simulate',
            loadingIndicator: {
                enabled: false
            },
            viewUrl: 'https://trip-calculator.web.app',
            anonymousAccess: true
        }
    ]
}];