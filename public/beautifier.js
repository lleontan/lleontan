"use script";
(function(){
  const CONTACT_LOGOS=[
    {src:"GitHub-Mark-120px-plus.png",href:"https://github.com/lleontan", altText:"Github"},
    {src:"gmailLogo.png",href:"mailto:lleontan@gmail.com", altText:"Gmail"},
    {src:"LI-In-Bug.png",href:"https://www.linkedin.com/in/leon-tan-054a64173/", altText:"LinkedIn"}
  ];
  const HEADER_TEXT="lleontan";
  const BANNER_LINKS=[
    {
      name:"Home",
      link:"index.html"
    },
    {
      name:"Projects",
      link:"projects.html"
    },
    {
      name:"Other",
      link:"other.html"
    },
    {
      name:"Art",
      link:"artwork.html"
    }
  ];

  let drawBanner=function(){
    let headerParent=document.querySelector("#banner");
    let headerElement=document.createElement("h1");
    headerElement.innerText=HEADER_TEXT;
    headerParent.appendChild(headerElement);

    let headerLinksDiv=document.createElement("div");
    headerLinksDiv.className="headerLinksDiv";
    for(let linkIndex in BANNER_LINKS){
      let listElement=BANNER_LINKS[linkIndex];
      let newElement=document.createElement("li");
      let newLink=document.createElement("a");
      newLink.setAttribute("href",listElement.link);
      newLink.innerText=listElement.name;
      newElement.appendChild(newLink);
      headerLinksDiv.appendChild(newElement);
    }
    headerParent.appendChild(headerLinksDiv);
    let logoDiv=document.createElement("div");
    logoDiv.className="logoDiv";
    drawLogos(logoDiv);
    headerParent.appendChild(logoDiv);
  }

  let drawLogos=function(parentElement){
    for(logo of CONTACT_LOGOS){
      let enclosingBorder=document.createElement("div");
      let logoLink=document.createElement("a");


      let newLogo=document.createElement("img");
      logoLink.setAttribute("href",logo.href);
      newLogo.setAttribute("src",logo.src);
      newLogo.setAttribute("title",logo.altText);
      logoLink.appendChild(newLogo);
      enclosingBorder.appendChild(logoLink);
      parentElement.appendChild(enclosingBorder);
    }
  }
  window.onload=function(){
    drawBanner();
  };

})();
