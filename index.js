const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    port: 3306,
    database: 'nodejslearning',
});


con.connect((err)=>{
    if (err){
        console.log(err)
    } else {
        console.log('Database Connceted');
    }
});


app.get('/',(req,res)=>{
    let query1 = 'SELECT * from users';

    con.query(query1,(err,result,fields)=>{
        if(err){
            res.send(err)
        } else {
            //render user data from index.ejs file
            res.render('index.ejs',{students: result});
        }
    })
})


app.get('/add', (req,res)=>{
    res.render('add.ejs');
});

app.post('/add',(req,res)=>{
    let query = 'INSERT INTO users SET ?';

    con.query(query,req.body,(err,result,fields)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect('/')
        }
    })
}) 


app.get('/students/:id/delete', (req,res)=>{
    const stdId = req.params.id;
    let query = 'DELETE FROM users WHERE id='+stdId;

    con.query(query,(err,result,fields)=>{
        if (err){
            res.send(err)
        } else {
            res.redirect('/');
        }
    })
})

app.get('/read/:id/update',(req,res)=>{
    const stdId = req.params.id;
    let query = 'SELECT * FROM users WHERE id='+stdId;

    con.query(query,(err,result,fields)=>{
        if (err){
            res.send(err)
        }else{
            res.render('edit.ejs',{record: result});
        }
    })

})



// app.post('/read/:id/update', function(req, res) {
//     let id= req.params.id;


//     //   var query = `UPDATE users SET first_name = ${firstName}, last_name = ${lastName} , email = ${emaiL} WHERE id=${id}`;
//    let query = 'UPDATE users SET first_name = ? WHERE id = ?', [req.body.first_name,req.body.id]
//       con.query(query,req.body, function (err,result,fields){
//           if (err){
//               console.log(query);
//               res.send(err)

//           } else{
              
//               res.send('updated');
//           }
//       })
//     })


    app.post('/read/:id/update', function(req, res) {
        let id= req.params.id;
        //   var query = `UPDATE users SET first_name = ${firstName}, last_name = ${lastName} , email = ${emaiL} WHERE id=${id}`;
          con.query(`UPDATE users SET first_name = ?, last_name = ?, email= ? WHERE id =${id}`,[req.body.first_name,req.body.last_name,req.body.email], function (err,result,fields){
              if (err){
                  console.log(query);
                  res.send(err)
    
              } else{
                  
                  res.redirect('/');
              }
          })
        })




app.listen(port,()=>{
    console.log('server started');
});




