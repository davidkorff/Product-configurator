pxTOmmConversion = 3.7795275591
window.onload = dothesvg(jsonObject1)
// window.onload = dothesvg(jsonObject2)

// window.onload = dothesvg(jsonObject2)

oldXPosition = null
oldYPosition = null
objectSelectedBool = false
selectedObject = null
debugBool = false



function dothesvg(jsonObject){

  subSectionsArray = jsonObject.Product.Subsections

  for (var i = 0; i < subSectionsArray.length; i++) {
    createDIV(subSectionsArray[i].Subsection)
  }


}

function createDIV(subsection){
  // debugger
  var subsectionDiv = document.createElement("div")
  subsectionDiv.setAttribute("id", subsection.SubsectionID )
  subsectionDiv.setAttribute("data-subsectionid", subsection.SubsectionID )
  subsectionDiv.setAttribute("name", `${subsection.SubsectionName}-BackgroundDiv` )
  subsectionDiv.setAttribute("class", "col-md-8 col-12 zoom-pxtomm d-none" )
  subsectionDiv.setAttribute("height", subsection.MaxTemplate.Height*1.2)
  subsectionDiv.setAttribute("width", subsection.MaxTemplate.Width*1.2)
  subsectionDiv.setAttribute("style", "background-image: url('https://assets.pcna.com/t_560,f_auto,q_auto/Images/1625-85BK_B_FR_2629.png'); background-size: contain; background-repeat: no-repeat;")
  document.getElementById("fullContainer").appendChild(subsectionDiv)

  // var img = document.createElement("img");
  // img.src = "https://assets.pcna.com/t_560,f_auto,q_auto/Images/1625-85BK_B_FR_2629.png";
  // img.setAttribute("class", "col-md-8 col-12 d-none position-absolute" )
  // img.setAttribute("style", "z-index:-1")
  // img.setAttribute("id", subsection.SubsectionID )
  // img.setAttribute("data-subsectionid", subsection.SubsectionID )
  // img.setAttribute("name", subsection.SubsectionName )
  // img.setAttribute("height", subsection.MaxTemplate.Height)
  // img.setAttribute("width", subsection.MaxTemplate.Width)
  // subsectionDiv.appendChild(img)


  var div = document.createElement("div")
  div.setAttribute("id", subsection.SubsectionID )
  div.setAttribute("data-subsectionid", subsection.SubsectionID )
  div.setAttribute("name", subsection.SubsectionName )
  // div.setAttribute("class", "col-md-8 col-12 zoom-pxtomm d-none" )
  div.setAttribute("class", "col-md-8 col-12 d-none" )

  div.setAttribute("style", "padding-top: 50px")

  subsectionDiv.appendChild(div)



  createCanvas(div, subsection)


}

function createCanvas(div, subsection){
  // Create the svg element
  svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svgElement.setAttribute("id", subsection.SubsectionID )
  svgElement.setAttribute("name", subsection.SubsectionName )
  svgElement.setAttribute("height", subsection.MaxTemplate.Height)
  svgElement.setAttribute("width", subsection.MaxTemplate.Width)

  div.appendChild(svgElement)

  // add a border
  if(false){
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

function createDecoArea(svgElement, decoArea){
  // create a decoarea svg
  decoAreaSVG = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  decoAreaSVG.setAttribute("height", decoArea.Template.Dimensions.DecoAreaHeight)
  decoAreaSVG.setAttribute("width", decoArea.Template.Dimensions.DecoAreaWidth)
  decoAreaSVG.setAttribute("x", decoArea.Template.Dimensions.DecoAreaXOffset)
  decoAreaSVG.setAttribute("y", decoArea.Template.Dimensions.DecoAreaYOffset)
  decoAreaSVG.classList.add("d-none")
  decoAreaSVG.setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
  decoAreaSVG.setAttribute("id", `DecoAreaID${decoArea.DecoAreaID}`)
  decoAreaSVG.setAttribute("data-decoareaid", decoArea.DecoAreaID)
  decoAreaSVG.addEventListener("mousemove", mouseState)

  svgElement.appendChild(decoAreaSVG)

  // create a group
  decoAreaGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  decoAreaGroup.setAttribute("height", decoArea.Template.Dimensions.DecoAreaHeight)
  decoAreaGroup.setAttribute("width", decoArea.Template.Dimensions.DecoAreaWidth)
  decoAreaGroup.setAttribute("x", 0)
  decoAreaGroup.setAttribute("y", 0)
  decoAreaGroup.setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
  decoAreaGroup.setAttribute("id", `DecoAreaID${decoArea.DecoAreaID}`)
  // decoAreaGroup.addEventListener("mousemove", mouseState)

  decoAreaSVG.appendChild(decoAreaGroup)

  // create a decoarea border
  if(true){
    decoAreaBorder = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    decoAreaBorder.setAttribute("class", "border")
    decoAreaBorder.setAttribute("height", decoArea.Template.Dimensions.DecoAreaHeight)
    decoAreaBorder.setAttribute("width", decoArea.Template.Dimensions.DecoAreaWidth)
    decoAreaBorder.setAttribute("x", 0)
    decoAreaBorder.setAttribute("y", 0)
    decoAreaBorder.setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
    decoAreaGroup.appendChild(decoAreaBorder)
  }



  // creating personalized areas
  personalizedAreaArray = decoArea.Template.PersonalizedObjects
  for (var y = 0; y < personalizedAreaArray.length; y++) {
    createPersonalizedObjects(decoAreaGroup, personalizedAreaArray[y].PersonalizedObject)
  }
}

function createPersonalizedObjects(decoAreaGroup, personalizedObject){
  // make another group for each personalized object
  // debugger
  personalizedObjectGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
  personalizedObjectGroup.setAttribute("height", personalizedObject.ObjectSpecs.ObjectHeight)
  personalizedObjectGroup.setAttribute("width", personalizedObject.ObjectSpecs.ObjectWidth)
  personalizedObjectGroup.setAttribute("x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))))
  personalizedObjectGroup.setAttribute("y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y"))))
  personalizedObjectGroup.setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
  personalizedObjectGroup.setAttribute("id", personalizedObject.PersonalizedObjectID )
  personalizedObjectGroup.setAttribute("class", "personalizedObjectGroup")
  personalizedObjectGroup.setAttribute("z", 2)
  decoAreaGroup.appendChild(personalizedObjectGroup)


  // create a personalized object border
  if(false){
    personalizedObjectBorder = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    personalizedObjectBorder.setAttribute("height", personalizedObject.ObjectSpecs.ObjectHeight)
    personalizedObjectBorder.setAttribute("width", personalizedObject.ObjectSpecs.ObjectWidth)
    personalizedObjectBorder.setAttribute("x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))))
    personalizedObjectBorder.setAttribute("y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y"))))
    personalizedObjectBorder.setAttribute("id", personalizedObject.PersonalizedObjectID)
    personalizedObjectBorder.setAttribute("style","stroke:black;stroke-width:1;fill-opacity:0.0")
    personalizedObjectGroup.appendChild(personalizedObjectBorder)
  }


  // add the personalization
  if(personalizedObject.AreaType == "IMG"){
    svgPersonalizedeElement = document.createElementNS("http://www.w3.org/2000/svg", 'image');
    svgPersonalizedeElement.setAttribute("href", personalizedObject.IMG)
    svgPersonalizedeElement.setAttribute("height", personalizedObject.ObjectSpecs.ObjectHeight)
    svgPersonalizedeElement.setAttribute("width", personalizedObject.ObjectSpecs.ObjectWidth)
    svgPersonalizedeElement.setAttribute("x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))))
    svgPersonalizedeElement.setAttribute("y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y"))))
    svgPersonalizedeElement.setAttribute("id", `PersonalizedObjectID${personalizedObject.PersonalizedObjectID}`)
    svgPersonalizedeElement.setAttribute("data-personalizedobjectid",personalizedObject.PersonalizedObjectID)
    // svgPersonalizedeElement.addEventListener("mousedown", function(){ mousedown(svgPersonalizedeElement) })
    // svgPersonalizedeElement.addEventListener("mouseup", function(){ mouseup() })
    personalizedObjectGroup.appendChild(svgPersonalizedeElement)
  }

  else if(personalizedObject.AreaType == "Text"){
    svgPersonalizedeElement = document.createElementNS("http://www.w3.org/2000/svg", 'text')
    svgPersonalizedeElement.setAttributeNS(null, "x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))));
    svgPersonalizedeElement.setAttributeNS(null, "y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y")))+personalizedObject.FontSize);
    svgPersonalizedeElement.setAttributeNS(null, "font-size", personalizedObject.FontSize);
    svgPersonalizedeElement.setAttributeNS(null, "font-family", personalizedObject.Font);
    svgPersonalizedeElement.setAttribute("id", `PersonalizedObjectID${personalizedObject.PersonalizedObjectID}`)
    svgPersonalizedeElement.setAttribute("data-personalizedobjectid",personalizedObject.PersonalizedObjectID)

    // debugger
    svgPersonalizedeElement.innerHTML = personalizedObject.Text
    personalizedObjectGroup.appendChild(svgPersonalizedeElement)
  }
  //gives it the parent svg data-decoareaid
  svgPersonalizedeElement.setAttribute("data-decoareaid", decoAreaGroup.parentElement.getAttribute('data-decoareaid'))
  svgPersonalizedeElement.addEventListener("mousedown", function(e) {
      mouseState1(personalizedObject, e)
  })
  svgPersonalizedeElement.addEventListener("dblclick", function(e) {
      doubleClickObject(personalizedObject, e)
  })


  // $(`#PersonalizedObjectID${personalizedObject.PersonalizedObjectID}`).on('mousedown mouseup', function(event) {
  //   // debugger
  //     mouseState1(personalizedObject, event)
  // });


}



// $('.personalizedObjectGroup').on('mousedown mouseup', function mouseState(e) {
//     if (e.type == "mousedown") {
//         //code triggers on hold
//         objectSelectedBool = true
//         selectedObject = e.delegateTarget
//
//         console.log(`object selected x:${oldXPosition}, y:${oldYPosition}`);
//         // console.log(objectSelectedBool);
//         // debugger
//         // console.log(e);
//         oldXPosition = e.pageX
//         oldYPosition = e.pageY
//     }
// });
function mouseState1(personalizedObject, e){
  // debugger
  if (e.type == "mousedown") {
      //code triggers on hold
      selectedJSONObject = personalizedObject
      selectedObject = e.target
      objectSelectedBool = true

      // console.log(`object selected x:${oldXPosition}, y:${oldYPosition}`);
      // console.log(objectSelectedBool);
      // debugger
      // console.log(e);
      oldXPosition = e.pageX
      oldYPosition = e.pageY
  }
}


$('svg').on('mouseup', function mouseState(e) {
    // if (e.type == "mousedown") {
    //     //code triggers on hold
    //     console.log("hold");
    // }
    if (e.type == "mouseup") {
        //code triggers on hold
        objectSelectedBool = false
        // console.log("object dropped");
        // console.log(objectSelectedBool);
    }
});



function moveObject(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement){
  // debugger
  validateMovement(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement)

  selectedObject.setAttribute("x", (parseFloat(selectedObject.getAttribute("x"))+xPositionMovement/pxTOmmConversion))
  selectedObject.setAttribute("y", (parseFloat(selectedObject.getAttribute("y"))+yPositionMovement/pxTOmmConversion))
  // // debugger
  // get the subsection we're in and cycle through those DecoAreas
  // find the
  var selectedObjectSVGID = selectedObject.id
  var selectedDecoAreaSVGID = selectedObject.parentElement.parentElement.parentElement.id
  var selectedObjectSubsectionSVGID = selectedObject.parentElement.parentElement.parentElement.parentElement.id

  var selectedObjectY = selectedObject.getAttribute("y")
  var selectedObjectX = selectedObject.getAttribute("x")
  selectedJSONObject.ObjectSpecs.ObjectYOffset = parseFloat(selectedObjectX = selectedObject.getAttribute("y"))
  selectedJSONObject.ObjectSpecs.ObjectXOffset = parseFloat(selectedObjectX = selectedObject.getAttribute("x"))


  // find the subsection in the json
  // for (var i=0 ; i < jsonObject.Product.Subsections.length ; i++){
  //   var selectedSubsectionJSON = jsonObject.Product.Subsections[i].Subsection
  //   var selectedSubsectionJSONID = selectedSubsectionJSON.SubsectionID
  //   // debugger
  //     if (selectedObjectSubsectionSVGID == selectedSubsectionJSONID) {
  //       // find the deco area in the json
  //       for (var x = 0; x < selectedSubsectionJSON.DecoAreas.length; x++) {
  //         var decoAreaJSON = selectedSubsectionJSON.DecoAreas[x].DecoArea
  //         var decoAreaJSONID = decoAreaJSON.DecoAreaID
  //         if(`DecoAreaID${decoAreaJSONID}` == selectedDecoAreaSVGID){
  //
  //           for (var z = 0; z < decoAreaJSON.Template.PersonalizedObjects.length; z++) {
  //             var personalizedObjectJSON = decoAreaJSON.Template.PersonalizedObjects[z].PersonalizedObject
  //             var personalizedObjectJSONID = personalizedObjectJSON.PersonalizedObjectID
  //
  //             if(`PersonalizedObjectID${personalizedObjectJSONID}` == selectedObjectSVGID){
  //               // console.log(`got it. it's index ${z},  personalized area ${selectedObjectSVGID} in subsection id ${selectedSubsectionJSONID} deco area ${decoAreaJSONID} personalized area ${personalizedObjectJSONID}`)
  //
  //               // change the JSON X and Y coordinates
  //               var selectedObjectY = selectedObject.getAttribute("y")
  //               var selectedObjectX = selectedObject.getAttribute("x")
  //               personalizedObjectJSON.ObjectSpecs.ObjectXOffset = selectedObject.getAttribute("x")
  //               personalizedObjectJSON.ObjectSpecs.ObjectYOffset = selectedObject.getAttribute("y")
  //             }
  //           }
  //         }
  //       }
  //     }
  // }
}

function validateMovement(selectedObject, xPositionMovement, yPositionMovement, decoAreaElement){
  // debugger
  // var futureYPosition = parseFloat(selectedObject.getAttribute("y"))+yPositionMovement
  // var futureXPosition = parseFloat(selectedObject.getAttribute("x"))
  var decoYMax = parseFloat(decoAreaElement.getAttribute("y"))
  var decoXMax = parseFloat(decoAreaElement.getAttribute("x"))
  var decoYMin = parseFloat(decoAreaElement.getAttribute("y"))+parseFloat(decoAreaElement.getAttribute("height"))
  var decoXMin = parseFloat(decoAreaElement.getAttribute("x"))+parseFloat(decoAreaElement.getAttribute("width"))

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


function mouseState(e){
    if(objectSelectedBool){
      // console.log("MOVING AND SELECTED")
      xPositionMovement = e.pageX - oldXPosition
      yPositionMovement = e.pageY - oldYPosition
      oldXPosition = e.pageX
      oldYPosition = e.pageY

      moveObject(selectedObject, xPositionMovement, yPositionMovement, e.currentTarget)
      // //debugger
    }
    else{
      console.log("MOVING")
    }
}
// console.log(`item was moved ${xPositionMovement} in the x`)
function debug(){
  if(debugBool){
    debugger
  }
}
function debugTrue(){
  debugBool = true
}
function debugFalse(){
  debugBool = false
}

function doubleClickObject(personalizedObject, e){
  // debugger
  console.log("doubley")
}
