import React, { useEffect, useState } from 'react';
import './trendingCollection.scss';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import TrendingItem from './trendingIten/TrendingItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllCollection } from 'store/collectionNft/handleCollection';
import { RootState } from 'types/RootState';
import { handleGetAllMaxNft, handleGetAllNft } from 'store/nfts/handleNft';
import { sortByOrder, sortByView } from 'app/helpers/functions';

const TrendingCollection = () => {
  const dispatch = useDispatch();
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    dispatch(handleGetAllCollection());
  }, []);
  useEffect(() => {
    dispatch(handleGetAllMaxNft({ limit: 9999 }));
  }, [dispatch]);

  const { dataAllCollection }: { dataAllCollection: any } = useSelector(
    (state: RootState) => state.collectionSlice,
  );
  const { results } = useSelector((state: RootState) => state.nftSlice.dataAllMax);

  // lấy được ảnh chính collection và các nft của từng collection đó
  useEffect(() => {
    const updatedCollection: any[] = [];

    dataAllCollection?.results?.forEach((item: any) => {
      const matchedItems = results.filter((NftItem: any) => NftItem.collectionNft.id === item.id);
      if (matchedItems?.length > 0) {
        updatedCollection.push({ collectionP: item, nftP: matchedItems });
      }
    });
    setCollection(updatedCollection);
  }, [dataAllCollection?.results, results]);

  return (
    <div className="trending">
      <Gap className="pb60">
        <Title className="size38 ">Trending Collection</Title>
        <Content className="size22 trending-content">
          Checkout our weekly updated trending collection.
        </Content>
      </Gap>

      <div className="trending-box">
        {sortByView(collection, true)
          ?.slice(0, 3)
          .map((item, index) => (
            <div key={index}>
              <TrendingItem data={item}></TrendingItem>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TrendingCollection;
