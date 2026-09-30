package com.example.studentapi.service;

import com.example.studentapi.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();
    private final AtomicInteger nextId = new AtomicInteger(1);

    public StudentService() {
        students.add(new Student(nextId.getAndIncrement(), "Rahul", "Information Technology"));
        students.add(new Student(nextId.getAndIncrement(), "Priya", "Computer Engineering"));
        students.add(new Student(nextId.getAndIncrement(), "John", "Information Technology"));
    }

    public List<Student> getAllStudents() {
        return students;
    }

    public Student addStudent(Student student) {
        // Always auto-assign the id on the server, ignoring whatever the client sent.
        student.setId(nextId.getAndIncrement());
        students.add(student);
        return student;
    }
}
