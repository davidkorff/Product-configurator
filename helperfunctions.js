function buttonActiveSetting(buttonDiv, e){
  let buttons = buttonDiv.childNodes
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] == e.target) {
      buttons[i].classList.add("active")
    }
    else{
      buttons[i].classList.remove("active")
    }
  }
}

function unHideChildDivs(htmlDataElement, e){
  // takes in the whole dive to
  // debugger
  // let subSectionElementsArray = document.querySelector("[name='editor']").querySelectorAll(`[${htmlDataElement}]`)
  let subSectionElementsArray = document.querySelectorAll(`[${htmlDataElement}]`)
  for (let i = 0; i < subSectionElementsArray.length; i++) {
    // debugger
    if(subSectionElementsArray[i].getAttribute(htmlDataElement) == e.target.getAttribute(htmlDataElement)) {
      subSectionElementsArray[i].classList.remove("d-none")
      subSectionElementsArray[i].classList.add("currentEdit")
    }
    else if (subSectionElementsArray[i].type != 'button'){
      // debugger
      subSectionElementsArray[i].classList.add("d-none")
      subSectionElementsArray[i].classList.remove("currentEdit")
    }
  }
  changeSVGZoom()
}


function updateSVGPersonalizedObject(input, htmlDataElement, e){
  // debugger
  let targetID = e.target.parentElement.getAttribute(htmlDataElement)
//returns an array even though its only 1 element. guess we can have 2 related feilds?
  let subSectionElement = document.querySelector(`svg [${htmlDataElement}='${targetID}']`)

  if(subSectionElement.tagName == 'image'){
    // debugger
    subSectionElement.setAttribute("href", input)
  }
  else if(subSectionElement.tagName == 'text'){
    subSectionElement.innerHTML= input
  }

}

function selectFirst(e){
  let subsectionEditor = document.querySelector('[name="subSectionEditor"]');
  let subsectionButton = subsectionEditor.querySelector(`button`).click()
  let decoAreaButtons = subsectionEditor.querySelector('div.currentEdit')
  decoAreaButtons.querySelector(`button`).click()
}


function createPageElement(elementType, elementID, elementName, customAttributeArray, elementClasses, parentElement){
  if (elementType == "svg" || elementType == "g" || elementType == "rect" || elementType == "image"|| elementType == "text"){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", elementType);
  }
  else{
    var newElement = document.createElement(elementType)
  }
  newElement.setAttribute("id", elementID)
  newElement.setAttribute("name", elementName )

  for (var i = 0; i < customAttributeArray.length; i++) {
    let attribute = Object.keys(customAttributeArray[i])
    newElement.setAttribute(attribute, customAttributeArray[i][attribute] )
  }

  for (var i = 0; i < elementClasses.length; i++) {
    newElement.classList.add(elementClasses[i])
  }

  parentElement.appendChild(newElement)

  return newElement
}

// document.getElementById('pnlOrderLineContent').querySelector('input').value
