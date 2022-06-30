export const state = () => ({
    todos: [],
    columns: [
        {
            id:1,
            title: "ID",
            search: false,
            name: "id"
        },
        {
            id:2,
            title: "Title",
            search: true,
            name: "title"
        },
        {
            id:3,
            title: "User ID",
            search: false,
            name: "userId"
        },
        {
            id:4,
            title: "Status",
            search: false,
            name: "completed"
        },
    ]
});

export const mutations = {
    setTodos(state, todos) {
        state.todos = todos;
    }
}

export const actions = {
    async getTodos({ commit }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const todos = await response.json() || [];
            
            commit("setTodos", todos);
        } catch(e) {
            commit("setTodos", []);
        }
    }
}

export const getters = {
    todos: state => state.todos,
    columns: state => state.columns
}