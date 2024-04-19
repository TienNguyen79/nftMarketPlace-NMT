import LayoutOption from 'app/components/Common/LayoutOption/LayoutOption';
import NftHighlight from 'app/modules/HomePage/NftHighlight/NftHighlight';
import DiscoverNFTs from 'app/modules/HomePage/discoverNFTs/DiscoverNFTs';
import HeroSection from 'app/modules/HomePage/heroSection/HeroSection';
import HowItWork from 'app/modules/HomePage/howItWorks/HowItWork';
import Subscribe from 'app/modules/HomePage/subscribe/Subscribe';
import TopCreator from 'app/modules/HomePage/topCreators/TopCreator';
import TrendingCollection from 'app/modules/HomePage/trendingCollection/TrendingCollection';
import React from 'react';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <LayoutOption>
        <HeroSection />
        <TrendingCollection />
        <TopCreator />
        <DiscoverNFTs />
      </LayoutOption>
      <NftHighlight />
      <LayoutOption>
        <HowItWork />
        <Subscribe />
      </LayoutOption>
    </div>
  );
};

export default HomePage;
