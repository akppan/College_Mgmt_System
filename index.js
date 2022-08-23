const express = require('express');
const cors = require('cors');

const {student,teacher} = require("./api/lists");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to College Management System." });
});

app.get('/teachers', async function (req, res, next) {
    teachers = await teacher()
    console.log(teachers);
    res.send(teachers);
})

app.get('/students', async function (req, res, next) {
    students = await student()
    console.log(students);
    res.send(students);
})


PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`);
});