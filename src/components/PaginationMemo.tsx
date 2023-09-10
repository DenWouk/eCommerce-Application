import { Pagination } from '@mui/material';
import { ChangeEvent, memo } from 'react';

type Props = {
  className?: string;
  page: number | undefined;
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
  count: number;
};

function PaginationMemo(props: Props) {
  const { className, page, onChange, count } = props;
  return <Pagination className={className} count={count} page={page} onChange={onChange} />;
}

PaginationMemo.defaultProps = {
  className: undefined,
};

export default memo(PaginationMemo);
