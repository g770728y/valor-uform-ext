import * as React from 'react';
import { Modal } from 'antd';
import Tabler from './Tabler';
import { ColumnProps } from 'antd/lib/table';
import * as R from 'rambda';
import Query from './Query';

export interface Props {
  // 是否多选
  multiple?: boolean;
  title?: string;
  show: boolean;
  onOk: (result: any) => void;
  onCancel: () => void;
  columns: ColumnProps<any>[];
  data?: Identity[];
  width?: number;
  getData?: (p: {
    pageNo: number;
    pageSize: number;
    [k: string]: any;
  }) => Promise<{ meta: PageMeta; entities: Identity[] }>;
  pageSize?: number;
  defaultQueries?: Record<string, any>;
  queryFields?: React.ReactChild[];
}
const PickerDialog: React.FC<Props> = ({
  multiple,
  title,
  show,
  onOk,
  onCancel,
  width = 600,
  columns,
  data,
  getData,
  pageSize,
  defaultQueries,
  queryFields
}) => {
  const [selection, setSelection] = React.useState<Identity[]>([]);
  const [dataSource, setDataSource] = React.useState(data || []);
  const [meta, setMeta] = React.useState({
    pageSize: pageSize || 10,
    pageNo: 1,
    total: 0
  });
  const [queries, setQueries] = React.useState(defaultQueries || {});

  React.useEffect(() => {
    if (getData) {
      getData({
        pageNo: meta.pageNo,
        pageSize: meta.pageSize,
        ...queries
      }).then(result => {
        setDataSource(result.entities);
        setMeta({ ...meta, total: result.meta.total });
      });
    }
  }, [meta.pageNo, queries]);

  const onSubmit = (selection: Identity[]) => {
    if (selection.length > 0) {
      const _selection = selection.map(it => ({
        ...it,
        _record_: true
      }));
      return onOk(multiple ? _selection : _selection[0]);
    }
  };

  const setCurrentPage = (pageNo: number) => {
    setMeta({ ...meta, pageNo });
  };

  return (
    <Modal
      width={width}
      title={title || '双击选择'}
      visible={show}
      onOk={() => onSubmit(selection)}
      onCancel={onCancel}
      okText={'确定'}
      cancelText={'取消'}
    >
      {queryFields && (
        <Query
          queryFields={queryFields}
          queries={queries}
          setQueries={setQueries}
        />
      )}
      <Tabler
        meta={meta}
        setCurrentPage={setCurrentPage}
        multiple={multiple}
        columns={columns}
        dataSource={dataSource}
        setSelection={setSelection as any}
        selection={selection}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

export default PickerDialog;
