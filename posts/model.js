const db = require('../data/db-config');

module.exports = {
    list,
    findByID,
    insert,
};

function list() {
    /* 
        -- In order to access this stuff, we need to join our tables.
        Select s.CompanyName as Client, p.ProductName, c.CategoryName
        
        -- aliases!
        from product as p
        join supplier as s
        
        -- Basically, this says "When an ID from the supplier matches an ID from the product, join category table to supplier table."
        on s.ID = p.SupplierId
        
        -- Same deal, but we join category to the table when a product's category ID matches a category's ID.
        join category as c
        on p.CategoryId = c.Id
        
        -- Looking for ID 5.
        where p.ID = 5 

        select * from posts as p
        join users as u on p.user_id = u.id

    */

    return db("posts as p")
        .join("users as u", "p.user_id", "u.id")
        .select("p.id as postId", "p.contents", "u.username as postedBy");
}

function findByID(id) {
    return db("posts as p")
        .join("users as u", "p.user_id", "u.id")
        .where("p.id", id)
        .select("p.id as postId", "p.contents", "u.username as userName")
        .first();
}

function insert(user) {
    return db("posts").insert(user);
}

//Foreign key can be referenced via .references("CATEGORY").table("TABLE")