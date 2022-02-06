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
              <span v-if="head.value != 'actions'">
                <span>{{ head.text }}</span>
                <v-icon small class="ml-1">mdi-filter-outline</v-icon>
              </span>
            </th>
          </tr>
        </thead>
      </template>
      <template #[`item.fullAddress`]="{ item }">
        {{ getFullAddress(item) }}
      </template>
      <template #[`item.age`]="{ value }"> {{ value }} anos </template>
      <template #[`item.actions`]="{ item }">
        <div class="actions d-flex justify-end">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                class="actions__detail"
                small
              >
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </template>
            <span>Visualizar detalhe</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                class="actions__delete"
                small
                @click="handleDelete(item)"
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Deletar</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <roit-table-footer />
    <delete-user :open.sync="dialog.delete" :selected="selected" />
  </v-card>
</template>

<script>
import { tableHeadersTranslation } from "@/models";
import { mapActions, mapGetters } from "vuex";
import RoitTableFooter from "./components/RoitTableFooter";
import DeleteUser from "./components/DeleteUser.vue";

require("dotenv").config();
export default {
  components: { RoitTableFooter, DeleteUser },
  name: "RoitTable",
  data: () => {
    return {
      loading: true,
      selected: null,
      dialog: {
        delete: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      currentPage: "getCurrentPage",
      pageSize: "getPageSize",
      users: "getUsers",
    }),
    headers() {
      return ["_id", "name", "age", "git_hub", "fullAddress", "actions"].map(
        (d) => {
          return {
            text: tableHeadersTranslation[d],
            value: d,
            filterable: true,
          };
        }
      );
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

    handleDelete({ _id }) {
      this.selected = _id;
      this.dialog.delete = true;
    },
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
    .actions {
      opacity: 0;
      transition: 0.12s ease-in-out;
      &__delete {
        &:hover {
          color: var(--error);
        }
      }
      &__detail {
        &:hover {
          color: var(--secondary);
        }
      }
    }
    tr {
      &:hover {
        .actions {
          opacity: 1;
        }
      }
    }
  }
}
</style>