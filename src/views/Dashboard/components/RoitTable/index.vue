<template>
  <v-card class="table mt-5" elevation="0" max-width="100%">
    <v-data-table
      :items="filterdUsers"
      :headers="headers"
      class="table__data"
      hide-default-header
      hide-default-footer
      :loading="loading"
      disable-pagination
    >
      <template #header="{ props }">
        <thead class="v-data-table-header">
          <tr>
            <th
              role="columnheader"
              scope="col"
              aria-label="_id: Not sorted. Activate to sort ascending."
              aria-sort="none"
              class="text-start sortable"
              v-for="(head, id) in props.headers"
              :key="id"
            >
              <span>{{ head.text }}</span>
              <v-icon small class="ml-1">mdi-filter-outline</v-icon>
            </th>
          </tr>
        </thead>
      </template>
      <template #[`item.fullAddress`]="{ item }">
        {{ getFullAddress(item) }}
      </template>
      <template #[`item.age`]="{ value }"> {{ value }} anos </template>
    </v-data-table>
    <roit-table-footer />
  </v-card>
</template>

<script>
import { tableHeadersTranslation } from "@/models";
import { mapActions, mapGetters } from "vuex";
import RoitTableFooter from "./components/RoitTableFooter";

require("dotenv").config();
export default {
  components: { RoitTableFooter },
  name: "RoitTable",
  data: () => {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      pageSize: "getPageSize",
      users: "getUsers",
    }),
    headers() {
      return ["_id", "name", "age", "git_hub", "fullAddress"].map((d) => {
        return { text: tableHeadersTranslation[d], value: d, filterable: true };
      });
    },
    filterdUsers() {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["setUsers", "fetchUsers"]),

    getFullAddress: ({ street, city, uf, others_cep }) =>
      `${street} - ${others_cep} - ${city}/${uf}`,
  },

  async mounted() {
    await this.fetchUsers();
    this.loading = false;
  },
};
</script>

<style lang="scss">
.table {
  &__data {
    border: 1px solid var(--border);
    thead {
      background-color: #f2f3f5;
      th {
        span {
          font-size: 14px;
        }
      }
    }
    tbody {
      td {
        font-size: 13px !important;
      }
    }
  }
}
</style>