import { Category } from '@commercetools/platform-sdk';

export type CategoryTree = {
  id: string;
  name: string;
  parent?: string;
  children: CategoryTree[];
};

function buildTree(categoriesBranches: CategoryTree[], parentId?: string) {
  const tree: CategoryTree[] = [];
  categoriesBranches.forEach((category) => {
    const copyCategory = { ...category };
    if (copyCategory?.parent === parentId) {
      const children = buildTree(categoriesBranches, copyCategory.id);
      if (children.length > 0) {
        copyCategory.children = children;
      }
      tree.push(copyCategory);
    }
  });
  return tree;
}

export default function buildCategoryTree(categories: Category[]) {
  const categoriesBranches = categories.map<CategoryTree>((category) => ({
    id: category.id,
    name: category.name['en-US'],
    parent: category?.parent?.id,
    children: [],
  }));
  return buildTree(categoriesBranches);
}
