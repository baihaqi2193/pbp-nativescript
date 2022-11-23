import db from "./ruangan-export-public.json"

class ApiService {
  constructor() {
    this.db = db;
  }

  update(path, updateModel) {
    const nomor = path.split("/").slice(-1)[0];
    this.db.ruangan[nomor] = {...this.db.ruangan[nomor], ...updateModel }
  }

  addValueEventListener(onValueEvent, path) {
    onValueEvent(this.db.ruangan)
    return {
      path: path,
      listeners: this.db.ruangan
    }

  }
}

export default new ApiService;
