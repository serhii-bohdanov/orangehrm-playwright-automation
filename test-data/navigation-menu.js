const NavigationMenu = Object.freeze({
    ADMIN: {
        name: 'Admin',
        expectedHeader: 'User Management',
    },

    PIM: {
        name: 'PIM',
        expectedHeader: 'PIM',
    },

    LEAVE: {
        name: 'Leave',
        expectedHeader: 'Leave',
    },

    TIME: {
        name: 'Time',
        expectedHeader: 'Timesheets',
    },

    RECRUITMENT: {
        name: 'Recruitment',
        expectedHeader: 'Recruitment',
    },

    MY_INFO: {
        name: 'My Info',
        expectedHeader: 'PIM',
    },

    PERFORMANCE: {
        name: 'Performance',
        expectedHeader: 'Manage Reviews',
    },

    DASHBOARD: {
        name: 'Dashboard',
        expectedHeader: 'Dashboard',
    },

    DIRECTORY: {
        name: 'Directory',
        expectedHeader: 'Directory',
    },

    MAINTENANCE: {
        name: 'Maintenance',
        skip: true,
    },

    CLAIM: {
        name: 'Claim',
        expectedHeader: 'Claim',
    },

    BUZZ: {
        name: 'Buzz',
        expectedHeader: 'Buzz',
    },
});

module.exports = { NavigationMenu };