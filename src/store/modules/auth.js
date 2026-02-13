import axios from "@/axios";
import cookie from "@point-hub/vue-cookie";
import { getTokenExpiryTimestamp, isTokenExpired } from "@/lib/token";

function clearAuthCookies() {
  cookie.remove("token");
  cookie.remove("tokenExpiry");
  cookie.remove("activeGroupId");
}

function setTokenCookies(token) {
  cookie.set("token", token);

  const tokenExpiry =
    getTokenExpiryTimestamp(token) || Date.now() + 12 * 60 * 60 * 1000;
  cookie.set("tokenExpiry", tokenExpiry.toString());
}

const state = {
  authUser: {
    username: null,
    email: null
  },
  activeGroup: {},
  groups: [],
  isAuthenticated: false
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
  },
  isAuthenticated: state => {
    return state.isAuthenticated;
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
  },
  isAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  }
};

const actions = {
  async login({ dispatch, commit }, payload) {
    try {
      const result = await axios.post("/auth/login", {
        email: payload.email,
        password: payload.password
      });
      if (result.status === 200) {
        const token = result.data.data.token;
        setTokenCookies(token);

        commit("isAuthenticated", true);
        dispatch("updateAuthUser", result.data.data);
        dispatch("updateUserGroups", result.data.includes.groups);
        dispatch("updateDefaultActiveGroup", result.data.includes.groups);
      }
      return result;
    } catch (error) {
      return error;
    }
  },
  async loginUsingToken({ dispatch, commit }) {
    try {
      // Check if token exists
      const token = cookie.get("token");
      if (!token) {
        commit("isAuthenticated", false);
        throw new Error("No token found");
      }

      // Always prioritize token exp claim from backend.
      const tokenExpiryFromToken = getTokenExpiryTimestamp(token);
      if (tokenExpiryFromToken) {
        cookie.set("tokenExpiry", tokenExpiryFromToken.toString());
      }

      const tokenExpiry =
        tokenExpiryFromToken || parseInt(cookie.get("tokenExpiry"), 10);

      if (isTokenExpired(token) || (tokenExpiry && Date.now() >= tokenExpiry)) {
        clearAuthCookies();
        commit("isAuthenticated", false);
        throw new Error("Token expired");
      }

      const result = await axios.get("/auth/secret");
      if (result.status === 200) {
        commit("isAuthenticated", true);
        dispatch("updateAuthUser", result.data.data);
        dispatch("updateUserGroups", result.data.includes.groups);
        dispatch("updateDefaultActiveGroup", result.data.includes.groups);
      }
      return result;
    } catch (error) {
      commit("isAuthenticated", false);
      clearAuthCookies();
      throw error;
    }
  },
  logout({ commit }) {
    clearAuthCookies();
    commit("isAuthenticated", false);
    commit("authUser", { username: null, email: null });
    commit("activeGroup", {});
    commit("groups", []);
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
