'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, FolderTree, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/items', label: 'Items', icon: Package },
];

export default function AdminSidebar({ mobileOpen = false, onClose = () => {} }) {
  const pathname = usePathname();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col bg-white shadow-lg transition-transform md:static md:z-auto md:w-64 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      <div className="flex items-center justify-between border-b p-4 md:p-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/Muxi Trading Logo.png"
              alt="Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">MUXI Trading</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
        <button
          type="button"
          className="rounded-md border border-gray-200 p-2 text-gray-600 md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <nav className="mt-4 flex-1 md:mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 rounded-none px-4 py-6 md:px-6 ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
      </aside>
    </>
  );
}
