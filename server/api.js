const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 4000

let employees = [{
	"id": "3006434",
	"firstName": "Bernardo",
	"lastName": "Moya",
	"date": "2021-11-02T21:13:38.622Z",
	"phoneNumber": "3316918671",
	"age": "25",
	"email": "bennym@live.com.mx"
},
{
	"id": "2024520",
	"firstName": "Gabriel",
	"lastName": "Moya",
	"date": "2021-11-02T21:13:38.622Z",
	"phoneNumber": "3316918671",
	"age": "25",
	"email": "bennym@live.com.mx"
}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/employee', (req, res) => {
    const employee = req.body;

    // output the book to the console for debugging
    console.log(employee);
    employees.push(employee);

    res.send('Employee is added to the database');
});

app.get('/employee', (req, res) => {
    res.json(employees);
});

app.get('/employee/:id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.id;

    // searching books for the isbn
    for (let employee of employees) {
        if (employee.id === id) {
            res.json(employee);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Employee not found');
});

app.delete('/employee/:id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.id;

    // remove item from the books array
    employees = employees.filter(i => {
        if (i.id !== id) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Employee is deleted');
});

app.put('/employee/:id', (req, res) => {
    // reading isbn from the URL
    const id = req.params.id;
    const newEmployee = req.body;

    // remove item from the books array
    for (let i = 0; i < employees.length; i++) {
        let employee = employees[i]

        if (employee.id === id) {
            employees[i] = newEmployee;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Employee is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));