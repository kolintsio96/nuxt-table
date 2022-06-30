<template>
  <div class="app">
    <Table :columns="columns" :data="todos" :limit="25" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  validate({query, redirect, store}) {
    const page = query.page;
    if(page && !+page) {
      store.commit("table/setCurentPage", 1)
      redirect({ path: '/'});
    }
    return true;
  },
  async fetch({store, route}) {
    if(store.getters["main/todos"].length === 0) {
      await store.dispatch("main/getTodos");
    }
  },
  computed: {
    todos() {
      return this.$store.getters["main/todos"].map(t => ({...t, completed: t.completed ? "Completed": "New"}));
    },
   columns() {
      return this.$store.getters["main/columns"];
    }
  }
}
</script>