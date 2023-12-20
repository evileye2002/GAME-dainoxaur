export default class Process {
  constructor(key, defaultSave = {}) {
    this.key = key;
    this.defaultSave = defaultSave;
    this.setSaveFile();
  }
  save(data) {
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }

  getSaveFile() {
    const saveFile = window.localStorage.getItem(this.key);
    return saveFile ? JSON.parse(saveFile) : null;
  }

  setSaveFile() {
    if (
      this.getSaveFile() === null ||
      this.getSaveFile().version !== this.defaultSave.version
    ) {
      this.save(this.defaultSave);
    }
  }
}
