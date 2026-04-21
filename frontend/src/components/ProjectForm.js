
function ProjectForm({
  name,
  description,
  deadline,
  setName,
  setDescription,
  setDeadline,
  handleSubmit,
  errors,
}) {
  
  return (
    <div>
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
        <input
  // key={deadline}
  type="date"
  value = {deadline}
  // value={deadline || ""}
  onChange={(e) => setDeadline(e.target.value)}
/>
        
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;