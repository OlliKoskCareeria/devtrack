package com.devtrack.backend.controller;

import com.devtrack.backend.model.Project;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository repository;

    public ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return repository.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
    repository.deleteById(id);
    }

    @PutMapping("/{id}")
public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {

    return repository.findById(id)
            .map(project -> {
                project.setName(updatedProject.getName());
                project.setDescription(updatedProject.getDescription());
                return repository.save(project);
            })
            .orElseThrow(() -> new RuntimeException("Project not found"));
}
}