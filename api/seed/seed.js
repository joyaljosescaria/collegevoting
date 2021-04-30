const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const faker = require("faker")

const Admin = require("../models/admin");
const Candidate = require("../models/candidate");
const Course = require("../models/course");
const Election = require("../models/election");
const ElectionPosition = require("../models/electionPosition");
const Student = require("../models/student");
const StudentPosition = require("../models/studentPosition");

mongoose.connect(
    "mongodb://localhost:27017/evoting",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
mongoose.Promise = global.Promise;

const makePassword = async () => {
    const salt = await bcrypt.genSalt(10)
    const password = "mypassword"
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const seedStudent = async () => {
    console.log("Seeding Student ☘️")

    try {
        for (let i = 0; i < 100; i++) {
            const course = await Course.aggregate([{ $sample: { size: 1 } }])

            const student = new Student({
                name: faker.name.findName(),
                course_id: course[0]._id,
                batch_year_count: getRandom(1, 4),
                unique_id: faker.random.uuid(),
                email: faker.internet.email(),
                had_candidate: faker.random.boolean(),
                profile_pic: faker.random.image(),
                id_card: faker.random.image(),
                id_card_selfi : faker.random.image(),
                is_verified : faker.random.boolean()
            })

            const student1 = await student.save()
            console.log(`Student seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding Student Table.`)
        console.log(`Error ${err.message}`)
    }
}


const seedAdmin = async () => {
    console.log("Seeding Admin ☘️")
    try {
        for (let i = 0; i < 2; i++) {
            var email = faker.internet.email()
            const admin = new Admin({
                name: faker.name.findName(),
                email: email,
                password: await makePassword()
            })

            const admin1 = await admin.save()
            console.log(`Admin seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding Admin Table.`)
        console.log(`Error ${err.message}`)
    }
}

const seedCandidate = async () => {
    console.log("Seeding Candidate ☘️")
    try {
        for (let i = 0; i < 10; i++) {
            const student = await Student.aggregate([{ $sample: { size: 1 } }])
            const position = await ElectionPosition.aggregate([{ $sample: { size: 1 } }])
            const election = await Election.aggregate([{ $sample: { size: 1 } }])
            const candidate = new Candidate({
                student_id: student[0]._id,
                election_id: election[0]._id,
                position_id: position[0]._id,
            })
            const candidate1 = await candidate.save()
            console.log(`Candidate seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding Candidate Table.`)
        console.log(`☹️ Error ${err.message}`)
    }
}

const seedElectionPosition = async () => {
    console.log("Seeding Election Position ☘️")
    try {
        for (let i = 0; i < 10; i++) {
            const course = await Course.aggregate([{ $sample: { size: 1 } }])
            const election = await Election.aggregate([{ $sample: { size: 1 } }])
            const elePos = new ElectionPosition({
                position: faker.random.word(),
                batch_year_count: getRandom(1, 3),
                course_id: course[0]._id,
                election_id: election[0]._id,
            })
            const elePos1 = await elePos.save()
            console.log(`ElectionPosition seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding ElectionPosition Table.`)
    }
}

const seedStudentPosition = async () => {
    console.log("Seeding Student Position ☘️")
    try {
        for (let i = 0; i < 10; i++) {
            const student = await Student.aggregate([{ $sample: { size: 1 } }])
            const position = await ElectionPosition.aggregate([{ $sample: { size: 1 } }])
            const election = await Election.aggregate([{ $sample: { size: 1 } }])
            const stuPos = new StudentPosition({
                student_id : student[0]._id,
                position_id : position[0]._id,
                election_id: election[0]._id,
            })
            const stuPos1 = await stuPos.save()
            console.log(`StudentPosition seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding StudentPosition Table.`)
        console.log(`☹️ Error ${err.message}`)
    }
}

const seedElection = async () => {
    console.log("Seeding Election ☘️")
    var started = false
    try {
        for (let i = 0; i < 3; i++) {
            if (i == 2) {
                started: true
            }
            else {
                started: false
            }
            const election = new Election({
                election: faker.random.word(),
                date: faker.date.future(),
                started: started
            })
            const election1 = await election.save()
            console.log(`Election seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding Election Table.`)
        console.log(`Error ${err.message}.`)
    }
}

const seedCourse = async () => {
    console.log("Seeding Course ☘️")
    try {
        for (let i = 0; i < 6; i++) {
            const course = new Course({
                course: faker.random.word()
            })
            const course1 = await course.save()
            console.log(`Course seeded successfully ✌`)
        }
    } catch (err) {
        console.log(`☹️ Error seeding Course Table.`)
    }
}

const deleteDatabase = async (database, dname) => {
    console.log(`❌ Deleting ${dname} Table`)
    try {
        await database.deleteMany({})
        console.log(`✅ Deleted Database ${dname} .`)
    } catch (err) {
        console.log(`☹️ Error deleteing ${dname} Table.`)
    }
}

async function doAll() {
    console.log("Deleting databases❎")
    await deleteDatabase(Admin, "Admin")
    await deleteDatabase(Candidate, "Candidate")
    await deleteDatabase(Course, "Course")
    await deleteDatabase(Election, "Election")
    await deleteDatabase(ElectionPosition, "ElectionPosition")
    await deleteDatabase(Student, "Student")
    await deleteDatabase(StudentPosition, "StudentPosition")

    console.log("Seeding Databases ☘")

    await seedAdmin()
    await seedCourse()
    await seedStudent()
    await seedElection()
    await seedElectionPosition()
    await seedCandidate()
    await seedStudentPosition()
}

doAll()