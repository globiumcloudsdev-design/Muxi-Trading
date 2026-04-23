'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CategoryModal from '@/components/modals/CategoryModal';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import DataTable from '@/components/common/DataTable';
import ConfirmModal from '@/components/common/ConfirmModal';
import Loader from '@/components/common/Loader';
import Pagination from '@/components/common/Pagination';
import { API } from '@/lib/api/end-point';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('12');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize,
        includeInactive: 'true'
      });
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const response = await fetch(`${API.categories.getAll}?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data || []);
        setPagination(data.pagination || {});
      } else {
        showMessage(data.error || 'Failed to fetch', 'error');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      showMessage('Network error', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, showMessage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

// No client-side filtering needed - server-side handles search


  const columns = [
    {
      key: 'image',
      label: 'Image',
      className: 'w-20',
      render: (item) => (
        <img
          src={item.image || '/Muxi Trading Logo.png'}
          alt={item.name}
          className="w-10 h-10 rounded-lg object-contain border border-gray-200 bg-white p-1"
        />
      )
    },
    { key: 'name', label: 'Name', className: 'font-medium' },
    { key: 'slug', label: 'Slug' },
    { 
      key: 'description', 
      label: 'Description', 
      render: (item) => {
        const desc = (item.description || '').trim();
        return desc.length > 50 ? `${desc.substring(0, 50)}...` : desc || '-';
      }
    },
    { key: 'isActive', label: 'Status', render: (item) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {item.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  // CREATE & UPDATE
  const handleSubmit = async (data) => {
    try {
      const token = localStorage.getItem('accessToken');
      let url, method;
      
      if (editingCategory) {
        url = API.categories.update(editingCategory._id);
        method = 'PUT';
      } else {
        url = API.categories.create;
        method = 'POST';
      }

      const payload = new FormData();
      payload.append('name', data.name || '');
      payload.append('description', data.description || '');
      payload.append('isActive', String(data.isActive !== false));

      if (data.image instanceof File) {
        payload.append('image', data.image);
      }

      if (data.removeImage) {
        payload.append('removeImage', 'true');
      }
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: payload,
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        showMessage(editingCategory ? 'Category updated!' : 'Category created!');
        fetchCategories();
        setModalOpen(false);
        setEditingCategory(null);
      } else {
        showMessage(result.error || 'Operation failed', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Network error', 'error');
    }
  };

  // DELETE FUNCTION - Fixed
  const handleDeleteClick = (id) => {
    console.log('Delete clicked for ID:', id);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Deleting category with ID:', deleteId);
      
      const response = await fetch(API.categories.delete(deleteId), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const rawBody = await response.text();
      let result;

      try {
        result = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        result = { success: false, error: rawBody || 'Request failed' };
      }

      console.log('Delete response:', result);

      if (!response.ok || !result.success) {
        showMessage(result.error || `Delete failed: ${response.status}`, 'error');
        return;
      }

      if (response.ok && result.success) {
        showMessage('Category deleted successfully!');
        fetchCategories();
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      showMessage('Network error', 'error');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Message */}
      {message.text && (
        <div className={`p-3 rounded-lg ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700 border border-red-400'
            : 'bg-green-100 text-green-700 border border-green-400'
        }`}>
          {message.text}
        </div>
      )}
      
      <PageHeader
        title="Categories"
        description="Manage your categories"
        buttonText="Add Category"
        onButtonClick={() => { setEditingCategory(null); setModalOpen(true); }}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Categories ({pagination.totalCount || 0})</CardTitle>
            <SearchBar onSearch={handleSearch} placeholder="Search categories..." />
          </div>
        </CardHeader>
        <CardContent className="max-h-[63vh] overflow-y-auto pr-2">
          <DataTable
            data={categories}
            columns={columns}
            pagination={pagination}
            onEdit={(category) => {
              setEditingCategory(category);
              setModalOpen(true);
            }}
            onDelete={handleDeleteClick}
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

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCategory(null); }}
        category={editingCategory}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
}