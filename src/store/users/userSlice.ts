import { createSlice, createAction } from '@reduxjs/toolkit';
import {
  handleGetCurrentUser,
  handleGetUserRanking,
  handleGetaUser,
  handleUpdateCurrentUser,
} from './handleUser';
import { handleLogout } from 'store/auth/handleAuth';

interface UserData {
  name: string;
  avatar: string;
  banner?: string;
  email: string;
  id: string;
  bio: string;
  eth?: string;

  // Thêm các thuộc tính khác nếu cần
}

interface UserRanking {
  results: any[];
}

export interface Tuser {
  dataUser: UserData[]; // Thay any bằng kiểu dữ liệu chính xác của dataUser
  dataAUser: UserData[];
  dataUserRanking: UserRanking;
  loading: boolean;
  errorMessage: string;
  query: string;
}

const initialState: Tuser = {
  dataUser: [],
  dataAUser: [],
  dataUserRanking: {
    results: [],
  },
  loading: false,
  errorMessage: '',
  query: '',
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setLoading: (state, action) => ({
    //   ...state,
    //   loading: action.payload,
    // }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCurrentUser.fulfilled, (state, action) => {
        state.dataUser = [action.payload];
      })

      .addCase(handleLogout.fulfilled, (state, action) => {
        // handle logout ở bên auth
        state.dataUser = [];
      })

      // get a user
      .addCase(handleGetaUser.fulfilled, (state, action) => {
        state.dataAUser = [action.payload];
      })
      .addCase(handleGetaUser.rejected, (state, action) => {
        state.dataAUser = [];
      })
      // handleGetUserRanking
      .addCase(handleGetUserRanking.fulfilled, (state, action) => {
        state.dataUserRanking = action.payload;
      })

      .addCase(handleGetUserRanking.rejected, (state, action) => {
        state.dataUserRanking.results = [];
      })
      // handle update current user

      .addCase(handleUpdateCurrentUser.fulfilled, (state, action) => {
        state.dataUser = [action.payload];
        state.loading = false;
      })
      .addCase(handleUpdateCurrentUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUpdateCurrentUser.rejected, (state, action) => {
        state.dataUser = [];
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
