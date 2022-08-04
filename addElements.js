function rightClickDecoArea(e, selectedJson){
  document.querySelectorAll(".context-menu").forEach((contextMenuInstance) => {
    contextMenuInstance.remove();
  });
  addContextMenus(document.querySelector(".modal-dialog"))
  var rightClickEvent = e
  console.log("righty roo")
  // if the right clicked object is an element
  if(e.target.dataset['personalizedobjectid']!=undefined){
    console.log("got an item")
    // debugger
    var rightClickedObject = e.target
    var contextMenu = document.getElementById("item-context-menu");

    contextMenu.addEventListener("click", function(e) {
      editElement(e, rightClickedObject, selectedJson, rightClickEvent)
    })
  }
  else {
    console.log("got a deco")
    objectSelectedBool = false
    var rightClickedObject = e.currentTarget.parentElement.parentElement
    var contextMenu = document.getElementById("deco-context-menu");

    contextMenu.addEventListener("click", function(e) {
      addElement(e, rightClickedObject, selectedJson, rightClickEvent)
    })
  }
  event.preventDefault();
  var { offsetX: mouseX, offsetY: mouseY } = event;

  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX+40}px`;
  contextMenu.style.zIndex = 1000


  makeContextMenuVisible(contextMenu)
}


function editElement(e, rightClickedObject, personalizedObject, rightClickEvent){
  // debugger
  if(e.target.getAttribute('id') == 'editObjectButton'){
    presentObjectEditor(rightClickEvent, personalizedObject, rightClickedObject)
  }
  else if(e.target.getAttribute('id') == 'removeObjectButton'){
    removeObject(personalizedObject, rightClickedObject)
  }
}

function presentObjectEditor(e, personalizedObject, rightClickedObject){
  var contextMenu = document.getElementById("edit-item-context-menu");
  var { offsetX: mouseX, offsetY: mouseY } = e;

  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX+40}px`;
  contextMenu.style.zIndex = 1000

  makeContextMenuVisible(contextMenu)
  var parentEvent = e
  contextMenu.addEventListener("click", function(e) {
    showFontEditor(e, personalizedObject, rightClickedObject, parentEvent)
  })
}

function showFontEditor(e, personalizedObject, rightClickedObject, parentEvent){
  console.log("yayy")
  var contextMenu = document.getElementById("fontedit-context-menu");
  var { offsetX: mouseX, offsetY: mouseY } = parentEvent;

  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX+40}px`;
  contextMenu.style.zIndex = 1000
// debugger
  makeContextMenuVisible(contextMenu)
  // debugger
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!_______________________

function makeContextMenuVisible(contextMenu){
  document.querySelectorAll(".context-menu").forEach((contextMenuInstance) => {
    contextMenuInstance.classList.remove("visible")
  });
  contextMenu.classList.add("visible")
}

function removeObject(personalizedObject, rightClickedObject){
  delete(personalizedObject)
  rightClickedObject.remove()

}

function addElement(e, rightClickedObject, decoArea, rightClickEvent){
  console.log("add element")
  if(e.target.getAttribute('id') == 'addTextButton'){
    addText(e, rightClickedObject, decoArea, rightClickEvent)
  }
  else if(e.target.getAttribute('id') == 'addImageButton'){
    addImage(e, rightClickedObject, decoArea, rightClickEvent)
  }
}


function addText(e, rightClickedObject, decoArea, rightClickEvent){
  // console.log(rightClickEvent.target.getBoundingClientRect())
  // debugger
  // console.log(rightClickEvent.target)

  var newTextObject = {
      "PersonalizedObject": {
          "PersonalizedObjectID": 1,
          "AreaType": "Text",
          "ObjectSettings": {
              "Movable": true,
              "KeepInArea": false
          },
          "Text": "Text",
          "Font": "Arial",
          "FontSize":10,
          "IMG": "",
          "ObjectSpecs": {
              "ObjectHeight": 50,
              "ObjectWidth": 60,
              "ObjectXOffset": rightClickEvent.target.getBoundingClientRect().x,
              "ObjectYOffset": rightClickEvent.target.getBoundingClientRect().y
          }
      }
  }
  decoArea.Template.PersonalizedObjects.push(newTextObject)
  createPersonalizedObjects(rightClickedObject.querySelector('g'), newTextObject.PersonalizedObject)
}

function addImage(e, rightClickedObject, decoArea, rightClickEvent){
  var  imageURL = prompt("please enter an image URL")
  // debugger
  var newImageObject = {
      "PersonalizedObject": {
          "PersonalizedObjectID": 1,
          "AreaType": "IMG",
          "ObjectSettings": {
              "Movable": true,
              "KeepInArea": false
          },
          "Text": "",
          "Font": "",
          "FontSize":10,
          "IMG": imageURL,
          "ObjectSpecs": {
              "ObjectHeight": 50,
              "ObjectWidth": 60,
              "ObjectXOffset": 134,
              "ObjectYOffset": 26
          }
      }
  }
  if (imageURL != null){
    decoArea.Template.PersonalizedObjects.push(newImageObject)
    createPersonalizedObjects(rightClickedObject.querySelector('g'), newImageObject.PersonalizedObject)
  }

}
