import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { Fragment } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CategoryTree } from '@/src/helpers/commercetools/category/categoriesTree';

type Props = {
  tree: CategoryTree[];
};

export default function CategoriesTree({ tree }: Props) {
  const [open, setOpen] = React.useState('');
  const handleClick = (id: string) => {
    setOpen((value) => (value === id ? '' : id));
  };
  return (
    <List disablePadding sx={{ '& > *': { ml: 2 } }}>
      {tree.map((item) => {
        const hasChild = item.children.length > 0;
        return (
          <Fragment key={item.id}>
            <ListItemButton onClick={() => hasChild && handleClick(item.id)}>
              <ListItemText primary={item.name} />
              {hasChild && (open === item.id ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={item.id === open} timeout="auto" unmountOnExit>
              {item.children.length > 0 && <CategoriesTree tree={item.children} />}
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
}
