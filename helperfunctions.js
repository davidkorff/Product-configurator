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
    }
    else if (subSectionElementsArray[i].type != 'button'){
      subSectionElementsArray[i].classList.add("d-none")
    }
  }
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
