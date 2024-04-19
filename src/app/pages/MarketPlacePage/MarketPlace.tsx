import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import './MarketPlace.scss';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import Input from 'app/components/input/Input';
import { useForm } from 'react-hook-form';
import Tabs from 'app/components/Tabs/Tabs';
import NftItem from 'app/components/NFT_Item/NftItem';
import IconEyeOpen from 'app/components/Icons/IconEyeOpen';
import IconSearch from 'app/components/Icons/IconSearch';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetAllNft, handleSearchNft } from 'store/nfts/handleNft';
import { RootState } from 'types/RootState';
import { Link } from 'react-router-dom';

import { debounce } from 'lodash';
import { Pagination, PaginationProps } from 'antd';

const MarketPlace = () => {
  const { control } = useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPage2, setCurrentPage2] = useState<number>(1);
  const [nameNft, setNameNft] = useState<string>('');
  const [itemPerPage, setItemPerPage] = useState<number>(9);
  const dispatch = useDispatch();

  // get data khi không search
  useEffect(() => {
    dispatch(handleGetAllNft({ page: currentPage, limit: itemPerPage }));
  }, [currentPage, dispatch, itemPerPage]);

  // get data  khi search
  useEffect(() => {
    dispatch(handleGetAllNft({ name: nameNft, limit: itemPerPage, page: currentPage2 }));
  }, [currentPage2, dispatch, itemPerPage, nameNft]);

  const { results, totalResults } = useSelector((state: RootState) => state.nftSlice.dataAllNft);

  // active tabs: update UI
  const [activeTab, setActiveTab] = useState<string>('1');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // không search
  const handleChangePagination = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  // có search
  const handleChangePagination2 = (currentPage2: number) => {
    setCurrentPage2(currentPage2);
  };

  const handleSearchNftForm = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setNameNft(e.target.value);
    dispatch(
      handleGetAllNft({
        name: e.target.value,
        limit: itemPerPage,
        page: currentPage2,
      }),
    );
  }, 200);

  // không search
  const handleChangeQuanityPerPage: PaginationProps['onShowSizeChange'] = (
    currentPage,
    pageSize,
  ) => {
    setCurrentPage(currentPage);
    setItemPerPage(pageSize);
  };
  // có search
  const handleChangeQuanityPerPage2: PaginationProps['onShowSizeChange'] = (
    currentPage2,
    pageSize2,
  ) => {
    setCurrentPage(currentPage2);
    setItemPerPage(pageSize2);
  };

  return (
    <Fragment>
      <LayoutOption>
        <div className="MarketPlace">
          <div className="MarketPlace-head">
            <Title className="size51">Browse Marketplace</Title>
            <Content className="size22 MarketPlace-head__content">
              Browse through more than 50k NFTs on the NFT Marketplace.
            </Content>
            <Input
              name="favouriteNFt"
              control={control}
              className="MarketPlace-head__input"
              type="text"
              placeholder="Search your favourite NFTs"
              kind="search"
              onChange={handleSearchNftForm}
            >
              <IconSearch></IconSearch>
            </Input>
          </div>
          <Tabs
            title="NFTs"
            quantity1={results.length + ''}
            title2="Collections"
            quantity2="69"
            activeTab={activeTab}
            onChange={handleTabChange}
          ></Tabs>
        </div>
      </LayoutOption>
      <div className="MarketPlace-NftContainer">
        <LayoutOption>
          <div className={`${activeTab === '1' ? '' : 'hidden'}`}>
            <div className={`MarketPlace-NftContainer__box `}>
              {results?.length > 0 &&
                results.map((item) => {
                  // if (dataUser?.id !== item.user.id) {
                  return (
                    <Link key={item.id} style={{ textDecoration: 'none' }} to={`nft/${item.id}`}>
                      <NftItem data={item}></NftItem>
                    </Link>
                  );
                  // }
                })}
            </div>
            {nameNft && totalResults && totalResults > 9 && (
              <div className="MarketPlace-pagination withSearh">
                <Pagination
                  // defaultCurrent={1}
                  current={currentPage2}
                  showSizeChanger
                  pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
                  total={totalResults && totalResults} // tổng tất cả item có
                  onChange={handleChangePagination2}
                  onShowSizeChange={handleChangeQuanityPerPage2}
                />
              </div>
            )}
            {!nameNft && totalResults && totalResults > 9 && (
              <div className="MarketPlace-pagination noSearch">
                <Pagination
                  // defaultCurrent={1}
                  current={currentPage}
                  showSizeChanger
                  pageSize={itemPerPage} // số lượng trong 1 page là bao nhiêu items
                  total={totalResults && totalResults} // tổng tất cả item có
                  onChange={handleChangePagination}
                  onShowSizeChange={handleChangeQuanityPerPage}
                />
              </div>
            )}
          </div>
        </LayoutOption>
      </div>
    </Fragment>
  );
};

export default MarketPlace;
