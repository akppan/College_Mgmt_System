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
        out = await add_class("S20","C2");
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
    
})