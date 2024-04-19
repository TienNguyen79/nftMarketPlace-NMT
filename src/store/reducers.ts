/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';

import authSlice from '../store/auth/authSlice';
import userSlice from '../store/users/userSlice';
import nftSlice from '../store/nfts/nftSlice';
import collectionSlice from '../store/collectionNft/collectionSlice';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const rootReducers = {
  authSlice,
  userSlice,
  nftSlice,
  collectionSlice,
};

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
