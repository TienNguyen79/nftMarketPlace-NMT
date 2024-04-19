import { createSlice, createAction } from '@reduxjs/toolkit';
import { handleGetAllCollection, handleGetCollectionById } from './handleCollection';

interface collectionData {
  results?: any[];
  name?: string;
  // Thêm các thuộc tính khác nếu cần
}

export interface TCollection {
  dataAllCollection: collectionData;
  dataACollection: collectionData;
  //   dataANft: object;
}

const initialState: TCollection = {
  dataAllCollection: {},
  dataACollection: {},
};
const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllCollection.fulfilled, (state, action) => {
        state.dataAllCollection = action.payload;
      })
      .addCase(handleGetAllCollection.rejected, (state, action) => {
        state.dataAllCollection.results = [];
      })

      .addCase(handleGetCollectionById.fulfilled, (state, action) => {
        state.dataACollection = action.payload;
      })
      .addCase(handleGetCollectionById.rejected, (state, action) => {
        state.dataACollection = {};
      });
  },
});

export default collectionSlice.reducer;
