import React, { useEffect } from 'react';
import './buyNftPage.scss';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import NftItem from 'app/components/NFT_Item/NftItem';
import Input from 'app/components/input/Input';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleBuyNft, handleGetaNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { setNavigate } from 'store/nfts/nftSlice';
const BuyNftPage = () => {
  const { control, setValue, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(handleGetaNft(id));
  }, [id]);

  const results: any = useSelector((state: RootState) => state.nftSlice.dataANft);

  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser[0]);
  const { loading } = useSelector((state: RootState) => state.nftSlice);
  const { navigate } = useSelector((state: RootState) => state.nftSlice);

  useEffect(() => {
    setValue('collection', results?.collectionNft?.name);
    setValue('price', results?.price + ' ETH');
    setValue('view', results?.view);
  }, [results?.collectionNft?.name, results?.price, results?.view, setValue]);

  useEffect(() => {
    if (navigate) {
      history.push('/myNfts'); // khi login thành công sẽ điều hướng
      dispatch(setNavigate(false)); // khi điều hướng xong set về false tránh ảnh hưởng đến các cái khác
    }
  }, [navigate]);

  const handleBuyNftForm = () => {
    dispatch(handleBuyNft(id));
  };
  return (
    <form className="BuyNftPage" onSubmit={handleSubmit(handleBuyNftForm)}>
      <LayoutOption>
        <div className="BuyNftPage-head">
          <Gap className="mb80">
            <Title className="size51">Buy NFTs</Title>
            <Content className="size22">Buy the nfts you find most appealing</Content>
          </Gap>
          <Title>
            Your Finances: <span className="BuyNftPage-finances">{dataUser?.eth} ETH</span>
          </Title>
        </div>
        <div className="BuyNftPage-container">
          <NftItem bgC="bg3b" data={results}></NftItem>

          <div className="BuyNftPage-body">
            <Gap className="mb15">
              <Title className="size20">Collection</Title>

              <Input
                type="text"
                name="collection"
                className="BuyNftPage-input"
                control={control}
              ></Input>
            </Gap>
            <Gap className="mb15">
              <Title className="size20">Price</Title>

              <Input
                type="text"
                name="price"
                className="BuyNftPage-input"
                control={control}
              ></Input>
            </Gap>
            <Gap className="mb15">
              <Title className="size20">View</Title>

              <Input type="text" name="view" className="BuyNftPage-input" control={control}></Input>
            </Gap>

            <Button kind="primary" type="submit" isLoading={loading} className="BuyNftPage-btn ">
              Buy Nft
            </Button>
          </div>
        </div>
      </LayoutOption>
    </form>
  );
};

export default BuyNftPage;
