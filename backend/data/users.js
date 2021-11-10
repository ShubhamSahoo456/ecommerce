const bcrypt = require('bcrypt');

const users = [
    {
        name:"admin",
        email:"admin@admin.com",
        password:bcrypt.hashSync("1234",10),
        isAdmin:true
    },
    {
        name:"shubham sahoo",
        email:"shubham@gmail.com",
        password:bcrypt.hashSync("1234",10)
    },
    {
        name:"sohan sahoo",
        email:"sohan@gmail.com",
        password:bcrypt.hashSync("1234",10)
    },
]

module.exports = users;