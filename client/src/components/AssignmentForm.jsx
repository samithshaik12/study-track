export default function AssignmentForm({ formData, setFormData, onSubmit }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <form className="assignment-form" onSubmit={onSubmit}>
      <label>
        Title *
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Complete MERN Assignment" />
      </label>
      <label>
        Subject *
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Web Development" />
      </label>
      <label>
        Description
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Finish CRUD APIs" rows="4" />
      </label>
      <div className="form-row">
        <label>
          Priority *
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>
          Status *
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
      </div>
      <label>
        Due Date *
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
      </label>
      <button className="primary-button" type="submit">
        Save Assignment
      </button>
    </form>
  );
}
