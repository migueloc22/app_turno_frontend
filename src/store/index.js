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
    headers_auth: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data_document_type: [],
    data_mechanical: [],
    data_turn_type: [],
    data_agenda: [],
    service_detail: {},
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
    },
    get_mechanical(state, dato) {
      state.data_mechanical = dato
    },
    get_turn_type(state, dato) {
      state.data_turn_type = dato
    },
    get_agenda(state, dato) {
      state.data_agenda = dato
    },
    get_service_detail(state, dato) {
      state.service_detail = dato
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
    Get_mechanical({ commit }) {
      Axios.get(`${this.state.urlApi}users_mechanical`, { headers: this.state.headers })
        .then(res => {
          let dato = res.data;
          commit('get_mechanical', dato);
        })
        .catch(error => {
          console.log(error);
        })
    },
    Get_turns_list({ commit }, params) {
      Axios.get(`${this.state.urlApi}turns_list/${params.id}/${params.date}`, { headers: this.state.headers })
        .then(res => {
          let dato = res.data;
          commit('get_agenda', dato);
        })
        .catch(error => {
          console.log(error);
        })
    },
    Get_turns_agenda({ commit }, params) {
      Axios.get(`${this.state.urlApi}turns_agenda/${params.id}/${params.date}`, { headers: this.state.headers })
        .then(res => {
          let dato = res.data;
          commit('get_agenda', dato);
        })
        .catch(error => {
          console.log(error);
        })
    },
    Get_turn_type({ commit }) {
      Axios.get(`${this.state.urlApi}turn_type`, { headers: this.state.headers })
        .then(res => {
          let dato = res.data;
          commit('get_turn_type', dato);
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
    PostTurn({ commit }, params) {
      return new Promise((resolve, reject) => {
        Axios.post(`${this.state.urlApi}turns`, params, { headers: this.state.headers })
          .then(res => {
            console.log(res);
            resolve(resolve)
            commit()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          });
      })

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
            localStorage.setItem('user_id', user.id)
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
