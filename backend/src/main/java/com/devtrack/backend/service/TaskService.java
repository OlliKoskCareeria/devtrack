package com.devtrack.backend.service;
import com.devtrack.backend.dto.StatusUpdateDTO;
import com.devtrack.backend.model.Task;
import com.devtrack.backend.model.Project;
import com.devtrack.backend.repository.TaskRepository;
import com.devtrack.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Long projectId, Task task) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setProject(project);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateStatus(Long id, String status) {
    return taskRepository.findById(id)
            .map(task -> {
                task.setStatus(status);
                return taskRepository.save(task);
            })
            .orElseThrow(() -> new RuntimeException("Task not found"));
}
}