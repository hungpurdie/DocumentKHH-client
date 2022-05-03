import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentsService from "services/documentsService";

const getAll = createAction("documents/getDocuments");
const getRelated = createAction("documents/getRelatedDocuments");
const getFilterDateRange = createAction("documents/filterDateRange");

export const fetchDocuments = createAsyncThunk(getAll.type, async (arg, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const { searchGroup } = getState();

    const data = await documentsService.getDocuments(searchGroup);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchDocumentByIds = createAsyncThunk(getRelated.type, async (ids, thunkAPI) => {
  try {
    const data = await documentsService.getDocumentsByIds(ids);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchFilterDateRange = createAsyncThunk(
  getFilterDateRange.type,
  async (filterKeys, thunkAPI) => {
    try {
      const data = await documentsService.getDocumentsByFilter(filterKeys);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  message: "",
  error: false,
  success: false,
  total: 0,
  totalMatch: 0,

  documents: [
    // {
    //   documentNumber: null,
    //   title: "",
    //   content: "",
    //   summary: "",
    //   agency: "",
    //   typesOfDocument: null,
    //   category: "",
    //   signer: "",
    //   issueDate: "",
    //   urgentLevel: "",
    //   files: [
    //     {
    //       originName: "",
    //       location: "",
    //     },
    //   ],
    //   relatedDocuments: [],
    //   isPublic: true,
    //   isArchived: false,
    //   participants: [],
    // },
  ],
  relatedDocuments: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.documents = action.payload.data;
      state.total = action.payload.total;
      state.totalMatch = action.payload.totalMatch;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    builder.addCase(fetchDocumentByIds.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentByIds.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.relatedDocuments = action.payload.documents;
    });
    builder.addCase(fetchDocumentByIds.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export default homeSlice.reducer;