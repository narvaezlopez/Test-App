const mysql_model = function(MySQL){
    
    //GET TABLE DATA
    this.getAll=function(table){
        return new Promise((resolve,reject)=>{
            MySQL.query("SELECT * FROM "+ table, function (err, result, fields) {
                if (err) throw err;
                console.log(fields);
                resolve(result);
            });   

        });
    };
    //INSERT DATA ON TABLE
    this.addData=function(table, params){
        return new Promise((resolve,reject)=>{

            let query = 'INSERT INTO ' + table + ' ('
            let columnNames = '';
            let columnValues = '';
            for (let [key, value] of Object.entries(params)) {
                columnNames += key + ", "
                if (isNaN(value)) {
                    columnValues += "'" + value + "', ";
                } else {
                    columnValues += value + ", ";
                }
            }
            query += columnNames.substring(0, columnNames.length - 2);
            query += ') values (';
            query += columnValues.substring(0, columnValues.length - 2);
            query += ');';

            console.log(query);

            MySQL.query(query, function (error) {
                if (error) {
                    let info = {
                        message: error.message,
                        table: table,
                        params: params
                    }
                    reject(info);
                    
                } else {
                    resolve(params);
                }
            });
                         
        });
    };

    this.getById=function(table,id){
        return new Promise((resolve,reject)=>{
            let query="SELECT * FROM "+ table+' WHERE id = ' + id;
            MySQL.query(query, function (error, result, fields) {
                if (error) {
                    let info = {
                        message: error.message,
                        table: table
                    }
                    reject(info);
                    
                } else {
                    resolve(result);
                }
                
            });   

        });
    };

    this.getByIdEmployee=function(table,id){
        return new Promise((resolve,reject)=>{
            let query="SELECT * FROM "+ table+' WHERE idemployee =' + id;
            console.log(query);
            MySQL.query(query, function (error, result) {
                if (error) {
                    let info = {
                        message: error.message,
                        table: table
                    }
                    reject(info);
                    
                } else {
                    resolve(result);
                }
                
            });   

        });
    };

    this.updateData=function(table, params, id){
        return new Promise((resolve,reject)=>{
            let query = 'UPDATE ' + table + ' SET '
                let element = '';
                for (let [key, value] of Object.entries(params)) {
                    element += key + '=';
                    if (isNaN(value)) {
                        element += '"' + value + '", ';
                    } else {
                        element += value + ', ';
                    }
                }
                query += element.substring(0, element.length - 2);
                query += ' WHERE id = ' + id;

                console.log(query);
            MySQL.query(query,function(error){
                if (error) {
                    let info = {
                        message: error.message,
                        table: table,
                        params: params,
                        id: id
                    }
                    reject(info);
                }
                resolve(params);
            })
        }) 
    }

    this.delete=function(table,id){
        return new Promise((resolve,reject)=>{
            let query = 'DELETE FROM ' + table + ' WHERE id =' + id;
                console.log(query);
                MySQL.query(query, function (response, error) {
                    if (error) {
                        let info = {
                            message: error.message,
                            table: table,
                            id: id
                        }
                        reject(info);
                        console.log(error);
                    }
                    resolve('Se ha eliminado ' + id);
                });
        })
    }


    return this;
};

module.exports = mysql_model;