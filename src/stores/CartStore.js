import { action, computed, makeObservable, observable, runInAction } from "mobx";
import store from "./index";
import API from "../services/api";

class CartStore {
    constructor() {
        makeObservable(this, {
            _cart : observable,
            _cartCost : observable,
            _cost : observable,
            cartCost : computed,
            cart : computed,
            cost : computed,
            _getCart : action,
        })
    }

    _cart = {}
    _cartCost = 0;
    _cost = 0;

    get cost() {
        return this._cart?.bill?.products;
    }

    get cart() {
        return this._cart;
    }

    get cartCost() {
        return this._cart?.bill?.cityDeliveryCost + this._cart?.bill?.products
    }

    _getCart = async () => {
        try {
            store.toggleLoading(true);
            const { data } = await API.get('cart');
            runInAction(() => {
                this._cart = data;
            })
        } catch {
        } finally {
            store.toggleLoading(false);
        }
    }

}

const cartStore = new CartStore();

export default cartStore;