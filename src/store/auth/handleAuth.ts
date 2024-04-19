import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestLogin, requestLogout, requestRegister } from './requestAuth';
import { toast } from 'react-toastify';
import {
  removeRefreshToken,
  removeToken,
  removeVariablesLC,
  saveRefreshToken,
  saveToken,
  saveVariablesLC,
} from 'app/helpers/localStorage';
import { requestGetCurrentUser } from 'store/users/requestUser';
// import { setNavigate } from './authSlice';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setNavigate } from './authSlice';
import { TCallback } from 'types/common';
import { TLogin, TLogout, TRegister } from 'types/auth';

export const handleRegister = createAsyncThunk(
  'auth/handleRegister',
  async (data: TRegister & TCallback, thunkAPI) => {
    try {
      const response = await requestRegister(data);

      if (response.status === 201) {
        toast.success('Register Successfully!');
        data.callback?.();
        // thunkAPI.dispatch(setNavigate(true));
        return response.data.user;
      }
      // return response.data;
    } catch (error: any) {
      // thunkAPI.dispatch(setNavigate(false));
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async (data: TLogin & TCallback, thunkAPI) => {
    try {
      const response = await requestLogin(data);

      if (response.status === 200) {
        saveToken(response.data.tokens.access.token);
        saveRefreshToken(response.data.tokens.refresh.token);

        toast.success('Login Successfully!', { autoClose: 1000 });
        data.callback?.();

        return response.data.user;
      }
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleLogout = createAsyncThunk(
  'auth/handleLogout',
  async (data: TLogout & TCallback, thunkAPI) => {
    try {
      const response = await requestLogout(data);
      removeToken();
      removeRefreshToken();
      data.callback?.();
      // thunkAPI.dispatch(setNavigate(true));
    } catch (error: any) {
      // thunkAPI.dispatch(setNavigate(false));
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);
