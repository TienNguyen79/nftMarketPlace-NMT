import React, { useEffect, useState } from 'react';
import './myNftsPage.scss';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Table from 'app/components/table/Table';
import Image from 'app/components/Common/Image/Image';
import TextMono from 'app/components/Common/Text/TextMono';
import { Divider, Pagination, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faHandHolding,
  faHandHoldingHand,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { handleGetAllNft, handleStatusSellNft, handledeleteNft } from 'store/nfts/handleNft';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { isImage } from 'app/helpers/functions';
import { statusSellnft } from 'app/helpers/common';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from 'app/components/input/Input';
import { useForm } from 'react-hook-form';
import IconSearch from 'app/components/Icons/IconSearch';
import { debounce } from 'lodash';
// import 'sweetalert2/src/sweetalert2.scss';

const itemPerPage: number = 4;

const MyNftsPage = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPage2, setCurrentPage2] = useState<number>(1);
  const [nameNft, setNameNft] = useState<string>('');

  const { results, totalResults, limit } = useSelector(
    (state: RootState) => state.nftSlice.dataAllNft,
  ); // data All user

  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser[0]); // data current user

  const handleChangeStatusSell = (idNft: string) => {
    dispatch(handleStatusSellNft(idNft));
  };

  const handleDelete = (name: string, id: string) => {
    Swal.fire({
      title: `Are you sure to delete NFT <span class="sweet-name">${name}</span> `,
      // html: true, // Cho phép sử dụng mã HTML
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(handledeleteNft(id));
      }
    });
  };

  const handleSearchNftForm = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch(handleSearchNft({ name: e.target.value }));
    setNameNft(e.target.value);
    dispatch(handleGetAllNft({ name: e.target.value, user: dataUser?.id, limit: itemPerPage }));
  }, 200);

  const handleChangePagination = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleChangePagination2 = (currentPage2: number) => {
    setCurrentPage2(currentPage2);
  };

  // get data  khi không search
  useEffect(() => {
    dispatch(handleGetAllNft({ user: dataUser?.id, limit: itemPerPage, page: currentPage }));
  }, [currentPage, dataUser?.id, dispatch]);

  // get data  khi search
  useEffect(() => {
    dispatch(
      handleGetAllNft({
        user: dataUser?.id,
        name: nameNft,
        limit: itemPerPage,
        page: currentPage2,
      }),
    );
  }, [currentPage2, dataUser?.id, dispatch, nameNft]);

  return (
    <LayoutOption>
      <div className="MyNfts">
        <Gap className="mb80">
          <Title className="size51">Manage my NFTs</Title>
          <Content className="size22 MyNfts-content">
            Manage My NFTs' feature to organize, track, and showcase my digital assets.
          </Content>
        </Gap>

        <Input
          name="favouriteNFt"
          control={control}
          className="MyNfts__input"
          type="text"
          placeholder="Search your favourite NFTs"
          kind="search"
          onChange={handleSearchNftForm}
        >
          <IconSearch></IconSearch>
        </Input>

        <div className="MyNfts-table">
          <Table>
            <table>
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Nft Info</th>
                  <th>Price (eth)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 &&
                  results.map((item, idnex) => {
                    // if (item.user.id === dataUser?.id) {
                    return (
                      <tr key={item.id}>
                        {/* <td>
                          <TextMono className="MyNfts-text">
                            {item.id.slice(0, 3) + '...' + item.id.slice(-3)}
                          </TextMono>
                        </td> */}
                        <td>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/nft/${item.id}`}
                            className="MyNfts-Smallbox"
                          >
                            <Image
                              className="MyNfts-img"
                              link={isImage(item.image) ? item.image : '/avarta.png'}
                            ></Image>
                            <div className="MyNfts-Smallbox2">
                              <Title className="size18 MyNfts-name">{item.name}</Title>
                              <Content className="size12">View: {item.view}</Content>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <TextMono className="MyNfts-text">{item.price}</TextMono>
                        </td>
                        <td>
                          <Switch
                            checkedChildren="Sell"
                            unCheckedChildren="Mint"
                            // onChange={handleChangeStatus}
                            defaultChecked={item.status === statusSellnft.sell ? true : false}
                            onClick={() => handleChangeStatusSell(item.id)}
                          />{' '}
                        </td>
                        <td>
                          <div className="MyNfts-boxAction">
                            <Link
                              style={{ textDecoration: 'none' }}
                              to={`/giveNft/${item.id}`}
                              className="MyNfts-boxAction__icon"
                            >
                              <FontAwesomeIcon color="white" icon={faHandHoldingHand} />
                            </Link>
                            <Link
                              style={{ textDecoration: 'none' }}
                              to={`/updateNft/${item.id}`}
                              className="MyNfts-boxAction__icon"
                            >
                              <FontAwesomeIcon color="white" icon={faPenToSquare} />
                            </Link>
                            <div
                              className="MyNfts-boxAction__icon"
                              onClick={() => handleDelete(item.name, item.id)}
                            >
                              <FontAwesomeIcon color="white" icon={faTrash} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Table>
        </div>

        <div className="MyNfts-table--mobile ">
          {results.length > 0 &&
            results.map((item, index) => (
              <div
                // to={`/nft/${item.id}`}
                className="MyNfts-Smallbox MyNfts-Smallbox--mobile "
              >
                <Link to={`/nft/${item.id}`} className="MyNfts-Smallbox--mobile__info">
                  <Image
                    className="MyNfts-img"
                    link={isImage(item.image) ? item.image : '/avarta.png'}
                  ></Image>
                  <div className="MyNfts-Smallbox2">
                    <Title className="size18 MyNfts-name">{item.name}</Title>
                    <Content className="size12">View: {item.view}</Content>
                  </div>
                </Link>
                <div className=" MyNfts-Smallbox--mobile__footer">
                  <Switch
                    checkedChildren="Sell"
                    unCheckedChildren="Mint"
                    // onChange={handleChangeStatus}
                    defaultChecked={item.status === statusSellnft.sell ? true : false}
                    onClick={() => handleChangeStatusSell(item.id)}
                  />
                  <div className="MyNfts-boxAction">
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/giveNft/${item.id}`}
                      className="MyNfts-boxAction__icon"
                    >
                      <FontAwesomeIcon color="white" icon={faHandHoldingHand} />
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/updateNft/${item.id}`}
                      className="MyNfts-boxAction__icon"
                    >
                      <FontAwesomeIcon color="white" icon={faPenToSquare} />
                    </Link>
                    <div
                      className="MyNfts-boxAction__icon"
                      onClick={() => handleDelete(item.name, item.id)}
                    >
                      <FontAwesomeIcon color="white" icon={faTrash} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {nameNft && totalResults && totalResults > 4 && (
          <div className="MarketPlace-pagination withSearh">
            <Pagination
              // defaultCurrent={1}
              current={currentPage2}
              pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
              total={totalResults && totalResults} // tổng tất cả item có
              onChange={handleChangePagination2}
            />
          </div>
        )}
        {!nameNft && totalResults && totalResults > 4 && (
          <div className="MarketPlace-pagination noSearch">
            <Pagination
              // defaultCurrent={1}
              current={currentPage}
              pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
              total={totalResults && totalResults} // tổng tất cả item có
              onChange={handleChangePagination}
            />
          </div>
        )}

        {/* {nameNft ? (
          <div className="MyNfts-pagination withSearh">
            <Pagination
              defaultCurrent={1}
              current={currentPage2}
              pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
              total={totalResults && totalResults} // tổng tất cả item có
              onChange={handleChangePagination2}
            />
          </div>
        ) : (
          <div className="MyNfts-pagination noSearch">
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
              total={totalResults && totalResults} // tổng tất cả item có
              onChange={handleChangePagination}
            />
          </div>
        )} */}
      </div>
    </LayoutOption>
  );
};

export default MyNftsPage;
