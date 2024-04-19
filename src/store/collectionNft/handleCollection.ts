import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGetAllCollection, requestGetCollectionById } from './requestCollection';

export const handleGetAllCollection = createAsyncThunk(
  'collection/handleGetAllCollection',
  async (data, thunkAPI) => {
    try {
      const response = await requestGetAllCollection();
      // console.log('🚀 ~ handleGetAllNft ~ response:', response.data);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleGetCollectionById = createAsyncThunk(
  'collection/handleGetCollectionById',
  async (id: string, thunkAPI) => {
    try {
      const response = await requestGetCollectionById(id);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);
