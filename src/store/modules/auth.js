import axios from "@/axios";
import cookie from "@point-hub/vue-cookie";

const state = {
  authUser: {
    username: null,
    email: null
  },
  activeGroup: {},
  groups: []
};

const getters = {
  authUser: state => {
    return state.authUser;
  },
  activeGroup: state => {
    return state.activeGroup;
  },
  groups: state => {
    return state.groups;
  }
};

const mutations = {
  authUser(state, authUser) {
    state.authUser = authUser;
  },
  activeGroup(state, activeGroup) {
    state.activeGroup = activeGroup;
  },
  groups(state, groups) {
    state.groups = groups;
  }
};

const actions = {
  async login({ dispatch }, payload) {
    try {
      const result = await axios.post("/auth/login", {
        email: payload.email,
        password: payload.password
      });
      if (result.status === 200) {
        cookie.set("token", result.data.data.token);
        dispatch("updateAuthUser", result.data.data);
        dispatch("updateUserGroups", result.data.includes.groups);
        dispatch("updateDefaultActiveGroup", result.data.includes.groups);
      }
      return result;
    } catch (error) {
      return error;
    }
  },
  async loginUsingToken({ dispatch }) {
    try {
      const result = await axios.get("/auth/secret");
      if (result.status === 200) {
        dispatch("updateAuthUser", result.data.data);
        dispatch("updateUserGroups", result.data.includes.groups);
        dispatch("updateDefaultActiveGroup", result.data.includes.groups);
      }
      return result;
    } catch (error) {
      return error;
    }
  },
  logout() {
    //
  },
  updateAuthUser({ commit }, payload) {
    commit("authUser", payload);
  },
  updateUserGroups({ commit }, payload) {
    commit("groups", payload);
  },
  updateActiveGroup({ commit }, group) {
    commit("activeGroup", group);
  },
  updateDefaultActiveGroup({ commit }, payload) {
    if (cookie.get("activeGroupId") && getActiveGroup(payload) !== undefined) {
      const group = getActiveGroup(payload);
      commit("activeGroup", group);
    } else {
      const group = getRandomActiveGroup(payload);
      commit("activeGroup", group);
    }
  }
};

function getActiveGroup(groups) {
  for (let i = 0; i < groups.length; i++) {
    if (
      groups[i]._id === cookie.get("activeGroupId") &&
      groups[i].userStatus === "active"
    ) {
      return groups[i];
    }
  }

  return;
}

function getRandomActiveGroup(groups) {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].userStatus === "active") {
      return groups[i];
    }
  }

  return;
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
