<template>
  <div class="container">
    <table class="table">
      <thead  class="table__head">
        <tr class="table__row">
          <th v-for="column in columns" :key="column.id" class="table__cell">{{ column.title }}</th>
        </tr>
        <tr v-if="showSearchRow" class="table__row">
          <th v-for="column in columns" :key="column.id" class="table__cell"><input v-if="column.search" :name="column.name" :placeholder="`Enter ${column.name}`" v-on:input="filterData" class="table__search" /></th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="data in filteredData" :key="data.id" class="table__row">
          <td v-for="column in columns" :key="column.id" class="table__cell">{{ data[column.name] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <nuxt-link v-for="page in pages" :key="page" :to="{ path: '/', query: { page }}" :class="{'active': page == 1 && mainPage}" class="pagination__link">{{ page }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    limit: {
      type: Number,
      default: 25
    }
  },
  watch: {
    async $route() {
      const page = this.$route.query.page || 1;
      this.$store.commit("table/setCurentPage", page);
      this.$store.dispatch("table/getFilteredData");
    }
  },
  computed: {
    filteredData() {
      return this.$store.getters["table/filteredData"];
    },
    pages() {
      return this.$store.getters["table/pagination"].totalPages;
    },
    mainPage() {
      return !this.$route.query.page;
    },
    showSearchRow() {
      return this.columns.filter(col => col.search).length > 0;
    }
  },
  methods: {
    filterData(e) {
      const value = e.target.value;
      const page = +this.$route.query.page;
        if(!!page && page > 1) {
          this.$store.commit("table/setCurentPage", 1);
          this.$router.push({ path: '/'});
        }
        this.$store.commit("table/setSearch", value);
        this.$store.dispatch("table/getFilteredData");
    }
  },
  created() {
    const page = this.$route.query.page || 1;
    this.$store.commit("table/setData", this.data);
    this.$store.commit("table/setLimit", this.limit);
    this.$store.commit("table/setCurentPage", page);
    this.$store.dispatch("table/getFilteredData");
  }
}
</script>
<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .table {
    border: 1px solid #000;
    margin: 0 auto;
    $table: &;
    &__body {
      #{$table}__row {
        &:first-child {
          #{$table}__cell {
            border-top: 1px solid #000;
          }
        }
      }
    }
    &__row {
      &:not(:last-child) {
        #{$table}__cell {
          border-bottom: 1px solid #000;
        }
      }
    }
    &__cell {
      padding: 5px 10px;
      &:not(:last-child) {
        border-right: 1px solid #000;
      }
    }
    &__search {
      width: 100%;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    &__link {
      display: block;
      border-radius: 3px;
      padding: 5px 10px;
      background-color: #bebeff;
      text-decoration: none;
      color: black;
      border: 1px solid transparent;
      transition: background-color .3s, border .3s;
      &.nuxt-link-exact-active, &.active {
        border-color: #bebeff;
        background-color: transparent;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>