package com.devtrack.backend.controller;
import com.devtrack.backend.service.ProjectService;
import com.devtrack.backend.model.Project;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    
    private final ProjectService service;

    public ProjectController(ProjectService service) {
    this.service = service;
    }
    

    @GetMapping
    public List<Project> getAll() {
    return service.getAllProjects();
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
    return service.createProject(project);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
    service.deleteProject(id);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project project) {
    return service.updateProject(id, project);
    }
    }