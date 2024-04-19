import React from 'react';
import './trendingItem.scss';
import Image from 'app/components/Common/Image/Image';
import Title from 'app/components/Common/Title/Title';
import Content from 'app/components/Common/Content/Content';
import { checkImageExtension, convertDateNumeric } from 'app/helpers/common';
import { Epath } from 'app/routes/routesConfig';
import { Link } from 'react-router-dom';
const TrendingItem = ({ className = '', data }: { className?: string; data?: any }) => {
  // custom tiếp
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/collection/${data.collectionP.id}`}
      className="trendItem"
    >
      <Image
        link={
          checkImageExtension(data.collectionP.image)
            ? data.collectionP.image
            : '/imgTrending/img1.png'
        }
        className="trendItem-bigImg"
      ></Image>
      <div className="trendItem-boxImg">
        {data.nftP.length > 0 &&
          data.nftP.slice(0, 2).map((item: any) => {
            return (
              <Image
                key={item.id}
                link={checkImageExtension(item.image) ? item.image : '/imgTrending/img2.png'}
                className="trendItem-smalImg"
              ></Image>
            );
          })}
        {data.nftP.length > 2 && data.nftP.length !== 3 && (
          <div className="trendItem-moreNft">{data.nftP.length - 3}+</div>
        )}

        {data.nftP.length === 3 && (
          <Image
            link={
              checkImageExtension(data.nftP[2].image) ? data.nftP[2].image : '/imgTrending/img2.png'
            }
            className="trendItem-smalImg"
          ></Image>
        )}
        {/* <Image link="/imgTrending/img3.png" className="trendItem-smalImg"></Image> */}
      </div>
      <Title className="size22">{data.collectionP.name}</Title>
      <Content className="size16">{convertDateNumeric(data.collectionP.updatedAt)}</Content>
    </Link>
  );
};

export default TrendingItem;
