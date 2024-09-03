import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi, updateUserApi } from '@api';

type TProfileSliceState = {
  user: TUser | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
};
export const initialState: TProfileSliceState = {
  user: null,
  isLoading: false,
  isUpdating: false,
  error: null
};
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (updatedUser: Partial<TUser>) => {
    const response = await updateUserApi(updatedUser);
    return response.user;
  }
);
export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUpdating = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectIsUpdating: (state) => state.isUpdating
  }
});
export default profileSlice.reducer;
export const { selectUser, selectIsLoading, selectIsUpdating } =
  profileSlice.selectors;
