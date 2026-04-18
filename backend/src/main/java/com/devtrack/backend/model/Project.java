package com.devtrack.backend.model;

import jakarta.persistence.*;
import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import java.time.LocalDate;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDate deadline;

    // Constructors
    public Project() {}

    public Project(String name, String description, LocalDate deadline) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
}

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {
    return deadline;
}

public void setDeadline(LocalDate deadline) {
    this.deadline = deadline;
}

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> tasks;
}