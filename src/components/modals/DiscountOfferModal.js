'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy } from 'lucide-react';

const getInitialData = (offer) => ({
  offerName: offer?.offerName || '',
  offerTitle: offer?.offerTitle || '',
  description: offer?.description || '',
  discountType: offer?.discountType || 'percentage',
  discountValue: offer?.discountValue ?? '',
  forceRepeatSession: offer?.forceRepeatSession || false,
  status: offer?.status || 'active',
  startDate: offer?.startDate ? new Date(offer.startDate).toISOString().slice(0, 16) : '',
  endDate: offer?.endDate ? new Date(offer.endDate).toISOString().slice(0, 16) : '',
});

export default function DiscountOfferModal({ isOpen, onClose, offer, onSubmit }) {
  const [data, setData] = useState(getInitialData(offer));
  const isEdit = !!offer;

  useEffect(() => {
    setData(getInitialData(offer));
  }, [offer]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const handleDuplicate = () => {
    setData((prev) => ({
      ...prev,
      offerName: `${prev.offerName} (Copy)`,
      offerTitle: `${prev.offerTitle} (Copy)`,
      status: 'inactive',
      forceRepeatSession: prev.forceRepeatSession,
      discountType: prev.discountType,
    }));
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">
            {isEdit ? 'Edit Discount Offer' : 'Create Discount Offer'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-5">
            {/* Offer Title */}
            <div className="space-y-2">
              <Label htmlFor="offerTitle">Offer Title *</Label>
              <Input
                id="offerTitle"
                value={data.offerTitle}
                onChange={(e) => {
                  const title = e.target.value;
                  handleChange('offerTitle', title);
                  handleChange('offerName', title);
                }}
                placeholder="e.g. Eid Special Discount"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Brief description of the discount offer"
                rows={3}
              />
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select value={data.discountType} onValueChange={(v) => handleChange('discountType', v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (PKR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discount Value */}
            <div className="space-y-2">
              <Label htmlFor="discountValue">
                {data.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Fixed Discount Amount (PKR)'}
              </Label>
              <Input
                id="discountValue"
                type="number"
                min="0"
                max={data.discountType === 'percentage' ? '100' : undefined}
                value={data.discountValue}
                onChange={(e) => handleChange('discountValue', e.target.value)}
                placeholder={data.discountType === 'percentage' ? 'e.g. 20' : 'e.g. 500'}
                required
              />
            </div>

            {/* Start & End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={data.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={data.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={data.status} onValueChange={(v) => handleChange('status', v)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Force Repeat Session */}
            <div className="flex items-center gap-3 pt-1">
              <input
                id="forceRepeatSession"
                type="checkbox"
                checked={data.forceRepeatSession}
                onChange={(e) => handleChange('forceRepeatSession', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#896336] focus:ring-[#896336]"
              />
              <Label htmlFor="forceRepeatSession" className="text-sm font-normal cursor-pointer">
                Force repeat session (show popup again on every visit)
              </Label>
            </div>
          </div>

          <div className="flex gap-2 pt-6 mt-2 border-t">
            {isEdit && (
              <Button type="button" variant="outline" onClick={handleDuplicate} className="gap-1">
                <Copy className="h-4 w-4" />
                Duplicate
              </Button>
            )}
            <Button type="submit" className="flex-1 bg-gradient-to-r from-[#896336] to-[#a88148] hover:opacity-90">
              {isEdit ? 'Update Offer' : 'Create Offer'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

