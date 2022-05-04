import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react';

import Slider from '../../../../components/Slider';

import styles from './Slider.module.scss';

const ProductSlider = observer(({ images = [], alt }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = [],
    slider2 = [];

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  return (
    <div className={styles.sliderContainer}>
      <Slider
        vertical={true}
        verticalSwiping={true}
        className={styles.sliderNav}
        autoPlay={false}
        asNavFor={nav2}
        ref_={slider => (slider1 = slider)}
        slidesToShow={4}
        centerMode
        dots={false}
        arrows={false}
        centerPadding="0px"
        touchThreshold={15}
        focusOnSelect={true}
        adaptiveHeight={false}
        // adaptiveHeight={true}
        speed={500}
        breakPoints={[
          {
            breakpoint: 1140,
            settings: {
              slidesToShow: 4,
              vertical: false,
              verticalSwiping: false,
              arrows: false,
            },
          },
        ]}
      >
        {images.map((item, idx) => (
          <img loading="lazy" key={idx} src={item} alt={alt} />
        ))}
      </Slider>
      <Slider
        className={styles.sliderMain}
        autoPlay={false}
        asNavFor={nav1}
        ref_={slider => (slider2 = slider)}
        slidesToShow={1}
        centerMode
        arrows={true}
        dots={false}
        centerPadding="0px"
        touchThreshold={15}
        adaptiveHeight={false}
        // adaptiveHeight={true}
        speed={500}
      >
        {images.map((item, idx) => (
          <img loading="lazy" key={idx} src={item} alt={alt} />
        ))}
      </Slider>
    </div>
  );
});

export default ProductSlider;
