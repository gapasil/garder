import React, { useEffect, useState, Suspense, memo } from 'react';
import HeroSlider from "./components/HeroSlider/HeroSlider";
import API from "../../services/api";
import store from "../../stores";
import { observer } from "mobx-react";
import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import { Button, Container, ProductCard } from "../../components";
import styles from "./index.css"

import FlatList from 'flatlist-react';
import Giveaway from "./components/Giveaway/Giveaway";
import Categories from "./components/Categories/Categories"
import LazyLoad from 'react-lazyload';
import Spinner from "../../components/Spinner";
import ContentLoader from 'react-content-loader';
import MetaTags from "react-meta-tags";
import men from "./категорий/мужшина.jpg"
import woman from "./категорий/женшина.jpg"
import home from "./категорий/дом.jpg"
import kids from "./категорий/дети.jpg"
import bitovuha from "./категорий/бытовуха.jpg"
import aksessuar from "./категорий/аксессуары.jpg"
import auto from "./категорий/авто.jpeg"
import zoo from "./категорий/зоотовары.jpg"
import igri from "./категорий/игрушки.jpg"
import krasota from "./категорий/красота.jpg"
import novigod from "./категорий/новыйгод.jpg"
import shoes from "./категорий/обувь.jpg"
import pletka from "./категорий/плетка.jpg"
import remont from "./категорий/ремонт.jpg"
import garden from "./категорий/сад.jpg"
import elektro from "./категорий/электроника.jpg"
import dragkamni from "./категорий/ювелиры.jpg"

const TemplateCard = props => {
    return (
        <ContentLoader viewBox="0 0 260 160" height={ 350 } width={ 180 } { ...props }>
            <circle cx="50" cy="30" r="30"/>
            <rect x="10" y="70" rx="3" ry="3" width="40" height="10"/>
            <rect x="60" y="70" rx="3" ry="3" width="70" height="10"/>
            <rect x="140" y="70" rx="3" ry="3" width="20" height="10"/>
            <rect x="10" y="90" rx="3" ry="3" width="90" height="10"/>
            <rect x="110" y="90" rx="3" ry="3" width="70" height="10"/>
            <rect x="10" y="110" rx="3" ry="3" width="70" height="10"/>
            <rect x="90" y="110" rx="3" ry="3" width="60" height="10"/>
        </ContentLoader>
    )
}

class HomeStore {
    constructor() {
        makeObservable(this, {
            bestsellersProducts: observable,
            newProducts: observable,
            _data: observable,
            bestsellersPages: observable,
            newPages: observable,
            bestsellersCurrentPage: observable,
            newCurrentPage: observable,
            _initHome: action,
            data: computed,
        });

    }

    bestsellersProducts = [];
    newProducts = [];

    bestsellersPages = 1;
    bestsellersCurrentPage = 1;

    newPages = 1;
    newCurrentPage = 1;
    _data = {};

    get data() {
        return this._data;
    }

    _initHome = async () => {
        try {
            store.toggleLoading(true);
            const {data} = await API.get('home');
            runInAction(() => {
                this._data = data;
            })
            return data;
        } catch (error) {
        } finally {
            store.toggleLoading(false);
        }
    }

    getItems = async (type, page = 1) => {
        try {
            store.toggleLoading(true);
            const {data} = await API.get(`home-products`, {
                params: {
                    type,
                    page
                }
            });
            runInAction(() => {
                this[`${ type }Products`] = data.section.products;
                this[`${ type }Pages`] = data.section.countOfPages;
                this[`${ type }CurrentPage`] = data.section.currentPage;
            })
        } catch (error) {
        } finally {
            store.toggleLoading(false);
        }
    }
}

const homeStore = new HomeStore();


let template = [];
for (let i = 0; i < 20; i++) {
    template.push(i);
}
const Home = memo(observer(() => {
    const [data, setData] = useState({});

    const mas = [
        {text:"Мужчинам",img:men,url:"muzhchinam"},{text:"Сад и дача",img:garden,url:"dachniy-sezon"},
        {text:"Женшинам",img:woman,url:"zhenshchinam"},{text:"Зоотовары",img:zoo,url:"tovary-dlya-zhivotnyh"},
        {text:"Детям",img:kids,url:"detyam"},{text:"Для ремонта",img:remont,url:"dlya-remonta"},
        {text:"Обувь",img:shoes,url:"obuv"},{text:"Дом",img:home,url:"dom-i-dacha"},
        {text:"Аксессуары",img:aksessuar,url:"aksessuary"},{text:"Автотовары",img:auto,url:"avtotovary"},
        {text:"Электроника",img:elektro,url:"elektronika"},{text:"Ювелирные изделия",img:dragkamni,url:"yuvelirnye-ukrasheniya"},
        {text:"Бытовая техника",img:bitovuha,url:"bytovaya-tehnika"},{text:"Новый год",img:novigod,url:"novyy-god"},
        {text:"Красота",img:krasota,url:"krasota"},{text:"Товары для взрослых",img:pletka,url:"tovary-dlya-vzroslyh"},
        {text:"Игрушки",img:igri,url:"igrushki"}
    ]
    
    useEffect(() => {
        homeStore._initHome().then(data => setData(data));
    }, [])

    const loadProducts = (type) => {
        homeStore.getItems(type, homeStore[`${ type }CurrentPage`] + 1);
    }
    let date 
    if(data.hasOwnProperty("offers")){
        date = data.offers
    }

    return (
        <>
            <MetaTags>
                <title>Gardershop – одежда и обувь</title>
            </MetaTags>
            <LazyLoad>
                <HeroSlider images={ date }/>
            </LazyLoad>
            {/*<LazyLoad>*/}
            {/*    <Giveaway list={ toJS(data.giveaways) }/>*/}
            {/*</LazyLoad>*/}
            <LazyLoad>

                {/*{ data.sections && data.sections.map((item, idx) =>*/ }
                {/*    <CardSlider title={ item.title } products={ toJS(item.products) } key={ idx }/>) }*/ }
                <Container>
                    <h1 className='flex j-center'>Категорий</h1>
                </Container>

                <Container>
                    <div className='flex wrap j-around'>
                        {mas.map((obj)=>{
                           return(<Categories props={obj.text} img={obj.img} url={obj.url}/>) 
                        })}
                    </div>
                </Container>))
        
            </LazyLoad>
        </>
    )
}));

export default Home;