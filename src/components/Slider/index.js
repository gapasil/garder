import React from 'react';

import SlickSlider from 'react-slick';
import './styles.scss';

const Slider = ({
  children,
  className,
  infinite = true,
  slidesToShow,
  slidesToScroll = 1,
  autoPlay = true,
  speed = 500,
  arrows = true,
  dots = true,
  ref_ = null,
  asNavFor = null,
  vertical = false,
  verticalSwiping = false,
  centerMode,
  centerPadding = '0px',
  variableWidth,
  breakPoints,
  focusOnSelect = false,
  touchThreshold,
  adaptiveHeight = false,
}) => {
  return (
    <div className={className}>
      <SlickSlider
        ref={ref_}
        verticalSwiping={verticalSwiping}
        asNavFor={asNavFor}
        infinite={infinite}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        autoplay={autoPlay}
        speed={speed}
        dots={dots}
        arrows={arrows}
        centerMode={centerMode}
        centerPadding={centerPadding}
        variableWidth={variableWidth}
        responsive={breakPoints}
        touchThreshold={touchThreshold}
        adaptiveHeight={adaptiveHeight}
        focusOnSelect={focusOnSelect}
        vertical={vertical}
      >
        {children}
      </SlickSlider>
    </div>
  );
};

export default Slider;
