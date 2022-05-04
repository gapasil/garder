import { observable, action, toJS, makeObservable, computed, runInAction } from 'mobx';
import API from "../services/api";
// import i18n from './i18n';
// import momentjs from './moment';

class Index {
    constructor() {
        makeObservable(this, {
            _user: observable,
            _cities: observable,
            _categories: observable,
            language: observable,
            itemsInCart: observable,
            loading: observable,
            resetForm: observable,
            toggleLoading: action.bound,
            resetAuth: action,
            setUser: action,
            _initUser: action,
            setCities: action,
            setCategories: action,
            init: action,
            changeLanguage: action,
            changeLang: action,
            setResetForm: action,
            user: computed,
            cities: computed,
            categories: computed,
        })
    }

    _user = {};
    _cities = {};
    _categories = [];
    language = 'ru';
    itemsInCart = 0;

    resetForm = {
        email: null,
        newPassword: null,
    }


    get cities() {
        return this._cities;
    }

    get user() {
        return this._user;
    }

    get categories() {
        return this._categories;
    }

    loading = false;
    isLogged = false;

    toggleLoading(loading) {
        this.loading = this.loading === null && loading === false ? null : loading;
    }

    setUser(user = {}) {
        runInAction(() => {
            this._user = {...this._user, ...user};
            this.itemsInCart = user.itemsInCart;
        })
        localStorage.setItem('user', JSON.stringify(toJS(this._user)));
    }

    setItemsInCart = (count) => {
        this.itemsInCart = count;
    }

    _initUser = async () => {
        try {

            const {data: {user, currentCity, favorites, itemsInCart}} = await API.get('user');
            store.setUser({...user, currentCity, favorites, itemsInCart});

            // let {language, user, refresh_token} = localStorage;
            // user = JSON.parse(user || '{}');
            //
            // store.init({
            //     language,
            //     refresh_token,
            //     user,
            // });

        } catch (error) {

        } finally {
        }
    };


    async setCities() {
        const {data: {citiesList}} = await API.get('cities/');
        const cities = citiesList.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});
        runInAction(() => {
            this._cities = {...cities};
        })
    }

    setCategories(categories = []) {
        runInAction(() => {
            this._categories = [...this._categories, ...categories];
        })
    }

    init(data) {
        const {
            language,
            refresh_token,
            user,
        } = data;
        this.refresh_token = refresh_token;
        this.language = language || 'ru';
        this._user = user;
        i18n.changeLanguage(language);
        momentjs.locale(language);
    }

    setResetForm = ({email, newPassword}) => {
        this.resetForm = {email, newPassword};
    }

    changeLanguage(language) {
        language = language || 'ru';
        this.language = language;
        i18n.changeLanguage(language);
        momentjs.locale(language);
        localStorage.setItem('language', language);
    }


    changeLang(lang) {
        lang = this.language === 'ru' ? 'kk' : this.language === 'kk' ? 'en' : 'ru';
        this.language = lang;
        i18n.changeLanguage(lang);
        momentjs.locale(lang);
        localStorage.setItem('language', lang);
    }

    resetAuth() {
        localStorage.removeItem('user');

        this._user = {};
    }

}

const store = new Index();

export default store;