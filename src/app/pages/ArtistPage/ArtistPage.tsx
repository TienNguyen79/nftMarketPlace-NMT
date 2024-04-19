import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Tabs from 'app/components/Tabs/Tabs';
import CoverProfileImg from 'app/modules/ArtistPage/CoverAndProfileImg/CoverProfileImg';
import ArtistInfo from 'app/modules/ArtistPage/artistInfo/ArtistInfo';
import React, { useEffect, useState } from 'react';
import './artistPage.scss';
import NftItem from 'app/components/NFT_Item/NftItem';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetaUser } from 'store/users/handleUser';
import { RootState } from 'types/RootState';
import { handleGetAllNft } from 'store/nfts/handleNft';
const ArtistPage = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(handleGetaUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(handleGetAllNft({ user: id }));
  }, [dispatch, id]);

  const { results } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  const dataAUser = useSelector((state: RootState) => state.userSlice.dataAUser[0]);

  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // const [quantityNft, setQuantityNft] = useState<number>(0);

  // // lấy số lượng nft
  // useEffect(() => {
  //   const quantityNft = [];

  //   results.length > 0 &&
  //     results.map((item) => {
  //       if (item?.user?.id === dataAUser?.id) {
  //         quantityNft.push(item);
  //       }
  //     });

  //   setQuantityNft(quantityNft.length);
  // }, [dataAUser?.id, results]);

  useEffect(() => {
    // Cuộn lên đầu trang khi component được render lại
    window.scrollTo(0, 0);
  }, [id]); // Thực hiện khi id thay đổi
  // console.log('🚀 ~ ArtistPage ~ quantityNft:', quantityNft);

  return (
    <div>
      <CoverProfileImg coverImg={dataAUser?.banner} avatar={dataAUser?.avatar}></CoverProfileImg>
      <LayoutOption>
        <ArtistInfo data={dataAUser}></ArtistInfo>
        <Tabs
          title="Created"
          title2="Owned"
          title3="Collection"
          quantity1={results.length + ''}
          quantity2="69"
          quantity3="69"
          activeTab={activeTab}
          onChange={handleTabChange}
        ></Tabs>
      </LayoutOption>
      <div className="artistNft">
        <LayoutOption>
          <div className={`artistNft-box ${activeTab === '1' ? '' : 'hidden'}`}>
            {results.length > 0 &&
              results.map((item) => {
                // if (item?.user?.id === dataAUser?.id) {
                return (
                  <Link style={{ textDecoration: 'none' }} key={item?.id} to={`/nft/${item?.id}`}>
                    <NftItem data={item}></NftItem>
                  </Link>
                );
                // }
              })}
          </div>
        </LayoutOption>
      </div>
    </div>
  );
};

export default ArtistPage;
