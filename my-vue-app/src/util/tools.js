export const tools = {
   get16Color(){
    var colorElements = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    var colorArray = colorElements.split(",");
    var color ="#";
    for(var i =0;i<6;i++){
        color+=colorArray[Math.floor(Math.random()*16)];
    }
    return color;
  },
  fontSize(){
    let size = Math.floor(Math.random()*8)+20
    return size + "px"
  }
}