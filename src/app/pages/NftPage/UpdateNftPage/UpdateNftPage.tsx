import React, { useEffect, useMemo, useState } from 'react';
import './updateNftPage.scss';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import ImageUpload from 'app/components/imageUpload/ImageUpload';
import { useForm } from 'react-hook-form';
import Input from 'app/components/input/Input';
import NftItem from 'app/components/NFT_Item/NftItem';
import TextArea from 'app/components/TextArea/TextArea';
import { Select } from 'antd';
import Button from 'app/components/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllCollection } from 'store/collectionNft/handleCollection';
import { RootState } from 'types/RootState';
import { handleCreateNft, handleGetaNft, handleUpdateNft } from 'store/nfts/handleNft';
import { useHistory, useParams } from 'react-router-dom';
import { Tnfts, setNavigate } from 'store/nfts/nftSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser';
import { TNft } from 'types/nft';

interface OptionType {
  value: string;
  label: string;
}

const UpdateNftPage = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [collectionId, setCollectionId] = useState<string>('');
  const [linkImg, setLinkImg] = useState<string | undefined>('');
  const [prevImage, setPrevImage] = useState<string>('');
  const [description, setDescription] = useState<string | any>('');
  const history = useHistory();

  useEffect(() => {
    dispatch(handleGetAllCollection());
  }, []);

  const onChange = (value: string) => {
    setCollectionId(value); // lấy id collection
  };

  const resColletion = useSelector((state: RootState) => state.collectionSlice.dataAllCollection);

  const [dataCollection, setDataCollection] = useState<OptionType[] | undefined>([]);

  useEffect(() => {
    // Sử dụng hàm map để tạo mảng mới từ mảng resultsAll
    const newData = resColletion?.results?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    // Cập nhật dataI bằng mảng mới đã tạo

    setDataCollection(newData);
  }, [resColletion?.results]);

  // Filter `option.label` match the user type `input` : dropdown
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // Lắng nghe sự kiện thay đổi route

  // xử lý thay đổi truyền lên preview
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // ------------

  // get current User to preview
  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser[0]);

  const { navigate } = useSelector((state: RootState) => state.nftSlice);

  useEffect(() => {
    if (navigate) {
      history.push('/'); // khi login thành công sẽ điều hướng
      dispatch(setNavigate(false)); // khi điều hướng xong set về false tránh ảnh hưởng đến các cái khác
    }
  }, [navigate]);

  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch(handleGetaNft(id));
  }, [id]);

  const results: any = useSelector((state: RootState) => state.nftSlice.dataANft);
  //   console.log('🚀 ~ UpdateNftPage ~ results:', results.image);

  // khi mới đầu vào hiện thông tin trước đó lên

  useEffect(() => {
    setValue('name', results?.name);
    // setValue('description', results?.description);
    setValue('price', results?.price);
    setValue('image', results?.image);
    setValue('collectionId', results?.collectionNft?.id);
    setDescription(HTMLReactParser(results?.description || ''));
    if (results?.image !== prevImage) {
      setValue('image', results?.image);
      setPrevImage(results?.image); // Cập nhật giá trị image trước đó
    }
  }, [
    prevImage,
    results?.collectionNft?.id,
    results?.description,
    results?.image,
    results?.name,
    results?.price,
    setValue,
  ]);

  const { loading } = useSelector((state: RootState) => state.nftSlice);

  const handleUpdateNftForm = (data: TNft) => {
    dispatch(
      handleUpdateNft({
        id: id,
        name: data.name,
        description: description,
        price: data.price,
        image: getValues('image'),
        collectionNft: collectionId || results?.collectionNft?.id, // nếu không chọn thì lấy cái mặc định ban đầu
      }),
    );
    // console.log({
    //   name: data.name,
    //   description: description,
    //   price: data.price,
    //   image: getValues('image'),
    //   collectionNft: collectionId || getValues('collectionId'),
    // });
  };

  // react quill

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
      ],
    }),
    [],
  );

  return (
    <LayoutOption>
      <form className="UpdateNft" onSubmit={handleSubmit(handleUpdateNftForm)}>
        <div className="UpdateNft-info">
          <Gap className="pb60">
            <Title className="size38 ">Update your NFT!</Title>
            <Content className="size22">Please share your best NFT photos</Content>
          </Gap>

          <Gap className="pb60">
            <Title className="size22">Upload Image</Title>
            <ImageUpload
              className="UpdateNft-image"
              name="image"
              onChange={(name, data) => {
                setValue('image', data.url);
                setLinkImg(data.url || getValues('image'));
              }}
              setValue={setValue}
              getValues={getValues('image')}
              setLinkImg={setLinkImg}
            ></ImageUpload>
          </Gap>

          <Title className="size22 ">Items Infomation</Title>

          <Gap>
            <Title className="size18">Name</Title>
            <Input
              name="name"
              type="text"
              control={control}
              placeholder="name"
              className="UpdateNft-info__input"
              onChange={handleOnChange}
            ></Input>
          </Gap>

          <Gap>
            <Title className="size18">Collection Nft</Title>

            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              // onSearch={onSearch}
              filterOption={filterOption}
              options={dataCollection && dataCollection}
              value={collectionId || results?.collectionNft?.id}
            />
          </Gap>

          <Gap>
            <Title className="size18">Description</Title>
            {/* <TextArea
              name="description"
              control={control}
              placeholder="description"
              className="UpdateNft-info__input"
            ></TextArea> */}

            <ReactQuill
              modules={modules}
              theme="snow"
              value={description}
              onChange={setDescription}
              className="UpdateNft-reactQuill entry-content"
              placeholder="description...."
            />
          </Gap>

          <Gap>
            <Title className="size18">Price</Title>
            <Input
              name="price"
              type="number"
              control={control}
              placeholder="price"
              className="UpdateNft-info__input"
              onChange={handleOnChange}
            ></Input>
          </Gap>
        </div>
        <div className="UpdateNft-preview">
          <Gap>
            <Title className="size18 pb10">Preview Item</Title>
            <NftItem
              data={{
                name: getValues('name') || formData.name,
                image: getValues('image') || linkImg,
                user: { name: dataUser?.name, avatar: dataUser?.avatar },
                price: getValues('price') || formData.price,
              }}
              bgC="bg3b"
            ></NftItem>
          </Gap>

          <Button
            kind="primary"
            type="submit"
            isLoading={loading}
            className="UpdateNft-preview__btn"
          >
            Update Nft
          </Button>
        </div>
      </form>
    </LayoutOption>
  );
};

export default UpdateNftPage;
