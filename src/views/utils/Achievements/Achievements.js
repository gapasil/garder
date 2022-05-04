import React from 'react';

import Slider from '../../../components/Slider';

import styles from './Achievements.module.scss';
import g2 from './assets/images/g2.png';

const Achievements = () => {
  return (
    <div className="mt-10">
      <h2 className="t_h1 mb-45">Достижения</h2>
      <div className={styles.slider}>
        <Slider
          slidesToShow={4}
          slidesToScroll={1}
          centerMode
          dots={false}
          // centerPadding="60px"
          touchThreshold={15}
          adaptiveHeight={false}
          // adaptiveHeight={true}
          speed={4500}
          breakPoints={[
            {
              breakpoint: 980,
              settings: {
                adaptiveHeight: true,
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 680,
              settings: {
                // adaptiveHeight:true,
                adaptiveHeight: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '0px',
              },
            },
          ]}
        >
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className="flex a-center">
              <img src={g2} alt="image" />
              <div className="ml-25">
                <p className="t_supbody bold mb-1">G2 Crowd</p>
                <span className="t_body">Best core HR Software</span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Achievements;
