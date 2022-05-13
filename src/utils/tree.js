import _ from "lodash";

export const listToTree = (arr, id = null, parentKey = "parentId") =>
  arr
    ?.filter((item) => item[parentKey] === id)
    ?.map((item) => ({
      ...item,
      key: item._id,
      children: listToTree(arr, item._id),
    }));

export function flattenArrayTree(trees, wrapKey = "children") {
  return trees.reduce((flattenedItems, node) => {
    flattenedItems.push(node);
    if (Array.isArray(node[wrapKey])) {
      flattenedItems = flattenedItems.concat(flattenArrayTree(node[wrapKey], wrapKey));
    }
    return flattenedItems;
  }, []);
}

export function findNodeByKey(trees, predicate, wrapKey = "children") {
  return _.find(flattenArrayTree(trees, wrapKey), { ...predicate });
}
