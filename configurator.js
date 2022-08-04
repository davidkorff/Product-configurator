pxTOmmConversion = 3.7795275591
oldXPosition = null
oldYPosition = null
objectSelectedBool = false
selectedObject = null
debugBool = false

function createConfigurator(parentElement,jsonObject){
  subSectionsArray = jsonObject.Product.Subsections

  for (var i = 0; i < subSectionsArray.length; i++) {
    createDIV(subSectionsArray[i].Subsection, parentElement)
  }
}

function createDIV(subsection, parentElement){
  var windowZoom = pxTOmmConversion

  var subsectionDiv = createPageElement("div",
    subsection.SubsectionID,
    `${subsection.SubsectionName}-BackgroundDiv`,
    [{"data-subsectionid":subsection.SubsectionID},
      {"height":subsection.MaxTemplate.Height*1.2},
      {"width":subsection.MaxTemplate.Width*1.2}],
    ["col-md-8", "col-12", "background"],
    parentElement
  )
  subsectionDiv.style.zoom = 3

  var img = createPageElement("img",
    subsection.SubsectionID,
    subsection.SubsectionName,
    [{"data-subsectionid":subsection.SubsectionID},
      // {"style":"z-index:1"},
      {"width":subsection.MaxTemplate.Width},
      {"height":subsection.MaxTemplate.Height},
    {"style":"position: absolute; z-index:1"}],
    [
      // "col-md-8",
      // "col-12",
      "position-absolute",
      "background"
    ],
    subsectionDiv
  )
  img.src = "https://assets.pcna.com/t_560,f_auto,q_auto/Images/1625-85WH_B_FR_3280.png";

  var div = createPageElement("div",subsection.SubsectionID,subsection.SubsectionName, [{"data-subsectionid":subsection.SubsectionID},{"style":"position: absolute; z-index:2"}],[
    // "col-md-8",
    // "col-12",
    "svgDiv"], subsectionDiv )

  createCanvas(div, subsection)

}

function createCanvas(configParentdiv, subsection){
  // Create the svg element
  var svgElement = createPageElement("svg",subsection.SubsectionID,subsection.SubsectionName, [{"data-subsectionid":subsection.SubsectionID},{"height":subsection.MaxTemplate.Height},{"width":subsection.MaxTemplate.Width}],["subsectionSVG"], configParentdiv )

  // add a border
  if(true){
    svgBorder = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    svgBorder.setAttribute("height", subsection.MaxTemplate.Height)
    svgBorder.setAttribute("width", subsection.MaxTemplate.Width)
    svgBorder.setAttribute("style","stroke:black;stroke-width:5;fill-opacity:0.0")
    svgElement.appendChild(svgBorder)
  }


  // creating decoarea
  decoAreaArray = subsection.DecoAreas
  for (var x = 0; x < decoAreaArray.length; x++) {
    createDecoArea(svgElement, decoAreaArray[x].DecoArea)
  }

}

function createDecoArea(svgElementParent, decoArea){
  // create a decoarea svg
  var decoAreaSVG = createPageElement("svg",`DecoAreaID${decoArea.DecoAreaID}`,"",[{"height":decoArea.Template.Dimensions.DecoAreaHeight},{"width": decoArea.Template.Dimensions.DecoAreaWidth},{"x":decoArea.Template.Dimensions.DecoAreaXOffset},{"y":decoArea.Template.Dimensions.DecoAreaYOffset},{"data-decoareaid":decoArea.DecoAreaID},{"style":"stroke:black;stroke-width:1;fill-opacity:0.0"}],["d-none"],svgElementParent)
  //activate the below
  decoAreaSVG.addEventListener("mousemove", mouseState)
  decoAreaSVG.addEventListener("contextmenu", function(e) {
      rightClickDecoArea(e,decoArea)
  })



  // create a group
  var decoAreaGroup = createPageElement('g',`DecoAreaID${decoArea.DecoAreaID}`,"",[{"height":decoArea.Template.Dimensions.DecoAreaHeight},{"width": decoArea.Template.Dimensions.DecoAreaWidth},{"x":0},{"y":0},{"style":"stroke:black;stroke-width:1;fill-opacity:0.0"}],[],decoAreaSVG)

  // create a decoarea border
  if(true){
    var decoAreaBorder = createPageElement("rect","","",[{"height":decoArea.Template.Dimensions.DecoAreaHeight},{"width": decoArea.Template.Dimensions.DecoAreaWidth},{"x":0},{"y":0},{"style":"stroke:black;stroke-width:1;fill-opacity:0.0"}],["border"],decoAreaGroup)
  }

  // creating personalized areas
  personalizedAreaArray = decoArea.Template.PersonalizedObjects
  for (var y = 0; y < personalizedAreaArray.length; y++) {
    createPersonalizedObjects(decoAreaGroup, personalizedAreaArray[y].PersonalizedObject)
  }
}

function createPersonalizedObjects(decoAreaGroup, personalizedObject){
  // make another group for each personalized object
  personalizedObjectGroup = createPageElement("g",personalizedObject.PersonalizedObjectID,"",[{"height":personalizedObject.ObjectSpecs.ObjectHeight},{"width":personalizedObject.ObjectSpecs.ObjectWidth},{"x":(personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x")))},{"y":(personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y")))},{"style":"stroke:black;stroke-width:1;fill-opacity:0.0"},{"z":2}],["personalizedObjectGroup"],decoAreaGroup)

  // create a personalized object border
  if(false){
    personalizedObjectBorder = createPageElement('rect',personalizedObject.PersonalizedObjectID,"",[{"height":personalizedObject.ObjectSpecs.ObjectHeight},{"width":personalizedObject.ObjectSpecs.ObjectWidth},{"x":(personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x")))},{"y":(personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y")))},{"style":"stroke:black;stroke-width:1;fill-opacity:0.0"}],[],personalizedObjectGroup)
  }


  // add the personalization
  if(personalizedObject.AreaType == "IMG"){
    svgPersonalizedeElement = createPageElement('image',
      `PersonalizedObjectID${personalizedObject.PersonalizedObjectID}`,
      "",
      [{"href":personalizedObject.IMG},
        {"height":personalizedObject.ObjectSpecs.ObjectHeight},
        {"width":personalizedObject.ObjectSpecs.ObjectWidth},
        {"x":(personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x")))},
        {"y":(personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y")))},
        {"data-personalizedobjectid":personalizedObject.PersonalizedObjectID}
      ],
      [],
      personalizedObjectGroup)
      // debugger
  }
  else if(personalizedObject.AreaType == "Text"){
    svgPersonalizedeElement = createPageElement('text',
      `PersonalizedObjectID${personalizedObject.PersonalizedObjectID}`,
      "",
      [{"data-personalizedobjectid":personalizedObject.PersonalizedObjectID}],
      [],
      personalizedObjectGroup)

    svgPersonalizedeElement.setAttributeNS(null, "x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))));
    svgPersonalizedeElement.setAttributeNS(null, "y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y")))+personalizedObject.FontSize);
    svgPersonalizedeElement.setAttributeNS(null, "font-size", personalizedObject.FontSize);
    svgPersonalizedeElement.setAttributeNS(null, "font-family", personalizedObject.Font);
    svgPersonalizedeElement.innerHTML = personalizedObject.Text
  }

  //gives it the parent svg data-decoareaid
  svgPersonalizedeElement.setAttribute("data-decoareaid", decoAreaGroup.parentElement.getAttribute('data-decoareaid'))
  svgPersonalizedeElement.addEventListener("mousedown", function(e) {
      mouseState1(personalizedObject, e)
  })
  svgPersonalizedeElement.addEventListener("mouseup", function(e) {
      mouseState1(personalizedObject, e)
  })
  svgPersonalizedeElement.addEventListener("dblclick", function(e) {
      doubleClickObject(personalizedObject, e)
  })
}

function doubleClickObject(personalizedObject, e){
  // debugger
  console.log("doubley")
}

function mouseState1(personalizedObject, e){
  // debugger
  if (e.type == "mousedown") {
      //code triggers on hold
      selectedJSONObject = personalizedObject
      // debugger
      if(e.target.dataset.personalizedobjectid != undefined)  {
        selectedObject = e.target
      }
      objectSelectedBool = true

      oldXPosition = e.pageX
      oldYPosition = e.pageY
  }
  if (e.type == "mouseup") {
      objectSelectedBool = false
  }
}


function mouseState(e){
    if(objectSelectedBool){
      // console.log("MOVING AND SELECTED")
      xPositionMovement = e.pageX - oldXPosition
      yPositionMovement = e.pageY - oldYPosition
      oldXPosition = e.pageX
      oldYPosition = e.pageY
      if(e.target.dataset.personalizedobjectid != undefined)  {
        selectedObject = e.target
      }

      // if(document.querySelectorAll(`[data-personalizedobjectid]`).includes(e.target))  {
      //   selectedObject = e.target
      // }

      var currentEditArray = document.querySelectorAll(".currentEdit")
      for (var i = 0; i < currentEditArray.length; i++) {
        currentEditArray[i].classList.remove("currentEdit")
      }

      if(e.target.dataset.personalizedobjectid != undefined)  {
        selectedObject.classList.add("currentEdit")
      }
      // debugger
      moveObject(selectedObject, xPositionMovement, yPositionMovement, e.currentTarget)
    }
    else{
      console.log("MOVING")
    }
}


function moveObject(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement){
// debugger
  // let zoomMultiplier = document.querySelector(".currentEdit .subsectionSVG ").style.zoom
  let zoomMultiplier = decoAreaElement.parentElement.parentElement.parentElement.style.zoom

  validateMovement(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement)

  selectedObject.setAttribute("x", (parseFloat(selectedObject.getAttribute("x"))+xPositionMovement/zoomMultiplier))
  selectedObject.setAttribute("y", (parseFloat(selectedObject.getAttribute("y"))+yPositionMovement/zoomMultiplier))
 // debugger
  // console.log(selectedObject)
  // selectedObject.setAttribute("x", (parseFloat(selectedObject.getAttribute("x"))+xPositionMovement))
  // selectedObject.setAttribute("y", (parseFloat(selectedObject.getAttribute("y"))+yPositionMovement))

  // get the subsection we're in and cycle through those DecoAreas
  var selectedObjectSVGID = selectedObject.id
  var selectedDecoAreaSVGID = selectedObject.parentElement.parentElement.parentElement.id
  var selectedObjectSubsectionSVGID = selectedObject.parentElement.parentElement.parentElement.parentElement.id

  var selectedObjectY = selectedObject.getAttribute("y")
  var selectedObjectX = selectedObject.getAttribute("x")
  selectedJSONObject.ObjectSpecs.ObjectYOffset = parseFloat(selectedObjectX = selectedObject.getAttribute("y"))
  selectedJSONObject.ObjectSpecs.ObjectXOffset = parseFloat(selectedObjectX = selectedObject.getAttribute("x"))
}

function validateMovement(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement){
  var decoYMax = parseFloat(decoAreaElement.getAttribute("y"))
  var decoXMax = parseFloat(decoAreaElement.getAttribute("x"))
  var decoYMin = parseFloat(decoAreaElement.getAttribute("y"))+parseFloat(decoAreaElement.getAttribute("height"))
  var decoXMin = parseFloat(decoAreaElement.getAttribute("x"))+parseFloat(decoAreaElement.getAttribute("width"))

  // console.log(selectedObject)
  var selectedObjectBounding = selectedObject.getBoundingClientRect()
  var decoAreaBounding = decoAreaElement.getBoundingClientRect()

  // console.log(selectedObject.x)


  //if the bounds of the decoare are expanded, this means the objects within it are too far so make the border red.
  if(decoAreaElement.width.baseVal.value.toFixed(2) != decoAreaBounding.width.toFixed(2) || decoAreaElement.height.baseVal.value.toFixed(2) != decoAreaBounding.height.toFixed(2)){
    decoAreaElement.getElementsByClassName("border")[0].setAttribute("style","stroke:red;stroke-width:1;fill-opacity:0.0")
  }
  else{
    // console.log("make black")
    decoAreaElement.getElementsByClassName("border")[0].setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
  }

}
