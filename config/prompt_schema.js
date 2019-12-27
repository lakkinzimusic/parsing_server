module.exports = {
    scenario: {
        type: 'list',
        name: 'scenario',
        message: 'What are you want to do?',
        choices: ['parsing', 'reading', 'cleaning database'],
        default: 'parsing'
    },
    search: [
        {
            name: 'header',
            message: 'Header: ',
            default: '',
        },
        {
            name: 'domen',
            message: 'Domen',
            default: 'google.com',
        },
    ],
    end_of_reading: {
        message: "Would you like to end reading?",
        type: "confirm",
        name: "end_of_reading",
        default: false
    }


}