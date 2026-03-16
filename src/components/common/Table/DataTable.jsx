'use client';

import React, { useState, useMemo } from 'react';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    if (!sortConfig.key || !sortable) return data;

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
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

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

  // Loading state
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className={cn('text-center py-12 text-muted-foreground', className)}>
        <div className="text-4xl mb-4">📊</div>
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc'
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className={cn('space-y-4', className)}>
        <ShadcnTable className={tableClassName} {...props}>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    sortable && column.sortable !== false && 'cursor-pointer select-none hover:bg-muted/50',
                    'text-left'
                  )}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
              {showActions && actions && <TableHead className="text-left">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, index) => {
              const rowId = row.id || row._id || index;
              const isSelected = selectedRows.has(rowId);

              return (
                <TableRow key={rowId} className={cn(isSelected && 'bg-muted/50')}>
                  {selectable && (
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleRowSelect(rowId, checked)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row, index)
                        : String(row[column.key] || '')
                      }
                    </TableCell>
                  ))}
                  {showActions && actions && (
                    <TableCell className="text-right">
                      {typeof actions === 'function'
                        ? actions(row, index)
                        : actions
                      }
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
    </div>
  );
};

export default DataTable;