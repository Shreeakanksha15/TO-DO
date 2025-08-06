import { CheckCircle, Clock, List } from "lucide-react";

function TodoFilters({ currentFilter, stats }) {
  //console.log(currentFilter);

  const filters = [
    { key: "all", label: "All", icon: List, count: stats.total },
    { key: "active", label: "Active", icon: Clock, count: stats.active },
    {
      key: "complete",
      label: "Complete",
      icon: CheckCircle,
      count: stats.complete,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-gray-200 rounded-lg p-1">
        {/* logic */}
        {filters.map(({ key, label, icon: Icon, count }) => {
          // here minor issue Key is define in filters with capital letter "K"
          //console.log(key);
          //console.log(label);
          //console.log(Icon);
          //console.log(count);

          return (
            <button
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentFilter === key
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-gray-700 hover:text-gray-800 hover:bg-gray-300"
              }`}
              key={key}
            >
              <Icon size={16} />

              <span>{label}</span>
              <span>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TodoFilters;
