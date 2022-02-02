<template>
  <v-card elevation="0" width="72" class="ml-4">
    <v-select
      :items="items"
      label="field"
      solo
      hide-details
      dense
      :menu-props="{ offsetY: true }"
      v-model="selectedLang"
    >
      <template #label>
        <v-img src="@/assets/images/brazil.svg" />
      </template>
      <template #append>
        <v-img src="@/assets/images/chevron-down-a.svg" />
      </template>
      <template #selection>
        <v-img v-if="selectedLang === 'es_ES'" src="@/assets/images/spain.png"></v-img>
        <v-img v-if="selectedLang === 'pt_BR'" src="@/assets/images/brazil.svg"></v-img>
        <v-img v-if="selectedLang === 'en_US'" src="@/assets/images/usa.png"></v-img>
      </template>
    </v-select>
  </v-card>
</template>

<script>
import { languages } from "@/models";

export default {
  name: "LangSelection",
  data: () => {
    return {
      items: languages.map((lang) => {
        return {
          text: lang.languageString,
          value: lang.forLetterCode,
        };
      }),
      selectedLang: "",
    };
  },
};
</script>

<style>
</style>