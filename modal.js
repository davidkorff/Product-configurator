window.onload = addSpokeCustomElements()

function addSpokeCustomElements(){
  addModalButton()
  addModalElements()
}

function addModalElements(){
  var modalFade = createPageElement("div","exampleModal","configModal",[{"tabindex":"-1"},{"role":"dialog"},{"aria-labelledby":"exampleModalLabel"},{"aria-hidden":"true"}], ["modal","fade"], document.body)

  var modalDialog = createPageElement("div", "","",[{"role":"document"}],["modal-dialog"],modalFade)

  // var modalContent = createPageElement("div", "","",[],["modal-content"],modalDialog)

  // var modalHeader = createPageElement("div", "","",[],["modal-header"],modalContent)
  //
  // var modalTitle = createPageElement("h5", "exampleModalLabel","",[],["modal-title"],modalHeader)
  // modalTitle.innerHTML = "title"
  //
  // var modalCloseButton = createPageElement("button","","",[{"data-dismiss":"modal"},{"aria-label":"Close"}],["close"],modalHeader)
  //
  // var modalCloseButtonSpan = createPageElement("span","","",[{"aria-hidden":"true"}],[],modalCloseButton)
  //
  // var modalBody = createPageElement("div", "","",[],["modal-body"],modalContent)
  addContextMenus(modalDialog)
  createConfigurator(modalDialog,jsonObject1)

  // var modalFooter = createPageElement("div", "","",[],["modal-footer"],modalContent)

  // var modalFooterCloseButton = createPageElement("button", "","",[{"data-dismiss":"modal"}],["btn","btn-secondary"],modalFooter)
  // modalFooterCloseButton.innerHTML = "Close"
  //
  // var modalFooterSaveButton = createPageElement("button", "","",[{"data-dismiss":"modal"}],["btn","btn-primary"],modalFooter)
  // modalFooterSaveButton.innerHTML = "Save Changes"
}
function addContextMenus(parentElement){
  parentElement.addEventListener("click", function(e) {
    if (e.target.offsetParent == undefined) {
      document.querySelectorAll(".context-menu").forEach((contextMenu) => {
        contextMenu.remove();
      });
      addItemContextMenu(parentElement)
      addDecoContextMenu(parentElement)
    }
  })
  addItemContextMenu(parentElement)
  addDecoContextMenu(parentElement)
}
function addItemContextMenu(parentElement){
  var contextMenu = createPageElement('div',"item-context-menu","",[],["context-menu"],parentElement)
  var option1 = createPageElement('div',"","",[{"href":"#"}],["item"], contextMenu)
  option1.innerHTML = "option4"

  var option2 = createPageElement('div',"","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "option5"

  var option3 = createPageElement('div',"","",[{"href":"#"}],["item"], contextMenu)
  option3.innerHTML = "option6"

}

function addDecoContextMenu(parentElement){
  var contextMenu = createPageElement('div',"deco-context-menu","",[],["context-menu"],parentElement)
  var option1 = createPageElement('div',"addTextButton","",[{"href":"#"}],["item"], contextMenu)
  option1.innerHTML = "Add Text"


  var option2 = createPageElement('div',"addImageButton","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "Add Image"

}



function addModalButton(){

  var modalButton = createPageElement("button", "configModalButton", "configModal",[{"data-toggle":"modal"},{"data-target":"#exampleModal"}],["btn", "btn-primary"],document.querySelector("#customizerButton"))
  modalButton.innerHTML = "Open Configurator"




}
