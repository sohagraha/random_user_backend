const users = require('../public/users.json');
const fs = require('fs');
'use strict';

module.exports.getAllUsers = (req, res) => {
    let { limit } = req.query;
    console.log(limit);
    if (limit) {
        const limitedUsers = users.slice(0, +limit);
        res.json({ success: true, data: limitedUsers, message: "Limited users", status: 200 });
    }
    else {
        res.json({ success: true, data: users, message: "All users", status: 200 });
    }
}

module.exports.getRandomUser = (req, res) => {


    const randomUserFunc = () => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (randomUser) {
            return randomUser;
        } else {
            return randomUserFunc();
        }
    }
    const randomUser = randomUserFunc();
    res.json({ success: true, data: randomUser, message: "Random user", status: 200 });
}

module.exports.createUser = (req, res) => {

    const { id, name, gender, contact, address, photoUrl } = req.body;

    if (id === undefined || !name || !gender || !contact || !address || !photoUrl) {
        res.json({ success: false, data: null, message: "Please fill all the fields", status: 400 });
    }
    else {
        const uniqueId = users[users.length - 1].id + 1;
        if (uniqueId > id && id !== 0) {
            res.json({ success: false, data: null, message: "Please enter unique id", hint: `Enter ${uniqueId} or 0 if you don't know unique id we will create unique id for you :)`, status: 400 });
        }
        else {
            const user = users.find(user => user.id === +id);
            if (user) {
                res.json({ success: false, data: null, message: "User already exists with this id", hint: `Enter ${uniqueId} or 0 if you don't know unique id we will create unique id for you :)`, status: 400 });
            } else {
                const newUser = { id: id || uniqueId, name, gender, contact, address, photoUrl };
                users.push(newUser);
                fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        res.json({ success: false, data: null, message: "Error while writing to file", status: 500 });
                    } else {
                        res.json({ success: true, data: newUser, message: "User created", status: 200 });
                    }
                }
                );

            }
        }

    }
}

module.exports.updateUser = (req, res) => {
    const {
        id,
        data
    } = req.body;
    const user = users.find(user => user.id === +id);
    if (user) {
        user.id = data.id || user.id;
        user.name = data.name || user.name;
        user.address = data.address || user.address;
        user.contact = data.contact || user.contact;
        user.gender  = data.gender || user.gender;
        user.photoUrl = data.photoUrl || user.photoUrl;

        fs.writeFile('./public/users.json', JSON.stringify(users), (err) => {
            if (err) {
                res.json({ success: false, data: null, message: "Error while writing to file", status: 500 });
            } else {
                res.json({ success: true, data: user, message: "User updated", status: 200 });
            }
        }
        );
    }
    else {
        res.json({ success: false, data: null, message: "User not found", status: 404 });
    }
}



module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === +id);
    if (user) {
        const newUsers = users.filter(user => user.id !== +id);
        fs.writeFile('./public/users.json', JSON.stringify(newUsers), (err) => {
            if (err) {
                res.json({
                    success: false, data: null, message
                        : "Error while writing to file", status: 500
                });
            } else {
                res.json({
                    success: true, data: null, message
                        : "User deleted", status: 200
                });
            }
            users = newUsers;
        });
    } else {
        res.json({
            success: false, data: null, message
                : "User not found", status: 404
        });
    }
}




