const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const StudentAuthRouter = require('./Routes/StudentAuthRouter');
const TeacherAuthRouter = require('./Routes/TeacherAuthRouter');
const AdminAuthRouter = require('./Routes/AdminAuthRouter');
const TeacherProductRouter = require("./Routes/TeacherProductRouter");
const StudentProductRouter = require("./Routes/StudentProductRouter");
const AdminProductRouter = require("./Routes/AdminProductRouter");

require('./Models/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../Frontend/dist')));
app.use(express.json());
app.use(cors());

console.log(__dirname)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
  });

app.use('/studentAuth',StudentAuthRouter );
app.use('/teacherAuth',TeacherAuthRouter );
app.use('/adminAuth',AdminAuthRouter );
app.use("/studentProducts",StudentProductRouter);
app.use("/teacherProducts",TeacherProductRouter);
app.use("/adminProducts",AdminProductRouter);


app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
})