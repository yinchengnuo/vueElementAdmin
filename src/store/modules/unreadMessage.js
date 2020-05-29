const state = []

const mutations = {
  INIT_ADD: (state, payload) => {
    state.push(payload)
  },
  UNREAD_MESSAGE_NUM_CHANGE: (state, payload) => {
    state[payload.index].num = payload.num
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
