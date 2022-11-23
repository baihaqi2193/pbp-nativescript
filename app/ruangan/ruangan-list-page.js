import { Frame } from '@nativescript/core'

import { RuanganListViewModel } from './ruangan-list-view-model'
var Sqlite = require("nativescript-sqlite");

export function onNavigatingTo(args) {



  if (args.isBackNavigation) {
    return
  }

  if (!Sqlite.exists("room.db")) {
    Sqlite.copyDatabase("room.db");
  }

  var db_name = "room.db";

  new Sqlite(db_name).then(db => {
    page.bindingContext = createViewModel(db);
  });

  const viewModel = new RuanganListViewModel()
  viewModel.load()




  const page = args.object
  page.bindingContext = viewModel


}

export function onRuanganItemTap(args) {
  const tappedRuanganItem = args.view.bindingContext

  Frame.topmost().navigate({
    moduleName: 'ruangan/ruangan-detail-page/ruangan-detail-page',
    context: tappedRuanganItem,
    animated: true,
    transition: {
      name: 'slide',
      duration: 200,
      curve: 'ease',
    },
  })
}
