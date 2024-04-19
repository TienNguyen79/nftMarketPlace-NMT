import React from 'react';
import './NftItem.scss';
import Image from '../Common/Image/Image';
import Title from '../Common/Title/Title';
import TextMono from '../Common/Text/TextMono';
import { checkImageExtension, convertDateNumeric } from 'app/helpers/common';
import { isImage } from 'app/helpers/functions';

const NftItem = ({ bgC = 'bg2b', data }: { bgC?: string; data?: any }) => {
  return (
    <div className="NftItem">
      <Image
        link={checkImageExtension(data?.image) ? data?.image : '/imgDiscover/imgbig.png'}
        className="NftItem-bigImg"
      ></Image>
      <div className={`NftItem-body ${bgC}`}>
        <Title className="size22">{data?.name || 'name Nft'}</Title>
        <div className="NftItem-author">
          <Image
            link={
              checkImageExtension(data?.user?.avatar)
                ? data?.user?.avatar
                : '/imgDiscover/avatar.png'
            }
            className="NftItem-smallImg"
          ></Image>
          <TextMono className="NftItem-author__name">{data?.user?.name}</TextMono>
        </div>
        <div className="NftItem-foot">
          <div>
            <TextMono className="size12">Price</TextMono>
            <TextMono className="NftItem-foot__quantity">{data?.price} ETH</TextMono>
          </div>
          <div>
            <TextMono className="size12">Status</TextMono>
            <TextMono className="NftItem-foot__quantity">{data?.status}</TextMono>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftItem;
