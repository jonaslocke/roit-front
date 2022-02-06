<template>
  <div class="add-user">
    <v-btn
      color="primary"
      class="roit-btn px-5"
      @click="setHandleUserOpen(true)"
    >
      Cadastrar
    </v-btn>
    <v-dialog :value="open" persistent max-width="680">
      <v-card>
        <v-card-title class="pt-5 pb-0">
          <div class="flex-1">
            <div class="poppins d-flex justify-space-between pb-3">
              <span>Adicionar</span>
              <v-btn icon small @click="setHandleUserOpen(!open)">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
          </div>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form
            @submit.prevent="addUser()"
            class="container-fluid"
            v-model="valid"
          >
            <v-row>
              <v-col cols="4">
                <v-text-field
                  hide-details
                  label="ID"
                  placeholder="Digite um ID"
                  outlined
                  dense
                  class="caption"
                  v-model="userData.id"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  hide-details
                  label="Nome"
                  placeholder="Digite um nome"
                  outlined
                  dense
                  class="caption"
                  v-model="userData.name"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  hide-details
                  label="Idade"
                  placeholder="0"
                  outlined
                  dense
                  class="caption"
                  type="number"
                  v-model="userData.age"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  hide-details
                  label="GitHub User"
                  placeholder="Usuário do GitHub"
                  outlined
                  dense
                  class="caption"
                  :class="{ 'valid-check': gitIsValid }"
                  v-model="userData.login"
                  @change="fetchGit"
                  :loading="loading.git"
                  :disabled="loading.git"
                  :append-icon="
                    gitIsValid
                      ? 'mdi-check-circle'
                      : !!invalidGit
                      ? 'mdi-close-circle'
                      : null
                  "
                  :rules="rules.required"
                  :error="!!invalidGit"
                  :success="gitIsValid"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  hide-details
                  label="CEP"
                  placeholder="00.000-00"
                  outlined
                  dense
                  class="cep caption"
                  @input="fetchCep"
                  v-model="userData.cep"
                  :disabled="loading.cep"
                  :loading="loading.cep"
                  :rules="rules.required"
                  :success="cepIsValid"
                  :error="invalidCep"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  hide-details
                  :items="states"
                  label="Estado"
                  outlined
                  dense
                  class="caption"
                  :menu-props="{ offsetY: true }"
                  :disabled="!cepIsValid"
                  v-model="userData.uf"
                  :rules="rules.required"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  hide-details
                  :items="cities"
                  label="Cidade"
                  outlined
                  dense
                  class="caption"
                  :menu-props="{ offsetY: true }"
                  :disabled="!cepIsValid"
                  v-model="userData.localidade"
                  :rules="rules.required"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  hide-details
                  :items="neighbourhoods"
                  label="Bairro"
                  outlined
                  dense
                  class="caption"
                  :menu-props="{ offsetY: true }"
                  :disabled="!cepIsValid"
                  v-model="userData.bairro"
                  :rules="rules.required"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  hide-details
                  label="Rua"
                  placeholder="Jardinete Juventina"
                  outlined
                  dense
                  class="caption"
                  :disabled="!cepIsValid"
                  v-model="userData.logradouro"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  hide-details
                  label="Número"
                  placeholder="---"
                  outlined
                  dense
                  class="caption"
                  :disabled="!cepIsValid"
                  v-model="userData.numero"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  hide-details
                  label="Complemento"
                  placeholder="Ex. Casa 01, Ap 20 / Bl 01..."
                  outlined
                  dense
                  class="caption"
                  :disabled="!cepIsValid"
                  v-model="userData.complemento"
                ></v-text-field>
              </v-col>
            </v-row>
            <input type="submit" hidden id="submit" />
          </v-form>
          <v-divider class="mt-4"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            class="roit-btn px-5"
            @click="refreshData(false)"
          >
            Cancelar
          </v-btn>
          <label
            for="submit"
            class="
              roit-btn
              px-5
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--default
              primary
              cup
            "
            :class="{ disabled: !valid || loading.add }"
          >
            <span>Salvar</span>
            <v-progress-circular
              indeterminate
              color="white"
              size="16"
              class="ml-2"
              v-if="loading.add"
            ></v-progress-circular>
          </label>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserData from "@/models/UserData";
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HandleUser",
  props: {
    user: {
      type: Object,
    },
  },
  data: () => {
    return {
      valid: false,
      states: ["BA", "SP"],
      cities: ["Salvador", "São Paulo"],
      neighbourhoods: ["Pituaçu", "Higiénopolis"],
      cepIsValid: false,
      gitIsValid: false,
      invalidGit: false,
      invalidCep: false,
      userData: new UserData({ id: uuidv4() }),
      rules: {
        required: [(v) => !!v || "Campo requerido"],
      },
      loading: {
        git: false,
        cep: false,
        add: false,
      },
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "setHandleUserOpen"]),
    async addUser() {
      this.loading.add = true;
      const api = `${process.env.VUE_APP_API}`;
      const body = { ...this.userData };
      delete body.id;

      await fetch(api, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      this.refreshData();
      this.loading.add = false;
    },
    async fetchCep(cep) {
      if (cep.match(/\d{8}/)) {
        this.invalidCep = false;
        this.loading.cep = true;
        const api = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(api);
        const json = await response.json();
        const { erro } = json;
        if (erro) {
          console.error(erro);
          this.loading.cep = false;
          this.invalidCep = true;
        } else {
          this.cepIsValid = true;
          const { logradouro, cep, localidade, uf, ibge, bairro } = json;
          this.userData.update({
            logradouro,
            cep,
            localidade,
            uf,
            ibge,
            bairro,
            outrosCep: JSON.stringify(json),
          });
          this.loading.cep = false;
        }
      }
    },
    async fetchGit(user) {
      this.loading.git = true;
      this.invalidGit = false;
      const api = `https://api.github.com/users/${user}`;

      const response = await fetch(api);
      const data = await response.json();
      const { status } = response;

      if (status === 200) {
        const { login, avatar_url, html_url, name } = data;
        const gitId = data.id.toString();

        this.userData.update({
          login,
          avatar_url,
          html_url,
          gitId,
          name,
          othersGit: JSON.stringify(data),
        });

        const fetchRepos = await fetch(`${api}/repos`);
        if (fetchRepos.status === 200) {
          const fetchReposData = await fetchRepos.json();
          const repos = JSON.stringify(fetchReposData);
          this.userData.update({ repos });
        }

        this.loading.git = false;
        this.gitIsValid = true;
      } else {
        console.error("not found");
        console.log(data);
        this.invalidGit = true;
        this.loading.git = false;
      }
    },
    refreshData(fetch = true) {
      this.userData.clear();

      this.setHandleUserOpen(false);
      this.valid = false;
      this.cepIsValid = false;
      this.gitIsValid = false;
      for (let load in this.loading) {
        this.loading[load] = false;
      }

      if (fetch) {
        this.fetchUsers();
      }
    },
  },
  computed: {
    ...mapGetters({ open: "getHandleUserOpen" }),
  },
};
</script>
