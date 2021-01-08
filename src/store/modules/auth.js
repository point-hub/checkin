const state = {
  user: {
    username: null,
    email: null
  }
};

const getters = {
  user: state => {
    return state.user;
  }
};

const mutations = {
  user(state, user) {
    state.user = user;
  }
};

const actions = {
  updateAuthUser({ commit }, payload) {
    commit("user", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
