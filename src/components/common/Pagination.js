'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = ['12', '50', 'all'],
}) {
  const isAll = String(pageSize) === 'all';
  const numericPageSize = isAll
    ? totalCount || 0
    : Number(pageSize) || 0;

  const start = totalCount > 0
    ? ((currentPage - 1) * numericPageSize) + 1
    : 0;
  const end = isAll
    ? totalCount
    : Math.min(currentPage * numericPageSize, totalCount);

  if (totalCount === 0) {
    return null;
  }

  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      pages.push(1, '...');
    } else {
      pages.push(1);
    }
    
    range.forEach(p => pages.push(p));
    
    if (currentPage + delta < totalPages - 1) {
      pages.push('...', totalPages);
    } else if (range[range.length - 1] < totalPages) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 border-t bg-background px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <Select value={String(pageSize)} onValueChange={onPageSizeChange}>
              <SelectTrigger className="h-8 w-[86px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {String(option) === 'all' ? 'All' : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <span>
          Showing {start} to {end} of {totalCount} results
        </span>
      </div>
      {totalPages > 1 && (
      <div className="flex items-center gap-1 self-start lg:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {getPageNumbers().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={cn('h-8 w-8 p-0', page === currentPage && 'bg-primary text-primary-foreground')}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
      )}
    </div>
  );
}

