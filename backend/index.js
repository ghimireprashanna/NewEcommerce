const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const brandRoute = require('./routes/brand');
const productRoute = require('./routes/product');
const uploadFileRoute = require('./routes/upload-file');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');



const app = express()
var cors = require('cors');


const hostname = '127.0.0.1';
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*',cors());

//mongodb+srv://prashanna:Prashanna11@cluster1.6qhu0jn.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://prashanna:Prashanna11@cluster1.6qhu0jn.mongodb.net/?retryWrites=true&w=majority')
.then(res => {
    console.log("connected to db successfully");
}).catch(err => {
    console.log(err);
});
// rgRYTUUesEWTweVs

app.use('/api/users',authRoute);
app.use('/api/users',userRoute);
app.use('/api/brands',brandRoute);
app.use('/api/products',productRoute);
app.use('/api/upload-files',uploadFileRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/health',(req, res)=>{
    res.json({"message": "your app is running"})
});



app.use(`/api/uploads`, express.static('uploads'))



app.listen(port, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});