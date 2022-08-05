window.onload = addSpokeCustomElements()

function addSpokeCustomElements(){
  addModalButton()
  addModalElements()
}

function addModalElements(){
  var modalFade = createPageElement("div","spokeConfigurator","",[{"tabindex":"-1"},{"role":"dialog"},{"aria-labelledby":"spokeConfiguratorLabel"},{"aria-hidden":"true"}], ["modal"], document.body)

  // var modalDialog = createPageElement("div", "","",[{"role":"document"}],["modal-dialog"],modalFade)

  // var modalContent = createPageElement("div", "","",[],["modal-content"],modalDialog)

  // var modalHeader = createPageElement("div", "","",[],["modal-header"],modalContent)
  //
  // var modalTitle = createPageElement("h5", "#SpokeConfiguratorLabel","",[],["modal-title"],modalHeader)
  // modalTitle.innerHTML = "title"
  //
  // var modalCloseButton = createPageElement("button","","",[{"data-dismiss":"modal"},{"aria-label":"Close"}],["close"],modalHeader)
  //
  // var modalCloseButtonSpan = createPageElement("span","","",[{"aria-hidden":"true"}],[],modalCloseButton)
  //
  // var modalBody = createPageElement("div", "","",[],["modal-body"],modalContent)
  addContextMenus(modalFade)
  createConfigurator(modalFade,jsonObject1)

  // var modalFooter = createPageElement("div", "","",[],["modal-footer"],modalContent)

  // var modalFooterCloseButton = createPageElement("button", "","",[{"data-dismiss":"modal"}],["btn","btn-secondary"],modalFooter)
  // modalFooterCloseButton.innerHTML = "Close"
  //
  // var modalFooterSaveButton = createPageElement("button", "","",[{"data-dismiss":"modal"}],["btn","btn-primary"],modalFooter)
  // modalFooterSaveButton.innerHTML = "Save Changes"
}
function addContextMenus(parentElement){
  parentElement.addEventListener("click", function(e) {
    if(document.querySelector("#spokeConfigurator") == e.target){
      // debugger
      // document.querySelector("#spokeConfigurator").classList.remove("fade")
      // $('#spokeConfigurator').modal('hide')
    }
    if (e.target.offsetParent == undefined) {
      document.querySelectorAll(".context-menu").forEach((contextMenu) => {
        contextMenu.remove();
      });
      addItemContextMenu(parentElement)
      addDecoContextMenu(parentElement)
      addEditItemContextMenu(parentElement)
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
  //maybe double click goes straight into editing.

  var fontDropdown = createPageElement('div','fontDropdown','fontDropdown',[],["dropdown"],contextMenu)
  var fontDropdownButton = createPageElement('button','fontDropdownButton','fontDropdownButton',[{"data-toggle":"dropdown"},{"aria-haspopup":"true"},{"aria-expanded":"false"}],["btn", "btn-secondary", "dropdown-toggle"],fontDropdown)
  fontDropdownButton.innerHTML = "Select Font"

  var fontOptions = createPageElement('div','fontOptions','fontOptions',[{"aria-labelledby":"fontDropdownButton"}],["dropdown-menu"],fontDropdown)
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!_______________________


function addModalButton(){

  var modalButton = createPageElement("button", "configModalButton", "configModal",[{"data-toggle":"modal"},{"data-target":"#spokeConfigurator"}],["btn", "btn-primary"],document.querySelector("#customizerButton"))
  modalButton.innerHTML = "Open Configurator"




}
