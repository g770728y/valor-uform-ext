import * as React from "react";
import { Table } from "antd";
import { ColumnProps, TableRowSelection } from "antd/lib/table";

interface Props {
  multiple?: boolean;
  columns: ColumnProps<any>[];
  dataSource: any[];
  selection: any[];
  setSelection: (s: any[]) => void;
  onSubmit: (s: any[]) => void;
  meta: PageMeta;
  setCurrentPage: (pageNo: number) => void;
  actions?: {
    onUpdate?: (id: any) => void;
    onDelete?: (id: any) => void;
  };
}

const Tabler: React.FC<Props> = ({
  multiple,
  columns,
  dataSource,
  selection,
  setSelection,
  onSubmit,
  meta,
  setCurrentPage,
  actions
}) => {
  const actionColumn =
    actions && (actions.onDelete || actions.onUpdate)
      ? {
          title: "操作",
          dataIndex: "name",
          key: "action",
          width: 100,
          render: (s: string, item: Identity) => {
            return (
              <>
                {actions.onUpdate && (
                  <a
                    onClick={() => actions.onUpdate!(item.id)}
                    style={{ marginRight: 10 }}
                  >
                    修改
                  </a>
                )}
                {actions.onDelete && (
                  <a
                    onClick={() => actions.onDelete!(item.id)}
                    style={{ marginRight: 10 }}
                  >
                    删除
                  </a>
                )}
              </>
            );
          }
        }
      : null;

  const rowSelection: TableRowSelection<any> = {
    type: multiple ? "checkbox" : "radio",
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
        if (actions && (actions.onDelete || actions.onUpdate)) return;
        const newSelection = appendToSelection(row);
        onSubmit(newSelection);
      }
    }),
    []
  );

  return (
    <Table
      className="pollute"
      size={"small"}
      onRow={onRowClick}
      rowKey={"id"}
      columns={actionColumn ? [...columns, actionColumn] : columns}
      dataSource={dataSource}
      rowSelection={rowSelection}
      pagination={pagination}
    />
  );
};

export default Tabler;
