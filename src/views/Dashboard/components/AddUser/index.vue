<template>
  <div class="add-user">
    <v-btn color="primary" class="roit-btn px-5" @click="dialog = !dialog">
      Cadastrar
    </v-btn>
    <v-dialog :value="dialog" persistent max-width="680">
      <v-card>
        <v-card-title class="pt-5 pb-0">
          <div class="flex-1">
            <div class="poppins d-flex justify-space-between pb-3">
              <span>Adicionar</span>
              <v-btn icon small @click="dialog = !dialog">
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
                  label="ID"
                  placeholder="Digite um ID"
                  outlined
                  dense
                  hide-details
                  class="caption"
                  v-model="userData.id"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Nome"
                  placeholder="Digite um nome"
                  outlined
                  dense
                  hide-details
                  class="caption"
                  v-model="userData.name"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Idade"
                  placeholder="0"
                  outlined
                  dense
                  class="caption"
                  hide-details
                  type="number"
                  v-model="userData.age"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="GitHub User"
                  placeholder="Usuário do GitHub"
                  outlined
                  dense
                  class="caption"
                  :class="{ 'valid-check': gitIsValid }"
                  hide-details
                  v-model="userData.login"
                  @change="checkGit"
                  :loading="loading.git"
                  :disabled="loading.git"
                  :append-icon="gitIsValid ? 'mdi-check-circle' : null"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  label="CEP"
                  placeholder="00.000-00"
                  outlined
                  dense
                  class="cep caption"
                  @input="checkCep"
                  v-model="userData.cep"
                  :disabled="loading.cep"
                  :loading="loading.cep"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  :items="states"
                  label="Estado"
                  outlined
                  dense
                  class="caption"
                  hide-details
                  :menu-props="{ offsetY: true }"
                  :disabled="!cepIsValid"
                  v-model="userData.uf"
                  :rules="rules.required"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="cities"
                  label="Cidade"
                  outlined
                  dense
                  class="caption"
                  hide-details
                  :menu-props="{ offsetY: true }"
                  :disabled="!cepIsValid"
                  v-model="userData.localidade"
                  :rules="rules.required"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="neighbourhoods"
                  label="Bairro"
                  outlined
                  dense
                  class="caption"
                  hide-details
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
                  label="Rua"
                  placeholder="Jardinete Juventina"
                  outlined
                  dense
                  class="caption"
                  hide-details
                  :disabled="!cepIsValid"
                  v-model="userData.logradouro"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Número"
                  placeholder="---"
                  outlined
                  dense
                  class="caption"
                  hide-details
                  :disabled="!cepIsValid"
                  v-model="userData.numero"
                  :rules="rules.required"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="Complemento"
                  placeholder="Ex. Casa 01, Ap 20 / Bl 01..."
                  outlined
                  dense
                  class="caption"
                  hide-details
                  :disabled="!cepIsValid"
                  v-model="userData.complemento"
                ></v-text-field>
              </v-col>
            </v-row>
            <input type="submit" hidden id="submit" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
            :class="{ disabled: !valid }"
          >
            Cadastrar
          </label>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UserData from "@/models/UserData";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AddUser",
  data: () => {
    return {
      dialog: false,
      valid: false,
      states: ["BA", "SP"],
      cities: ["Salvador", "São Paulo"],
      neighbourhoods: ["Pituaçu", "Higiénopolis"],
      cepIsValid: false,
      gitIsValid: false,
      userData: new UserData({ id: uuidv4() }),
      rules: {
        required: [(v) => !!v || "Campo requerido"],
      },
      viaCepData: {},
      gitData: {},
      loading: {
        git: false,
        cep: false,
        add: false,
      },
    };
  },
  methods: {
    async addUser() {
      const api = `${process.env.VUE_APP_API}`;
      const body = { ...this.userData };
      delete body.id;

      await fetch(api, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
    },
    async checkCep(cep) {
      if (cep.match(/\d{8}/)) {
        this.loading.cep = true;
        const api = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(api);
        const json = await response.json();
        const { erro } = json;
        if (erro) {
          console.error(erro);
          this.loading.cep = false;
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
    async checkGit(user) {
      this.loading.git = true;
      const api = `https://api.github.com/users/${user}`;

      const response = await fetch(api);
      const { status } = response;

      if (status === 200) {
        const data = await response.json();
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
      }
    },
    refreshData() {
      this.userData = new UserData({ id: uuidv4() });
    },
  },
  computed: {
    formIsValid() {
      return Object.entries(this.userData).filter((key, value) => {
        return { key, value };
      });
    },
  },
};
</script>
