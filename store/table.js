export const state = () => ({
    data: [],
    filteredData: [],
    search: "",
    pagination: {
        currentPage: 1,
        limit: 25,
        totalPages: 0,
    }
});

export const mutations = {
    setData(state, data) {
        state.data = data;
    },
    setFilteredData(state, data) {
        state.filteredData = data;
    },
    setTotalPages(state, pages) {
        state.pagination.totalPages = pages;
    },
    setCurentPage(state, page) {
        state.pagination.currentPage = page;
    },
    setSearch(state, value) {
        state.search = value;
    },
    setLimit(state, limit) {
        state.pagination.limit = limit;
    }
}

export const actions = {
    getFilteredData({commit, getters, dispatch}) {
        const from = (getters.pagination.currentPage - 1) * getters.pagination.limit;
        const to = getters.pagination.currentPage * getters.pagination.limit;
        const data = getters.data.filter(t => t.title.indexOf(getters.search) !== -1).slice(from, to);

        commit("setFilteredData", data);
        dispatch("getCountOfPages");
    },
    getCountOfPages({getters, commit}) {
        const limit = getters.pagination.limit;
        const filteredArray = getters.data.filter(t => t.title.indexOf(getters.search) !== -1);
        const totalPages = Math.ceil(filteredArray.length / limit) || 1;
        
        commit("setTotalPages", totalPages);
    }
}

export const getters = {
    data: state => state.data,
    pagination: state => state.pagination,
    filteredData: state => state.filteredData,
    search: state => state.search
}