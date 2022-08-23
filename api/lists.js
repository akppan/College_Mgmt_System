const { MongoClient } = require("mongodb");

async function student(){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('students');
        // console.log(coll)
        const query = {};
        const projection = {name:1,_id:0};
        const cursor = await coll.find(query).project(projection);
        students = await cursor.toArray();
        return students;
    }finally{
        await client.close();
    }
    
};

async function teacher(){
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

// student();
module.exports = {student,teacher};