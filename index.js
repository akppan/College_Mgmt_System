const express = require('express');
const cors = require('cors');

const {student,teacher} = require("./api/lists");
const {add_class,add_teacher} = require("./api/update");
const {student_schedule,teacher_schedule} = require("./api/schedules");

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

app.put('/enroll/:studentId/:courseId', async function(req,res,next){
    sId = await req.params.studentId;
    cId = await req.params.courseId;
    // console.log(sId,cId);
    await add_class(sId,cId);
    res.send("Student with ID "+ sId +" has enrolled for course with Id "+cId);
})


app.put('/assign/:teacherId/:subjectId', async function(req,res,next){
    tId = await req.params.teacherId;
    sId = await req.params.subjectId;
    // console.log(sId,cId);
    await add_teacher(tId,sId);
    res.send("Teacher with ID "+ tId +" has been added for subject with Id "+sId);
})


app.get('/student/:studentId', async function(req,res,next){
    sId = await req.params.studentId;
    // console.log(sId,cId);
    sch = await student_schedule(sId);
    schedule = await JSON.stringify(sch);
    res.send("Student with ID "+ sId +" has following schedule for the day: "+schedule);
})




PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`);
});