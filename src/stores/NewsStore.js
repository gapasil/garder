import { action, makeObservable, observable, runInAction } from "mobx";
import API from "../services/api";
import store from "./index";

class NewsStore {
    constructor() {
        makeObservable(this, {
            blog: observable,
            topNews: observable,
            _otherNews: observable,
            allNews: observable,
            currentPage: observable,
            countOfPages: observable,
            getOtherNews: action,
            getNews: action,
        })
    }

    blog = [];
    currentPage = 1;
    countOfPages = 0;
    topNews = {};
    _otherNews = [];
    allNews = [];

    getOtherNews = (id) => {
        const news = [
            ...this._otherNews.slice(0, id),
            ...this._otherNews.slice(id),
        ];
        return news.slice(0, 5);
    }

    getNews = async (page = 1) => {
        try {
            store.toggleLoading(true);
            const {
                data: {blog: {publications, countOfPages, currentPage}}
            } = await API.get('blog', {
                params: {
                    page: page
                }
            });
            runInAction(() => {
                this.allNews = publications;
                this.blog = publications.slice(1);
                this.currentPage = currentPage;
                this.countOfPages = countOfPages;
                this.topNews = publications.slice(0, 1)[0];
                this._otherNews = publications;
            })
        } catch {
        } finally {
            store.toggleLoading(false);
        }
    }

}

const newsStore = new NewsStore();

export default newsStore;