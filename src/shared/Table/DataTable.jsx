"use client";

import React, { useState, useMemo } from 'react';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { ChevronUp, ChevronDown, ChevronsUpDown, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import { Card, CardContent } from '../ui/card';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = 'No data available',
  className,
  sortable = true,
  pagination = true,
  pageSize = 10,
  selectable = false,
  onRowSelect,
  onSort,
  actions,
  showActions = true,
  className: tableClassName,
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortable || !Array.isArray(data))
      return Array.isArray(data) ? data : [];

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, sortable]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!pagination || !Array.isArray(sortedData)) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(
    (Array.isArray(sortedData) ? sortedData.length : 0) / pageSize,
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }
    return pages;
  };

  // Handle sorting
  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting

    if (onSort) {
      onSort(key, direction);
    }
  };

  // Handle row selection
  const handleRowSelect = (rowId, checked) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      onRowSelect(Array.from(newSelectedRows));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = paginatedData.map(row => row.id || row._id);
      setSelectedRows(new Set(allIds));
      if (onRowSelect) {
        onRowSelect(allIds);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  // Loading state (Perfect Skeleton)
  if (loading) {
    return (
      <Card className="border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 space-y-4">
            {/* Pagination Skeleton */}
            {pagination && (
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 bg-zinc-100 rounded animate-pulse" />
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 bg-zinc-100 rounded-md animate-pulse"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Table Skeleton */}
            <div className="overflow-x-auto">
              <ShadcnTable>
                {/* Header Skeleton */}
                <TableHeader>
                  <TableRow className="border-b border-zinc-200">
                    {selectable && (
                      <TableHead>
                        <div className="h-4 w-4 bg-zinc-100 rounded animate-pulse" />
                      </TableHead>
                    )}
                    {columns.map((_, i) => (
                      <TableHead key={i}>
                        <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse" />
                      </TableHead>
                    ))}
                    {showActions && actions && (
                      <TableHead>
                        <div className="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>

                {/* Body Skeleton */}
                <TableBody>
                  {Array.from({ length: pageSize || 5 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex} className="border-b border-zinc-100 last:border-0">
                      {selectable && (
                        <TableCell>
                          <div className="h-4 w-4 bg-zinc-100 rounded animate-pulse" />
                        </TableCell>
                      )}
                      {columns.map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <div className="h-4 w-full bg-zinc-100 rounded animate-pulse" />
                        </TableCell>
                      ))}
                      {showActions && actions && (
                        <TableCell>
                          <div className="h-8 w-20 bg-zinc-100 rounded-md animate-pulse" />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </ShadcnTable>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Early return for empty data handled mostly smoothly, but giving a dedicated message if not even loaded:
  if (!data || data.length === 0) {
    return (
      <Card className="border border-zinc-200 bg-white shadow-sm overflow-hidden flex flex-col items-center justify-center p-12 text-zinc-500">
        <LayoutList className="w-12 h-12 text-zinc-300 mb-4" />
        <p className="text-sm font-medium text-zinc-600">{emptyMessage}</p>
        <p className="text-xs text-zinc-400 mt-1">There are no records to display.</p>
      </Card>
    );
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-zinc-400 hover:text-zinc-600" />;
    }
    return sortConfig.direction === 'asc'
      ? <ChevronUp className="h-4 w-4 text-zinc-900" />
      : <ChevronDown className="h-4 w-4 text-zinc-900" />;
  };

  return (
    <Card className="border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className={cn('flex flex-col', className)}>
          
          {/* Top Pagination Control (optional) - Enterprise style often only has bottom, but let's keep it here if they rely on it */}
          {pagination && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-zinc-50/50">
              <div className="text-sm text-zinc-500 font-medium">
                {totalPages > 0 ? `Showing page ${currentPage} of ${totalPages}` : "No results"}
              </div>

              <Pagination className="justify-end w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className="cursor-pointer text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 h-8 px-3 rounded-md text-sm transition-colors"
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, i) => (
                    <PaginationItem key={i}>
                      {page === 'ellipsis' ? (
                        <PaginationEllipsis className="text-zinc-400" />
                      ) : (
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          className={cn(
                            "cursor-pointer h-8 w-8 rounded-md text-sm transition-colors",
                            page === currentPage 
                              ? "bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white" 
                              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                          )}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className="cursor-pointer text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 h-8 px-3 rounded-md text-sm transition-colors"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* TABLE */}
          <div className="overflow-x-auto">
            <ShadcnTable className={cn("w-full text-sm", tableClassName)} {...props}>
              <TableHeader className="bg-zinc-50/80">
                <TableRow className="border-b border-zinc-200 hover:bg-transparent">
                  {selectable && (
                    <TableHead className="w-[45px] text-center px-4 py-3">
                      <Checkbox
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={handleSelectAll}
                        className="border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                      />
                    </TableHead>
                  )}

                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className="px-4 py-3 text-left font-medium text-zinc-500 cursor-pointer select-none whitespace-nowrap"
                      onClick={() => handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-1.5 group">
                        <span className="group-hover:text-zinc-800 transition-colors">{column.title}</span>
                        {getSortIcon(column.key)}
                      </div>
                    </TableHead>
                  ))}

                  {showActions && actions && (
                    <TableHead className="px-4 py-3 text-right font-medium text-zinc-500 whitespace-nowrap">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((row, index) => {
                  const rowId = row.id || row._id || index;
                  const isSelected = selectedRows.has(rowId);

                  return (
                    <TableRow 
                      key={rowId}
                      className={cn(
                        "border-b border-zinc-100 last:border-0 transition-colors hover:bg-zinc-50",
                        isSelected && "bg-zinc-50/60"
                      )}
                    >
                      {selectable && (
                        <TableCell className="px-4 py-3 text-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => handleRowSelect(rowId, checked)}
                            className="border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                          />
                        </TableCell>
                      )}

                      {columns.map((column) => (
                        <TableCell key={column.key} className="px-4 py-3 text-zinc-700 font-medium">
                          {column.render
                            ? column.render(row[column.key], row, index)
                            : String(row[column.key] || "-")}
                        </TableCell>
                      ))}

                      {showActions && actions && (
                        <TableCell className="px-4 py-3 text-right">
                          <div className="flex justify-end pr-2">
                            {typeof actions === "function" ? actions(row, index) : actions}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </ShadcnTable>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;