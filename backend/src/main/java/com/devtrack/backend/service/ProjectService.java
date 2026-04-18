package com.devtrack.backend.service;
import com.devtrack.backend.dto.ProjectDTO;
import java.util.stream.Collectors;
import com.devtrack.backend.model.Project;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<ProjectDTO> getAllProjects() {
    return repository.findAll()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
}

    public ProjectDTO getProjectById(Long id) {
    Project project = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    return mapToDTO(project);
}

private String getProjectStatus(Project project) {
    if (project.getDeadline() == null) return "NO DEADLINE";

    LocalDate today = LocalDate.now();

    if (project.getDeadline().isBefore(today)) {
        return "LATE";
    } else if (project.getDeadline().isBefore(today.plusDays(3))) {
        return "AT RISK";
    } else {
        return "ON TRACK";
    }
}

    public ProjectDTO createProject(ProjectDTO dto) {
    Project project = mapToEntity(dto);
    Project saved = repository.save(project);
    return mapToDTO(saved);
}

    public void deleteProject(Long id) {
         repository.deleteById(id);
     }


    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
    return repository.findById(id)
            .map(project -> {
                project.setName(dto.getName());
                project.setDescription(dto.getDescription());
                project.setDeadline(dto.getDeadline());
                return mapToDTO(repository.save(project));
            })
            .orElseThrow(() -> new RuntimeException("Project not found"));
}

    private ProjectDTO mapToDTO(Project project) {
    return new ProjectDTO(
            project.getId(),
            project.getName(),
            project.getDescription(),
            project.getDeadline(),
            getProjectStatus(project)
    );
}

private Project mapToEntity(ProjectDTO dto) {
    return new Project(
            dto.getName(),
            dto.getDescription(),
            dto.getDeadline()
    );
}

    
}