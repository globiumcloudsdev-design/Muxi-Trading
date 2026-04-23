'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

export default function DataTable({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onView,
  actions = true,
  pagination = null 
}) {
  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  const handleDelete = (id) => {
    console.log('Delete clicked for ID:', id);
    if (onDelete) {
      onDelete(id);
    } else {
      console.warn('onDelete function is not provided');
    }
  };

  const handleEdit = (item) => {
    console.log('Edit clicked for:', item);
    if (onEdit) {
      onEdit(item);
    } else {
      console.warn('onEdit function is not provided');
    }
  };

  const handleView = (item) => {
    console.log('View clicked for:', item);
    if (onView) {
      onView(item);
    } else {
      console.warn('onView function is not provided');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.label}
            </TableHead>
          ))}
          {actions && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item._id || item.id || index}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.cellClassName}>
                {column.render ? column.render(item) : item[column.key]}
              </TableCell>
            ))}
            {actions && (
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {onView && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleView(item)}
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(item)}
                      type="button"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(item._id || item.id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}