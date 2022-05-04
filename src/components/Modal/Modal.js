import React from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from './Modal.module.scss';
import './style.css';
import closeIcon from './assets/svg/close.svg';
import arrow_back from './assets/svg/arrow_back.svg';

import { Line } from '../index';

const contentStyle = {
  borderWidth: '0px',
  borderRadius: '8px',
  padding: '24px 0',
};

const Modal = ({
  trigger,
  header,
  children: content,
  maxWidth = '100vw',
  width = 'auto',
  onClose = null,
  filter = false,
  ...props
}) => (
  <Popup
    {...props}
    overlayStyle={{ padding: '0 10px' }}
    trigger={trigger}
    closeOnDocumentClick={false}
    lockScroll={false}
    position="top center"
    modal
    {...{
      contentStyle: {
        maxWidth,
        width,
        ...contentStyle,
      },
    }}
  >
    {close => (
      <div className={styles.content}>
        <div className={styles.header}>
          <span className="t_h2">
            {filter && (
              <img
                src={arrow_back}
                onClick={() => {
                  close();
                  onClose && onClose();
                }}
                alt="icon"
              />
            )}
            {header}
          </span>
          <img
            className={styles.close}
            onClick={() => {
              close();
              onClose && onClose();
            }}
            src={closeIcon}
            alt="icon"
          />
        </div>
        <Line />
        {content}
        {/*{ React.Children.map(content, child => {*/}
        {/*    return React.cloneElement(child, {close})*/}
        {/*}) }*/}
      </div>
    )}
  </Popup>
);

export default Modal;
