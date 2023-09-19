import {
  Backdrop,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { CategoryTree } from '@/src/helpers/commercetools/category/categoriesTree';

type CategoriesTreeProps = {
  tree: CategoryTree[];
  open: string;
  searchQuery: string;
  onClick: (id: string, path?: string) => void;
};

function CategoriesTree({ tree, open, onClick, searchQuery }: CategoriesTreeProps) {
  return (
    <List disablePadding sx={{ '& > *': { ml: 1 } }}>
      {tree.map((item) => {
        const hasChild = item.children.length > 0;
        return (
          <Fragment key={item.id}>
            <Box sx={{ display: 'flex' }}>
              <ListItemButton
                sx={{ pl: 1 }}
                onClick={() => {
                  const path = `/products${item.slug}${searchQuery}`;
                  onClick('close', path);
                }}
              >
                <ListItemText sx={{ m: 0 }} primary={item.name} />
              </ListItemButton>
              <Divider orientation="vertical" sx={{ ml: 1 }} flexItem />
              {hasChild ? (
                <Box
                  sx={{
                    display: 'flex',
                    height: '100%',
                    width: '36px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton sx={{ width: 34, aspectRatio: 1 }} onClick={() => onClick(item.id)}>
                    {open === item.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ minWidth: '36px', height: '40px' }} />
              )}
            </Box>
            <Collapse in={item.id === open} timeout="auto" unmountOnExit>
              {item.children.length > 0 && (
                <CategoriesTree
                  open={open}
                  tree={item.children}
                  onClick={onClick}
                  searchQuery={searchQuery}
                />
              )}
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
}

type Props = {
  tree: CategoryTree[];
  sx?: SxProps<Theme>;
};

export default function CategoryDropDown({ tree, sx }: Props) {
  const [open, setOpen] = useState('');
  const [openCategory, setOpenCategory] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const searchQuery = sort && order ? `?sort=${sort}&order=${order}` : '';
  const handleClick = (id: string, path?: string) => {
    if (id === 'close' && path) {
      setOpenCategory(false);
      setOpen('');
      router.push(path);
      return;
    }

    id && setOpen((value) => (value === id ? '' : id));
  };

  const handelBlur = () => {
    setOpenCategory(false);
    setOpen('');
  };
  const zIndexAdd = openCategory ? 10 : 0;
  return (
    <>
      <List
        disablePadding
        sx={{
          zIndex: zIndexAdd + 3,
          borderRadius: '5px',
          border: '1px solid #cccccc',
          position: 'relative',
          ...sx,
          '& svg': { fill: '#cccccc' },
        }}
      >
        <ListItemButton
          sx={{ p: '0', height: '100%' }}
          onClick={() => setOpenCategory(!openCategory)}
        >
          <ListItemText sx={{ m: 0, pl: 1 }} primary="Categories" />
          <Divider orientation="vertical" variant="middle" sx={{ ml: 1 }} flexItem />
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              width: '36px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {openCategory ? (
              <ExpandLess sx={{ '& .MuiSvgIcon-root': { fill: '#cccccc !important' } }} />
            ) : (
              <ExpandMore />
            )}
          </Box>
        </ListItemButton>
        <Collapse
          sx={{
            position: 'absolute',
            bgcolor: 'white',
            zIndex: zIndexAdd + 1,
            ml: '-1px',
            mr: '-2px',
            borderRadius: '5px',
            border: '1px solid #e0e0e0',
            width: 'calc(100% + 2px)',
          }}
          in={openCategory}
          timeout="auto"
          unmountOnExit
        >
          <CategoriesTree open={open} tree={tree} onClick={handleClick} searchQuery={searchQuery} />
        </Collapse>
      </List>
      <Backdrop
        sx={{ zIndex: zIndexAdd + 2, bgcolor: 'transparent' }}
        open={openCategory}
        onClick={handelBlur}
      />
    </>
  );
}

CategoryDropDown.defaultProps = {
  sx: undefined,
};
