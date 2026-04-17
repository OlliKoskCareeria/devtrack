import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [errors, setErrors] = useState({});
  
  const fetchProjects = () => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  const fetchTasks = (projectId) => {
  fetch(`http://localhost:8080/api/tasks`)
    .then((res) => res.json())
    .then((data) => {
      // filter tasks by projectId
      const filtered = data.filter(
        (task) => task.project?.id === projectId
      );
      setTasks(filtered);
    })
    .catch((err) => console.error(err));
};

const createTask = (e) => {
  e.preventDefault();

  if (!selectedProjectId) return;

  const newTask = {
    title: taskTitle,
    status: "TODO",
  };

  fetch(`http://localhost:8080/api/tasks/${selectedProjectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  })
    .then((res) => res.json())
    .then(() => {
      setTaskTitle("");
      fetchTasks(selectedProjectId); // refresh tasks
    })
    .catch((err) => console.error(err));
};

const updateTaskStatus = (taskId, newStatus) => {
  fetch(`http://localhost:8080/api/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then(() => fetchTasks(selectedProjectId))
    .catch((err) => console.error(err));
};

  const deleteProject = (id) => {
  fetch(`http://localhost:8080/api/projects/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchProjects()) // refresh list
    .catch((err) => console.error(err));
};

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
    };

    fetch("http://localhost:8080/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData.errors || {});
        return;
      }

      setErrors({});
      setName("");
      setDescription("");
      fetchProjects();
    })
    .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>DevTrack</h1>

      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input
  type="text"
  placeholder="Project name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
{errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <br />
        <input
  type="text"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
{errors.description && (
  <p style={{ color: "red" }}>{errors.description}</p>
)}
        <br />
        <button type="submit">Add Project</button>
      </form>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
  <span onClick={() => {
    setSelectedProjectId(project.id);
    fetchTasks(project.id);
  }}>
    {project.name} - {project.description}
  </span>

  <button onClick={() => deleteProject(project.id)}>
    Delete
  </button>
</li>
        ))}
      </ul>
      {selectedProjectId && (
  <div>
    <h2>Tasks</h2>
    <h3>Add Task</h3>
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
      textDecoration: task.status === "DONE" ? "line-through" : "none",
    }}
  >
    {task.title} - {task.status}
  </span>

  {task.status !== "DONE" && (
    <button onClick={() => updateTaskStatus(task.id, "DONE")}>
      Mark as Done
    </button>
  )}
</li>
  ))}

    </ul>
  </div>
)}
    </div>
  );
}

export default App;