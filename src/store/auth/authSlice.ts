import { createSlice, createAction } from '@reduxjs/toolkit';

import { handleLogin, handleLogout, handleRegister } from './handleAuth';
import { handleGetCurrentUser } from 'store/users/handleUser';
import { useHistory } from 'react-router-dom';
import { saveVariablesLC } from 'app/helpers/localStorage';

export const setNavigate = createAction<boolean>('setNavigate');
export const setAuthenticated = createAction<boolean>('setAuthenticated');
// export const setQuery = createAction('setQuery');
// export const setNavigate = createAction('setNavigate');
// fullfiled | pending | rejected

export interface TAuth {
  dataUser: any[];
  loading: boolean;
  errorMessage: string;
  navigate: boolean;
  isAuthenticated: boolean;
}

const initialState: TAuth = {
  dataUser: [],
  loading: false,
  errorMessage: '',
  navigate: false,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', // Lấy giá trị từ localStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setNavigate: (state, action) => ({
    //   ...state,
    //   navigate: action.payload,
    // }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state, action) => {
        // state.dataUser = action.payload;
        state.loading = false;
      })
      .addCase(handleRegister.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
      })
      // login
      .addCase(handleLogin.fulfilled, (state, action) => {
        // state.dataUser = action.payload;
        // state.dataUser.push(action.payload);
        state.loading = false;
        state.isAuthenticated = true; // đã xác thực
        saveVariablesLC('isAuthenticated', 'true');
      })
      .addCase(handleLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        // state.isAuthenticated = false;
      })

      .addCase(handleLogout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
      })

      .addCase(setNavigate, (state, action) => {
        state.navigate = action.payload;
      })
      .addCase(setAuthenticated, (state, action) => {
        state.isAuthenticated = action.payload;
        localStorage.setItem('isAuthenticated', action.payload ? 'true' : 'false'); // Lưu vào localStorage khi được cập nhật từ action setAuthenticated
      });
  },
});

export default authSlice.reducer;
