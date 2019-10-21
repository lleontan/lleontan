/*This file makes images collapsable and expandable on click*/

const ARTWORK = [{
    src: "testWoman.png",
    altText: "A generic female character.",
    description:"A female character made without sculpting."
  },
  {
      src: "testHeadBust.png",
      altText: "A generic female character.",
      description:"Head closeup"
    },
    {
        src: "texturingWorkflow.jpeg",
        altText: "A generic female character's texturing.",
        description:"Hair ring shader. White emission bands based on camera Z."
      },
  {
    src: "garand.png",
    altText: "Rifle based off of a m1 garand.",
    description:"Rifle based off of a m1 garand."

  },
  {
    src: "DonutsWide.png",
    altText: "A test scene I did to teach myself particle systems.",
    description:"A test scene I did to teach myself particle systems."
  },
  {
    src: "bow.jpeg",
    altText: "A simple bow themed after a nautilus shell.",
    description:"A simple bow themed after a nautilus shell."
  },  {
      src: "sittingPose.jpg",
      altText: "Same character, but seated.",
      description:"Same character, but seated."
    },
];
let drawImages = function () {
  let largeImageDisplayDiv = document.getElementById("largeImageDisplayDiv");
  let largeImageDisplay = document.getElementById("largeImageDisplay");
  let parentDiv = document.getElementById("imagesDiv");
  let count = 0;
  for (imageData of ARTWORK) {
    try {
      let imageDiv = document.createElement("div");
      imageDiv.className="artDiv";
      let image = document.createElement("img");
      image.setAttribute('src', imageData.src);
      image.setAttribute('title', imageData.altText);
      largeImageDisplay.setAttribute("imageId", count);

      let src=imageData.src;
      let altText=imageData.altText;
      let description=imageData.description;

      image.onclick = function () {
        largeImageDisplayDiv.style.visibility = "visible";
        largeImageDisplay.setAttribute('src', src);
        largeImageDisplay.setAttribute('title', altText);
        document.getElementById("imageDesciption").textContent=description;
      }
      imageDiv.appendChild(image);
      parentDiv.appendChild(imageDiv);
      count++;
    } catch (err) {
      console.log("Image not found");
    }
  }
}

let drawCollapsableImages=function() {
  drawImages();
  document.getElementById("closeLargeImageButton").onclick = function () {
    console.log("Buttonclicked");
    let largeImageDisplayDiv = document.getElementById("largeImageDisplayDiv");
    largeImageDisplayDiv.style.visibility='hidden';
  }
}
