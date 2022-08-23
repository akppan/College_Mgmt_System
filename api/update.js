const { MongoClient } = require("mongodb");

async function add_class(studentId,courseId){
    const client = new MongoClient("mongodb://localhost:27017/");
    try{
        await client.connect();
        const database = await client.db('test');
        const coll = await database.collection('students');
        const coll2 = await database.collection('courses');
        // console.log(coll)
        const query = {_id:studentId};
        const details = {class_id:courseId};
        const course = await coll2.find({_id:courseId})
        const stud = await coll.find({_id:studentId})

        course1 = await course.toArray()
        stud1 = await stud.toArray()

        if(typeof course1[0] === 'undefined'){
            return "No such course exists";
        }
        if(typeof stud1[0] === 'undefined'){
            return "No such student exists";
        }
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
        return 'OK'
        
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
        const coll1 = await database.collection('teachers');

        const teach = await coll1.find({_id:teacherId})
        const subj = await coll.find({_id:subjectId})

        teach1 = await teach.toArray();
        subj1 = await subj.toArray();

        console.log(teach1);
        console.log(subj1);

        tc = teach1[0]
        sj = subj1[0]

        if(typeof tc === 'undefined'){
            // console.log("No such teacher exists");
            return "No such teacher exists";
        }
        if(typeof sj === 'undefined'){
            return "No such subject exists";
        }

        console.log(coll)
        const query = {_id:subjectId};
        const details = {teacher:teacherId};
        await coll.updateOne(query,{$set:details});
        
        // console.log(coll)
        const query1 = {_id:teacherId};
        const details1 = {subject:subjectId};
        await coll1.updateOne(query1,{$set:details1});
        
    }finally{
        await client.close();
    }
    return "OK";
    
};

module.exports = {add_class,add_teacher};