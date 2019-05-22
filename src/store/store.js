import axios from 'axios'
let basePath = `https://alphafx-code-test-api.herokuapp.com/api/`


export const state = {
  loading: false,
  tabActive: 'random',
  teams: [],
  players: [],
  games: [],
}

export const getters = {
  isLoading: (state) => {
    return state.loading
  },
  tabActive: (state) => {
    return state.tabActive
  },
  teams: (state) => {
    return state.teams
  },
  players: (state) => {
    return state.players
  },
  games: (state) => {
    return state.games
  }
}

export const mutations = {
  setLoading (state, value) {
    state.loading = value
  },
  setTabActive (state, value) {
    state.tabActive = value
  },
  setTeams (state, value) {
    state.teams = value
  },
  setPlayers (state, value) {
    state.players = value
  },
  setGames (state, value) {
    state.games = value
  }
}

export const actions = {
  getTeams ({commit}) {
    console.log('calling action getTeams()')
    commit('setLoading', true)
    axios.post(`${basePath}teams`)
      .then(function (response) {
        console.log('response ', response)
        commit('setLoading', false)
        commit('setTeams', response.data.data)
      })
      .catch(function (error) {
        commit('setLoading', false)
      });
  },
  getPlayers ({commit}) {
    console.log('calling action getPlayers()')
    commit('setLoading', true)
    axios.post(`${basePath}teams/players`)
      .then(function (response) {
        console.log('response ', response)
        commit('setLoading', false)
        commit('setPlayers', response.data.data)
      })
      .catch(function (error) {
        commit('setLoading', false)
      });
  },
  getGames ({commit}) {
    console.log('calling action getGames()')
    commit('setLoading', true)
    axios.post(`${basePath}teams/games`)
      .then(function (response) {
        console.log('response ', response)
        commit('setLoading', false)
        commit('setGames', response.data.data)
      })
      .catch(function (error) {
        commit('setLoading', false)
      });
  },
  postGame ({commit}, payload) {
    console.log('calling action postGame()');
    const { date, team_one_id, team_two_id, team_one_goals, team_two_goals } = payload;
    commit('setLoading', true)
    axios.post(`${basePath}teams/games/new`,
    { date, team_one_id, team_two_id, team_one_goals, team_two_goals })
      .then(function (response) {
        console.log('response ', response)
        this.getGames();
      })
      .catch(function (error) {
        commit('setLoading', false)
      });
  }
}
