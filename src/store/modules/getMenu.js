import Vue from 'vue'

import {
    GET_MENU
} from '@/store/mutation-types'



const getmenus = {
    state: {
        menu: '',
    },

    mutations: {
        SAVE_MENU: (state, menu) => {
            Vue.ls.set('GET_MENU', menu)
            state.menu = menu
        },
    },

    actions: {
        SaveMenu({ commit }, menu) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('SAVE_MENU', menu);
                    resolve('success')
                }, 500)
            })
        },
    }
}

export default getmenus