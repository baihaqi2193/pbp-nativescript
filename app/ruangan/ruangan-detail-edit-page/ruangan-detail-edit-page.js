import { Frame, Dialogs } from '@nativescript/core'

import { RuanganDetailEditViewModel } from './ruangan-detail-edit-view-model'

/* ***********************************************************
 * This is the item detail edit code behind.
 * This code behind gets the selected data item, provides options to edit the item and saves the changes.
 *************************************************************/

/* ***********************************************************
 * Use the "onNavigatingTo" handler to get the data item id parameter passed through navigation.
 * Use it to initialize the view model and assign it to the view.
 *************************************************************/
export function onNavigatingTo(args) {
  /* ***********************************************************
   * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
   * Skipping the re-initialization on back navigation means the user will see the
   * page in the same data state that he left it in before navigating.
   *************************************************************/
  if (args.isBackNavigation) {
    return
  }

  const page = args.object

  page.bindingContext = new RuanganDetailEditViewModel(page.navigationContext)
}

/* ***********************************************************
 * The edit cancel button navigates back to the item details page.
 *************************************************************/
export function onCancelButtonTap(args) {
  Frame.topmost().goBack()
}

/* ***********************************************************
 * The edit done button calls the view model save changes logic.
 *************************************************************/
export function onDoneButtonTap(args) {
  /* ***********************************************************
   * By design this app is set up to work with read-only sample data.
   * Follow the steps in the "Firebase database setup" section in app/readme.md file
   * and uncomment the code block below to make it editable.
   *************************************************************/


  const actionItem = args.object;
  const bindingContext = actionItem.bindingContext;

  bindingContext.saveChanges()
    .then(() => Frame.topmost().navigate({
      moduleName: "ruangan/ruangan-list-page",
      animated: true,
      clearHistory: true,
      transition: {
        name: "slideBottom",
        duration: 200,
        curve: "ease"
      }
    }))
    .catch(() =>
      Dialogs.alert({
        title: "Oops!",
        message: "Something went wrong. Please try again.",
        okButtonText: "Ok"
      }));


  /* ***********************************************************
   * Comment out the code block below if you made the app editable.
   *************************************************************/
  const readOnlyMessage =
    'Check out the "Firebase database setup" section in the readme file to make it editable.'
  const queue = Promise.resolve()
  queue
    .then(() =>
      queue
    )
    .then(() =>
      Frame.topmost().navigate({
        moduleName: 'ruangan/ruangan-list-page',
        animated: true,
        clearHistory: true,
        transition: {
          name: 'slideBottom',
          duration: 200,
          curve: 'ease',
        },
      })
    )
}