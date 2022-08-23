const { MongoClient } = require("mongodb");

async function add_class(studentId,courseId){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('students');
        // console.log(coll)
        const query = {_id:studentId};
        const details = {class_id:courseId};
        await coll.updateOne(query,{$set:details});
        
        const coll1 = await database.collection('courses');
        const cursor = await coll1.find({_id:courseId});
        const doc = await cursor.toArray();
        const final_doc = doc[0];
        if(final_doc["added"]==false){
            const query1 = {_id:courseId};
            const details1 = {added:true}
            await coll1.updateOne(query1,{$set:details1});

            //Add the document into classes collection -----------------
            const insertionDoc = {"_id":final_doc["_id"],"courseName":final_doc["courseName"],"periods":final_doc["periods"]};
            // console.log(insertionDoc);
            await database.collection('classes').insertOne(insertionDoc);
        }
        
    }finally{
        await client.close();
    }
    
};

async function add_teacher(teacherId,subjectId){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('subjects');
        // console.log(coll)
        const query = {_id:subjectId};
        const details = {teacher:teacherId};
        await coll.updateOne(query,{$set:details});

        const coll1 = await database.collection('teachers');
        // console.log(coll)
        const query1 = {_id:teacherId};
        const details1 = {subject:subjectId};
        await coll1.updateOne(query1,{$set:details1});
        
    }finally{
        await client.close();
    }
    
};

module.exports = {add_class,add_teacher};