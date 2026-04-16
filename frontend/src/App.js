import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>DevTrack</h1>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;