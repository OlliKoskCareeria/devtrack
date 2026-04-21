function TaskSection({
  selectedProjectId,
  tasks,
  taskTitle,
  setTaskTitle,
  createTask,
  updateTaskStatus,
  setSelectedProjectId,
  deleteTask,
  project,
}) {
  if (!selectedProjectId) return null;

  return (
    <div>
      <h2>Tasks for: {project?.name}</h2>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
  
  <span
    className="task-text"
    style={{
      textDecoration: task.status === "DONE" ? "line-through" : "none",
      color: task.status === "DONE" ? "green" : "#333",
      fontWeight: task.status === "DONE" ? "normal" : "bold",
    }}
  >
    {task.title} - {task.status}
  </span>

  <div className="task-actions">
    {task.status !== "DONE" && (
      <button onClick={() => updateTaskStatus(task.id, "DONE")}>
        Mark as Done
      </button>
    )}

    <button className="delete-btn" onClick={() => deleteTask(task.id)}>
      🗑
    </button>
  </div>

</li>
          
        ))}
      </ul>
      <button onClick={() => setSelectedProjectId(null)}>
              Close Tasks
            </button>
    </div>
  );
}

export default TaskSection;