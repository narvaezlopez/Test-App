const config = require('../../config.json');
const General = function(){

    General.defaultDatabase = config.database.default;

    if(typeof General.mysql == 'undefined'){
        /*const Sequelize = require("sequelize");
        const mysqlize= new Sequelize('e_commerce', 'root', 'root', {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql'
        });*/

        const mysql = require('mysql');
        const con = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            queueLimit: 0
          });
        
        General.mysql = con;
    }

    this.getMysql = function () {
        return General.mysql;
    };

    this.setDefaultDatabase = function(database){
        General.defaultDatabase = database;
    };

    this.getDatabaseModel = function(){
        let model='';
        switch (General.defaultDatabase) {
            case 'mysql':
                console.log("utilizando My SQL");
                model = require("../models/mysql_model")(General.mysql);
                break;
            default:
                console.log("utilizando My SQL");
                model = require("../models/mysql_model")(General.mysql);
                break;
        }
        return model;
    };

    this.connectMySQL = function(){
        General.mysql.connect(function(err) {
            if (err){
                console.log(err);
            }else{
                console.log("Connection to MySQL succesfully");
            }
        });
    }

    return this;
};
module.exports = General;