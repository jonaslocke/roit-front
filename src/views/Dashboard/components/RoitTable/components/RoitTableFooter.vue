<template>
  <div class="roit-table-footer d-flex align-center mt-5">
    <v-card width="76" elevation="0">
      <v-select
        :items="items"
        outlined
        hide-details
        dense
        :menu-props="{ offsetY: true }"
        v-model="values"
        class="caption"
        height="20"
        @change="onChange"
      ></v-select>
    </v-card>
    <div class="caption ml-4 grey--text">
      Exibindo {{ showing.first }} - {{ showing.last }} de {{ 23 }} Registros
    </div>
    <v-spacer></v-spacer>
    <v-btn icon @click="previousPage()">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn icon @click="nextPage()">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    {{ currentPage }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RoitTableFooter",
  data: () => {
    return {
      values: "",
      items: [5, 10, 15, 20],
    };
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      pageSize: "getPageSize",
      pageCount: "getPageCount",
    }),
    showing() {
      const first = this.currentPage * this.pageSize + 1;
      return {
        first,
        last: first + this.pageSize - 1,
      };
    },
  },
  methods: {
    ...mapActions(["setCurrentPage", "setPageSize"]),
    nextPage() {
      if (this.currentPage < this.pageCount - 1) {
        this.setCurrentPage(this.currentPage + 1);
      }
    },
    previousPage() {
      if (this.currentPage != 0) {
        this.setCurrentPage(this.currentPage - 1);
      }
    },
    onChange(value) {
      console.log(value);
      this.setPageSize(value);
    },
  },
};
</script>

<style>
</style>