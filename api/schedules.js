const { MongoClient } = require("mongodb");
const { teacher } = require("./lists");

async function student_schedule(studentId){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('students');
        const query = {_id:studentId};
        // const projection = {name:1,_id:0};
        const cursor = await coll.find(query);
        // const cursor = await coll.find(query).project(projection);
        out = await cursor.toArray();
        student = out[0]
        if("class_id" in student){
            const coll1 = await database.collection('classes');
            const query1 = {_id:student["class_id"]};
            const projection1 = {periods:1,_id:0};
            const cursor = await coll1.find(query1).project(projection1);
            const sch = await cursor.toArray();
            // console.log(sch);
            return sch[0]["periods"];
        }else{
            return "The student has not enrolled for a class"
        }
        return students;
    }finally{
        await client.close();
    }
    
};

async function teacher_schedule(teacherId){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('teachers');
        const query = {_id:teacherId};
        const cursor = await coll.find(query);
        out = await cursor.toArray();
        teacher1 = out[0]
        if ("subject" in teacher1){
            const subjectId = teacher1["subject"]
            // var schedule = []
            const coll1 = await database.collection('classes');
            const cursor1 = await coll1.find().project({periods:1});
            out1 = await cursor1.toArray();
            indexes = []
            schedule = new Array(6).fill("Rest Hour")
            out1.forEach(function (item){
                schedule[item["periods"].indexOf(subjectId)] = item["_id"];
            })
            return schedule;

        }else{
            return "The Teacher has not been assigned any Subject"
        }
    }finally{
        await client.close();
    }
    
};

module.exports = {student_schedule,teacher_schedule};