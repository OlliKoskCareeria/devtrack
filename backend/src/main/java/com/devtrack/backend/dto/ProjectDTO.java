package com.devtrack.backend.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;

public class ProjectDTO {

    private Long id;

    private LocalDate deadline;

    @NotBlank(message = "Project name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    private String status;

    public ProjectDTO() {}

    public ProjectDTO(Long id, String name, String description, LocalDate deadline, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline(){
        return deadline;
    }

    public void setDeadline(LocalDate deadline){
        this.deadline = deadline;
    }

    
}