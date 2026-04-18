function ProjectList({ projects, deleteProject, selectProject, selectedProjectId }) {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              backgroundColor:
                project.id === selectedProjectId ? "#e3f2fd" : "transparent",
              padding: "8px",
              borderRadius: "6px",
            }}
          >
            <span
              style={{ cursor: "pointer", fontWeight: "bold",
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
              {project.name} - {project.description}
              ({project.status})
              {project.deadline && 
              (<> - Due: {new Date(project.deadline).toLocaleDateString()}</>)}
               {/* - Due: {project.deadline
              ? new Date(project.deadline).toLocaleDateString()
              : "-"} */}
            </span>

            <div>
              <button
                className="delete-btn"
                onClick={() => deleteProject(project.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;