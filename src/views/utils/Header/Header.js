import React, { memo, useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import MediaQuery from 'react-responsive/src/Component';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';

import { Animation, Container, Form, Input, Line } from '../../../components';
import { AppleIcon } from '../../../components/Icons/AppleIcon';
import { GoogleIcon } from '../../../components/Icons/GoogleIcon';
import { WhatAppIcon } from '../../../components/Icons/WhatAppIcon';
import store from '../../../stores';
import productsStore from '../../../stores/ProductsStore';
import { Classes } from '../../../utils';
import { MobileCategory } from '../index';

import arrow_black from './assets/svg/arrow_black.svg';
import cart from './assets/svg/cart.svg';
import cart_active from './assets/svg/cart_active.svg';
import close from './assets/svg/close.svg';
import down from './assets/svg/down.svg';
import heart from './assets/svg/heart.svg';
import heart_active from './assets/svg/heart_active.svg';
import home from './assets/svg/home.svg';
import home_active from './assets/svg/home_active.svg';
import logo from './assets/svg/logo.svg';
import menu from './assets/svg/menu.svg';
import profile from './assets/svg/profile.svg';
import profile_active from './assets/svg/profile_active.svg';
import search from './assets/svg/search.svg';
import search_mobile from './assets/svg/search_mobile.svg';
import styles from './Header.module.scss';

const Icon = ({ icon, count }) => {
  if (!count) {
    return <img src={icon} alt="icon" />;
  }
  return (
    <div className={styles.cart}>
      <img src={icon} alt="icon" />
      <span>{count}</span>
    </div>
  );
};

const rightMenu = [
  {
    title: 'Избранное',
    link: '/favourites',
    icon: <Icon icon={heart} />,
    active: <Icon icon={heart_active} />,
  },
  // {
  //     title : 'Корзина',
  //     link : '/cart',
  //     icon : <Icon icon={ cart } count={ 3 }/>,
  //     active : <Icon icon={ cart_active } count={ 3 }/>
  // },
];

const Header = memo(
  observer(() => {
    const [parentName, setParent] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(styles.containerMenunone)
    const [visibleKnop, setVisibleKnop] = useState(styles.knop)
    const [visibleMobailMenu, setVisibleMobailMenu] = useState(styles.containerMenunone)
    const [fon, setFon] = useState(styles.containerMenunone)
    const changeParent = name => {
      setParent(name);
      setVisible(true);
    };

    const location = useLocation();
    useEffect(() => {
      changeParent(null);
    }, [location]);

    const callbackVisibleMenu = () =>{
      setVisibleMenu(styles.containerMenunone)
      setVisibleMobailMenu(styles.containerMenunone)
      setVisibleKnop(styles.knop)
      setFon(styles.containerMenunone)
    }
    const burgerCallback = () =>{
      setVisibleMobailMenu(styles.containerMenuMobail)
      setFon(styles.darkfon)
    }
    return (
      <>
        <MediaQuery minWidth={960}>
          <Top />
          <div className={styles.blocklogoandknop}>
            <div className={styles.blockbottom}>
              <button onClick={()=>{
                setVisibleMenu(styles.containerMenu)
                setVisibleKnop(styles.containerMenunone)
                setFon(styles.darkfon)
              }} className={visibleKnop}
              >
                Категории товаров
              </button>
            </div>
            <div className={fon}></div> 
            <div className={visibleMenu}>
              <div className={styles.blockMenuKnop}>
                <Link to="/">
                  {' '}
                  <img src={logo} alt="logo" />{' '}
                </Link>
                <p>Категорий</p>
                <Menu setParent={changeParent} list={store.categories} callbackClick={callbackVisibleMenu}/>
              </div>
              <div className={styles.blockknop}>
                <Bottom
                  callback={callbackVisibleMenu}
                  visible={visible}
                  setVisible={setVisible}
                  parentCat={parentName}
                />
              </div>
            </div>
            <div className={styles.blockright}>
              <Input
                placeholder="Поиск"
                icon={search}
                border="medium"
                theme="secondary"
              />
              <Link to="/">
                {' '}
                <img src={logo} alt="logo" />{' '}
              </Link>
              <RightMenu list={rightMenu} />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={960}>
          <MobileTop burgerCallback={burgerCallback}/>
          <div className={styles.blocklogoandknop}>
            <div className={styles.blockbottom}>
            </div>
            <div className={fon}></div> 
            <div className={visibleMobailMenu}>
              <div className={styles.blockMenuKnopMobule}>
                <Link to="/">
                  {' '}
                  <img src={logo} alt="logo" />{' '}
                </Link>
                <p>Категорий</p>
                <Menu setParent={changeParent} list={store.categories} versions="mobule"/>
              </div>
              <div className={styles.blockknopMobule}>
                <Bottom
                  callback={callbackVisibleMenu}
                  visible={visible}
                  setVisible={setVisible}
                  parentCat={parentName}
                />
              </div>
            </div>
          </div>
        </MediaQuery>
      </>
    );
  }),
);

const Top = () => {
  return (
    <Container className={styles.component}>
      <div className="flex j-between">
        <div className="flex t_sub">
          <CitySelector />
          <a rel="noreferrer" href="https://is.gd/JHHvo0" target="_blank">
            <AppleIcon
              width={100}
              border="transparent"
              background="transparent"
            />
          </a>
          <a rel="noreferrer" href="https://is.gd/NZ2bl7" target="_blank">
            <GoogleIcon
              width={100}
              border="transparent"
              background="transparent"
            />
          </a>
        </div>
        <div className="flex j-center a-center" style={{ marginLeft: 'auto' }}>
          <a
            rel="noreferrer"
            href="http://wa.me/+77473111706"
            className="flex j-center a-center "
            target="_blank"
          >
            <span>Напишите нам</span>
            <WhatAppIcon fillOut="transparent" fillInner="#FFFFFF" />
          </a>
        </div>
        <div
          className={Classes.join([
            'flex t_sub a-center ml-35',
            styles.separate,
          ])}
        >
          <HashLink to="/news/#top">Блог</HashLink>
          <HashLink to="/faq/#top">Помощь</HashLink>
        </div>
      </div>
    </Container>
  );
};


const Bottom = memo(
  observer(({ parentCat, visible, setVisible, callback }) => {
    const childCat = store.categories.find(
      ({ current: { name } }) => name === parentCat,
    )?.childCategories;

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      sub
    } = useForm();

    const history = useHistory();
    
    const onSearch = ({ query }) => {
      productsStore.setFilter('query', query);
      productsStore._getItems();
      history.push('/catalog/');
      reset({ query: '' });
    };
    let parentcat
    if(typeof(parentCat) == "string"){
      parentcat = parentCat
    }
    return (
        <div
          className={styles.bottomHeader}
        >
        <div className={styles.hederMenu}>
          <p>{parentcat}</p>
          <img onClick={callback} src="https://www.flaticon.com/svg/vstatic/svg/3917/3917189.svg?token=exp=1651502852~hmac=a49ced1b58981b1cdfa9e9c65a0e92dc" width="20px" style={{"cursor":"pointer"}}/>
        </div>

          <div
            className={Classes.join([
              visible && styles.activeMenu,
              styles.childMenu,
            ])}
          > 
            {childCat && <Menu cat={true} list={childCat} />}
          </div>
        </div>
    );
  }),
);

const CitySelector = observer(({ theme = null }) => {
  // const [open, setOpen] = useState(false);
  //
  // const changeLang = (s) => {
  //     setOpen(s)
  // }
  const [currentCity, setCurrentCity] = useState('');
  useEffect(() => {
    setCurrentCity(toJS(store?.cities)[store.user?.currentCity]?.name);
  }, [store.user, store.cities]);

  return (
    <div
      className={Classes.join([
        styles.dropdown,
        styles[theme],
        'flex column a-center mr-3 j-center',
      ])}
    >
      <div className="flex a-center">
        <Link to="?popup=chooseCity" className="flex a-center">
          {' '}
          {currentCity}
          {!theme ? (
            <img className="ml-1" src={down} alt="down" />
          ) : (
            <img className="ml-1" src={arrow_black} alt="down" />
          )}
        </Link>
      </div>
    </div>
  );
  // return (
  //     <div
  //         onClick={ () => changeLang(!open) }
  //         className={ Classes.join([styles.dropdown, styles[theme], 'flex column a-center mr-3']) }
  //     >
  //         <div className="flex">
  //             <p>{ defaultCity }</p>
  //             { !theme ? <img className='ml-1' src={ down } alt="down"/> :
  //                 <img className='ml-1' src={ arrow_black } alt="down"/>
  //             }
  //         </div>
  //         <div
  //             onMouseLeave={ () => changeLang(false) }
  //             className={ Classes.join([styles.list, open && styles.open]) }>
  //             { city.map((item, k) => (
  //                 <p key={ k }>{ item }</p>
  //             )) }
  //         </div>
  //     </div>
  // )
});

const LangSelector = ({ theme = null }) => {
  const [open, setOpen] = useState(false);
  const lang = ['Русский', 'Казахский'];
  const defaultLang = lang[0];

  const changeLang = s => {
    setOpen(s);
  };

  return (
    <div
      onClick={() => changeLang(!open)}
      className={Classes.join([
        styles.dropdown,
        styles[theme],
        'flex column a-center',
      ])}
    >
      <div className="flex">
        <p>{defaultLang}</p>
        {!theme ? (
          <img className="ml-1" src={down} alt="down" />
        ) : (
          <img className="ml-1" src={arrow_black} alt="down" />
        )}
      </div>
      <div
        onMouseLeave={() => changeLang(false)}
        className={Classes.join([styles.list, open && styles.open])}
      >
        {lang.map((item, k) => (
          <p key={k}>{item}</p>
        ))}
      </div>
    </div>
  );
};

//кнопки
const Menu = observer(({ list, cat = false, setParent = () => {},versions, callbackClick }) => {
  if(versions == "mobule"){
    return (
      <div
        className={Classes.join([styles.menu, cat ? styles.catMenu : '', 'flex'])}
      >
        {list.map(({ current, childCategories = [] }, k) => (
          <MenuLinkMobule
            cat={cat}
            setParent={setParent}
            title={current?.name}
            link={current?.url}
            key={k}
            sub={childCategories}
            callbackClick={callbackClick}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className={Classes.join([styles.menu, cat ? styles.catMenu : '', 'flex'])}
    >
      {list.map(({ current, childCategories = [] }, k) => (
        <MenuLink
          cat={cat}
          setParent={setParent}
          title={current?.name}
          link={current?.url}
          key={k}
          sub={childCategories}
          callbackClick={callbackClick}
        />
      ))}
    </div>
  );
});

//меню с права без инпута
const RightMenu = observer(({ list, cat = false }) => {
  return (
    <div
      className={styles.rightMenu}
    >
      {store.user.type !== 'USER' ? (
        <MenuLink
          isLink={true}
          title="Войти"
          icon={<Icon icon={profile} />}
          link="?popup=sign-in"
        />
      ) : (
        <MenuLink
          isLink={true}
          title="Профиль"
          icon={<Icon icon={profile} />}
          link="/profile/"
        />
      )}
      {list.map(({ title, link, icon, sub }, k) => (
        <MenuLink
          isLink={true}
          title={title}
          icon={icon}
          link={link}
          key={k}
          sub={sub}
        />
      ))}
      <MenuLink
        isLink={true}
        title="Корзина"
        icon={<Icon icon={cart} count={store.itemsInCart} />}
        link="/cart/"
      />
    </div>
  );
});

const MenuLink = observer(
  ({
    title,
    link = '#',
    setParent = () => {},
    icon,
    id,
    sub,
    cat,
    isLink = false,
  },callbackClick) => {
    
    const [show, setShow] = useState(false);
    const changeShow = s => {
      cat && setShow(s);
    };
    const location = useLocation();
    useEffect(() => {
      changeShow(false);
    }, [location]);
    console.log(sub);
    return (
      <div
        className={styles.menuLink}
        onMouseEnter={() => changeShow(true)}
        onMouseLeave={() => changeShow(false)}
        onClick={callbackClick}
      >
        {!isLink ? (
          <HashLink
            to={`/catalog/${link}#top`}
            className={Classes.join([
              'pb-1 flex a-center',
              styles.categoryLink,
            ])}
            onMouseEnter={() => setParent(title)}
          >
            {icon && icon}
            {title}
          </HashLink>
        ) : (
          <HashLink
            className={Classes.join(['pb-1 flex a-center'])}
            to={`${link}#top`}
          >
            {icon && icon}
            {title}
          </HashLink>
        )}
          { cat&&sub&&sub.length > 0 && (
            <div
              onClick={callbackClick}
              className={styles.blockPodKategories}
            >
                {sub.map(({ current, link = '#', icon }, k) => (
                  <HashLink
                    key={k}
                    to={`/catalog/${current.url}#top`}
                  >
                    {icon && icon}
                    <p>{current.name}</p>
                  </HashLink>
                ))}
            </div>
        )}
      </div>
    );
  },
);
//мобильное меню
const MobileTop = observer((burgerCallback) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSearch = ({ query }) => {
    productsStore.setFilter('query', query);
    productsStore._getItems();
    history.push('/catalog/');
    reset({ query: '' });
  };
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const [threeDropdown, setThreeDropdown] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const onShowMenu = s => {
    setShowMenu(s);
  };
  
  return (
    <Container className={styles.mobileContainer}>
      <div
        className={Classes.join([
          'flex a-center j-between pb-15 pt-15',
          styles.mobileTop,
        ])}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Form onSubmit={handleSubmit(onSearch)}>
          <MediaQuery minWidth={480}>
            <Input
              {...register('query')}
              placeholder="Введите название товара, имя продавца, или бренд"
              icon={search_mobile}
              onInput={(e, v) => setValue(e, v)}
            />
          </MediaQuery>
          <MediaQuery maxWidth={480}>
            <Input
              {...register('query')}
              placeholder="Поиск"
              onInput={(e, v) => setValue(e, v)}
              icon={search_mobile}
            />
          </MediaQuery>
        </Form>
        <img src={menu} onClick={burgerCallback.burgerCallback} alt="menu" />
      </div>

      <Animation show={showMenu}>
        <div className={styles.mobileBack} onClick={() => onShowMenu(false)}>
          <div
            className={Classes.join([styles.mobileMenu, 'flex column a-start'])}
            onClick={e => e.stopPropagation()}
          >
            <img
              onClick={() => onShowMenu(false)}
              src={close}
              alt="icon"
              className="mb-4"
            />

            {threeDropdown === null && (
              <>
                <Line />
                <div className={styles.bottomPart}>
                  <div className={styles.support}>
                    <div className={styles.catLink}>
                      <HashLink
                        className="flex j-between a-center"
                        to="/news#top"
                      >
                        <span>Блог</span>
                      </HashLink>
                    </div>
                    <div className={styles.catLink}>
                      <HashLink
                        className="flex j-between a-center"
                        to="/faq#top"
                      >
                        <span>Помощь</span>
                      </HashLink>
                    </div>
                  </div>
                  <div
                    className="flex j-center a-center"
                    style={{ marginTop: 'auto' }}
                  >
                    <a
                      style={{ color: '#000000' }}
                      rel="noreferrer"
                      href="http://wa.me/+77473111706"
                      className="flex column a-center"
                      target="_blank"
                    >
                      <span className="mb-1">Напишите нам</span>
                      <WhatAppIcon />
                    </a>
                  </div>
                  <div className={styles.pickers}>
                    <CitySelector theme="black" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Animation>
    </Container>
  );
});
const MenuLinkMobule = observer(
  ({
    title,
    link = '#',
    setParent = () => {},
    icon,
    id,
    sub,
    cat,
    isLink = false,
  },callbackClick) => {
    
    const [show, setShow] = useState(false);
    const changeShow = s => {
      cat && setShow(s);
    };
    const location = useLocation();
    useEffect(() => {
      changeShow(false);
    }, [location]);

    return (
      <div
        className={styles.menuLink}
        onClick={() =>{
          if(show){
            changeShow(false)
            return
          }
          changeShow(true)
          callbackClick()
        }
      }
      >
        {!isLink ? (
          <HashLink
            className={Classes.join([
              'pb-1 flex a-center',
              styles.categoryLink,
            ])}
            onMouseEnter={() => setParent(title)}
          >
            {icon && icon}
            {title}
          </HashLink>
        ) : (
          <HashLink
            className={Classes.join(['pb-1 flex a-center'])}
          >
            {icon && icon}
            {title}
          </HashLink>
        )}
          { cat&&sub&&sub.length > 0 && (
            <div
              className={styles.blockPodKategories}
            >
                {sub.map(({ current, link = '#', icon }, k) => (
                  <HashLink
                    key={k}
                    to={`/catalog/${current.url}#top`}
                  >
                    {icon && icon}
                    <p>{current.name}</p>
                  </HashLink>
                ))}
            </div>
        )}
      </div>
    );
  },
);
const MobileBottom = observer(() => {
  return (
    <Container className={styles.mobileBottom}>
      <div className="flex j-between a-center pb-2 pt-2">
        <NavHashLink activeClassName={styles.active} to="/#top" exact>
          <img src={home} alt="icon" />
          <img src={home_active} alt="icon" />
          Главная
        </NavHashLink>

        <NavHashLink activeClassName={styles.active} to="/cart/#top" exact>
          <Icon icon={cart} count={store.itemsInCart} />
          <Icon icon={cart_active} count={store.itemsInCart} />
          Корзина
        </NavHashLink>
        {rightMenu.reverse().map((item, idx) => (
          <NavHashLink
            key={idx}
            activeClassName={styles.active}
            to={`${item.link}#top`}
            exact
          >
            {item.icon}
            {item.active}
            {item.title}
          </NavHashLink>
        ))}

        {store.user.type === 'USER' ? (
          <NavHashLink activeClassName={styles.active} to="/profile/#top" exact>
            <img src={profile} alt="icon" />
            <img src={profile_active} alt="icon" />
            Профиль
          </NavHashLink>
        ) : (
          <NavHashLink
            activeClassName={Classes.join([styles.active, styles.auth])}
            to="?popup=sign-in"
            exact
          >
            <img src={profile} alt="icon" />
            {/*<img src={ profile_active } alt="icon"/>*/}
            Войти
          </NavHashLink>
        )}
      </div>
    </Container>
  );
});
// {
//     title : 'Корзина',
//     link : '/cart',
//     icon : <Icon icon={ cart } count={ 3 }/>,
//     active : <Icon icon={ cart_active } count={ 3 }/>
// },
export default Header;
