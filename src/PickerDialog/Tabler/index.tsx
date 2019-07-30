import * as React from 'react';
import { Table } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';

interface Props {
  multiple?: boolean;
  columns: ColumnProps<any>[];
  dataSource: any[];
  selection: any[];
  setSelection: (s: any[]) => void;
  onSubmit: (s: any[]) => void;
  meta: PageMeta;
  setCurrentPage: (pageNo: number) => void;
}

const Tabler: React.FC<Props> = ({
  multiple,
  columns,
  dataSource,
  selection,
  setSelection,
  onSubmit,
  meta,
  setCurrentPage
}) => {
  console.log('selection', selection);
  const rowSelection: TableRowSelection<any> = {
    type: multiple ? 'checkbox' : 'radio',
    selectedRowKeys: selection.map(it => it.id),
    onChange: (ids, rows) => {
      setSelection(rows.map(it => ({ ...it })));
    }
  };

  const pagination = {
    current: meta.pageNo,
    pageSize: meta.pageSize || 10,
    total: meta.total,
    onChange: (page: number) => setCurrentPage(page)
  };

  const appendToSelection = (row: Identity) => {
    if (!selection.find(it => it.id === row.id)) {
      const newSelection = [...selection, row];
      setSelection(newSelection);
      return newSelection;
    } else {
      return selection;
    }
  };

  const onRowClick = React.useCallback(
    row => ({
      onClick: () => {
        appendToSelection(row);
      },
      onDoubleClick: () => {
        const newSelection = appendToSelection(row);
        onSubmit(newSelection);
      }
    }),
    []
  );

  return (
    <Table
      size={'small'}
      onRow={onRowClick}
      rowKey={'id'}
      columns={columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={pagination}
    />
  );
};

export default Tabler;
