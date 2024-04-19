import React from 'react';
import './topCreatorItem.scss';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import TextMono from 'app/components/Common/Text/TextMono';
import { checkImageExtension } from 'app/helpers/common';
const TopCreatorItem = ({ data, index }: { data: any; index: number }) => {
  return (
    <div className="topCreatorItem">
      <Image
        link={checkImageExtension(data.avatar) ? data.avatar : '/avarta.png'}
        className="topCreatorItem-image"
      ></Image>
      <div className="topCreatorItem-body">
        <Title className="size22 topCreatorItem-title">{data?.name}</Title>
        <div className="topCreatorItem-total">
          <Content className="topCreatorItem-total__sale">Total Sales:</Content>
          <TextMono className="topCreatorItem-total__number">
            {Math.round(data?.totalPrice)} ETH
          </TextMono>
        </div>
      </div>
      <div className="topCreatorItem-quantity">{index + 1}</div>
    </div>
  );
};

export default TopCreatorItem;
