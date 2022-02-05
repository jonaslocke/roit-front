<template>
  <div class="roit-table-footer d-flex align-center mt-5">
    <v-card width="76" elevation="0">
      <v-select
        :items="items"
        outlined
        hide-details
        dense
        :menu-props="{ offsetY: true }"
        class="caption"
        height="20"
        @change="onChange"
      ></v-select>
    </v-card>
    <div class="caption ml-4 grey--text">
      Exibindo {{ showing.first }} - {{ showing.last }} de
      {{ totalUsers }} Registros
    </div>
    <v-spacer></v-spacer>
    <roit-footer-selectors :callback="currentPage != 0 ? previousPage : null">
      <v-icon>mdi-chevron-left</v-icon>
    </roit-footer-selectors>
    <div class="multiple-selectors d-flex" v-if="pageCount > 1">
      <div
        @click="setCurrentPage(page - 1)"
        v-for="page in pageCount"
        :key="page"
      >
        <roit-footer-selectors
          color="#ffffff"
          :active="page === currentPage + 1"
        >
          {{ page }}
        </roit-footer-selectors>
      </div>
    </div>
    <roit-footer-selectors
      :callback="currentPage < pageCount - 1 ? nextPage : null"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </roit-footer-selectors>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoitFooterSelectors from "./components/RoitFooterSelectors.vue";

export default {
  components: { RoitFooterSelectors },
  name: "RoitTableFooter",
  data: () => {
    return {
      items: [5, 10, 15, 20],
    };
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      pageSize: "getPageSize",
      pageCount: "getPageCount",
      totalUsers: "getTotalUsers",
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
      this.setPageSize(value);
    },
  },
};
</script>

<style>
</style>