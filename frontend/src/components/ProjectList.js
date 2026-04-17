function ProjectList({ projects, deleteProject, selectProject }) {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span onClick={() => selectProject(project.id)}>
              {project.name} - {project.description}
            </span>

            <button onClick={() => deleteProject(project.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;