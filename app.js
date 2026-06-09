const sequelize = require("./config/database");
const Student = require("./models/Student");

async function runCRUD() {
  try {
    // Connect Database
    await sequelize.authenticate();
    console.log("Database Connected");

    // Create Table
    await sequelize.sync({ alter: true });
    console.log("Table Synced");

    // ==========================
    // CREATE (Insert)
    // ==========================

    const student = await Student.create({
      name: "Mohd Zaid",
      email: "zaid@gmail.com",
      age: 22,
    });

    console.log("\nCreated Student:");
    console.log(student.toJSON());

    // ==========================
    // READ ALL
    // ==========================

    const students = await Student.findAll();

    console.log("\nAll Students:");
    console.log(
      students.map((student) => student.toJSON())
    );

    // ==========================
    // READ BY PRIMARY KEY
    // ==========================

    const foundStudent = await Student.findByPk(student.id);

    console.log("\nStudent Found By ID:");
    console.log(foundStudent.toJSON());

    // ==========================
    // UPDATE
    // ==========================

    foundStudent.age = 23;

    await foundStudent.save();

    console.log("\nUpdated Student:");
    console.log(foundStudent.toJSON());

    // ==========================
    // DELETE
    // ==========================

    await foundStudent.destroy();

    console.log("\nStudent Deleted Successfully");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await sequelize.close();
  }
}

runCRUD();