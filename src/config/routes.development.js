export const nodes = [
  {
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
      viewUrl: 'https://trip-weather.web.app',
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
        viewUrl: 'https://trip-my-car.web.app',
      },
      {
        pathSegment: 'calculator',
        label: 'Trip calculator',
        icon: 'simulate',
        loadingIndicator: {
          enabled: false
        },
        viewUrl: 'https://trip-calculator-1de37.web.app',
        anonymousAccess: true,
      }
    ]
  },
  {
    pathSegment: 'settings',
    label: 'Settings',
    icon: 'action-settings',
    viewUrl: 'settings.html',
    anonymousAccess: true,
    hideSideNav: true,
    loadingIndicator: {
      enabled: false
    },
    children: []
  }
];
