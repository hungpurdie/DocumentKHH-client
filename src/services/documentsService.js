import { removeEmptyObjects } from "helpers";
import axiosInstance from "services/initRequest";

const documentsService = {
  fetchDocuments: (filterQuery) => {
    const url = "/documents";
    const { sort, page, pageSize, filtersBy, search, dateRange } = filterQuery;
    const filterParams = removeEmptyObjects(filtersBy);
    const searchParams = removeEmptyObjects(search);
    const dateRangeParam = removeEmptyObjects(dateRange);

    let searchParamsString = null;
    if (searchParams.searchValue) {
      if (searchParams.searchBy === "both") {
        searchParamsString = {
          q: searchParams.searchValue,
        };
      } else {
        searchParamsString = {
          [`${searchParams.searchBy}[regex]`]: searchParams.searchValue,
        };
      }
    }

    const query = {
      ...filterParams,
      ...searchParamsString,
      ...dateRangeParam,
      sort: `-${sort}`,
      page,
      limit: pageSize,
    };

    return axiosInstance.get(url, {
      params: query,
    });
  },
  fetchDocumentDetailsByKey: ({ slug, key }) => {
    const url = `/documents/${slug}?tab=${key}`;
    return axiosInstance.get(url);
  },
  fetchDocumentDetails: ({ slug }) => {
    const url = `/documents/${slug}`;
    return axiosInstance.get(url);
  },
  fetchDocumentsByIds: (ids) => {
    const url = "/documents?ids=".concat(ids.join(","));
    return axiosInstance.get(url);
  },
  fetchCreateDocument: (formData) => {
    const url = "/documents";
    return axiosInstance.post(url, formData);
  },
  fetchUpdateDocument: (documentId, formData) => {
    const url = `/documents/${documentId}`;
    return axiosInstance.put(url, formData);
  },
};

export default documentsService;
