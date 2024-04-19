import React, { useEffect } from 'react';
import './NftHighlight.scss';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Button from 'app/components/button/Button';
import { Link } from 'react-router-dom';
import CountDown from 'app/components/Common/Coundown/CountDown';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { checkImageExtension } from 'app/helpers/common';
const NftHighlight = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetAllNft({}));
  }, []);

  const { results } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  const maxViewElement =
    results?.length > 0 &&
    results.reduce((max, current) => (max.view > current.view ? max : current));

  return (
    <div className="NftHighlight">
      <div className="NftHighlight-linear"></div>
      <Image
        link={
          checkImageExtension(maxViewElement?.image) ? maxViewElement?.image : '/imgMushroom.png'
        }
        className="NftHighlight-image"
      ></Image>
      <div className="NftHighlight-box">
        <div className="NftHighlight-info">
          <Link to={`/artist/${maxViewElement?.user?.id}`} className="NftHighlight-info__author">
            <Image
              link={
                checkImageExtension(maxViewElement?.user?.avatar)
                  ? maxViewElement?.user?.avatar
                  : '/avarta.png'
              }
              className="NftHighlight-imgMin"
            ></Image>
            <Content>{maxViewElement?.user?.name}</Content>
          </Link>
          <Title className="size51 NftHighlight-info__name">{maxViewElement?.name}</Title>

          <Button
            kind="ghost"
            href={`/nft/${maxViewElement?.id}`}
            icon="/iconHome/RocketPurple.png"
            className="NftHighlight-info__btn"
          >
            See NFT
          </Button>
        </div>
        <div className="NftHighlight-time">
          <CountDown></CountDown>
        </div>

        <Button
          kind="ghost"
          href={`/nft/${maxViewElement?.id}`}
          icon="/iconHome/RocketPurple.png"
          className="NftHighlight-info__btn--mobile"
        >
          See NFT
        </Button>
      </div>
    </div>
  );
};

export default NftHighlight;
