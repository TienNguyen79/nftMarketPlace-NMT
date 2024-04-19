import React, { useEffect } from 'react';
import './nftPage.scss';
import Image from 'app/components/Common/Image/Image';
import NftPageInfo from 'app/modules/NftPage/NftPageInfo';
import CountDown from 'app/components/Common/Coundown/CountDown';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Title from 'app/components/Common/Title/Title';
import Button from 'app/components/button/Button';
import NftItem from 'app/components/NFT_Item/NftItem';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllNft, handleGetaNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { checkImageExtension } from 'app/helpers/common';
import { TNft } from 'types/nft';
const NftPage = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(handleGetaNft(id));
  }, [id]);

  const results: any = useSelector((state: RootState) => state.nftSlice.dataANft);

  const { results: resultAll } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  useEffect(() => {
    dispatch(handleGetAllNft({ user: results?.user?.id }));
  }, [dispatch, results?.user?.id]);

  // useEffect(() => {
  //   resultAll.map((item1) => {
  //     if (item1.user.id === results.user.id) {
  //       console.log('🚀 ~ resultAll.map ~ item99:', item1);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // Cuộn lên đầu trang khi component được render lại
    window.scrollTo(0, 0);
  }, [id]); // Thực hiện khi id thay đổi
  return (
    <div className="NftPage">
      <Image
        link={checkImageExtension(results?.image) ? results?.image : '/imgNft/coverPhoto.png'}
        className="NftPage-img"
      ></Image>
      <LayoutOption>
        <div className="NftPage-box">
          <NftPageInfo data={results}></NftPageInfo>
          <CountDown
            kind="btn"
            id={results?.user?.id}
            status={results?.status}
            idNft={results?.id}
            className="NftPage-countDown"
          ></CountDown>
        </div>
        <div className="NftPage-moreNft">
          <div className="NftPage-moreNft__head">
            <Title className="size38">More from this artist</Title>
            <Button
              kind="secondary"
              href={`/artist/${results?.user?.id}`}
              icon="/imgNft/ArrowRight.png"
              className="NftPage-moreNft__btn"
            >
              Go To Artist Page
            </Button>
          </div>
          {/* item?.user?.id === results?.user?.id && */}
          <div className="NftPage-moreNft-collection">
            {resultAll?.length > 0 &&
              resultAll.slice(0, 6).map((item) => {
                if (item?.id !== results?.id) {
                  return (
                    <Link key={item.id} style={{ textDecoration: 'none' }} to={`/nft/${item.id}`}>
                      <NftItem bgC="bg3b" data={item}></NftItem>
                    </Link>
                  );
                }
              })}
          </div>

          <Button
            kind="secondary"
            href={`/artist/${results?.user?.id}`}
            icon="/imgNft/ArrowRight.png"
            className="NftPage-moreNft__btn--mobile"
          >
            Go To Artist Page
          </Button>
        </div>
      </LayoutOption>
    </div>
  );
};

export default NftPage;
