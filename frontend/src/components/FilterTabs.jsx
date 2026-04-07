const FilterTabs = ({ activeFilter, onFilterChange, counts = {} }) => {
  const filters = [
    { id: 'all', label: 'All', count: counts.all || 0 },
    { id: 'pending', label: 'Pending', count: counts.pending || 0 },
    { id: 'approved', label: 'Approved', count: counts.approved || 0 },
    { id: 'rejected', label: 'Rejected', count: counts.rejected || 0 }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-dark-700">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
            flex items-center gap-2 whitespace-nowrap
            ${
              activeFilter === filter.id
                ? 'bg-primary text-white shadow-lg shadow-primary/50'
                : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
            }
          `}
        >
          {filter.label}
          <span className={`
            text-xs font-bold px-2 py-0.5 rounded-full
            ${activeFilter === filter.id ? 'bg-white/20' : 'bg-dark-700'}
          `}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
