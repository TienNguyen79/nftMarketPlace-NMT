import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import {
  handleBuyNft,
  handleGetAllMaxNft,
  handleGetAllNft,
  handleGetaNft,
  handleSearchNft,
  handleUpdateNft,
  handledeleteNft,
} from './handleNft';

export const setNavigate = createAction<boolean>('setNavigate');

interface nftData {
  results: any[];
  page?: number;
  limit?: number;
  totalPages?: number;
  totalResults?: number;
  // Thêm các thuộc tính khác nếu cần
}

export interface Tnfts {
  dataAllNft: nftData;
  dataAllMax: nftData;
  dataANft: object;
  navigate: boolean;
  loading: boolean;
}

const initialState: Tnfts = {
  dataAllNft: {
    results: [],
  },
  dataAllMax: {
    results: [],
  },

  dataANft: {},
  navigate: false,
  loading: false,
};
const nftSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllNft.fulfilled, (state, action) => {
        state.dataAllNft = action.payload;
      })
      .addCase(handleGetAllNft.rejected, (state, action) => {
        state.dataAllNft.results = [];
      })
      // thường với limit 9999
      .addCase(handleGetAllMaxNft.fulfilled, (state, action) => {
        state.dataAllMax = action.payload;
      })
      .addCase(handleGetAllMaxNft.rejected, (state, action) => {
        state.dataAllMax.results = [];
      })

      .addCase(handleGetaNft.fulfilled, (state, action: PayloadAction<any>) => {
        state.dataANft = action.payload;
      })
      .addCase(handleGetaNft.rejected, (state, action) => {
        state.dataANft = [];
      })

      .addCase(handleSearchNft.fulfilled, (state, action) => {
        state.dataAllNft = action.payload;
      })
      .addCase(handleSearchNft.rejected, (state, action) => {
        state.dataAllNft.results = [];
      })

      // handleUpdateNft
      .addCase(handleUpdateNft.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleUpdateNft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUpdateNft.rejected, (state, action) => {
        state.loading = false;
      })

      // handle delete Nft

      .addCase(handledeleteNft.fulfilled, (state, action) => {
        state.dataAllNft = action.payload;
      })
      .addCase(handledeleteNft.rejected, (state, action) => {
        state.dataAllNft.results = [];
      })

      // handle buy Nft

      .addCase(handleBuyNft.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleBuyNft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleBuyNft.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(setNavigate, (state, action) => {
        state.navigate = action.payload;
      });
  },
});

export default nftSlice.reducer;
