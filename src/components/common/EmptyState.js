import { FolderOpen } from 'lucide-react';

export default function EmptyState({ title = "No data found", description = "Try adjusting your search or add new items" }) {
  return (
    <div className="text-center py-12">
      <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}