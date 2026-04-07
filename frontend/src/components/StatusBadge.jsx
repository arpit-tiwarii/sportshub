import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      icon: FiCheckCircle,
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      label: 'Approved'
    },
    pending: {
      icon: FiClock,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      label: 'Pending'
    },
    rejected: {
      icon: FiXCircle,
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      label: 'Rejected'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        font-medium text-sm transition-all duration-300
        ${config.bg} border ${config.border} ${config.text}
        hover:shadow-lg hover:scale-105
      `}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
