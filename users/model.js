const db = require('../data/db-config');

module.exports = {
    list,
    findByID,
    insert,
};

function list() {
    return db.select("*").from("users");
}

function findByID(id) {
    return db.select("*").from("users").where({ id });
}

function insert(user) {
    return db("users").insert(user);
}

//Foreign key can be referenced via .references("CATEGORY").table("TABLE")