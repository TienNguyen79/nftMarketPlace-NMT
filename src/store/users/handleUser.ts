import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestGetCurrentUser,
  requestGetUserRanking,
  requestGetaUser,
  requestUpdateCurrentUser,
} from './requestUser';
import { toast } from 'react-toastify';
import { TCallback } from 'types/common';
import { Tuser2 } from 'types/user';

export const handleGetCurrentUser = createAsyncThunk(
  'user/handleGetCurrentUser',
  async (data, thunkAPI) => {
    try {
      const response = await requestGetCurrentUser();

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleGetaUser = createAsyncThunk(
  'user/handleGetaUser',
  async (id: string, thunkAPI) => {
    try {
      const response = await requestGetaUser(id);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleGetUserRanking = createAsyncThunk(
  'user/handleGetUserRanking',
  async (data, thunkAPI) => {
    try {
      const response = await requestGetUserRanking();

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleUpdateCurrentUser = createAsyncThunk(
  'user/handleUpdateCurrentUser',
  async (data: object, thunkAPI) => {
    try {
      const response = await requestUpdateCurrentUser(data);
      toast.success('Update successfully !', { autoClose: 1500 });

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);
