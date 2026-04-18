function ProjectEditForm({
  editingProject,
  setEditingProject,
  updateProject,
  setCancelEdit
}) {
  return (
    <div>
      <h3>Edit Project</h3>

      <input
        value={editingProject.name}
        onChange={(e) =>
          setEditingProject({
            ...editingProject,
            name: e.target.value,
          })
        }
      />

      <input
        value={editingProject.description}
        onChange={(e) =>
          setEditingProject({
            ...editingProject,
            description: e.target.value,
          })
        }
      />

      <input
  type="date"
  value={editingProject.deadline || ""}
  onChange={(e) =>
    setEditingProject({
      ...editingProject,
      deadline: e.target.value,
    })
  }
/>

      <button onClick={updateProject}>Save</button>

      <button onClick={() => setCancelEdit(null)}>
        Cancel
      </button>
    </div>
  );
}

export default ProjectEditForm;