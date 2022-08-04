window.onload = createSendOrderButton()




function createPageElement(elementType, elementID, elementName, customAttributeArray, elementClasses, parentElement){
  var newElement = document.createElement(elementType)
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


function createSendOrderButton(){
  var sendOrderButton = createPageElement('button', 'sendOrderbutton', 'sendOrderbutton', customAttributeArray, elementClasses, document.body)




}
