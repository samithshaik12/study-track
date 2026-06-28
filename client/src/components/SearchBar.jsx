export default function SearchBar({ search, setSearch, filter, setFilter, sort, setSort }) {
  return (
    <div className="toolbar">
      <input
        className="search-input"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search assignments"
      />
      <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        <option>All</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
        <option>High Priority</option>
      </select>
      <select value={sort} onChange={(event) => setSort(event.target.value)}>
        <option>Newest</option>
        <option>Oldest</option>
        <option>Due Date</option>
      </select>
    </div>
  );
}
