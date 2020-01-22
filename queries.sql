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