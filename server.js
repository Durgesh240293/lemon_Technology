const express = require ("express");
const app = express();

const mongoose = require ("mongoose");
const db = require ("./db/conn.js");

app.use(express.json());
const PORT = 1111;

  

app.use('/', require('./routes/url.route'))
app.use('/api/url', require('./routes/url.route.js'))

app.listen(PORT, ()=>{
console.log (`Server is running at port ${PORT}`);
})

