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
              style={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => selectProject(project.id)}
            >
              {project.name} - {project.description}
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