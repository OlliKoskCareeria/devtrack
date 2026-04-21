import { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import TaskSection from "./components/TaskSection";
import ProjectEditForm from "./components/ProjectEditForm";
import "./App.css";
const API_BASE_URL = process.env.REACT_APP_API_URL;
function App() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const openTasks = (id) => {
  setEditingProject(null);     // close edit if task open
  setSelectedProjectId(id);
  fetchTasks(id);
};

  const fetchProjects = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  };

  const fetchTasks = (projectId) => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) =>
        setTasks(data.filter((t) => t.project?.id === projectId))
      );
  };

  useEffect(fetchProjects, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/projects`, {
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
  fetch(`${API_BASE_URL}/api/projects/${editingProject.id}`, {
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
  fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: "DELETE",
  }).then(() => {
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
      setTasks([]);
    }
    fetchProjects();
  });
};

  
  const startEdit = (project) => {
  setSelectedProjectId(null);  
  setEditingProject(project);
  };
  const createTask = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/api/tasks/${selectedProjectId}`, {
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
    fetch(`${API_BASE_URL}/api/tasks/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() => fetchTasks(selectedProjectId));
  };

  const deleteTask = (id) => {
  fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
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
        deadline={deadline}
        handleSubmit={handleSubmit}
        errors={errors}
      />
<div className="main-layout">
  {loading && <p>Waking up server... ⏳</p>}
      <div className={selectedProjectId ? "hide-on-mobile" : ""}>
        <ProjectList
          projects={projects}
          deleteProject={deleteProject}
          selectProject={selectProject}
          selectedProjectId={selectedProjectId}
          startEdit={startEdit}
          openTasks={openTasks}
        />
      </div>
        
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
        deleteTask={deleteTask}
        project={selectedProject}
      />
      )}
      </div>
    </div>
  );
}

export default App;