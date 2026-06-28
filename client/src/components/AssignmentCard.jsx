function statusTone(status) {
  if (status === 'Completed') return 'success';
  if (status === 'In Progress') return 'warning';
  return 'neutral';
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export default function AssignmentCard({ assignment, onEdit, onDelete }) {
  return (
    <article className="assignment-card">
      <div className="assignment-card-header">
        <div>
          <h3>{assignment.title}</h3>
          <p>{assignment.subject}</p>
        </div>
        <span className={`priority priority-${assignment.priority.toLowerCase()}`}>{assignment.priority}</span>
      </div>
      <p className="assignment-description">{assignment.description || 'No description provided.'}</p>
      <div className="assignment-meta">
        <span className={`badge badge-${statusTone(assignment.status)}`}>{assignment.status}</span>
        <span>Due {formatDate(assignment.dueDate)}</span>
      </div>
      <div className="card-actions">
        <button type="button" onClick={() => onEdit(assignment)}>
          Edit
        </button>
        <button type="button" className="danger" onClick={() => onDelete(assignment._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
