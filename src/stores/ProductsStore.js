import { observable, action, toJS, makeObservable, computed, runInAction } from 'mobx';
import store from "./index";
import API from "../services/api";


class ProductsStore {
    constructor() {
        makeObservable(this, {
            _products: observable,
            metaData : observable,
            products: computed,
            filter: observable,
            filterString: observable,
            colorsArr: observable,
            filterClear: observable,
            _colors: observable,
            colors: computed,
            breadcrumbs: observable,
            countOfProducts: observable,
            countOfPages: observable,
            currentPage: observable,
            _getItems: action,
            _getColors: action,
            setFilter: action,
            setColor: action,
            _getBrand: action
        });
    }

    _colors = {};
    colorsArr = [];
    _products = [];
    metaData = {
        metaDescription : '',
        metaTitle : '',
        description : ''
    }
    breadcrumbs = [];
    countOfProducts = 0;
    countOfPages = 0;
    currentPage = 1;
    searchedBrands = [];
    filter = {
        query: null,
        sort: 0,
        color: null,
        season: [
            { id: 1, title: 'Круглогодичный', isChecked: false },
            { id: 2, title: 'Демисезон', isChecked: false },
            { id: 3, title: 'Зима', isChecked: false },
            { id: 4, title: 'Лето', isChecked: false }
        ],
        price_to: '',
        price_from: '',
        sizes: [
            { id: 1, title: 'L', isChecked: false },
            { id: 2, title: 'M', isChecked: false },
            { id: 3, title: 'S', isChecked: false },
            { id: 4, title: 'XL', isChecked: false },
            { id: 5, title: 'XXL', isChecked: false },
            { id: 6, title: 'XXXL', isChecked: false },
            { id: 7, title: 'XXXS', isChecked: false },
        ],
        brands: [],
    };

    filterClear = false;

    get products() {
        return this._products;
    }

    get colors() {
        return this._colors;
    }

    get brands() {
        return this.brands;
    }

    changeCheckBrand(id) {
        const itemIndex = this.filter.brands.findIndex(item => item.id === id);
        const item = this.filter.brands[itemIndex];
        this.filter.brands[itemIndex].isChecked = !item.isChecked
    }

    changeCheckSize(id) {
        const itemIndex = this.filter.sizes.findIndex(item => item.id === id);
        const item = this.filter.sizes[itemIndex];
        this.filter.sizes[itemIndex].isChecked = !item.isChecked
    }

    filterByLetter(letters) {
       const upperLetters = letters.toUpperCase()

        const searchReg = new RegExp(`^(${upperLetters})`)
        const result = (str) => {
            const result = str.toUpperCase().search(searchReg);
            return result >= 0
        }

       this.searchedBrands = this.filter.brands.filter((item) => result(item.title))
    }

    filterString = {
        query: null,
        sort: 'По популярности',
        color: null,
        season: null,
        price_to: null,
        price_from: null,
        sizes: null,
        brands: null,
        searchedBrands: null
    }

    setFilter(field, value) {
        console.log({...this.filter});
        this.filterClear = false;
        this.filter = {...this.filter, [field]: value}
    }

    setFilterString(field, value) {
        this.filterClear = false;
        this.filterString = {...this.filterString, [field]: value}
    }

    clearFilter = () => {
        runInAction(() => {
            this.filterClear = true;
            this.filter = {
                query: null,
                sort: 0,
                color: null,
                season: [{id: 1, title: 'Круглогодичный', isChecked: false,},
                    {id: 2, title: 'Демисезон', isChecked: false,},
                    {id: 3, title: 'Зима', isChecked: false,},
                    {id: 4, title: 'Лето', isChecked: false,},],
                price_to: null,
                price_from: null,
                sizes: [
                    { id: 1, title: 'L', isChecked: false },
                    { id: 2, title: 'M', isChecked: false },
                    { id: 3, title: 'S', isChecked: false },
                    { id: 4, title: 'XL', isChecked: false },
                    { id: 5, title: 'XXL', isChecked: false },
                    { id: 6, title: 'XXXL', isChecked: false },
                    { id: 7, title: 'XXXS', isChecked: false },
                ],
                brands: null,
                searchedBrands: null
            };
            this.filterString = {
                sort: 'По популярности',
                color: null,
                season: null,
                price_to: null,
                price_from: null,
                sizes: null,
                brands: null,
                searchedBrands: null
            }
        })
    }
    _getColors = async () => {
        const {data: {colors}} = await API.get('other/colors');
        const colorsObj = colors.reduce((acc, item) => {
            acc[item.hex] = item;
            acc[item.hex].isChecked = false;
            return acc;
        }, {})
        runInAction(() => {
            this._colors = {...colorsObj};
            this.colorsArr = Object.values(this.colors);
        })
    }

    _getBrand = async () => {
        const {data} = await API.get('catalog');
        const brandData = data.available_parameters.brand

        const arrayOfBrands = Object.entries(brandData);
        const test = [];

        arrayOfBrands.map((item, index) => {
            if(item[0] !== '' && item[0] !== ' ') {
                test.push({
                    id: index,
                    title: item[0],
                    isChecked: false,
                });
            }
        });
        runInAction(() => {
            this.filter.brands.push(...test)
        })
    }

    setColor(color) {
        const hex = Object.keys(this._colors).find(item => item === color);

        const item = this._colors[hex];
        const newItem = {
            ...item,
            isChecked: !item.isChecked
        }

        this._colors = {
            ...this._colors,
            [hex]: newItem
        }

        const activeStr = Object.keys(this._colors)
            .filter(item => this._colors[item].isChecked === true)
            .map(item => this._colors[item].name)
            .join(',');
        productsStore.setFilter('color', activeStr);

    }

    async _getItems(url = '', page = 1) {
        try {
            store.toggleLoading(true);
            let fds = await API.get(`catalog/${ url }`, {
                params: {
                    query:this.filter.query,
                }
            });

            console.log(fds)
            const brandsArray = this.filter.searchedBrands || this.filter.brands;
            const season = this.filter.season.filter(item => item.isChecked === true)
                .map(item => item.title)
                .join(',');
            const size = this.filter.sizes.filter(item => item.isChecked === true)
              .map(item => item.title)
              .join(',');
            const brand = toJS(brandsArray).filter(item => item.isChecked === true)
              .map(item => item.title)
              .join(',');
            const {
                data: {
                    breadcrumbs, catalog: {
                        countOfProducts,
                        countOfPages,
                        currentPage,
                        products
                    },
                    meta : {
                        metaDescription,
                        metaTitle,
                        description
                    }
                }
            } = await API.get(`catalog/${ url }`, {
                params: {
                    page,
                    sort: this.filter.sort || 0,
                    price_to: this.filter.price_to === '' ? null : this.filter.price_to,
                    price_from: this.filter.price_from === '' ? null : this.filter.price_from,
                    season: season !== '' ? season : null,
                    size: size !== '' ? size : null,
                    brand: brand !== '' ? brand : null,
                }
            });
            runInAction(() => {
                this._products = [...products];
                this.breadcrumbs = [...breadcrumbs];
                this.countOfProducts = countOfProducts;
                this.countOfPages = countOfPages;
                this.currentPage = currentPage;
                this.metaData.metaDescription = metaDescription;
                this.metaData.metaTitle = metaTitle;
                this.metaData.description = description;
            })
        } catch {
        } finally {
            store.toggleLoading(false);
        }
    }
}

const productsStore = new ProductsStore();
export default productsStore;