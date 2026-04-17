'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ItemModal from '@/components/modals/ItemModal';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import DataTable from '@/components/common/DataTable';
import ConfirmModal from '@/components/common/ConfirmModal';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/common/Pagination';
import { API } from '@/lib/api/end-point';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('12');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch Items
  const fetchItems = useCallback(async (page = currentPage, limit = pageSize, search = searchTerm) => {
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) {
        params.append('search', search);
      }

      const res = await fetch(`${API.items.getAll}?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.data || []);
        setPagination(data.pagination || {});
      }
    } catch (err) {
      console.error('Items fetch error:', err);
    }
  }, [currentPage, pageSize, searchTerm]);

  // Fetch Categories
  const fetchCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(API.categories.getAll, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error('Categories fetch error:', err);
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchItems(), fetchCategories()]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchCategories, fetchItems]);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Create / Update Item
  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const url = editingItem ? API.items.update(editingItem._id) : API.items.create;
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        showMessage(editingItem ? 'Item updated!' : 'Item created!');
        fetchItems(currentPage, pageSize, searchTerm);
        setModalOpen(false);
        setEditingItem(null);
      } else {
        showMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      showMessage('Network error');
    }
  };

  // Delete Item
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(API.items.delete(deleteId), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const rawBody = await res.text();
      let data;

      try {
        data = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        data = { success: false, error: rawBody || 'Delete failed' };
      }

      if (data.success) {
        showMessage('Item deleted!');
        fetchItems(currentPage, pageSize, searchTerm);
      } else {
        showMessage(data.error || 'Delete failed');
      }
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      showMessage('Delete failed');
    }
  };

  // ==================== TABLE COLUMNS WITH IMAGE ====================
  const columns = [
    {
      key: 'thumbnail',
      label: 'Image',
      className: 'w-20',
      render: (item) => (
        
        item.thumbnail ? (
          <img
            src={item.thumbnail.url}
            alt={item.name}
            className="w-10 h-10 rounded-lg object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = '';
              e.target.className = 'w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center';
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )
      )
    },
    { key: 'productCode', label: 'Code', className: 'w-24' },
    { key: 'name', label: 'Name', className: 'font-medium' },
    {
      key: 'category',
      label: 'Category',
      render: (item) => item.category?.name || '-',
    },
    {
      key: 'price',
      label: 'Price (₨ PKR)',
      render: (item) => `₨${item.price?.toLocaleString() || 0}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (item) => (
        <span className={item.stock < 10 ? 'text-red-500 font-bold' : ''}>
          {item.stock || 0}
        </span>
      )
    },
  ];

  if (loading) {
    return <Loader />;
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className="p-3 bg-green-100 text-green-700 border border-green-400 rounded-lg">
          {message}
        </div>
      )}

      {/* Header */}
      <PageHeader
        title="Items"
        description="Manage your inventory"
        buttonText="Add Item"
        onButtonClick={() => {
          setEditingItem(null);
          setModalOpen(true);
        }}
      />

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Items ({pagination.totalCount || 0})</CardTitle>
            <SearchBar onSearch={handleSearch} placeholder="Search items..." />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={items}
            columns={columns}
            onEdit={(item) => {
              setEditingItem(item);
              setModalOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
          />
          <Pagination
            currentPage={pagination.currentPage || 1}
            totalPages={pagination.totalPages || 1}
            pageSize={pageSize}
            totalCount={pagination.totalCount || 0}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <ItemModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
        categories={categories}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
      />
    </div>
  );
}