import { fromObject, Observable } from '@nativescript/core'

import { RuanganService } from '../shared/ruangan-service'
import { roundingValueConverter } from './roundingValueConverter'
import { visibilityValueConverter } from './visibilityValueConverter'


export function RuanganDetailEditViewModel(ruanganModel) {
  const viewModel = fromObject({
    ruangan: fromObject(ruanganModel),

    isUpdating: false,

    roundingValueConverter: roundingValueConverter,
    visibilityValueConverter: visibilityValueConverter,

    _ruanganService: RuanganService.getInstance(),

    saveChanges: function () {
      let queue = Promise.resolve()

      this.set('isUpdating', true)

      return queue
        .then(() => this._ruanganService.update(this.ruangan, ruanganModel))
        .then(() => this.set('isUpdating', false))
        .catch((errorMessage) => {
          this.set('isUpdating', false)
          throw errorMessage
        })
    },

  })

  viewModel.ruangan.addEventListener(
    Observable.propertyChangeEvent,
    (propertyChangeData) => {
      const propertyName = propertyChangeData.propertyName
      if (propertyName === 'nama') {
        // update dependent property
        viewModel.ruangan.set('isModelValid', !!viewModel.ruangan.nama)
      }
    }
  )

  return viewModel
}

