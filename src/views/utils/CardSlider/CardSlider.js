import React from 'react';

import { observer } from 'mobx-react';

import { Container, ProductCard } from '../../../components';
import Slider from '../../../components/Slider';

import styles from './CardSlider.module.scss';

//TODO:Прием карточек

const CardSlider = observer(({ title, products = [] }) => {
  return (
    <Container className={styles.hit}>
      <h2 className="mb-5">{title}</h2>
      <Slider
        slidesToShow={6}
        autoPlay={false}
        slidesToScroll={6}
        centerMode
        dots={false}
        // centerPadding="60px"
        touchThreshold={15}
        adaptiveHeight={false}
        // adaptiveHeight={true}
        speed={500}
        breakPoints={[
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 620,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ]}
      >
        {products.map(item => (
          <ProductCard item={item} key={item.id} />
        ))}
      </Slider>
    </Container>
  );
});

export default CardSlider;
