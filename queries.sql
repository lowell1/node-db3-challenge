-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select ProductName, CategoryName from Product
join Category on Product.CategoryID = Category.id;
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select [Order].Id, CompanyName, OrderDate from [Order]
join Shipper on ShipVia = Shipper.Id
where OrderDate < '2012-08-9'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select ProductName, Quantity from OrderDetail
join Product on OrderDetail.ProductID = Product.Id
where OrderID = 10251
order by ProductName
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select [Order].Id, CompanyName, LastName from [Order]
join Customer on CustomerId = Customer.Id
join Employee on EmployeeId = Employee.Id