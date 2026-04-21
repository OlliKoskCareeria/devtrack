function ProjectList({ projects, deleteProject, selectProject, selectedProjectId, startEdit,openTasks, }) {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              backgroundColor:
              project.id === selectedProjectId ? "#e3f2fd" : "transparent",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            <span
              style={{ cursor: "pointer", fontWeight: "bold", flex: 1, wordBreak: "break-word",
              color:
              project.status === "LATE"
              ? "red"
              : project.status === "AT RISK"
              ? "orange"
               : project.status === "ON TRACK"
              ? "green"
              : "gray",
              }}
              onClick={() => selectProject(project.id)}
            >
              <div className="project-text">
  <div className="project-name">
    {project.name}
  </div>

  <div className="project-desc">
    {project.description}
  </div>

  <div className="project-status">
    {project.status}
  </div>

  {project.deadline && (
    <div className="project-deadline">
      Due: {new Date(project.deadline).toLocaleDateString()}
    </div>
  )}
</div>
               
            </span>

            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              <button onClick={() => startEdit(project)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteProject(project.id)}>
                Delete
              </button>
              <button onClick={() => openTasks(project.id)}>
                Tasks
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;