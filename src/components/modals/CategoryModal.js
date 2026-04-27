'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CategoryForm from '@/components/forms/CategoryForm';

export default function CategoryModal({ isOpen, onClose, category, onSubmit, discountOffers = [] }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Create New Category'}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[75vh] overflow-y-auto pr-1">
          <CategoryForm
            category={category}
            discountOffers={discountOffers}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}