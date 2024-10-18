// Form submission handler
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var email = document.querySelector('input[type="email"]').value;
  var password = document.querySelector('input[type="password"]').value;
  var name = document.querySelector('input[name="name"]').value;
  var mobile = document.querySelector('input[name="mobile"]').value;

  // Basic form validation
  if (!email || !password || !name || !mobile) {
    alert("All fields are required!");
    return;
  }

  // Simulate admin check
  if (email === "ebrimaljallow89@gmail.com") {
    alert("Admin access granted!");
    // In a real scenario, redirect to admin dashboard
    // window.location.href = "/admin-dashboard.html";
  } else {
    alert("User access granted.");
    // Redirect to user dashboard
    // window.location.href = "/user-dashboard.html";
  }
});

// Function to validate email format
function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
// Simulated database of users
const users = [
  { email: "ebrimaljallow89@gmail.com", role: "admin" },
  { email: "student1@example.com", role: "user" },
  { email: "student2@example.com", role: "user" }
];

// Function to check user role
function getUserRole(email) {
  const user = users.find((user) => user.email === email);
  return user ? user.role : null;
}
if (email === "ebrimaljallow89@gmail.com") {
  alert("Admin access granted!");
  window.location.href = "admin-dashboard.html";
} else {
  alert("User access granted.");
  window.location.href = "user-dashboard.html";
}
// Function to add a new user to the simulated database
function addUser(email, password, role) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to authenticate a user
function authenticateUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user ? user.role : null; // Returns role if authenticated, otherwise null
}

// Function to get grades for a specific user
function getUserGrades(email) {
  const grades = JSON.parse(localStorage.getItem("grades")) || {};
  return grades[email] || []; // Returns grades array if exists, otherwise an empty array
}

// Function to add grades for a specific user
function addGrades(email, gradeData) {
  const grades = JSON.parse(localStorage.getItem("grades")) || {};
  grades[email] = grades[email] || [];
  grades[email].push(gradeData);
  localStorage.setItem("grades", JSON.stringify(grades));
}

// Initialize the simulated database
if (!localStorage.getItem("users")) {
  addUser("ebrimaljallow89@gmail.com", "admin123", "admin");
  addUser("student1@example.com", "student123", "user");
  addUser("student2@example.com", "student456", "user");
}
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  var email = document.querySelector('input[type="email"]').value;
  var password = document.querySelector('input[type="password"]').value;

  // Authenticate user
  const role = authenticateUser(email, password);
  if (role === "admin") {
    alert("Admin access granted!");
    window.location.href = "admin-dashboard.html";
  } else if (role === "user") {
    alert("User access granted.");
    window.location.href = "user-dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
});
document
  .getElementById("account-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Here you would typically handle form submission,
    // such as sending data to the server or validating input.
    alert("Account created successfully!");
  });
const grades = []; // Array to store grades

// Handle form submission for adding grades
document
  .getElementById("add-grade-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve input values
    const studentEmail = document.getElementById("student-email").value;
    const courseName = document.getElementById("course-name").value;
    const grade = document.getElementById("grade").value;

    // Create a new grade entry
    const newGrade = {
      email: studentEmail,
      courseName: courseName,
      grade: grade
    };
    grades.push(newGrade); // Add the new grade to the grades array

    // Clear the form
    document.getElementById("add-grade-form").reset();

    // Update the grades list display
    displayGrades();
    alert("Grade added successfully!");
  });

// Function to display grades
function displayGrades() {
  const gradesList = document.getElementById("grades-list");
  gradesList.innerHTML = ""; // Clear existing list

  if (grades.length > 0) {
    grades.forEach((grade) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${grade.email} - ${grade.courseName}: ${grade.grade}`;
      gradesList.appendChild(listItem);
    });
  } else {
    gradesList.innerHTML = "<li>No grades available.</li>";
  }
}
const grades = []; // Array to store grades

// Handle form submission for adding grades
document
  .getElementById("add-grade-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve input values
    const admissionNumber = document.getElementById("admission-number").value;
    const idCard = document.getElementById("id-card").value;
    const studentEmail = document.getElementById("student-email").value;
    const courseName = document.getElementById("course-name").value;
    const grade = document.getElementById("grade").value;

    // Create a new grade entry
    const newGrade = {
      admissionNumber,
      idCard,
      email: studentEmail,
      courseName,
      grade
    };
    grades.push(newGrade); // Add the new grade to the grades array

    // Clear the form
    document.getElementById("add-grade-form").reset();

    // Update the grades list display
    displayGrades();
    alert("Grade added successfully!");
  });

// Function to display grades
function displayGrades() {
  const gradesList = document.getElementById("grades-list");
  gradesList.innerHTML = ""; // Clear existing list

  if (grades.length > 0) {
    grades.forEach((grade) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Admission Number: ${grade.admissionNumber}, ID Card: ${grade.idCard}, Email: ${grade.email}, Course: ${grade.courseName}, Grade: ${grade.grade}`;
      gradesList.appendChild(listItem);
    });
  } else {
    gradesList.innerHTML = "<li>No grades available.</li>";
  }
}
const gradeSchema = new mongoose.Schema({
  admissionNumber: String,
  idCard: String,
  email: String,
  courseName: String,
  grade: String,
  applicationPin: String // New field for application PIN
});
function generatePin(length) {
  let pin = "";
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10).toString(); // Generate a random digit
  }
  return pin;
}
app.post("/generate-pin", (req, res) => {
  const admissionNumber = req.body.admissionNumber; // Example: identify the student
  const pin = generatePin(6); // Generate a 6-digit PIN

  // Assuming you have a student model, find the student and update with the new PIN
  Student.findOneAndUpdate(
    { admissionNumber: admissionNumber },
    { applicationPin: pin },
    { new: true }
  )
    .then((updatedStudent) => {
      if (updatedStudent) {
        res.status(200).send(`Application PIN generated: ${pin}`);
      } else {
        res.status(404).send("Student not found");
      }
    })
    .catch((err) => res.status(500).send(err));
});
app.post("/validate-pin", (req, res) => {
  const { admissionNumber, applicationPin } = req.body;

  Student.findOne({ admissionNumber: admissionNumber })
    .then((student) => {
      if (student && student.applicationPin === applicationPin) {
        res.status(200).send("PIN validated successfully!");
      } else {
        res.status(401).send("Invalid PIN");
      }
    })
    .catch((err) => res.status(500).send(err));
});
// database.js
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();
    console.log("Connected to MongoDB");

    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
// app.js
const express = require("express");
const connectToDatabase = require("./database");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the School System Portal!");
});

app.post("/register", async (req, res) => {
  const { admissionNumber, firstName, lastName, email } = req.body;

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    const newUser = {
      admissionNumber,
      firstName,
      lastName,
      email,
      createdAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});