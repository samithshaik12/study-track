import AssignmentCard from './AssignmentCard';

export default function AssignmentList({ assignments, onEdit, onDelete }) {
  if (!assignments.length) {
    return <p className="muted">No assignments found. Add one to get started.</p>;
  }

  return (
    <div className="assignment-grid">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment._id} assignment={assignment} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
