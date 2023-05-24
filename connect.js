const mysql= require('mysql2');
const express = require('express');

// Create a MySQL connection
var mysqlconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'shoe_store'
});

mysqlconnection.connect((err)=>{
    if(err){
        console.log('Error occured');
    }
    else{
        console.log('DB connected successfully');
    }
})
module.exports=mysqlconnection