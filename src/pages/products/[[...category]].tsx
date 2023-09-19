import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR, { unstable_serialize } from 'swr';
import { useSearchParams } from 'next/navigation';
import { Cart, Category } from '@commercetools/platform-sdk';
import SelectAsync from '@/src/components/SelectAsync';
import SortButton from '@/src/components/SortButton';
import getProducts from '@/src/api/products';
import SWRProvider from '@/src/components/SWRProvider';
import NotFoundProducts from '@/src/components/NotFoundProducts';
import ProductsSideBar from '@/src/components/ProductsSideBar';
import ProductCard from '@/src/components/ProductCard';
import PaginationMemo from '@/src/components/PaginationMemo';
import buildCategoryTree from '@/src/helpers/commercetools/category/categoriesTree';
import CategoriesTree from '@/src/components/CategoriesTree';
import ProductsBreadcrumbs from '@/src/components/ProductsBreadcrumbs';
import cartModel from '@/src/helpers/commercetools/cart';
import { ssrWithAuthToken } from '../../helpers/next/withAuthToken';
import NamesClients from '../../helpers/commercetools/consts';
import productModel from '../../helpers/commercetools/product';
import categoryModel from '../../helpers/commercetools/category/categoryModel';

type Props = {
  category: Category | null;
  categories: Category[];
};

function ProductsPage({ category, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const { make, color, body, transmission } = router.query;
  const refForPriceAndSort = useRef({ from, to, sort, order });
  refForPriceAndSort.current = { from, to, sort, order };

  const urlSearchKey = new URLSearchParams(router.query as unknown as URLSearchParams);
  const categoryId = category?.id;
  categoryId && urlSearchKey.get('category') && urlSearchKey.set('category', categoryId);

  const { data, error } = useSWR(
    ['/api/products', urlSearchKey.toString()],
    (keys) => getProducts(keys[1]),
    {
      keepPreviousData: true,
      revalidateOnMount: false,
    }
  );

  const productsResponse = useMemo(() => data, [data])!;

  const { results: products = [], total = 0, limit } = productsResponse?.body || {};
  const refId = useRef<NodeJS.Timeout>();

  const handlePagination = useCallback((event: ChangeEvent<unknown>, value: number) => {
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.delete('category');
    value > 1 ? search.set('page', value.toString()) : search.delete('page');
    router.push(url.href, undefined, { shallow: true });
  }, []);

  const handleSort = (sortValue: string, orderValue: 'asc' | 'desc') => {
    const url = new URL(window.location.href);
    const search = url.searchParams;
    search.delete('category');
    search.delete('page');
    search.set('sort', sortValue);
    if (sort) {
      search.set('order', orderValue);
    } else {
      search.set('order', 'asc');
    }
    clearTimeout(refId.current);
    refId.current = setTimeout(() => {
      router.push(url.href, undefined, { shallow: true });
    }, 0);
  };

  const handleChangeProductsSideBar = useCallback((formData: FormData) => {
    const urlSearch = new URLSearchParams(formData as unknown as URLSearchParams);
    const { from: f, to: t, sort: s, order: o } = refForPriceAndSort.current;
    f && urlSearch.set('from', f);
    t && urlSearch.set('from', t);
    s && o && urlSearch.set('sort', s);
    s && o && urlSearch.set('order', o);
    router.push(`/products${urlSearch.toString() && `?${urlSearch}`}`, undefined, {
      shallow: true,
    });
  }, []);

  const filterForProductsSideBar = useMemo(
    () => ({ make, body, color, transmission }),
    [make, body, color, transmission]
  );

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', gap: '15px', px: '10px' }}>
      <ProductsSideBar filter={filterForProductsSideBar} onChange={handleChangeProductsSideBar} />

      <Container
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Box className="flex flex-wrap gap-2">
          <Box component="form" sx={{ width: '20ch' }} noValidate autoComplete="off">
            <SelectAsync />
          </Box>

          <CategoriesTree
            sx={{ width: '20ch', height: '38px' }}
            tree={buildCategoryTree(categories)}
          />
        </Box>

        <ProductsBreadcrumbs category={searchParams.get('category') ? category : null} />

        {products.length && !error ? (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Stack direction="row" spacing={1}>
                <SortButton
                  value={sort === 'name.en-US' ? order : null}
                  onClick={handleSort}
                  targetSort="name.en-US"
                  label="Name"
                />
                <SortButton
                  value={sort === 'price' ? order : null}
                  onClick={handleSort}
                  targetSort="price"
                  label="Price"
                />
              </Stack>
            </Box>

            <PaginationMemo
              className="my-0 mx-auto"
              count={Math.ceil(total / limit)}
              page={page ? +page : undefined}
              onChange={handlePagination}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <PaginationMemo
                className="p-0"
                count={Math.ceil(total / limit)}
                page={page ? +page : undefined}
                onChange={handlePagination}
              />
            </Box>
          </>
        ) : (
          <NotFoundProducts />
        )}
      </Container>
    </Container>
  );
}

export const getServerSideProps = ssrWithAuthToken<
  Props & { authorized: boolean },
  { category: string[] }
>(async ({ req, token, params, query }) => {
  const authorized = token?.type === NamesClients.PASSWORD;
  const slugCategory = params?.category?.at(-1);

  let cart: Cart | null;
  try {
    cart = (await cartModel.getCart(req)).body;
  } catch {
    cart = null;
  }

  try {
    const categoriesRes = await categoryModel.getCategories(req);

    const categoryResponse = slugCategory
      ? await categoryModel.getCategoryBySlug(req, slugCategory)
      : undefined;
    const categoryId = categoryResponse?.body.results[0]?.id;
    if (slugCategory && !categoryId) {
      throw new Error('not found category');
    }

    const productsResponse = await productModel.getProducts(req, {
      ...query,
      category: categoryId,
    });

    const urlSearch = new URLSearchParams(query as unknown as URLSearchParams);
    categoryId && urlSearch.set('category', categoryId);

    return {
      props: {
        authorized,
        cart,
        category: categoryId ? categoryResponse?.body.results[0] : null,
        categories: categoriesRes.body.results,
        fallback: {
          [unstable_serialize(['/api/products', urlSearch.toString()])]: productsResponse,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
});

export default SWRProvider(ProductsPage);
