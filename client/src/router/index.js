import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/view/GoodsList'
import Cart from '@/view/Cart'
import Address from '@/view/Address'
import OrderConfirm from '@/view/OrderConfirm'
import OrderSuccess from '@/view/OrderSuccess'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: GoodsList
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/orderConfirm',
            name: 'orderConfirm',
            component: OrderConfirm
        },
        {
            path: '/address',
            name: 'address',
            component: Address
        },
        {
            path: '/orderSuccess',
            name: 'orderSuccess',
            component: OrderSuccess
        }

    ]
})