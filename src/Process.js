export default class Process {
  constructor(key) {
    this.key = key;
  }
  save(data) {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  getSaveFile() {
    const saveFile = window.localStorage.getItem(this.key);
    return saveFile ? JSON.parse(saveFile) : null;
  }
}
