import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import inboxService from "services/inboxService";

const inbox = createAction("inbox/fetch/inboxDocuments");

export const fetchInboxDocuments = createAsyncThunk(inbox.type, async (arg, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      inbox: { page, pageSize, orderBy },
    } = getState();
    const userId = "626bdc02f302b3be8e1d5001";
    const data = await inboxService.getInbox({ userId, page, pageSize, orderBy });
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const forward = createAction("inbox/forward");
export const forwardDocuments = createAsyncThunk(forward.type, async (query, thunkAPI) => {
  try {
    const userId = "626fde6b97b08e1b81a7522a";
    const { documentId, ids } = query;
    const receivers = ids.map((id) => {
      return {
        receiverId: id,
      };
    });
    const { message } = await inboxService.forwardDocuments(userId, documentId, receivers);
    return message;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  loading: false,
  success: false,
  error: false,
  message: "",

  page: 1,
  pageSize: 10,
  orderBy: "all",
  inboxDocuments: [],
};

const inboxDocumentsSlice = createSlice({
  name: "inbox",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInboxDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInboxDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.inboxDocuments = action.payload.data;
    });
    builder.addCase(fetchInboxDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
    builder.addCase(forwardDocuments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forwardDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      showToast("success", action.payload, toastPosition.topBottom);
    });
    builder.addCase(forwardDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { setPage, setPageSize, setOrderBy } = inboxDocumentsSlice.actions;

export default inboxDocumentsSlice.reducer;
