const { MongoClient } = require("mongodb");

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
        const query = {};
        const projection = {name:1,_id:0};
        const cursor = await coll.find(query).project(projection);
        teachers = await cursor.toArray();
        return teachers;
    }finally{
        await client.close();
    }
    
};

student_schedule("S2");
module.exports = {student_schedule,teacher_schedule};