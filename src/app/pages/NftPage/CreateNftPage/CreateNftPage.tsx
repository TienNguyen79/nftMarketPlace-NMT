import React, { useEffect, useMemo, useState } from 'react';
import './createNftPage.scss';
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
import { handleCreateNft } from 'store/nfts/handleNft';
import { useHistory } from 'react-router-dom';
import { setNavigate } from 'store/nfts/nftSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TNft } from 'types/nft';
interface OptionType {
  value: string;
  label: string;
}

const CreateNftPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [collectionId, setCollectionId] = useState<string>('');
  const [linkImg, setLinkImg] = useState<string | undefined>('');
  const [description, setDescription] = useState<string>('');

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

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  // xử lý thay đổi truyền lên preview
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // get current User to preview
  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser[0]);

  const { navigate } = useSelector((state: RootState) => state.nftSlice);

  useEffect(() => {
    if (navigate) {
      history.push('/'); // khi login thành công sẽ điều hướng
      dispatch(setNavigate(false)); // khi điều hướng xong set về false tránh ảnh hưởng đến các cái khác
    }
  }, [navigate]);

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

  // test
  const [tags, setTag] = useState<string[]>(['']); // Khởi tạo state với một input ban đầu

  const handleAddInput = () => {
    setTag([...tags, '']); // Thêm một input mới vào danh sách inputs
  };

  const handleDellInput = () => {
    const newTags = [...tags];
    newTags.pop();
    if (newTags.length <= 0) {
      return;
    }
    setTag(newTags);
  };

  const handleChangeTags = (index: number, value: string) => {
    const newTags = [...tags];

    newTags[index] = value;

    setTag(newTags); // Cập nhật giá trị của input khi người dùng thay đổi nội dung
  };

  // submit createForm

  const handleCreateNftForm = (data: TNft) => {
    // console.log('🚀 ~ handleCreateNftForm ~ data:', data);
    dispatch(
      handleCreateNft({
        name: data.name,
        description: description,
        price: data.price,
        image: getValues('image'),
        collectionNft: collectionId,
        tags: tags,
      }),
    );
  };

  return (
    <LayoutOption>
      <form className="CreateNft" onSubmit={handleSubmit(handleCreateNftForm)}>
        <div className="CreateNft-info">
          <Gap className="pb60">
            <Title className="size38 ">Create your NFT!</Title>
            <Content className="size22">Please share your best NFT photos</Content>
          </Gap>

          <Gap className="pb60">
            <Title className="size22">Upload Image</Title>
            <ImageUpload
              className="CreateNft-image"
              name="image"
              onChange={(name, data) => {
                setValue('image', data.url);
                setLinkImg(data.url);
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
              className="CreateNft-info__input"
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
            />
          </Gap>

          <Gap>
            <Title className="size18">Description</Title>
            {/* <TextArea
              name="description"
              control={control}
              placeholder="description"
              className="CreateNft-info__input"
            ></TextArea> */}
            <ReactQuill
              modules={modules}
              theme="snow"
              value={description}
              onChange={setDescription}
              className="CreateNft-reactQuill entry-content"
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
              className="CreateNft-info__input"
              onChange={handleOnChange}
            ></Input>
          </Gap>
          <Gap>
            <Title className="size18">Tag</Title>

            <div className="CreateNft-tag">
              <div className="CreateNft-tag__boxInput">
                {tags.map((tag, index) => (
                  <Input
                    key={index}
                    control={control}
                    name={`name_${index + 1}`}
                    type="text"
                    value={tag}
                    onChange={(e) => handleChangeTags(index, e.target.value)}
                    placeholder="Tag..."
                    className="CreateNft-tag__input"
                  />
                ))}
              </div>
              <div className="CreateNft-tag__boxBtn">
                <Button kind="secondary" className="CreateNft-tag__btn" onClick={handleAddInput}>
                  Add Tag
                </Button>

                <Button kind="secondary" className="CreateNft-tag__btn" onClick={handleDellInput}>
                  Delete Tag
                </Button>
              </div>
            </div>
          </Gap>
        </div>
        <div className="CreateNft-preview">
          <Gap>
            <Title className="size18 pb10">Preview Item</Title>
            <NftItem
              data={{
                name: formData.name,
                image: linkImg && linkImg,
                user: { name: dataUser?.name, avatar: dataUser?.avatar },
                price: formData.price,
              }}
              bgC="bg3b"
            ></NftItem>
          </Gap>

          <Button kind="primary" type="submit" className="CreateNft-preview__btn">
            Publish Nft
          </Button>
        </div>
      </form>
    </LayoutOption>
  );
};

export default CreateNftPage;
