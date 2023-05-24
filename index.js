const connect= require('./connect');
const express= require('express');
const bodyparser= require('body-parser');
var app=express();

app.use(bodyparser.json());



app.get('/shoes', (req,res)=>{
    connect.query('select * from shoe', (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
            //console.log(rows)
        }
    })
})
app.get('/shoes/:id', (req,res)=>{
    connect.query('select * from shoe where id=?',[req.params.id], (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
            //console.log(rows)
        }
    })
})
app.delete('/shoes/:id', (req,res)=>{
    connect.query('delete from shoe where id=?',[req.params.id], (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
            //console.log(rows)
        }
    })
})
app.post('/shoes', (req,res)=>{
    var temp=req.body
    var emp=[temp.name,temp.author,temp.price]
    connect.query('insert into shoe(name,author,price) values(?)',[emp], (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
            //console.log(rows)
        }
    })
})
// 2 methods for update-patch,put- in put we can send some queries also
app.patch('/shoes', (req,res)=>{
    var temp=req.body
    connect.query('update shoe set ? where id='+temp.id,[temp], (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
            //console.log(rows)
        }
    })
})

app.put('/shoes', (req,res)=>{
    var temp=req.body
    connect.query('update shoe set ? where id='+temp.id,[temp], (err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            if(rows.affectedRows==0){
                var emp=[temp.name,temp.author,temp.price]
                connect.query('insert into shoe(name,author,price) values(?)',[emp], (err,rows)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.send(rows)
                        //console.log(rows)
                    }
                })

            }
            else{
                res.send(rows)
                //console.log(rows)
            }
            
        }
    })
})


app.listen(3000,()=>console.log('hello'))