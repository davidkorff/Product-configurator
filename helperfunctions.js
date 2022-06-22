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

function unHideChildDivs(editorSubsectionsDiv,editorSubsectionsButtonsDiv, e){
  // debugger
  let subSectionElementsArray = document.querySelectorAll('[data-subsectionid]')
  for (let i = 0; i < subSectionElementsArray.length; i++) {
    // debugger
    if(subSectionElementsArray[i].getAttribute("data-subsectionid") == e.target.getAttribute("data-subsectionid")) {
      subSectionElementsArray[i].classList.remove("d-none")
    }
    else if (subSectionElementsArray[i].type != 'button'){
      subSectionElementsArray[i].classList.add("d-none")
    }
  }
}
