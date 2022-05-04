import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { Classes } from '../../../utils';

import arrow_back from './assets/arrow_back.svg';
import styles from './MobileCategory.module.scss';

const MobileCategory = observer(
  ({ list, threeDropdown, setThreeDropdown, general, setValue }) => {
    const [visible, setVisible] = useState(null);
    const [dropdownId, setDropdownId] = useState(null);
    const onShow = id => {
      setVisible(s => (s === id ? null : id));
    };

    const location = useLocation();

    useEffect(() => {
      setVisible(false);
    }, [location]);

    const backToMenu = () => {
      setVisible(null);
      setThreeDropdown(null);
      setDropdownId(null);
    };
    return (
      <div className={Classes.join([styles.mobileMenu, 'flex column a-start'])}>
        <div className={styles.listMenu}>
          {threeDropdown !== null && general && (
            <div
              onClick={backToMenu}
              className={Classes.join([
                't_body flex a-center',
                styles.arrowLink,
              ])}
            >
              <Link className="flex j-between a-center" to="#">
                <span>
                  {' '}
                  <img src={arrow_back} alt="back" /> Главное меню
                </span>
              </Link>
            </div>
          )}
          {list.map((item, idx) => {
            return (
              <CatItem
                general={general}
                threeDropdown={threeDropdown}
                onShow={() => onShow(idx)}
                onThreeDropdown={setThreeDropdown}
                visible={visible}
                dropdownId={dropdownId}
                onDropdown={setDropdownId}
                setValue={setValue}
                id={idx}
                item={item}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

const ThreeDropdown = observer(({ item = {}, setValue = () => {} }) => (
  <div
    className={Classes.join(['t_body', styles.dropdownItem])}
    // onClick={ () => setValue(item?.current?.name) }
  >
    <HashLink
      className="flex j-between a-center"
      to={`/catalog/${item?.current.url}#top`}
    >
      <span>
        {item?.current?.name}
        <span className={Classes.join(['t_footnote', styles.count])}></span>
      </span>
    </HashLink>
  </div>
));

const DropdownItem = observer(
  ({ item = {}, visible, id, onDropdown, setValue }) => (
    <div
      onClick={onDropdown}
      className={Classes.join([
        't_body',
        visible !== null && visible !== id ? styles.catDropdown : '',
        visible === id ? styles.threeDropdownActive : '',
        item?.childCategories ? styles.arrow : '',
      ])}
    >
      <span className="flex j-between a-center">
        <span>
          {item?.current?.name}
          <span className={Classes.join(['t_footnote'])}></span>
        </span>
      </span>
      {visible === id &&
        item?.childCategories &&
        item?.childCategories.map((item, idx) => (
          <ThreeDropdown id={idx} setValue={setValue} item={item} key={idx} />
        ))}
    </div>
  ),
);

const CatItem = observer(
  ({
    id,
    item = {},
    visible,
    dropdownId,
    threeDropdown,
    onShow,
    onThreeDropdown,
    onDropdown,
    general = false,
    setValue = null,
  }) => {
    const onDropdownShow = id => {
      onDropdown(id);
      onThreeDropdown(id);
    };

    const onMenuShow = () => {
      dropdownId === null && onShow();
      onDropdown(null);
      onThreeDropdown(null);
    };

    return (
      <div
        className={Classes.join([
          't_body',
          styles.catLink,
          visible === id && !threeDropdown ? styles.active : '',
        ])}
      >
        {(threeDropdown === null && dropdownId === null) || visible === id ? (
          <span onClick={onMenuShow} className="flex j-between a-center">
            <span>
              {dropdownId !== null ? <img src={arrow_back} alt="back" /> : ''}
              {general ? (
                <HashLink
                  className={styles.linkCat}
                  to={`/catalog/${item.current.url}`}
                >
                  {item?.current?.name}
                </HashLink>
              ) : (
                <> {item?.current?.name}</>
              )}
            </span>
          </span>
        ) : null}
        {visible === id &&
          item?.childCategories &&
          item?.childCategories.map((item, idx) => (
            <DropdownItem
              id={idx}
              visible={dropdownId}
              onDropdown={() => onDropdownShow(idx)}
              item={item}
              setValue={setValue}
              key={idx}
            />
          ))}
      </div>
    );
  },
);

export default MobileCategory;
