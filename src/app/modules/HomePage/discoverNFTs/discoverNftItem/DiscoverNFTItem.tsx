import React from 'react';
import './discoverNFTItem.scss';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import TextMono from 'app/components/Common/Text/TextMono';
import { checkImageExtension, convertDateNumeric } from 'app/helpers/common';
const DiscoverNFTItem = (props: any) => {
  const { data } = props;
  return (
    <div className="DiscoverNFTItem">
      <Image
        link={checkImageExtension(data.image) ? data.image : '/imgDiscover/imgbig.png'}
        className="DiscoverNFTItem-bigImg"
      ></Image>
      <div className="DiscoverNFTItem-body">
        <Title className="size22">{data.name}</Title>
        <div className="DiscoverNFTItem-author">
          <Image
            link={
              checkImageExtension(data.user.avatar) ? data.user.avatar : '/imgDiscover/avatar.png'
            }
            className="DiscoverNFTItem-smallImg"
          ></Image>
          <TextMono className="DiscoverNFTItem-author__name">{data.user.name}</TextMono>
        </div>
        <div className="DiscoverNFTItem-foot">
          <div>
            <TextMono className="size12">Price</TextMono>
            <TextMono className="DiscoverNFTItem-foot__quantity">{data.price} ETH</TextMono>
          </div>
          <div>
            <TextMono className="size12">Created Date</TextMono>
            <TextMono className="DiscoverNFTItem-foot__quantity">
              {convertDateNumeric(data.createdAt)}
            </TextMono>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverNFTItem;
