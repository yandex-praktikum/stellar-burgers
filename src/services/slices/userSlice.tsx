// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { TUser } from '../../utils/types';
// import { loginUserApi,registerUserApi } from '@api';

// export interface UserState {
//     user: TUser | null;
//     isInit: boolean;
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     user: {
//         email:'' ,
//         name:''
//     },
//     isInit: false,
//     isLoading: false,
//     error: null,
// }

// const loginUserThunk = createAsyncThunk('user/login',loginUserApi);
// const registerUserThunk = createAsyncThunk('user/register',registerUserApi);

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         init: (state) => {
//             state.isInit = true;
//         },
//         logout:(state) =>{
//             state.user = null
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(loginUserThunk.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(loginUserThunk.rejected, (state) => {
//             state.isLoading = false;
//         });
//         builder.addCase(loginUserThunk.fulfilled, (state) => {
//             state.isLoading = false;
//         });

//         builder.addCase(registerUserThunk.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(registerUserThunk.rejected, (state) => {
//             state.isInit = true;
//             state.isLoading = false;
//         });
//         builder.addCase(registerUserThunk.fulfilled, (state, {payload}) => {
//             state.isInit = true;
//             state.isLoading = false;
//             state.user = payload;
//         });
//     }
// });

// export const {init,logout} = userSlice.actions;

// export default userSlice.reducer
