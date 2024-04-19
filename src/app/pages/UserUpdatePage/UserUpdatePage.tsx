import React, { useEffect } from 'react';
import './userUpdatePage.scss';
import ImageUpload from 'app/components/imageUpload/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCurrentUser, handleUpdateCurrentUser } from 'store/users/handleUser';
import { RootState } from 'types/RootState';
import { useForm } from 'react-hook-form';
import Input from 'app/components/input/Input';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import TextArea from 'app/components/TextArea/TextArea';
import Button from 'app/components/button/Button';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
const UserUpdatePage = () => {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(handleGetCurrentUser());
  }, []);

  const current_user = useSelector((state: RootState) => state.userSlice.dataUser[0]);
  const { loading } = useSelector((state: RootState) => state.userSlice);

  const handleUpdateUser = (data: any) => {
    // dispatch(handleUpdateCurrentUser(data));

    if (!getValues('avatar')) {
      toast.error('avatar cannot be empty');
    } else if (!getValues('banner')) {
      toast.error('banner cannot be empty');
    } else {
      // field nào != " " thì mới push lên field đó
      const dataObj = {
        ...(data.name ? { name: data.name } : {}),
        ...(data.email ? { email: data.email } : {}),
        ...(data.bio ? { bio: data.bio } : {}),
        ...(data.password ? { password: data.password } : {}),
        ...(data.avatar ? { avatar: data.avatar } : {}),
        ...(data.banner ? { banner: data.banner } : {}),
      };
      dispatch(handleUpdateCurrentUser(dataObj));
    }
  };

  useEffect(() => {
    setValue('name', current_user?.name);
    setValue('email', current_user?.email);
    setValue('bio', current_user?.bio);
    setValue('avatar', current_user?.avatar);
    setValue('banner', current_user?.banner);
  }, []);

  return (
    <LayoutOption>
      <form className="userUpdate" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="userUpdate-banner">
          <ImageUpload
            className="sizeBanner"
            name="banner"
            onChange={(name, data) => setValue('banner', data.url)}
            setValue={setValue}
            getValues={getValues('banner')}
          ></ImageUpload>
        </div>
        <div className="userUpdate-avatar">
          <ImageUpload
            className="sizeAvatar"
            name="avatar"
            onChange={(name, data) => setValue('avatar', data.url)}
            setValue={setValue}
            getValues={getValues('avatar')}
          ></ImageUpload>
        </div>

        <div className="userUpdate-box">
          <Input
            type="text"
            name="name"
            control={control}
            className="userUpdate-input2"
            placeholder="Name..."
          ></Input>
          <Input
            type="email"
            name="email"
            control={control}
            className="userUpdate-input2"
            placeholder="Email..."
          ></Input>
        </div>

        <TextArea
          name="bio"
          control={control}
          className="userUpdate-input"
          placeholder="Bio..."
        ></TextArea>

        {/* <div className="userUpdate-box"> */}
        {/* <Input
            type="password"
            name="password_current"
            control={control}
            className="userUpdate-input2"
            placeholder="Current Password ..."
          ></Input> */}
        <Input
          type="password"
          name="password"
          control={control}
          className="userUpdate-input"
          placeholder="New Password... "
        ></Input>
        {/* </div> */}
        <Button type="submit" kind="primary" isLoading={loading} className="userUpdate-btn ">
          Update
        </Button>
      </form>
    </LayoutOption>
  );
};

export default UserUpdatePage;
