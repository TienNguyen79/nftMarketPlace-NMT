import Content from 'app/components/Common/Content/Content';
import Image from 'app/components/Common/Image/Image';
import TextMono from 'app/components/Common/Text/TextMono';
import Title from 'app/components/Common/Title/Title';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../Header/header.scss';
import { checkImageExtension } from 'app/helpers/common';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from 'store/auth/handleAuth';
import { getRefreshTokenFromLocalStorage } from 'app/helpers/localStorage';
import { RootState } from 'types/RootState';
import { setNavigate } from 'store/auth/authSlice';
const PopUpHeader = ({
  data,
}: {
  data: { name: string; email: string; avatar: string; id: string };
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { navigate } = useSelector((state: RootState) => state.authSlice);
  // useEffect(() => {
  //   if (navigate) {
  //     history.push('/'); // khi logout thành công sẽ điều hướng
  //     dispatch(setNavigate(false)); // khi điều hướng xong set về false tránh ảnh hưởng đến các cái khác
  //   }
  // }, [navigate]);

  const handleLogoutForm = () => {
    dispatch(
      handleLogout({
        refreshToken: getRefreshTokenFromLocalStorage(),
        callback: () => {
          history.push('/');
        },
      }),
    );
  };

  return (
    <div className="header-popUp">
      <div className="header-popUp__info">
        <Image
          className="header-popUp__info__img"
          link={checkImageExtension(data?.avatar) ? data?.avatar : '/avarta.png'}
        ></Image>
        <div className="header-popUp__Boxname">
          <Title className="header-popUp__Boxname__name">{data?.name}</Title>
          <Content className="header-popUp__Boxname__email">{data?.email}</Content>
        </div>
      </div>
      <div className="header-popUp__divider"></div>
      <Link to={`/artist/${data?.id}`} style={{ textDecoration: 'none' }}>
        <TextMono className="header-popUp__nameNav__spe">Profile</TextMono>
      </Link>
      <div className="header-popUp__divider"></div>

      <Link to={`/createNft`} style={{ textDecoration: 'none' }}>
        <TextMono className="header-popUp__nameNav__spe">Create Nft</TextMono>
      </Link>
      <Link to={`/myNfts`} style={{ textDecoration: 'none' }}>
        <TextMono className="header-popUp__nameNav__spe">Manage my NFTs</TextMono>
      </Link>

      <div className="header-popUp__divider"></div>
      <Link to="/userUpdate" style={{ textDecoration: 'none' }}>
        <TextMono className="header-popUp__nameNav">Settings</TextMono>
      </Link>

      <div onClick={handleLogoutForm}>
        <TextMono className="header-popUp__nameNav">Logout</TextMono>
      </div>
    </div>
  );
};

export default PopUpHeader;
