package com.devtrack.backend.service;
import com.devtrack.backend.dto.ProjectDTO;
import java.util.stream.Collectors;
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

    // public List<Project> getAllProjects() {
    //     return repository.findAll();
    // }

    public List<ProjectDTO> getAllProjects() {
    return repository.findAll()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
}

    // public Project createProject(Project project) {
    //     return repository.save(project);
    // }

    public ProjectDTO createProject(ProjectDTO dto) {
    Project project = mapToEntity(dto);
    Project saved = repository.save(project);
    return mapToDTO(saved);
}

    public void deleteProject(Long id) {
         repository.deleteById(id);
     }



    // public Project updateProject(Long id, Project updatedProject) {
    //     return repository.findById(id)
    //             .map(project -> {
    //                 project.setName(updatedProject.getName());
    //                 project.setDescription(updatedProject.getDescription());
    //                 return repository.save(project);
    //             })
    //             .orElseThrow(() -> new RuntimeException("Project not found"));
    // }

    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
    return repository.findById(id)
            .map(project -> {
                project.setName(dto.getName());
                project.setDescription(dto.getDescription());
                return mapToDTO(repository.save(project));
            })
            .orElseThrow(() -> new RuntimeException("Project not found"));
}

    private ProjectDTO mapToDTO(Project project) {
    return new ProjectDTO(
            project.getId(),
            project.getName(),
            project.getDescription()
    );
}

private Project mapToEntity(ProjectDTO dto) {
    return new Project(
            dto.getName(),
            dto.getDescription()
    );
}

    
}