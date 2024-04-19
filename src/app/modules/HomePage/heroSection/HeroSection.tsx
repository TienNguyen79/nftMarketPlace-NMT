import React, { useEffect, useState } from 'react';
import './heroSection.scss';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Button from 'app/components/button/Button';
import TextMono from 'app/components/Common/Text/TextMono';
import Image from 'app/components/Common/Image/Image';
import TextBold from 'app/components/Common/Text/TextBold';
import { axiosClient } from 'app/axios/axiosClient';
const HeroSection = () => {
  type Toverview = {
    quantitySaleNfts: number;
    totalSaleEth: number;
    quantityArtists: number;
  };
  const [dataOverview, setDataOverview] = useState<Toverview>();

  useEffect(() => {
    try {
      const getDataCommon = async () => {
        const response = await axiosClient.get('/common/overview');
        setDataOverview(response.data);
      };
      getDataCommon();
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error:', error);
    }
  }, []);

  return (
    <section>
      <div className="heroSection">
        <div className="heroSection-box">
          <Title className="size67 heroSection-title ">Discover digital art & Collect NFTs</Title>

          <Content className="size22 heroSection-content ">
            NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more
            than 20k NFT artists.
          </Content>

          <Image link="imgGif.gif" className="heroSection-imageMobile"></Image>

          <Button
            kind="primary"
            href="/sign-up"
            icon="/iconHome/RocketWhite.png"
            className="heroSection-btn"
          >
            Get Started
          </Button>

          <div className="heroSection-overview">
            <div className="heroSection-overview__item">
              <TextBold className="size28 text-center"> {dataOverview?.totalSaleEth} </TextBold>
              <Content className="size24 heroSection-overview__item__label ">Total Sale</Content>
            </div>
            <div className="heroSection-overview__item">
              <TextBold className="size28 text-center"> {dataOverview?.quantitySaleNfts} </TextBold>
              <Content className="size24 heroSection-overview__item__label">NFTs</Content>
            </div>
            <div className="heroSection-overview__item">
              <TextBold className="size28 text-center"> {dataOverview?.quantityArtists} </TextBold>
              <Content className="size24 heroSection-overview__item__label">Artists</Content>
            </div>
          </div>
        </div>
        <Image link="imgGif.gif" className="heroSection-image"></Image>
      </div>
    </section>
  );
};

export default HeroSection;
