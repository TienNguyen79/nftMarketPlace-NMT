import React from 'react';
import './artistInfo.scss';
import Title from 'app/components/Common/Title/Title';
import TextBold from 'app/components/Common/Text/TextBold';
import Content from 'app/components/Common/Content/Content';
import TextMono from 'app/components/Common/Text/TextMono';
import Button from 'app/components/button/Button';
import { convertEth } from 'app/helpers/common';
import axios from 'axios';
import { axiosClient } from 'app/axios/axiosClient';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
const ArtistInfo = ({ data }: { data: any }) => {
  const { id }: { id: string } = useParams();

  const dataCurrentUser = useSelector((state: RootState) => state.userSlice.dataUser[0]);

  // const handleok = async () => {
  //   await axiosClient.get('/iii');
  // };
  return (
    <div className="ArtistInfo">
      <div className="ArtistInfo-box">
        <Title className="size51 ArtistInfo-name">{data?.name}</Title>
        <div className="ArtistInfo-boxBtn--MobiTablet">
          <Button kind="primary" icon="/imgArtist/Copy.png" className="ArtistInfo-boxBtn--copy">
            {/* 0xc0E3...B79C */}
            {data?.id?.slice(0, 6) + '...' + data?.id?.slice(-4)}
          </Button>
          {dataCurrentUser?.id !== id && (
            <Button
              kind="secondary"
              icon="/imgArtist/Plus.png"
              // onClick={handleok}
              className="ArtistInfo-boxBtn--follow"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="ArtistInfo-smallBox">
          <div>
            <TextBold className="size28 ArtistInfo-quantity">
              {data?.eth.toString().length >= 5 ? convertEth(data?.eth) + 'K+' : data?.eth}
            </TextBold>
            <Content className="size22 ArtistInfo-label">Volume</Content>
          </div>
          <div>
            <TextBold className="size28 ArtistInfo-quantity">250k+</TextBold>
            <Content className="size22 ArtistInfo-label">NFTs Sold</Content>
          </div>
          <div>
            <TextBold className="size28 ArtistInfo-quantity">250k+</TextBold>
            <Content className="size22 ArtistInfo-label">Followers</Content>
          </div>
        </div>
        <div className="ArtistInfo-boxBio">
          <TextMono className="ArtistInfo-boxBio__title ">Bio</TextMono>
          <Content className="ArtistInfo-boxBio__content size22">{data?.bio}</Content>
        </div>
        <div className="ArtistInfo-boxLink">
          <TextMono className="ArtistInfo-boxLink__title">Links</TextMono>
          <div className="ArtistInfo-boxLink__social">
            <img src="/imgArtist/Globe.png" alt="r" />
            <img src="/imgArtist/DiscordLogo.png" alt="r" />
            <img src="/imgArtist/YoutubeLogo.png" alt="r" />
            <img src="/imgArtist/TwitterLogo.png" alt="r" />
            <img src="/imgArtist/InstagramLogo.png" alt="r" />
          </div>
        </div>
      </div>
      <div className="ArtistInfo-boxBtn">
        <Button kind="primary" icon="/imgArtist/Copy.png" className="ArtistInfo-boxBtn--copy">
          {/* 0xc0E3...B79C */}
          {data?.id?.slice(0, 6) + '...' + data?.id?.slice(-4)}
        </Button>
        {dataCurrentUser?.id !== id && (
          <Button
            kind="secondary"
            icon="/imgArtist/Plus.png"
            // onClick={handleok}
            className="ArtistInfo-boxBtn--follow"
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArtistInfo;
