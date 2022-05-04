import React from 'react';

import { Container } from '../../../../components';
import GiveCard from '../../../../components/GiveCard/GiveCard';
import Slider from '../../../../components/Slider';

import styles from './Giveaway.module.scss';

const Giveaway = ({ list }) => {
  return (
    <Container className={styles.giveaway}>
      {list && <h2 className="mb-5">Розыгрыши</h2>}
      <Slider
        slidesToShow={3}
        slidesToScroll={1}
        centerMode
        dots={false}
        autoPlay={false}
        // centerPadding="60px"
        touchThreshold={15}
        adaptiveHeight={false}
        // adaptiveHeight={true}
        speed={500}
        breakPoints={[
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {list && list.map((item, idx) => <GiveCard item={item} key={idx} />)}
      </Slider>
    </Container>
  );
};

export default Giveaway;
