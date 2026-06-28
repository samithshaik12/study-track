import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AssignmentForm from './components/AssignmentForm';
import AssignmentList from './components/AssignmentList';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { assignmentApi } from './services/api';

const emptyForm = {
  title: '',
  subject: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: ''
};

export default function App() {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssignments = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await assignmentApi.getAll();
        setAssignments(data);
      } catch (requestError) {
        setError('Could not load assignments. Check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    let items = [...assignments];

    if (search.trim()) {
      const term = search.toLowerCase();
      items = items.filter((assignment) =>
        [assignment.title, assignment.subject, assignment.description, assignment.priority, assignment.status]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term))
      );
    }

    if (filter !== 'All') {
      items = items.filter((assignment) => {
        if (filter === 'High Priority') return assignment.priority === 'High';
        return assignment.status === filter;
      });
    }

    items.sort((left, right) => {
      if (sort === 'Oldest') {
        return new Date(left.createdAt) - new Date(right.createdAt);
      }
      if (sort === 'Due Date') {
        return new Date(left.dueDate) - new Date(right.dueDate);
      }
      return new Date(right.createdAt) - new Date(left.createdAt);
    });

    return items;
  }, [assignments, search, filter, sort]);

  const summary = useMemo(() => ({
    total: assignments.length,
    pending: assignments.filter((assignment) => assignment.status === 'Pending').length,
    completed: assignments.filter((assignment) => assignment.status === 'Completed').length,
    dueToday: assignments.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      const today = new Date();
      return dueDate.toDateString() === today.toDateString();
    }).length,
    highPriority: assignments.filter((assignment) => assignment.priority === 'High').length
  }), [assignments]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.title || !formData.subject || !formData.priority || !formData.status || !formData.dueDate) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      if (editingId) {
        const updatedAssignment = await assignmentApi.update(editingId, formData);
        setAssignments((current) => current.map((assignment) => (assignment._id === editingId ? updatedAssignment : assignment)));
      } else {
        const createdAssignment = await assignmentApi.create(formData);
        setAssignments((current) => [createdAssignment, ...current]);
      }
      resetForm();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to save assignment.');
    }
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment._id);
    setFormData({
      title: assignment.title,
      subject: assignment.subject,
      description: assignment.description || '',
      priority: assignment.priority,
      status: assignment.status,
      dueDate: assignment.dueDate.slice(0, 10)
    });
  };

  const handleDelete = async (id) => {
    try {
      await assignmentApi.remove(id);
      setAssignments((current) => current.filter((assignment) => assignment._id !== id));
      if (editingId === id) {
        resetForm();
      }
    } catch (requestError) {
      setError('Unable to delete assignment.');
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">StudyTrack</p>
            <h1>Student Assignment Tracker</h1>
            <p className="hero-text">
              Add assignments, track priorities, and stay ahead of deadlines with a clean dashboard.
            </p>
          </div>
          <Dashboard summary={summary} />
        </section>

        <section className="workspace">
          <div className="panel">
            <div className="panel-header">
              <h2>{editingId ? 'Edit Assignment' : 'Add Assignment'}</h2>
              {editingId && (
                <button className="ghost-button" onClick={resetForm} type="button">
                  Cancel Edit
                </button>
              )}
            </div>
            <AssignmentForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
            {error && <p className="error-banner">{error}</p>}
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Assignments</h2>
              <SearchBar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
              />
            </div>
            {loading ? (
              <p className="muted">Loading assignments...</p>
            ) : (
              <AssignmentList assignments={filteredAssignments} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
