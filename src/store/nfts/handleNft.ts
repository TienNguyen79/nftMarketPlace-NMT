import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import {
  requestBuyNft,
  requestCreateNft,
  requestDeleteNft,
  requestGetAllNft,
  requestGetaNft,
  requestGiveNft,
  requestStatusSellNft,
  requestupdateNft,
} from './requestNft';
import { setNavigate } from './nftSlice';
import Swal from 'sweetalert2';
import { TNft, Tparams } from 'types/nft';

export const handleGetAllNft = createAsyncThunk(
  'nfts/handleGetAllNft',
  async (data: TNft & Tparams, thunkAPI) => {
    try {
      const response = await requestGetAllNft({
        name: data.name,
        user: data.user,
        collectionNft: data.collectionNft,
        status: data.status,
        page: data.page,
        limit: data.limit,
      });
      // console.log('🚀 ~ handleGetAllNft ~ response:', response.data);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleGetAllMaxNft = createAsyncThunk(
  'nfts/handleGetAllMaxNft',
  async (data: TNft & Tparams, thunkAPI) => {
    try {
      const response = await requestGetAllNft({
        name: data.name,
        user: data.user,
        collectionNft: data.collectionNft,
        status: data.status,
        page: data.page,
        limit: data.limit,
      });
      // console.log('🚀 ~ handleGetAllNft ~ response:', response.data);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleGetaNft = createAsyncThunk(
  'nfts/handleGetaNft',
  async (id: string, thunkAPI) => {
    try {
      const response = await requestGetaNft(id);

      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleSearchNft = createAsyncThunk(
  'nfts/handleSearchNft',
  async (data: any, thunkAPI) => {
    try {
      const response = await requestGetAllNft({ name: data.name });

      return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleCreateNft = createAsyncThunk(
  'nfts/handleCreateNft',
  async (data: TNft, thunkAPI) => {
    try {
      const response = await requestCreateNft(data);

      if (response.status === 201) {
        toast.success('Create Nft successfully!');
        thunkAPI.dispatch(setNavigate(true));
        return response.data;
      }

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
      thunkAPI.dispatch(setNavigate(false));
    }
  },
);

export const handleUpdateNft = createAsyncThunk(
  'nfts/handleUpdateNft',
  async (data: TNft, thunkAPI) => {
    try {
      const response = await requestupdateNft(data);

      if (response.status === 200) {
        toast.success('Update Nft successfully!');

        return response.data;
      }
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
    }
  },
);

export const handleStatusSellNft = createAsyncThunk(
  'nfts/handleStatusSellNft',
  async (id: string, thunkAPI) => {
    try {
      const response = await requestStatusSellNft(id);

      if (response.status === 200) {
        toast.success('Update status successfully!', { autoClose: 1000 });
      }
      return response.data;

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handledeleteNft = createAsyncThunk(
  'nfts/handledeleteNft',
  async (id: string, thunkAPI) => {
    try {
      const response = await requestDeleteNft(id);

      if (response.status === 204) {
        Swal.fire({
          title: 'Deleted!',
          text: 'NFT has been deleted.',
          icon: 'success',
        });
        const response2 = await requestGetAllNft();

        return response2.data;
      }

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
    }
  },
);

export const handleGiveNft = createAsyncThunk(
  'nfts/handleGiveNft',
  async (data: TNft, thunkAPI) => {
    try {
      const response = await requestGiveNft(data);

      if (response.status === 200) {
        toast.success('Give Nft successfully!', { autoClose: 1000 });
        thunkAPI.dispatch(setNavigate(true));

        return response.data;
      }

      // return response.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      toast.error(error.response.data.message, { autoClose: 1500 });
      thunkAPI.dispatch(setNavigate(false));
    }
  },
);

export const handleBuyNft = createAsyncThunk('nfts/handleBuyNft', async (id: string, thunkAPI) => {
  try {
    const response = await requestBuyNft(id);

    if (response.status === 200) {
      toast.success('Buy Nft successfully!', { autoClose: 1000 });
      thunkAPI.dispatch(setNavigate(true));

      return response.data;
    }

    // return response.data;
  } catch (error: any) {
    console.log('🚀 ~ error:', error);
    toast.error(error.response.data.message, { autoClose: 1500 });
    thunkAPI.dispatch(setNavigate(false));
  }
});
