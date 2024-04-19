import React, { useEffect } from 'react';
import './collectionPage.scss';
import Title from 'app/components/Common/Title/Title';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import TextMono from 'app/components/Common/Text/TextMono';
import NftItem from 'app/components/NFT_Item/NftItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCollectionById } from 'store/collectionNft/handleCollection';
import { Link, useParams } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { handleGetAllMaxNft, handleGetAllNft } from 'store/nfts/handleNft';
const CollectionPage = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetCollectionById(id));
  }, []);

  const { dataACollection } = useSelector((state: RootState) => state.collectionSlice);

  useEffect(() => {
    dispatch(handleGetAllNft({ limit: 9999, collectionNft: id }));
  }, [dispatch, id]);

  const { results } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  return (
    <LayoutOption>
      <div className="CollectionPage">
        <Title className="size20 CollectionPage-title">
          Collection : <span className="CollectionPage-name">{dataACollection?.name}</span>
        </Title>

        <div className="CollectionPage-container">
          {results.length > 0 &&
            results.map((item) => (
              <Link key={item.id} style={{ textDecoration: 'none' }} to={`/nft/${item.id}`}>
                <NftItem data={item} bgC="bg3b"></NftItem>
              </Link>
            ))}
        </div>
      </div>
    </LayoutOption>
  );
};

export default CollectionPage;
