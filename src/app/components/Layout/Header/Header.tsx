import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_LANGUAGE } from 'locales/i18n';
import { Epath } from 'app/routes/routesConfig';
import './header.scss';
import Button from 'app/components/button/Button';
import { RootState } from 'types/RootState';
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
} from 'app/helpers/localStorage';
import Image from 'app/components/Common/Image/Image';
import { handleLogout } from 'store/auth/handleAuth';
import { handleGetCurrentUser } from 'store/users/handleUser';
import { checkImageExtension } from 'app/helpers/common';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import TextMono from 'app/components/Common/Text/TextMono';
import useOutsideClick from 'app/helpers/customHook/useOutsideClick';
import PopUpHeader from './parts/PopUpHeader';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import UserInfo from './parts/UserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faRankingStar,
  faRightFromBracket,
  faShop,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
const navLink = [
  { id: 1, name: 'Marketplace', to: '/marketPlace' },
  { id: 2, name: 'Rankings', to: '/ranking' },
  { id: 3, name: 'Connect a wallet', to: '/wallet' },
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);

  const onLogOut = () => {
    i18n.changeLanguage(DEFAULT_LANGUAGE);
    history.push(Epath.loginPage);
  };

  const { dataUser } = useSelector((state: RootState) => state.userSlice);

  // mục đích khi login xong sẽ hiện lên user
  useEffect(() => {
    if (getTokenFromLocalStorage()) {
      dispatch(handleGetCurrentUser());
    }
  }, [getTokenFromLocalStorage()]);

  // Tạo ref cho phần tử mở popup hoặc dropdown
  const openerRef = useRef(null);
  const openerRef2 = useRef(null);

  // Tạo ref cho phần tử cần kiểm tra khi click bên ngoài
  const ref = useRef(null);
  const ref2 = useRef(null);

  const handleOutsideClick = () => {
    setOpenPopup(false);
  };

  // Lắng nghe sự kiện thay đổi route
  history.listen(() => {
    setOpenPopup(false); // Đóng popup khi chuyển trang
    setOpenOverlay(false);
  });

  // Sử dụng hook useOutsideClick
  useOutsideClick(openerRef, ref, handleOutsideClick);

  const handleOutsideClickOverlay = () => {
    setOpenOverlay(false);
  };

  useOutsideClick(openerRef2, ref2, handleOutsideClickOverlay);

  // menu antD
  const Boxitems: MenuProps['items'] = [
    // Các mục menu bạn muốn hiển thị không phụ thuộc vào trạng thái đăng nhập
    getItem('Marketplace', Epath.marketplacePage, <FontAwesomeIcon icon={faShop} />),
    getItem('Rankings', Epath.rankingPage, <FontAwesomeIcon icon={faRankingStar} />),
    getItem('Connect a wallet', 'sub6', <FontAwesomeIcon icon={faWallet} />),
  ];

  if (getTokenFromLocalStorage()) {
    Boxitems.unshift(
      getItem(<UserInfo data={dataUser[0]}></UserInfo>, 'info1', '', [
        getItem('Profile', `/artist/${dataUser[0]?.id}`),
        getItem('NFTs', 'sub3', null, [
          getItem('Create NFTs', Epath.createNft),
          getItem('Manage my NFTs', Epath.myNfts),
        ]),
        getItem('Settings', Epath.userUpdatePage),
      ]),
    );
  }

  if (getTokenFromLocalStorage()) {
    Boxitems.push(getItem('Logout', '/logOut', <FontAwesomeIcon icon={faRightFromBracket} />));
  }

  // const items: MenuProps['items'] = [
  //   getItem(<UserInfo data={dataUser[0]}></UserInfo>, 'info1', '', [
  //     getItem('Profile', `/artist/${dataUser[0]?.id}`),
  //     getItem('NFTs', 'sub3', null, [
  //       getItem('Create NFTs', Epath.createNft),
  //       getItem('Manage my NFTs', Epath.myNfts),
  //     ]),
  //     getItem('Settings', Epath.userUpdatePage),
  //   ]),

  // getItem('Marketplace', Epath.marketplacePage, <FontAwesomeIcon icon={faShop} />),
  // getItem('Rankings', Epath.rankingPage, <FontAwesomeIcon icon={faRankingStar} />),
  // getItem('Connect a wallet', 'sub6', <FontAwesomeIcon icon={faWallet} />),
  //   getItem('Logout', '/logOut', <FontAwesomeIcon icon={faRightFromBracket} />),
  // ];

  const onClick: MenuProps['onClick'] = (e) => {
    const { key } = e;

    if (key === '/logOut') {
      dispatch(handleLogout({ refreshToken: getRefreshTokenFromLocalStorage() }));
      setOpenOverlay(false);
    } else {
      history.push(key);
    }
  };

  return (
    <Fragment>
      <div className="header">
        <div className="header-box">
          <Link to="/">
            <img src="/logoP.png" className="header-img" alt="" />
          </Link>
          <div className="header-boxSub">
            <div className="header-nav">
              {navLink.map((item) => (
                <Link key={item.id} to={item.to} className="header-nameNav">
                  {item.name}
                </Link>
              ))}
            </div>
            {getTokenFromLocalStorage() ? (
              <div className="header-myself">
                <div
                  className="header-myself__box"
                  ref={openerRef}
                  onClick={() => {
                    setOpenPopup(!openPopup);
                  }}
                >
                  <Image
                    className="header-myself__img "
                    link={
                      checkImageExtension(dataUser[0]?.avatar) ? dataUser[0]?.avatar : '/avarta.png'
                    }
                  ></Image>
                </div>

                <div ref={ref}>{openPopup && <PopUpHeader data={dataUser[0]}></PopUpHeader>}</div>
              </div>
            ) : (
              <Button href="/sign-up" icon="/Iuser.png" className="header-btn priBtn ">
                Sign Up
              </Button>
            )}

            <div
              className="header-bars-mobile"
              ref={openerRef2}
              onClick={() => {
                setOpenOverlay(!openOverlay);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 8C4 7.44772 4.44772 7 5 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H5C4.44772 9 4 8.55228 4 8Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 24C4 23.4477 4.44772 23 5 23H20C20.5523 23 21 23.4477 21 24C21 24.5523 20.5523 25 20 25H5C4.44772 25 4 24.5523 4 24Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={`header-overlay ${openOverlay && 'header-overlay__effect'}`} ref={ref2}>
        <span
          className="header-overlay__close"
          onClick={() => {
            setOpenOverlay(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </span>

        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['info1']}
          defaultOpenKeys={['info1']}
          mode="inline"
          items={Boxitems}
        />
      </div>
    </Fragment>
  );
}

export default Header;
