import { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import TaskSection from "./components/TaskSection";
import ProjectEditForm from "./components/ProjectEditForm";
import "./App.css";
function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});

  const openTasks = (id) => {
  setEditingProject(null);     // close edit if task open
  setSelectedProjectId(id);
  fetchTasks(id);
};

  const fetchProjects = () => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  };

  const fetchTasks = (projectId) => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((data) =>
        setTasks(data.filter((t) => t.project?.id === projectId))
      );
  };

  useEffect(fetchProjects, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description,deadline: deadline || null, }),
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        setErrors(err.errors || {});
        return;
      }

      setErrors({});
      setName("");
      setDescription("");
      setDeadline("");
      fetchProjects();
    });
  };

  const updateProject = () => {
  fetch(`http://localhost:8080/api/projects/${editingProject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editingProject),
  })
    .then((res) => res.json())
    .then((updated) => {
      setProjects(
        projects.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingProject(null); // close form
    });
};

  const deleteProject = (id) => {
    fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
    }).then(fetchProjects);
  };

  // const startEdit = (project) => {
  // setEditingProject(project);
  // };

  const startEdit = (project) => {
  setSelectedProjectId(null);  
  setEditingProject(project);
  };
  const createTask = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/tasks/${selectedProjectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle, status: "TODO" }),
    }).then(() => {
      setTaskTitle("");
      fetchTasks(selectedProjectId);
    });
  };

  const updateTaskStatus = (id, status) => {
    fetch(`http://localhost:8080/api/tasks/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() => fetchTasks(selectedProjectId));
  };

  const selectProject = (id) => {
    setSelectedProjectId(id);
    fetchTasks(id);
  };

  return (
    <div className="container">
      <h1>DevTrack</h1>

      <ProjectForm
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
        setDeadline={setDeadline}
        handleSubmit={handleSubmit}
        errors={errors}
      />
<div className="main-layout">
      <ProjectList
        projects={projects}
        deleteProject={deleteProject}
        selectProject={selectProject}
        selectedProjectId={selectedProjectId}
        startEdit={startEdit}
        openTasks={openTasks}
      />
        
      {editingProject && (
      <ProjectEditForm
      editingProject={editingProject}
      setEditingProject={setEditingProject}
      updateProject={updateProject}
      setCancelEdit={setEditingProject}
      />
      )}
      {selectedProjectId &&(
      <TaskSection
        selectedProjectId={selectedProjectId}
        tasks={tasks}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        createTask={createTask}
        updateTaskStatus={updateTaskStatus}
        setSelectedProjectId={setSelectedProjectId}
      />
      )}
      </div>
    </div>
  );
}

export default App;