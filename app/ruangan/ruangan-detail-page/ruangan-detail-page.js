import { Frame } from '@nativescript/core'

import { ruanganDetailViewModel } from './ruangan-detail-view-model'

export function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return
  }

  const page = args.object

  page.bindingContext = new ruanganDetailViewModel(page.navigationContext)
}

export function onBackButtonTap() {
  Frame.topmost().goBack()
}

export function onEditButtonTap(args) {
  const bindingContext = args.object.bindingContext

  Frame.topmost().navigate({
    moduleName: 'ruangan/ruangan-detail-edit-page/ruangan-detail-edit-page',
    context: bindingContext.ruangan,
    animated: true,
    transition: {
      name: 'slideTop',
      duration: 200,
      curve: 'ease',
    },
  })
}

