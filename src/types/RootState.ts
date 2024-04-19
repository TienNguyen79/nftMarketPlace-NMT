// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { TAuth } from 'store/auth/authSlice';
import { TCollection } from 'store/collectionNft/collectionSlice';
import { Tnfts } from 'store/nfts/nftSlice';
import { Tuser } from 'store/users/userSlice';

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  authSlice: TAuth; // tên authSlice phải giống trong reducer
  userSlice: Tuser;
  nftSlice: Tnfts;
  collectionSlice: TCollection;
}
