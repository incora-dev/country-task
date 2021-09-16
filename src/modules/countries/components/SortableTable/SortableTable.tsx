import { CriteriaWithPagination, EuiBasicTableColumn, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner, EuiTableSortingType } from '@elastic/eui';
import React, { useState } from 'react';

import {
  EuiBasicTable,
  EuiSpacer,
} from '@elastic/eui';
import { Direction } from '@elastic/eui/src/services/sort';
import { CountryModel } from '../../../../models/country';
import { useSortableData } from './useSortableData';

interface SortableTableProps {
  items: CountryModel[];
  loading: boolean;
}

export const SortableTable = ({ items, loading }: SortableTableProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof CountryModel>('name');
  const [sortDirection, setSortDirection] = useState<Direction>('asc');
  const [search, setSearch] = useState('');

  const onTableChange = ({ page, sort }: CriteriaWithPagination<CountryModel>) => {
    const { index: pageIndex, size: pageSize } = page;

    const { field: sortField, direction: sortDirection } = sort ?? {};

    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField!);
    setSortDirection(sortDirection!);
  };

  const { pageOfItems, totalItemCount } = useSortableData(
    items,
    pageIndex,
    pageSize,
    sortField,
    sortDirection,
    search
  );

  const columns: EuiBasicTableColumn<CountryModel>[] = [
    {
      field: 'name',
      name: 'Country name',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'code',
      name: 'ISO code',
      truncateText: true,
      sortable: true,
    },
    {
      field: 'continent.name',
      name: 'Continent',
      sortable: true,
    },
    {
      field: 'emoji',
      name: 'Country flag',
    }
  ];

  const onChange = (e: any) => {
    setSearch(e.target.value);
    setPageIndex(0);
  }

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting: EuiTableSortingType<any> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    }
  };

  if (loading) {
    return (
      <EuiFlexGroup justifyContent="spaceAround" style={{ marginTop: 40 }} >
        <EuiFlexItem>
          <EuiFlexGroup alignItems="center" direction="column">
            <EuiLoadingSpinner size="xl" />
            <span>Loading...</span>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  return (
    <div>
      <EuiFieldText
        placeholder="Placeholder text"
        value={search}
        onChange={onChange}
      />
      <EuiSpacer />
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    </div>
  );
};