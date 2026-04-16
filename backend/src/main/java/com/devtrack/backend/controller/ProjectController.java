package com.devtrack.backend.controller;
import com.devtrack.backend.service.ProjectService;
import com.devtrack.backend.dto.ProjectDTO;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    
private final ProjectService service;

public ProjectController(ProjectService service) {
this.service = service;
}
    
@GetMapping
public List<ProjectDTO> getAll() {
return service.getAllProjects();
}

@GetMapping("/{id}")
public ProjectDTO getById(@PathVariable Long id) {
    return service.getProjectById(id);
}


@PostMapping
public ProjectDTO create(@Valid @RequestBody ProjectDTO dto) {
return service.createProject(dto);
}

@PutMapping("/{id}")
public ProjectDTO update(@PathVariable Long id,@Valid @RequestBody ProjectDTO dto) {
return service.updateProject(id, dto);
}

@DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {
service.deleteProject(id);
}

    
}