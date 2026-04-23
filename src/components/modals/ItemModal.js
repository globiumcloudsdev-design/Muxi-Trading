'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ItemForm from '@/components/forms/ItemForm';

export default function ItemModal({ isOpen, onClose, item, categories, onSubmit, isViewMode = false, onCategoryCreated }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isViewMode ? 'View Item' : (item ? 'Edit Item' : 'Create New Item')}</DialogTitle>
        </DialogHeader>
        <ItemForm
          item={item}
          categories={categories}
          onSubmit={onSubmit}
          onCancel={onClose}
          isViewMode={isViewMode}
          onCategoryCreated={onCategoryCreated}
        />
      </DialogContent>
    </Dialog>
  );
}