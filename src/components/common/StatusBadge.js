export default function StatusBadge({ status }) {
  const variants = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    lowstock: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const className = variants[status] || variants.inactive;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {status.toUpperCase()}
    </span>
  );
}