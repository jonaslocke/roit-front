export default class UserData {
  constructor({
    id,
    name,
    age,
    logradouro,
    numero,
    cep,
    localidade,
    bairro,
    uf,
    ibge,
    complemento,
    outrosCep,
    login,
    gitId,
    avatar_url,
    html_url,
    repos,
    othersGit,
  }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.logradouro = logradouro;
    this.numero = numero;
    this.cep = cep;
    this.localidade = localidade;
    this.bairro = bairro;
    this.uf = uf;
    this.ibge = ibge;
    this.complemento = complemento;
    this.outrosCep = outrosCep;
    this.login = login;
    this.gitId = gitId;
    this.avatar_url = avatar_url;
    this.html_url = html_url;
    this.repos = repos;
    this.othersGit = othersGit;
  }

  update(data) {
    Object.keys(data).forEach((key) => (this[key] = data[key]));
  }
  clear() {
    Object.keys(this)
      .filter((key) => key != "id")
      .forEach((key) => (this[key] = ""));
  }
}
