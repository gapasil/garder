import { action, computed, makeObservable, observable, runInAction } from "mobx";
import API from "../services/api";
import store from "./index";

class OrdersStore {
    constructor() {
        makeObservable(this, {
            _orders: observable,
            pages: observable,
            orders: computed,
            getOrders: action,
        })
    }

    _orders = [];
    pages = 1;
    currentPage = 1;

    get orders() {
        return this._orders;
    }

    getOrders = async (status = 'active', page = 1) => {
       try {
           store.toggleLoading(true);
           const {data} = await API.get('orders', {
               params: {
                   page,
                   status,
               }
           });
           runInAction(() => {
               this._orders = data.orders === null ? [] : data.orders;
               this.pages = data.countOfPages;
               this.currentPage = data.currentPage;
           })
       }catch{

       }
       finally {
           store.toggleLoading(false);
       }
    }
}

const ordersStore = new OrdersStore();

export default ordersStore;