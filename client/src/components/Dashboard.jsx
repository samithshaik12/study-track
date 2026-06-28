export default function Dashboard({ summary }) {
  const cards = [
    { label: 'Total Assignments', value: summary.total },
    { label: 'Pending', value: summary.pending },
    { label: 'Completed', value: summary.completed },
    { label: 'Due Today', value: summary.dueToday },
    { label: 'High Priority', value: summary.highPriority }
  ];

  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <article className="stat-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}
