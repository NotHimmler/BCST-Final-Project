var dbHandler = require('./db-handler');

test('add user adds a user', () => {
    //Remove user we want to add to make sure it doesn't exist
    dbHandler.removeUserInfo({userid: "asdf"});

    dbHandler.registerHandler({"userid": "asdf",
    "email": "asdf",
    "registeredOn": new Date(),
    "admin": false,
    "username": "asdf",
    "password": "asdf"
    }).then((result) => {
        expect(!result.error);

        //clean up
        dbHandler.removeUserInfo({userid: "asdf"});
    })
})

test('adding an existing user gives an error', () => {
    dbHandler.removeUserInfo({userid: "asdf"});

    dbHandler.registerHandler({"userid": "asdf",
    "email": "asdf",
    "registeredOn": new Date(),
    "admin": false,
    "username": "asdf",
    "password": "asdf"
    }).then((result) => {
        expect(!result.error);
        dbHandler.registerHandler({"userid": "asdf",
        "email": "asdf",
        "registeredOn": new Date(),
        "admin": false,
        "username": "asdf",
        "password": "asdf"
        }).then((result) => {
            expect(result.error);
            dbHandler.removeUserInfo({userid: "asdf"});
        })
    })
})