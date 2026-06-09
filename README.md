# Mastering CRUD Operations with Sequelize

## Objective

Learn how to perform CRUD (Create, Read, Update, Delete) operations using Sequelize ORM with Node.js and MySQL.

In this task, we will:

- Insert a new record into the database
- Read records using `findAll()` and `findByPk()`
- Update an existing record
- Delete a record from the database

---

## What is CRUD?

CRUD represents the four basic operations performed on a database:

| Operation | Description |
|------------|------------|
| Create | Add new data |
| Read | Retrieve existing data |
| Update | Modify existing data |
| Delete | Remove data |

---

## Prerequisites

Ensure the following are installed:

- Node.js
- MySQL Server
- MySQL Workbench
- VS Code
- Sequelize
- mysql2

Install dependencies:

```bash
npm install sequelize mysql2
```

---

## Project Structure

```text
sequelize-crud/
│
├── app.js
├── database.js
├── Student.js
├── package.json
└── node_modules/
```

---

## Step 1: Database Connection

### database.js

```javascript
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "sequelize_db",
  "root",
  "your_password",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
```

---

## Step 2: Create Student Model

### Student.js

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Student;
```

---

# CREATE (Insert Operation)

Insert a new student record into the database.

```javascript
const Student = require("./Student");

async function createStudent() {
  const student = await Student.create({
    name: "Zaid",
    email: "zaid@example.com",
    age: 22,
  });

  console.log("Student Created:", student.toJSON());
}

createStudent();
```

### Expected Output

```text
Student Created:
{
  id: 1,
  name: 'Zaid',
  email: 'zaid@example.com',
  age: 22
}
```

---

# READ (Retrieve Records)

## Using findAll()

Retrieve all records from the table.

```javascript
async function getAllStudents() {
  const students = await Student.findAll();

  console.log(students);
}

getAllStudents();
```

### Expected Output

```text
[
  {
    id: 1,
    name: 'Zaid',
    email: 'zaid@example.com',
    age: 22
  }
]
```

---

## Using findByPk()

Retrieve a record using its primary key.

```javascript
async function getStudentById() {
  const student = await Student.findByPk(1);

  console.log(student);
}

getStudentById();
```

### Expected Output

```text
{
  id: 1,
  name: 'Zaid',
  email: 'zaid@example.com',
  age: 22
}
```

---

# UPDATE (Modify Existing Record)

Update an existing student's details.

```javascript
async function updateStudent() {
  const student = await Student.findByPk(1);

  if (student) {
    student.age = 23;

    await student.save();

    console.log("Student Updated:", student);
  }
}

updateStudent();
```

### Expected Output

```text
Student Updated:
{
  id: 1,
  name: 'Zaid',
  email: 'zaid@example.com',
  age: 23
}
```

---

# DELETE (Remove Record)

Delete a student record from the database.

```javascript
async function deleteStudent() {
  const student = await Student.findByPk(1);

  if (student) {
    await student.destroy();

    console.log("Student Deleted Successfully");
  }
}

deleteStudent();
```

### Expected Output

```text
Student Deleted Successfully
```

---

## Complete CRUD Example

### app.js

```javascript
const sequelize = require("./database");
const Student = require("./Student");

async function runCRUD() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    // CREATE
    const student = await Student.create({
      name: "Zaid",
      email: "zaid@example.com",
      age: 22,
    });

    console.log("Created:", student.toJSON());

    // READ ALL
    const students = await Student.findAll();
    console.log("All Students:", students.length);

    // READ BY ID
    const foundStudent = await Student.findByPk(student.id);
    console.log("Found:", foundStudent.name);

    // UPDATE
    foundStudent.age = 23;
    await foundStudent.save();
    console.log("Updated Age:", foundStudent.age);

    // DELETE
    await foundStudent.destroy();
    console.log("Student Deleted");

  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
}

runCRUD();
```

---

## Verification in MySQL Workbench

View all records:

```sql
SELECT * FROM Students;
```

Check updated record:

```sql
SELECT * FROM Students WHERE id = 1;
```

After deletion:

```sql
SELECT * FROM Students;
```

The deleted record will no longer appear.

---

## Results

Successfully performed:

- Insert operation using `create()`
- Read operation using `findAll()`
- Read operation using `findByPk()`
- Update operation using `save()`
- Delete operation using `destroy()`

---

## Conclusion

CRUD operations are the foundation of database management. Sequelize makes these operations simple by providing JavaScript methods that eliminate the need for writing raw SQL queries. Using methods like `create()`, `findAll()`, `findByPk()`, `save()`, and `destroy()`, developers can efficiently manage database records in Node.js applications.

### Technologies Used

- Node.js
- Sequelize ORM
- MySQL
- MySQL Workbench
- VS Code