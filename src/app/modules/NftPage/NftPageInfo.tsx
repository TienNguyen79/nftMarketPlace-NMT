import React, { Fragment } from 'react';
import './nftPageInfo.scss';
import Title from 'app/components/Common/Title/Title';
import TextMono from 'app/components/Common/Text/TextMono';
import Image from 'app/components/Common/Image/Image';
import Content from 'app/components/Common/Content/Content';
import Button from 'app/components/button/Button';
import { checkImageExtension, convertDate } from 'app/helpers/common';
import ReactHtmlParser from 'html-react-parser';
import HTMLReactParser from 'html-react-parser';
import { Link } from 'react-router-dom';
import CountDown from 'app/components/Common/Coundown/CountDown';
// const { convert } = require('html-to-text');
const NftPageInfo = ({ data }: { data: any }) => {
  // console.log('🚀 ~ NftPageInfo ~ data:', data);

  // const gg = convertDate(data?.createdAt);
  // console.log('🚀 ~ NftPageInfo ~ gg:', gg);

  // let rr = ReactHtmlParser(data?.description || '');
  // console.log('ReactHtmlParser: ', ReactHtmlParser(data?.description || ''));

  const parsedHtml = ReactHtmlParser(data?.description || '');
  return (
    <div className="NftPageInfo">
      <div className="NftPageInfo-head">
        <Title className="size51">{data?.name}</Title>
        <TextMono className="size22 NftPageInfo-head__create">
          Minted on {convertDate(data?.createdAt) ?? 'Jan 27, 2024'}
        </TextMono>

        <CountDown
          kind="btn"
          id={data?.user?.id}
          status={data?.status}
          idNft={data?.id}
          className="NftPageInfo-countDown--mobile"
        ></CountDown>
      </div>
      <div className="NftPageInfo-body">
        <div className="NftPageInfo-body-smallBox">
          <h1 className="NftPageInfo-body-smallBox__label">Created By</h1>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/artist/${data?.user?.id}`}
            className="NftPageInfo-body-smallBox2"
          >
            <Image
              link={
                checkImageExtension(data?.user?.avatar) ? data?.user?.avatar : '/imgNft/avatar.png'
              }
              className="NftPageInfo-body-smallBox2__img"
            ></Image>
            <Title className="size22">{data?.user?.name}</Title>
          </Link>
        </div>

        <div className="NftPageInfo-body-smallBox">
          <h1 className="NftPageInfo-body-smallBox__label">Description</h1>
          <div className="NftPageInfo-body-small__Content ">
            <div className=" NftPageInfo-body-small__ContentText entry-content">
              {ReactHtmlParser(parsedHtml + '')}
            </div>
          </div>
        </div>

        <div className="NftPageInfo-body-smallBox">
          <h1 className="NftPageInfo-body-smallBox__label">Details</h1>
          <div className="NftPageInfo-body-smallBox2">
            <Image link="/imgNft/Globe.png"></Image>
            <Content className="size22">View on Etherscan</Content>
          </div>
          <div className="NftPageInfo-body-smallBox2">
            <Image link="/imgNft/Globe.png"></Image>
            <Content className="size22">View Original</Content>
          </div>
        </div>

        <div className="NftPageInfo-body-smallBox">
          <h1 className="NftPageInfo-body-smallBox__label">Tags</h1>
          <div className="NftPageInfo-body-smallBox2 boxTag">
            <Button className="NftPageInfo-body-smallBox2__btn">{data?.collectionNft?.name}</Button>
            <Button href="/artist" className="NftPageInfo-body-smallBox2__btn">
              Animation
            </Button>
            <Button className="NftPageInfo-body-smallBox2__btn">Moon</Button>
            <Button className="NftPageInfo-body-smallBox2__btn">Moon</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NftPageInfo;
