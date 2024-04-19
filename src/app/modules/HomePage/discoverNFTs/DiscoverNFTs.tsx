import React, { useEffect } from 'react';
import './discoverNFTs.scss';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Button from 'app/components/button/Button';
import DiscoverNFTItem from './discoverNftItem/DiscoverNFTItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { Link } from 'react-router-dom';
const DiscoverNFTs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetAllNft({}));
  }, []);

  const { results } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  return (
    <div className="DiscoverNFTs">
      <div className="DiscoverNFTs-head">
        <Gap className="pb60">
          <Title className="size38 ">Discover More NFTs</Title>
          <Content className="size22 DiscoverNFTs-content">Explore new trending NFTs</Content>
        </Gap>

        <Button
          kind="secondary"
          icon="/iconHome/RocketPurple.png"
          href="/marketPlace"
          className="DiscoverNFTs-btn"
        >
          See All
        </Button>
      </div>
      <div className="DiscoverNFTs-box">
        {results.length > 0 &&
          results.slice(2, 8).map((result) => (
            <Link key={result.id} style={{ textDecoration: 'none' }} to={`/nft/${result.id}`}>
              <DiscoverNFTItem data={result}></DiscoverNFTItem>
            </Link>
          ))}
      </div>

      <Button
        kind="secondary"
        icon="/iconHome/RocketPurple.png"
        href="/marketPlace"
        className="DiscoverNFTs-btn--mobile"
      >
        See All
      </Button>
    </div>
  );
};

export default DiscoverNFTs;
