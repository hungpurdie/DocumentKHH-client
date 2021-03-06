import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import showToast, { toastPosition } from "configs/toast";
import recipientsService from "services/recipientsService";

const recipients = createAction("recipients/fetch/recipients");
export const fetchRecipients = createAsyncThunk(recipients.type, async (args, thunkAPI) => {
  try {
    const { data } = await recipientsService.getRecipients();
    return data;
  } catch (error) {
    const { message } = error.response.data;
    thunkAPI.rejectWithValue(message);
  }
});

const excluded = createAction("recipients/fetch/excluded");
export const fetchExcludedRecipients = createAsyncThunk(
  excluded.type,
  async (documentId, thunkAPI) => {
    try {
      const { data } = await recipientsService.getExcludedRecipients(documentId);
      const participants = data.participants;
      const publisherId = data.property.publisher._id;
      const receiversNotExists = participants.map((user) => user._id);
      receiversNotExists.push(publisherId);

      return receiversNotExists;
    } catch (error) {
      const { message } = error.response.data;
      thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: null,
  message: null,
  total: 0,

  users: [],
  excludedUsers: [],
};

const recipientsSlice = createSlice({
  name: "recipients",
  initialState,
  reducers: {
    addExcludedUsers: (state, action) => {
      state.excludedUsers.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipients.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(fetchRecipients.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.users = action.payload;
      state.total = action.payload.length;
    });
    builder.addCase(fetchRecipients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });

    builder.addCase(fetchExcludedRecipients.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.message = null;
    });
    builder.addCase(fetchExcludedRecipients.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.excludedUsers = action.payload;
    });
    builder.addCase(fetchExcludedRecipients.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.message = action.payload;
      showToast("error", action.payload, toastPosition.topRight);
    });
  },
});

export const { addExcludedUsers } = recipientsSlice.actions;
export default recipientsSlice.reducer;
