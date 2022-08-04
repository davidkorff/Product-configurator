function rightClickDecoArea(e, decoArea){
  document.querySelectorAll(".context-menu").forEach((contextMenuInstance) => {
    contextMenuInstance.remove();
  });
  addContextMenus(document.querySelector(".modal-dialog"))
  var rightClickEvent = e
  console.log("righty roo")
  // if the right clicked object is an element
  if(e.target.dataset['personalizedobjectid']!=undefined){
    var rightClickedObject = e.target
    var contextMenu = document.getElementById("item-context-menu");
  }
  else {
    var rightClickedObject = e.currentTarget
    var contextMenu = document.getElementById("deco-context-menu");
  }
  // debugger
  event.preventDefault();
  var { offsetX: mouseX, offsetY: mouseY } = event;

  contextMenu.style.top = `${mouseY}px`;
  contextMenu.style.left = `${mouseX+40}px`;
  contextMenu.style.zIndex = 1000


  // console.log('imma remove')
  // contextMenu.removeEventListener("click", function(e) {
  //   addElement(e, rightClickedObject, decoArea, rightClickEvent)
  // })
  // console.log('imma add')
  // console.log(getEventListeners(contextMenu))


  contextMenu.addEventListener("click", function(e) {
    addElement(e, rightClickedObject, decoArea, rightClickEvent)

  })
  // debugger
  // for (var i = 0; i < contextMenu.childNodes.length; i++) {
  //   contextMenu.childNodes[i].addEventListener("click", function(e) {
  //     addElement(e, rightClickedObject, decoArea, rightClickEvent)
  //   })
  //   console.log("event added")
  // }


  contextMenu.classList.add("visible")

}

function addElement(e, rightClickedObject, decoArea, rightClickEvent){
  if(e.target.getAttribute('id') == 'addTextButton'){
    addText(e, rightClickedObject, decoArea, rightClickEvent)
  }
  if(e.target.getAttribute('id') == 'addImageButton'){
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
          "Text": "DAvid",
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
          "IMG": "https://printify.com/wp-content/uploads/2021/03/swagrabbit_logo.png",
          "ObjectSpecs": {
              "ObjectHeight": 50,
              "ObjectWidth": 60,
              "ObjectXOffset": 134,
              "ObjectYOffset": 26
          }
      }
  }
  decoArea.Template.PersonalizedObjects.push(newImageObject)
  createPersonalizedObjects(rightClickedObject.querySelector('g'), newImageObject.PersonalizedObject)
}
