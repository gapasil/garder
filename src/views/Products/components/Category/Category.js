import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import store from '../../../../stores';
import { Classes } from '../../../../utils';

import styles from './Category.module.scss';

const categories = [
  { title: 'Обувь', link: '#', count: 123 },
  {
    title: 'Одежда',
    link: '#',
    sub: [
      { title: 'Блузы и рубашки', link: '#', count: 123 },
      {
        title: 'Боди',
        link: '#',
        sub: [
          { title: 'Бриджи и капри', link: '#', count: 123 },
          { title: 'Под-подкатегория', link: '#', count: 123 },
          { title: 'Под-подкатегория', link: '#', count: 123 },
          { title: 'Под-подкатегория', link: '#', count: 123 },
        ],
        count: 123,
      },
      { title: 'Брюки', link: '#', count: 123 },
      { title: 'Категория', link: '#', count: 123 },
      { title: 'Боди', link: '#', count: 123 },
    ],
    count: 123,
  },
  { title: 'Белье', link: '#', count: 123 },
  { title: 'Беременным', link: '#', count: 123 },
  { title: 'Кормящим', link: '#', count: 123 },
];

const ThreeDropdown = observer(({ item }) => {
  return (
    <div className={Classes.join(['t_body', styles.dropdownItem])}>
      <HashLink
        className="flex j-between a-center"
        to={`/catalog/${item?.current?.url}`}
      >
        <span>
          {item?.current?.name}
          <span className={Classes.join(['t_footnote', styles.count])}>
            {item.count}
          </span>
        </span>
      </HashLink>
    </div>
  );
});

const DropdownItem = observer(({ item, visible, id, onDropdown, url }) => {
  return (
    <div
      onClick={onDropdown}
      className={Classes.join([
        't_body',
        visible === id ||
        `${url.category}${
          url.childCategory !== null ? `/${url.childCategory}` : ''
        }` === item?.current?.url
          ? styles.active
          : '',
        item.sub ? styles.arrow : '',
      ])}
    >
      <HashLink
        className="flex j-between a-center"
        to={`/catalog/${item?.current?.url}`}
      >
        <span>
          {item?.current?.name}
          <span className={Classes.join(['t_footnote', styles.count])}>
            {item.count}
          </span>
        </span>
      </HashLink>
      {visible === id ||
      `${url.category}${
        url.childCategory !== null ? `/${url.childCategory}` : ''
      }` === item?.current?.url
        ? item.childCategories &&
          item.childCategories.map((item, idx) => (
            <ThreeDropdown id={idx} item={item} key={idx} />
          ))
        : ''}
    </div>
  );
});

const CatItem = observer(({ id, item, visible, onShow, url }) => {
  const [dropdownId, setDropdownId] = useState(null);

  const onDropdown = id => {
    setDropdownId(id);
  };
  return (
    <div
      onClick={onShow}
      className={Classes.join([
        't_body',
        styles.catLink,
        visible === id || url.category === item?.current?.url
          ? styles.active
          : '',
      ])}
    >
      <Link
        className="flex j-between a-center"
        to={`/catalog/${item?.current?.url}`}
      >
        <span>
          {item?.current?.name}
          <span className={Classes.join(['t_footnote', styles.count])}>
            {item.count}
          </span>
        </span>
      </Link>

      {visible === id || url.category === item?.current?.url
        ? item.childCategories &&
          item.childCategories.map((item, idx) => (
            <DropdownItem
              id={idx}
              url={url}
              visible={dropdownId}
              onDropdown={() => onDropdown(idx)}
              item={item}
              key={idx}
            />
          ))
        : ''}
    </div>
  );
});

const Category = observer(({ url }) => {
  const [visible, setVisible] = useState(null);

  const onShow = id => {
    setVisible(id);
  };
  useEffect(() => {
    // _getCategories();
  }, []);

  // const _getCategories = async () => {
  //     const { data : { categories } } = await API.get('categories');
  //     store.setCategories(categories);
  // }

  return (
    <div className={Classes.join([styles.categories, 'flex column'])}>
      {store.categories.map((item, idx) => {
        return (
          <CatItem
            onShow={() => onShow(idx)}
            visible={visible}
            url={url}
            id={idx}
            item={item}
            key={idx}
          />
        );
      })}
    </div>
  );
});

export default Category;
