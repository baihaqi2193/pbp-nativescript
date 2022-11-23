import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { Ruangan } from './ruangan-model'
import ApiService  from "~/services/api.service";

const editableProperties = [
  'nomor',
  'nama',
  'kapasitas'
]

export function RuanganService() {
  if (RuanganService._instance) {
    throw new Error('Use RuanganService.getInstance() instead of new.')
  }

  this._ruangan = []
  this._subscriptionMap = new Map()
  RuanganService._instance = this

  this.getSubscription = function (key) {
    return this._subscriptionMap.get(key)
  }

  this.setSubscription = function (key, value) {
    this._subscriptionMap.set(key, value)
  }

  this.load = function () {
    return new Observable((observer) => {
      const path = 'ruangan'
      const onValueEvent = (snapshot) => {
        const results = this._handleSnapshot(snapshot)
        observer.next(results)
      }

      ApiService.addValueEventListener(onValueEvent, `/${path}`)
    }).pipe(catchError(this._handleErrors))
  }

  this.update = function (ruanganModel) {
    const updateModel = cloneUpdateModel(ruanganModel)

    return ApiService.update(`/ruangan/${ruanganModel.id}`, updateModel)
  }

  this.uploadImage = function (remoteFullPath, localFullPath) {
    return ApiService.uploadFile({
      localFullPath,
      remoteFullPath,
      onProgress: null,
    })
  }

  this._handleSnapshot = function (data) {
    this._ruangan = []

    if (data) {
      for (const id in data) {
        if (data.hasOwnProperty(id)) {
          this._ruangan.push(new Ruangan(data[id]))
        }
      }
    }

    return this._ruangan
  }

  this._handleErrors = function (error) {
    return throwError(error)
  }
}

RuanganService.getInstance = function () {
  return RuanganService._instance
}

RuanganService._instance = new RuanganService()

function cloneUpdateModel(ruangan) {
  return editableProperties.reduce((a, e) => ((a[e] = ruangan[e]), a), {}) // eslint-disable-line no-return-assign, no-sequences
}
