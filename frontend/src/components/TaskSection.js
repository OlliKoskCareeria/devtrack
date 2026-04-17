function TaskSection({
  selectedProjectId,
  tasks,
  taskTitle,
  setTaskTitle,
  createTask,
  updateTaskStatus,
}) {
  if (!selectedProjectId) return null;

  return (
    <div>
      <h2>Tasks</h2>

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
          <li key={task.id}>
            <span
              style={{
                textDecoration:
                  task.status === "DONE" ? "line-through" : "none",
              }}
            >
              {task.title} - {task.status}
            </span>

            {task.status !== "DONE" && (
              <button
                onClick={() => updateTaskStatus(task.id, "DONE")}
              >
                Mark as Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSection;