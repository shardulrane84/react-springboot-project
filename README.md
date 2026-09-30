# Experiment 7 — React + Spring Boot Student Management

A working implementation of "Connect React Front-End with Spring Boot Backend APIs".

## Requirements
- JDK 25 LTS or newer (the backend targets Java 25)
- Node.js LTS (18+) and npm
- No separate Maven install needed — a Maven Wrapper (`mvnw` / `mvnw.cmd`) is included

## 1. Run the backend (Spring Boot)

```
cd backend
```

Windows:
```
mvnw.cmd spring-boot:run
```

macOS/Linux:
```
./mvnw spring-boot:run
```

Wait for `Started StudentApiApplication` in the console.

Test it in a browser: http://localhost:8080/api/students
You should see the 3 seeded students as JSON.

## 2. Run the frontend (React + Vite)

Open a **second** terminal:

```
cd frontend
npm install
npm run dev
```

Open the URL it prints, normally: http://localhost:5173

You should see the student table load automatically, and be able to add a new student via the form.

## Notes / fixes applied vs. the original handout
- The handout's `App.jsx` inconsistently called `http://localhost:8081/api/students` in one place while the backend runs on `8080`. This project consistently uses **8080** everywhere so it actually works out of the box.
- `StudentService.addStudent()` now auto-assigns the student `id` on the server (using an incrementing counter), since the React form never sends an `id`. In the original handout, every new student would have been added with `id = 0`.
- Spring Boot version pinned to `3.5.16`, the Java 25-compatible 3.x release line, to avoid an unnecessary major-version migration.

## Project structure
```
react-springboot-project/
├── backend/                        Spring Boot (Maven) REST API on :8080
│   ├── mvnw / mvnw.cmd             Maven wrapper — no local Maven needed
│   ├── pom.xml
│   └── src/main/java/com/example/studentapi/
│       ├── StudentApiApplication.java
│       ├── controller/StudentController.java
│       ├── model/Student.java
│       └── service/StudentService.java
└── frontend/                       React (Vite) app on :5173
    ├── package.json
    ├── index.html
    └── src/{App.jsx, App.css, main.jsx, index.css}
```
