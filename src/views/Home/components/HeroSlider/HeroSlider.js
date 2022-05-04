import React, { memo } from 'react';

import { observer } from 'mobx-react';
import ContentLoader from 'react-content-loader';

import { Container } from '../../../../components';
import Slider from '../../../../components/Slider';
import baner1 from "./баннеры/Картинка.png"
import baner2 from "./баннеры/Картинка 2.png"
import baner3 from "./баннеры/Картинка 3.png"
import baner4 from "./баннеры/Картинка 4.png"
import baner5 from "./баннеры/Картинка 5.png"
import styles from './HeroSlider.module.scss';

const DoorDashFavorite = props => (
  <ContentLoader
    animate={true}
    width={450}
    height={400}
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
);
const HeroSlider = memo(
  observer(({ images = [] }) => {
    let mas = [baner1,baner2,baner3,baner4,baner5]
    return (
      <Container className={styles.slider}>
        <Slider
          slidesToShow={1}
          centerMode
          arrows={true}
          centerPadding="0px"
          touchThreshold={15}
          // adaptiveHeight={true}
          speed={500}
        >
          {mas.map((item, idx) => (
                <img
                  key={idx}
                  loading="lazy"
                  alt="banner"
                  className={styles.slideItem}
                  src={item} // use normal <img> attributes as props
                />
              ))}
        </Slider>
      </Container>
    );
  }),
);

export default HeroSlider;
