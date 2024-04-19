import React, { useEffect } from 'react';
import './giveNftPage.scss';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import NftItem from 'app/components/NFT_Item/NftItem';
import { useForm } from 'react-hook-form';
import Input from 'app/components/input/Input';
import Button from 'app/components/button/Button';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { handleGetaNft, handleGiveNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { setNavigate } from 'store/nfts/nftSlice';
import { TNft } from 'types/nft';
const GiveNftPage = () => {
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(handleGetaNft(id));
  }, [id]);

  const results = useSelector((state: RootState) => state.nftSlice.dataANft);
  const { navigate } = useSelector((state: RootState) => state.nftSlice);

  type Tp = { idNft: string; userId: string };

  useEffect(() => {
    if (navigate) {
      history.push('/myNfts'); // khi login thành công sẽ điều hướng
      dispatch(setNavigate(false)); // khi điều hướng xong set về false tránh ảnh hưởng đến các cái khác
    }
  }, [navigate]);

  const handleGiveNftForm = (data: TNft) => {
    dispatch(handleGiveNft({ idNft: id, userId: data.userId }));
    // console.log('🚀 ~ handleGiveNftForm ~ data:', { idNft: id, userId: data.userId });
  };
  return (
    <form className="GiveNftPage" onSubmit={handleSubmit(handleGiveNftForm)}>
      <LayoutOption>
        <Gap className="mb80">
          <Title className="size51">Give NFTs</Title>
          <Content className="size22">Gift Nft to the people you love most</Content>
        </Gap>
        <div className="GiveNftPage-container">
          <NftItem bgC="bg3b" data={results}></NftItem>
          <div className="GiveNftPage-body">
            <Input type="text" name="userId" className="" control={control}></Input>
            <Button kind="primary" type="submit" className="GiveNftPage-btn">
              Give Nft
            </Button>
          </div>
        </div>
      </LayoutOption>
    </form>
  );
};

export default GiveNftPage;
