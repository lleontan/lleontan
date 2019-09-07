
  //Challenge Code
  //Variable initialization.
  var canvas=d3.select("#canvas");
  var jsonData=.........;       //Get JSON data from api
  var theData=[];
  var ovals=[];
  var startX;
  var startY;
  var freeze=true;
  var thetaLeft=10;           //left,y mag
  var thetaRight=10;           //right,x mag
  var startingLength=$("#canvas").height()/4.2;
  var branchesPerGen=2;
  var currentRepoIndex=0;

  //Default language colors.
  var colorTable={
    "Java":"#ff4d4d",
    "Python":"#1aff1a",
    "R":"#ff8c1a",
    "JavaScript":"#FFA500",
    "C#":"#7575a3",
    "C++":"#660066"
  }
  var borderColors={
    "Java":"#000000",
    "Python":"#fc6a16",
    "R":"#7575a3",
    "JavaScript":"#2a9dad",
    "C#":"#ff8c1a",
    "C++":"#160466"
  }
  $(document).ready(function(){
    //Draw a tree and update freeze css.
    mouseMoving(undefined,3.14/7+.1,3.14/7+.2);
    if(freeze){
      $('.freezeToggle').css('color','blue');
      }
    else{$('.freezeToggle').css('color','#FF8533');
  }});
  function mouseMoving(event,tryThetaRight,tryThetaLeft){
    //On mouse move, calculate the tree and update the canvas.
    if(repoCount<=0){
      return;
    }
    $('#canvas').empty();
    if(tryThetaRight==undefined){
      thetaRight = event.pageX*3.1415*.0011-1.18;
    }else{
      thetaRight=tryThetaRight;
    }
    if(tryThetaRight==undefined){
      thetaLeft = event.pageY*3.1415*.0013+-2.28;
    }else{
      thetaLeft=tryThetaLeft;
    }
    startY=$('#canvas').height()-1;
    startX=$('#canvas').width()/2;
    if(thetaRight!=undefined&&thetaLeft!=undefined){
      theData=[];
      ovals=[];
      var repoCount=jsonData.length;
      currentRepoIndex=0;
      branch(startX,startY,startX,startY-startingLength,startingLength,4,3*3.14/2,repoCount);
      updateLines();
    }
  }

  createLine2 = function (x1, y1, x2, y2, w,d, theta) {
    //draws a line between points of width at angle theta.
    var l={"x1":x1,"y1":y1,"x2":x2,"y2":y2,'dis':d,"w":w,"theta":theta}
      theData.push(l);
  }
  function getLanguageColor(language,table){
    //Given a table of key:hexcolor values get
    //the hex of the index or generate a new one.
    var lang=table[language];
      if(lang==undefined){
        var newLang='#'+Math.floor(Math.random()*16777215).toString(16);
        table[language]=newLang;
        return newLang;
      }
    return lang;
  }
  function branch(x,y,x2,y2,length,width, theta, children){
    /* recursive function,
    Draws line.
    Then calls 2 lines with +- theta, adds +-theta to theta 1/2.
    At the end if children=0 draw colored circles instead of lines, then return.
    Each generation, children=Math.floor(children/2), ++ for one if %2==1.
    Divide width and height by 2 each generation.
    End when children==0.
    Variable copies are the result of some shennanigans with pass by reference.*/
    var thisChildren=children;
    if(thisChildren==0){
      var thisBranchData=jsonData[currentRepoIndex];
      currentRepoIndex++;
      if(thisBranchData!=undefined){
        var thisColor=thisBranchData["main_language"];
        if(thisColor==undefined){
          thisColor="No Language";
        }
        var radius=length*0.06*thisBranchData["forks_count"]+6;
        var stroke=getLanguageColor(thisBranchData["main_language"],borderColors);
        var strokeWidth=length*.04+.1;
        if(radius>15){
          radius=15+0.07*thisBranchData["forks_count"];
          strokeWidth*=2.2;
        }
        var l={"cx":x,"cy":y,"r":radius,
          'color':getLanguageColor(thisColor,colorTable),
          'stroke':stroke,
          'stroke-width':strokeWidth,
          'name':thisBranchData["name"]+":"+thisColor+":"+thisBranchData["forks_count"]+" forks."
        }
        ovals.push(l);
      }
    }
    else{
      createLine2(x,y,x2,y2,width,length,theta);
      var newChildCount=Math.floor(thisChildren/branchesPerGen);
      var isOdd=thisChildren%2;
      generateLine(x2,y2,theta,-thetaLeft,length/1.29,width/1.15,newChildCount);
      var newChildCount2=Math.floor(thisChildren/branchesPerGen);
      var nX2=x2+0;
      var nY2=y2+0;
      var theta2=theta+0;
      if(newChildCount!=0){
        generateLine(nX2,nY2,theta2,thetaRight,length/1.3,width/1.15,newChildCount+isOdd);
      }
    }
  }
  function generateLine(x1,y1,theta,addTheta,length,width,children){
    //Calculate a new branch
    var newx=length*Math.cos(addTheta+theta)+x1;
    var newy=length*Math.sin(addTheta+theta)+y1;
    branch(x1,y1,newx,newy,length,width,theta+addTheta,children);
  }

  function updateLines(){
    //Render the tree.
    d3.select(".tooltipDiv").remove();
    var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
  .attr("class", "tooltipDiv")
	.style("visibility", "hidden")
	.text("tooltip");
  var l=d3.select('#canvas').selectAll('line').data(theData);
  l.enter().append('line')
  .attr('x1', function(d,i){return theData[i]['x1'];})
  .attr('y1', function(d,i){return theData[i]['y1'];})
  .attr('x2', function(d,i){return theData[i]['x2'];})
  .attr('y2', function(d,i){return theData[i]['y2'];})
  .attr('stroke-width',function(d,i){return theData[i]['w'];})
  .attr('stroke','black');
  l.exit().remove();
  var s=d3.select('#canvas').selectAll('circle').data(ovals);
  s.enter().append('circle')
  .attr('cy',function(d,i){return ovals[i]['cy'];})
  //.attr('z-index',function(d,i){return d.r;})
  .attr('cx',function(d,i){return ovals[i]['cx'];})
  .attr('r',function(d,i){return ovals[i]['r'];})
  .attr('fill',function(d,i){return ovals[i]['color'];})
  .attr('stroke',function(d,i){return ovals[i]['stroke'];})
  .attr('stroke-width',function(d,i){return ovals[i]['stroke-width'];})
  .attr("name",function(d){
    return d.name;
    })
    .on("mouseover", function(d,i){return tooltip.style("visibility", "visible").text(d.name);})
.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
.on("mouseout", function(){
  tooltip.empty();
  return tooltip.style("visibility", "hidden");});
  s.exit().remove();
}
$(document).keypress(function(event){
  var k=event.which;
  if(k==102){
  //f button
    freeze=!freeze;
  }
  if(freeze){
    $('.freezeToggle').css('color','blue');
    }
  else{$('.freezeToggle').css('color','#FF8533');
}
});
$( document ).mousemove(
  function(event){
    if(!freeze){
      mouseMoving(event);
    }
    //freeze=true;
  }
);
