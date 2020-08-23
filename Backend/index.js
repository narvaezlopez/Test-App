const express = require("express");
const app = express();
const config = require("./config.json");
const port = process.env.PORT?process.env.PORT:config.app.port?config.app.port:3456;//SELECT ANY PORT
const cors = require("cors");
const bodyParser = require("body-parser");

const general = require("./app/utils/general")();

let employeesController = require('./app/utils/controller')('employees');
let rolesController = require('./app/utils/controller')('roles');

//SERVER CONNECTION
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CONTROLLERS
app.use('/employees', employeesController);
app.use('/roles', rolesController);

general.connectMySQL();

app.listen(port, () => {
    console.log("Running server on port "+port);
});

