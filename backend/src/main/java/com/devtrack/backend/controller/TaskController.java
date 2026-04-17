package com.devtrack.backend.controller;
import com.devtrack.backend.model.Task;
import com.devtrack.backend.dto.StatusUpdateDTO;
import com.devtrack.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> getAll() {
        return service.getAllTasks();
    }

    @PostMapping("/{projectId}")
    public Task create(@PathVariable Long projectId,@Valid @RequestBody Task task) {
        return service.createTask(projectId, task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }

    @PatchMapping("/{id}/status")
public Task updateStatus(@PathVariable Long id,@Valid @RequestBody StatusUpdateDTO dto) {
    return service.updateStatus(id, dto.getStatus());
    }

    @GetMapping("/{id}")
    public Task getById(@PathVariable Long id) {
    return service.getTaskById(id);
    }
    

}