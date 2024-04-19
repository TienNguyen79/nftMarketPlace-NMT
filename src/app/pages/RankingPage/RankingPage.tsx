import React, { useEffect } from 'react';
import './rankingpage.scss';
import Gap from 'app/components/Common/Gap/Gap';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import Table from 'app/components/table/Table';
import Image from 'app/components/Common/Image/Image';
import TextRanking from 'app/modules/RankingPage/TextRanking';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetUserRanking } from 'store/users/handleUser';
import { RootState } from 'types/RootState';
import { checkImageExtension } from 'app/helpers/common';
import { Epath } from 'app/routes/routesConfig';
const RankingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUserRanking());
  }, []);

  const Uranking = useSelector((state: RootState) => state.userSlice.dataUserRanking);

  // const { isAuthenticated } = useSelector((state: RootState) => state.authSlice);

  // if (!isAuthenticated) {
  //   return <Redirect to={Epath.loginPage} />;
  // }

  return (
    <div className="Ranking">
      <LayoutOption>
        <Gap className="mb80">
          <Title className="size51">Top Creators</Title>
          <Content className="size22">
            Check out top ranking NFT artists on the NFT Marketplace.
          </Content>
        </Gap>

        <Table>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Artist</th>
                <th className="Ranking-change">Change</th>
                <th className="Ranking-NFTSold">NFTs Sold</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {Uranking?.results?.length > 0 &&
                Uranking?.results?.map((item, index) => (
                  <tr key={item.id}>
                    <td className='Ranking-id"'>
                      <div className="Ranking-id">{index + 1}</div>
                    </td>
                    <td>
                      <Link to={`/artist/${item.id}`} className="Ranking-artist">
                        <Image
                          link={checkImageExtension(item.avatar) ? item.avatar : '/avarta.png'}
                          className="Ranking-artist__img"
                        ></Image>
                        <Title className="size22 Ranking-nameNFT">{item.name}</Title>
                      </Link>
                    </td>
                    <td className="Ranking-change__content">
                      <TextRanking clasName="Ranking-text2 ">+1.41%</TextRanking>
                    </td>
                    <td className="Ranking-NFTSold__content">
                      <TextRanking clasName="Ranking-text ">{item.countNfts}</TextRanking>
                    </td>
                    <td>
                      <TextRanking clasName="Ranking-text">{item.totalPrice} ETH</TextRanking>
                    </td>
                  </tr>
                ))}
              {/* <tr>
                <td className='Ranking-id"'>
                  <div className="Ranking-id">1</div>
                </td>
                <td>
                  <Link to="/artist" className="Ranking-artist">
                    <Image link="/avarta.png" className="Ranking-artist__img"></Image>
                    <Title className="size22">Jaydon Ekstrom Bothman</Title>
                  </Link>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text2">+1.41%</TextRanking>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text">602</TextRanking>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text">12.4 ETH</TextRanking>
                </td>
              </tr>
              <tr>
                <td className='Ranking-id"'>
                  <div className="Ranking-id">1</div>
                </td>
                <td>
                  <Link to="/artist" className="Ranking-artist">
                    <Image link="/avarta.png" className="Ranking-artist__img"></Image>
                    <Title className="size22">Jaydon Ekstrom Bothman</Title>
                  </Link>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text2">+1.41%</TextRanking>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text">602</TextRanking>
                </td>
                <td>
                  <TextRanking clasName="Ranking-text">12.4 ETH</TextRanking>
                </td>
              </tr> */}
            </tbody>
          </table>
        </Table>
      </LayoutOption>
    </div>
  );
};

export default RankingPage;
