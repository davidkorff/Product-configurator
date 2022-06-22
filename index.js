window.onload = dotheStuff()

function dotheStuff(){
  console.log("hello")
  console.log(jsonObject)

  var pxtomm = 0.264583333333334
  var conv = 1
  var pxconv = pxtomm/conv

  function loadImage(newImage, personalizeArea, personalizedObject, templateDimensions) {

    let image = document.createElement("img")
    image.src = newImage.src
    image.onload = function() {
      console.log("image is loaded")
      console.log("inside")
      console.log(image)
      personalizeArea.drawImage(image, (personalizedObject.ObjectSpecs.ObjectXOffset+templateDimensions.DecoAreaXOffset)/pxconv,       (personalizedObject.ObjectSpecs.ObjectYOffset+templateDimensions.DecoAreaYOffset)/pxconv, (personalizedObject.ObjectSpecs.ObjectWidth)/pxconv, (personalizedObject.ObjectSpecs.ObjectHeight)/pxconv);
    }
  }
  // debugger


  for (var i = 0; i < jsonObject.Product.Subsections.length; i++) {
    var canvas = document.createElement("CANVAS")
    document.getElementById('canvas1').appendChild(canvas);

    canvas.style.borderStyle = "Solid"
    canvas.style.borderColor = "red";
    canvas.height = `${jsonObject.Product.Subsections[i].Subsection.MaxTemplate.Height}`/pxconv
    canvas.width = `${jsonObject.Product.Subsections[i].Subsection.MaxTemplate.Width}`/pxconv


    for (var x = 0; x < jsonObject.Product.Subsections[i].Subsection.DecoAreas.length; x++) {
      const designArea = canvas.getContext('2d');
      var templateDimensions = jsonObject.Product.Subsections[i].Subsection.DecoAreas[x].DecoArea.Template.Dimensions

      designArea.strokeRect(templateDimensions.DecoAreaXOffset/pxconv, templateDimensions.DecoAreaYOffset/pxconv, templateDimensions.DecoAreaWidth/pxconv, templateDimensions.DecoAreaHeight/pxconv);

      for (var y = 0; y < jsonObject.Product.Subsections[i].Subsection.DecoAreas[x].DecoArea.Template.PersonalizedObjects.length; y++) {
        personalizedObject = jsonObject.Product.Subsections[i].Subsection.DecoAreas[x].DecoArea.Template.PersonalizedObjects[y].PersonalizedObject

        const personalizeArea = canvas.getContext('2d');

        var personalizeDimensions = personalizeArea.strokeRect((personalizedObject.ObjectSpecs.ObjectXOffset+templateDimensions.DecoAreaXOffset)/pxconv, (personalizedObject.ObjectSpecs.ObjectYOffset+templateDimensions.DecoAreaYOffset)/pxconv, (personalizedObject.ObjectSpecs.ObjectWidth)/pxconv, (personalizedObject.ObjectSpecs.ObjectHeight)/pxconv);

        if(personalizedObject.AreaType == "IMG"){
          let newImage = new Image();
          newImage.src = personalizedObject.IMG

          loadImage(newImage, personalizeArea, personalizedObject, templateDimensions)
        }
        else if (personalizedObject.AreaType == "Text"){
          console.log("it's text")
          // debugger
          personalizeArea.font = `${personalizedObject.FontSize*pxtomm} ${personalizedObject.Font}`
          personalizeArea.fillText(personalizedObject.Text,(personalizedObject.ObjectSpecs.ObjectXOffset+templateDimensions.DecoAreaXOffset)/pxconv, (personalizedObject.ObjectSpecs.ObjectYOffset+templateDimensions.DecoAreaYOffset)/pxconv+10)
        }


        }

      }
    }


  }
// IMAGE KEEPS COMING AT THE FUCKING End



  // debugger

//   const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//   cir1.setAttribute("cx", 0 );
//   cir1.setAttribute("cy", 0 );
//   cir1.setAttribute("r", 50);
//
//     // attach it to the container
// svg1.appendChild(cir1);
//     // attach container to document
