import { fromObject } from '@nativescript/core'

export function ruanganDetailViewModel(ruanganModel) {
  const viewModel = fromObject({
    ruangan: ruanganModel,
  })

  return viewModel
}
