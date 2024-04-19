import React, { useEffect } from 'react';
import './topCreator.scss';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Button from 'app/components/button/Button';
import TopCreatorItem from './TopCreatorItem/TopCreatorItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { handleGetUserRanking } from 'store/users/handleUser';
import { Link } from 'react-router-dom';
const TopCreator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUserRanking());
  }, []);

  const Uranking = useSelector((state: RootState) => state.userSlice.dataUserRanking);
  return (
    <div className="topCreator">
      <div className="topCreator-head">
        <Gap className="pb60">
          <Title className="size38 ">Top creators</Title>
          <Content className="size22 topCreator-content">
            Checkout Top Rated Creators on the NFT Marketplace
          </Content>
        </Gap>

        <Button
          kind="secondary"
          icon="/iconHome/RocketPurple.png"
          href="/ranking"
          className="topCreator-btn"
        >
          View Rankings
        </Button>
      </div>
      <div className="topCreator-box">
        {Uranking?.results?.length > 0 &&
          Uranking?.results?.slice(0, 4).map((item, index) => (
            <Link key={item.id} style={{ textDecoration: 'none' }} to={`/artist/${item.id}`}>
              <TopCreatorItem data={item} index={index}></TopCreatorItem>
            </Link>
          ))}
      </div>
      <Button
        kind="secondary"
        icon="/iconHome/RocketPurple.png"
        href="/ranking"
        className="topCreator-btn--mobile"
      >
        View Rankings
      </Button>
    </div>
  );
};

export default TopCreator;
