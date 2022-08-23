const {student,teacher} = require("../api/lists");
const {add_class,add_teacher} = require("../api/update");
const {student_schedule,teacher_schedule} = require("../api/schedules");

describe("Testing the application", () => {
    //
    it('Should check the list of students', async() => {
        students = await student();
        expect(students.length).toBe(18);
    })

    it('Should check the list of teachers', async() => {
        teachers = await teacher();
        expect(teachers.length).toBe(7);
    })

    it('Should not enroll the student',async() => {
        out = await add_class("S20","Course2");
        expect(out).toBe("No such student exists")
    })

    it('Should not enroll the student',async() => {
        out = await add_class("S12","Course8");
        expect(out).toBe("No such course exists")
    })

    it('Should enroll the student',async() => {
        out = await add_class("S12","Course4");
        expect(out).toBe("OK");
    })

    it('Should not assign the teacher',async() => {
        out = await add_teacher("T9","Sub5")
        expect(out).toBe("No such teacher exists")
    })

    it('Should not assign the teacher',async() => {
        out = await add_teacher("T4","Sub9")
        expect(out).toBe("No such subject exists")
    })

    it('Should assign the teacher',async() => {
        out = await add_teacher("T4","Sub5")
        expect(out).toBe("OK")
    })

    it('Should not check the schedule of student not enrolled for a class',async() => {
        out = await student_schedule("S10");
        expect(out).toBe("The student has not enrolled for a class")
    })

    it('Should not check the schedule of teacher not assigned any subject',async() => {
        out = await teacher_schedule("T7");
        expect(out).toBe("The Teacher has not been assigned any Subject")
    })

    it('Should check the schedule of student',async()=>{
        out = await student_schedule("S1");
        expect(JSON.stringify(out)).toBe(JSON.stringify(["Sub1", "Sub2", "Sub3", "Sub4", "Sub5", "Sub6"]))
    })

    it('Should check the schedule of teacher',async()=>{
        out = await teacher_schedule("T1");
        expect(JSON.stringify(out)).toBe(JSON.stringify(["Course1", "Course4", "Course2", "Rest Hour", "Rest Hour", "Rest Hour"]))
    })
    
})