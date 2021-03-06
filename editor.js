window.onload = doTheEditor(jsonObject1)

function doTheEditor(jsonObject){

  // create the main parent div
  var editorDiv = document.createElement("div")

  editorDiv.setAttribute("class", "col-md-4 col-12 rounded-top")
  editorDiv.setAttribute("name", "editor")
  document.getElementById("fullContainer").appendChild(editorDiv)

  // create editor title
  var editorTitleDiv = document.createElement("div")
  editorTitleDiv.setAttribute("class", "row rounded-top card-header")
  editorTitleDiv.innerHTML = "SKU"
  editorDiv.appendChild(editorTitleDiv)

  // Create Subsections div
  var editorSubsectionsDiv = document.createElement("div")
  editorSubsectionsDiv.setAttribute("class", "mt-1")
  editorSubsectionsDiv.setAttribute("name", "subSectionEditor")
  editorDiv.appendChild(editorSubsectionsDiv)

  // Create Subsections buttons div
  var editorSubsectionsButtonsDiv = document.createElement("div")
  editorSubsectionsButtonsDiv.setAttribute("class", "btn-group row")
  editorSubsectionsButtonsDiv.setAttribute("role", "group")
  editorSubsectionsDiv.appendChild(editorSubsectionsButtonsDiv)

  // debugger
  var jsonSubsectionsArray = jsonObject.Product.Subsections

  for (var i = 0; i < jsonSubsectionsArray.length; i++) {
    let jsonSubsection = jsonObject.Product.Subsections[i].Subsection
    let subsectionName = jsonSubsection.SubsectionName

    let subsectionButton = document.createElement("button")
    subsectionButton.setAttribute("class", "btn btn-outline-primary")
    subsectionButton.setAttribute("type", "button")
    subsectionButton.setAttribute("data-subsectionid", jsonSubsection.SubsectionID)

    subsectionButton.innerHTML = subsectionName
    editorSubsectionsButtonsDiv.appendChild(subsectionButton)
    subsectionButton.addEventListener("click", function(e) {
        subsectionClicked(jsonSubsection, editorSubsectionsDiv, editorSubsectionsButtonsDiv, e)
    })
    createDecoAreaEditor(jsonSubsection, editorSubsectionsDiv)
  }

}

function subsectionClicked(jsonSubsection, editorSubsectionsDiv, editorSubsectionsButtonsDiv, e){
  console.log("helloe")
  buttonActiveSetting(editorSubsectionsButtonsDiv, e)
  // debugger
  unHideChildDivs("data-subsectionid", e)
}




function createDecoAreaEditor(jsonSubsection, editorSubsectionsDiv){
  // debugger
  // create deco area div
  let editorDecoAreaDiv = document.createElement("div")
  editorDecoAreaDiv.setAttribute("name", "decoAreaEditor")
  editorDecoAreaDiv.setAttribute("data-subsectionid", jsonSubsection.SubsectionID)
  editorDecoAreaDiv.setAttribute("class", "row d-none")
  editorSubsectionsDiv.appendChild(editorDecoAreaDiv)


  // Create Subsections buttons div
  let editorDecoAreaButtonsDiv = document.createElement("div")
  editorDecoAreaButtonsDiv.setAttribute("class", "mt-1 btn-group")
  editorDecoAreaButtonsDiv.setAttribute("role", "group")
  editorDecoAreaDiv.appendChild(editorDecoAreaButtonsDiv)

  // debugger
  let jsonDecoAreasArray = jsonSubsection.DecoAreas

  for (let i = 0; i < jsonDecoAreasArray.length; i++) {
    let jsonDecoArea = jsonDecoAreasArray[i].DecoArea
    let decoAreaName = jsonDecoArea.FieldName

    let decoButton = document.createElement("button")
    decoButton.setAttribute("class", "btn btn-outline-primary")
    decoButton.setAttribute("type", "button")
    decoButton.setAttribute("data-decoareaid", jsonDecoArea.DecoAreaID)
    decoButton.innerHTML = decoAreaName
    editorDecoAreaButtonsDiv.appendChild(decoButton)
    decoButton.addEventListener("click", function(e) {
        decoAreaClicked(jsonDecoArea, editorDecoAreaDiv, editorDecoAreaButtonsDiv, e)
    })
    // debugger
    let personalizedObjectArray = jsonDecoArea.Template.PersonalizedObjects

    //create the personalized area div
    let editorPersonalizedObjectDiv = document.createElement("div")
    editorPersonalizedObjectDiv.setAttribute("name", "PersonalizedObjectEditor")
    editorPersonalizedObjectDiv.setAttribute("data-decoareaid", jsonDecoArea.DecoAreaID)
    editorPersonalizedObjectDiv.setAttribute("class", "mt-1 d-none")
    editorDecoAreaDiv.appendChild(editorPersonalizedObjectDiv)

    for (let x = 0; x < personalizedObjectArray.length; x++) {
      createPersonalizedObject(jsonDecoArea, personalizedObjectArray[x].PersonalizedObject, editorPersonalizedObjectDiv)
    }
  }
}

function createPersonalizedObject(jsonDecoArea, personalizedObject, editorPersonalizedObjectDiv){

  // create the personalized element div
  let editorPersonalizedElementsDiv = document.createElement("div")
  editorPersonalizedElementsDiv.setAttribute("class", "input-group mb-3")
  editorPersonalizedElementsDiv.setAttribute("data-personalizedobjectid", personalizedObject.PersonalizedObjectID)
  editorPersonalizedObjectDiv.setAttribute("data-decoareaid", jsonDecoArea.DecoAreaID)
  editorPersonalizedObjectDiv.appendChild(editorPersonalizedElementsDiv)

  //create the type of element Label div
  let editorPersonalizedElementLabelDiv = document.createElement("div")
  editorPersonalizedElementLabelDiv.setAttribute("class", "input-group-prepend")
  editorPersonalizedElementsDiv.appendChild(editorPersonalizedElementLabelDiv)

  //create the type of element Label div
  let editorPersonalizedElementLabel = document.createElement("span")
  editorPersonalizedElementLabel.setAttribute("class", "input-group-text")


  if (personalizedObject.AreaType == "IMG"){
    editorPersonalizedElementLabel.innerHTML = "Image URL"
  }
  else{
    editorPersonalizedElementLabel.innerHTML = "Text"
  }


  editorPersonalizedElementLabelDiv.appendChild(editorPersonalizedElementLabel)

  //create the input field
  let editorPersonalizedElementInput = document.createElement("input")
  editorPersonalizedElementInput.setAttribute("class", "form-control")
  editorPersonalizedElementInput.setAttribute("type", "text")

  if (personalizedObject.AreaType == "IMG"){
    editorPersonalizedElementInput.value = `${personalizedObject.IMG}`
  }
  else{
    editorPersonalizedElementInput.value = `${personalizedObject.Text}`
  }

  editorPersonalizedElementInput.addEventListener("keyup", function(e) {
      editorValueChanged(personalizedObject,editorPersonalizedElementInput, e)
  })

  editorPersonalizedElementsDiv.appendChild(editorPersonalizedElementInput)
  // debugger


}

function editorValueChanged(personalizedObject, editorPersonalizedElementInput, e){
  //update the jsonObject
  if(personalizedObject.AreaType =='Text'){
    personalizedObject.Text = e.target.value
  }
  else if(personalizedObject.AreaType =='IMG'){
    personalizedObject.IMG = e.target.value
  }

  updateSVGPersonalizedObject(e.target.value, 'data-personalizedobjectid', e)
  // debugger
}

function decoAreaClicked(jsonDecoArea, editorSubsectionsDiv, editorDecoAreaButtonsDiv, e){
  unHideChildDivs('data-decoareaid', e)
  buttonActiveSetting(editorDecoAreaButtonsDiv, e)
}
