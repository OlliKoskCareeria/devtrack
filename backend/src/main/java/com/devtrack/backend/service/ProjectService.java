package com.devtrack.backend.service;

import com.devtrack.backend.model.Project;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project createProject(Project project) {
        return repository.save(project);
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }

    public Project updateProject(Long id, Project updatedProject) {
        return repository.findById(id)
                .map(project -> {
                    project.setName(updatedProject.getName());
                    project.setDescription(updatedProject.getDescription());
                    return repository.save(project);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }
}