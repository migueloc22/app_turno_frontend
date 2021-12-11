import Vue from "vue"
import Vuex from "vuex"
import Axios from "axios"
// import { error } from 'util'
Vue.use(Vuex, Axios)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    urlApi: 'http://localhost:8000/',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    },
    data_document_type: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    get_document_type(state, dato) {
      state.data_document_type = dato
    }
  },
  actions: {
    ServicioDocumenType({ commit }) {
      Axios.get(`${this.state.urlApi}document_type`, { headers: this.state.headers })
        .then(res => {
          let dato = res.data;
          commit('get_document_type', dato);
        })
        .catch(error => {
          console.log(error);
        })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    PostUser({ commit }, params) {
      Axios.post(`${this.state.urlApi}users`, params, { headers: this.state.headers })
        .then(res => {
          console.log(res);
          commit()
        })
        .catch(error => { console.log(error) });
    },
    PostLogin({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios.post(`${this.state.urlApi}login`, params, { headers: this.state.headers })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('user_name', user.name)
            localStorage.setItem('user_type', user.fk_id_user_type)
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
