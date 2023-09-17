import { Breadcrumbs, Collapse, Link as LinkMui } from '@mui/material';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { Category } from '@commercetools/platform-sdk';
import { useSearchParams } from 'next/navigation';
import createArrForBreadcrumbs, { BreadcrumbsObj } from '@/src/helpers/commercetools/category';

type Props = {
  category: Category | null;
};

export default function ProductsBreadcrumbs({ category }: Props) {
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const searchQuery = sort && order ? `?sort=${sort}&order=${order}` : '';

  const arrSlugs: BreadcrumbsObj[] = [
    { name: { 'en-US': 'Products' }, slug: { 'en-US': 'products' }, id: '1' },
  ];
  category && arrSlugs.push(...createArrForBreadcrumbs(category));

  let path = '';

  return (
    <Collapse in={arrSlugs.length > 1} timeout="auto" unmountOnExit>
      <Breadcrumbs aria-label="breadcrumb">
        {arrSlugs.slice(0, -1).map((item) => {
          path += `/${item.slug['en-US']}`;
          return (
            <LinkMui
              key={item.id}
              component={Link}
              underline="hover"
              color="inherit"
              href={path + searchQuery}
            >
              {item.name['en-US']}
            </LinkMui>
          );
        })}
        <Typography color="text.primary">{arrSlugs.at(-1)?.name['en-US']}</Typography>
      </Breadcrumbs>
    </Collapse>
  );
}
