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
  addEditItemContextMenu(parentElement)
}
function addItemContextMenu(parentElement){
  var contextMenu = createPageElement('div',"item-context-menu","",[],["context-menu"],parentElement)
  var option1 = createPageElement('div',"editObjectButton","",[{"href":"#"}],["item"], contextMenu)
  option1.innerHTML = "Edit Object"

  var option2 = createPageElement('div',"removeObjectButton","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "Remove Object"

}

function addDecoContextMenu(parentElement){
  var contextMenu = createPageElement('div',"deco-context-menu","",[],["context-menu"],parentElement)
  var option1 = createPageElement('div',"addTextButton","",[{"href":"#"}],["item"], contextMenu)
  option1.innerHTML = "Add Text"


  var option2 = createPageElement('div',"addImageButton","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "Add Image"

}

function addEditItemContextMenu(parentElement){
  var contextMenu = createPageElement('div',"edit-item-context-menu","",[],["context-menu", "object-editor"],parentElement)
  var option1 = createPageElement('div',"editFont","",[{"href":"#"}],["item"], contextMenu)
  option1.innerHTML = "Edit Font"


  var option2 = createPageElement('div',"editSize","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "Edit Size"

  var option2 = createPageElement('div',"editColor","",[{"href":"#"}],["item"], contextMenu)
  option2.innerHTML = "Edit Color"

  createFontEditorTool(parentElement)
}

function createFontEditorTool(parentElement){
  var contextMenu = createPageElement('div',"fontedit-context-menu","",[{"style":"background: #c5c5c5;"}],["context-menu"],parentElement)

  var textSection = createPageElement('form',"","",[],[],contextMenu)
  var textDiv = createPageElement('div',"","",[],["form-group"],textSection)
  var textLabel = createPageElement('label',"","",[{"for":"personalizationFeild"}],[],textDiv)
  textLabel.innerHTML = "Personaliztion Field"

  var textInput = createPageElement('input',"personalizationFieldInput","",[{"aria-describedby":"customText"},{"placeholder":"Personalize Here"}],["form-control"],textDiv)
  //even listern on personalize here
}

function addModalButton(){

  var modalButton = createPageElement("button", "configModalButton", "configModal",[{"data-toggle":"modal"},{"data-target":"#exampleModal"}],["btn", "btn-primary"],document.querySelector("#customizerButton"))
  modalButton.innerHTML = "Open Configurator"




}
