export default class Snackbar {
  constructor({
    open = false,
    color = "error",
    text = undefined,
    timeout = 3000,
  }) {
    this.open = open;
    this.color = color;
    this.text = text;
    this.timeout = timeout;
  }
}
