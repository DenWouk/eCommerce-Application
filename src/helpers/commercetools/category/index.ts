import { Category, CategoryReference, LocalizedString } from '@commercetools/platform-sdk';

export type BreadcrumbsObj = {
  id: string;
  slug: LocalizedString;
  name: LocalizedString;
};

function recursion(
  id: string,
  slug: LocalizedString,
  name: LocalizedString,
  ancestors: CategoryReference[]
): BreadcrumbsObj[] {
  const { obj } = ancestors[0] || {};
  if (obj) {
    return [...recursion(obj.id, obj.slug, obj.name, obj.ancestors), { id, slug, name }];
  }
  return [{ id, slug, name }];
}

export default function createArrForBreadcrumbs(category: Category): BreadcrumbsObj[] {
  const { id, slug, name, ancestors } = category;
  return recursion(id, slug, name, ancestors);
}
