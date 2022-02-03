<template>
  <v-card class="table mt-5" elevation="0" max-width="100%">
    <v-data-table :items="users" :headers="headers" class="table__data">
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
    </v-data-table>
  </v-card>
</template>

<script>
require("dotenv").config();
export default {
  name: "RoitTable",
  data: () => {
    return {
      exclisionHeaders: ["__v"],
      users: [],
    };
  },
  computed: {
    headers() {
      return ["_id", "name", "age", "git_hub", "fullAddress"].map((d) => {
        return { text: d, value: d, filterable: true };
      });
    },
  },
  methods: {
    async fetchUsers() {
      const api = `${process.env.VUE_APP_API}`;
      const response = await fetch(api);
      const data = await response.json();
      return data;
    },
    getFullAddress: ({ street, city, uf, others_cep }) =>
      `${street} - ${others_cep} - ${city}/${uf}`,
  },

  async mounted() {
    this.users = await this.fetchUsers();
  },
};
</script>

<style lang="scss">
.table {
  &__data {
    border: 1px solid var(--border);
    thead {
      background-color: #f2f3f5;
      tr {
        th {
          font-size: 100px;
        }
      }
    }
  }
}
</style>