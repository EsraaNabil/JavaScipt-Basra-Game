var imageCard=document.getElementsByClassName("card");
var imagecard=[];
for(i=0;i<imageCard.length;i++){
    imagecard.push(imageCard[i]);
};
var ar=[];
var imageArray=imagecard.concat(ar);
var image=[];
for(copy=0;copy<imageArray.length;copy++){
    image.push(imageArray[copy]);
};
var deck=document.getElementById("deck");
var back=document.getElementById("back");
var design=document.getElementById("groundArea");
var groundArea=document.getElementsByClassName("groundArea1");
var playerArea=document.getElementsByClassName("playerArea");
var computerArea1=document.getElementsByClassName("computerArea1");
var computerArea2=document.getElementsByClassName("computerArea2");
var button=document.getElementById("button");
var n=0;
var count=1;
var score=0;
$(".computerDiv img").css("visibility","visiable");

/////////////////// function for making combination for sum of cards /////////////////
      function removeFromArray(array, id){
        for(var x=0; x < array.length; x++){
            if ( array.eq(x).attr("id") == id){
                array.eq(x).remove();
                score++;
                break;
            }
        }
      }
      function sum_up_target(numbers, target, partial){
        debugger;
        var s= 0;
        for (var x = 0; x <  partial.length; x++){
          
           s += partial[x]; 
        }   
       if (s == target){
            for(var p=0;p < partial.length;p++){
                var found=false;
                for(var g=0; g < $(".groundArea img").length;g++){
                    if (partial[p] == $(".groundArea img").eq(g).attr("id")) {
                        found=true;
                        break;
                    }
                }
                if (found == false) {
                    return;
                }
            }
            sumSolutions++;
            for(var h=0; h < partial.length;h++){
                
                removeFromArray($(".groundArea img"), partial[h]);
            }
       }
       if (s >= target)
            return;
       for(var i=0;i<numbers.length;i++) {
             var remaining = [];
             var n = numbers[i];
             for (var j=i+1; j<numbers.length;j++){
               remaining.push(numbers[j]);
             }
             var ar = [];
             var partial_rec = partial.concat(ar);
             partial_rec.push(n);
             sum_up_target(remaining,target,partial_rec);
       }
    }
      
button.addEventListener("click",click);
function click(){
    $(".basra").css("display","none");
    $(".round .theRound").html("Round 1");
    $(".round .pla").html("Turn : Player 1");
    $(".round").css("display","inline");
    $(".playerScore").css("display","inline");
    $(".computerScore").css("display","inline");
    deck.style.display="inline";
    $(".groundArea1").css("display","inline");
    $(".groundArea2").css("display","inline");
    $(".playerScore").css("display","inline");
    $(".computerScore").css("display","inline");
    playerArea.disabled = false;
    
////// ground area
    button.style.display="none";
    for(var i=0;i<4;i++){
       var random=Math.round(Math.random()*(image.length-1));
       var img=document.createElement("img");
       img.src=image[random].src;
       img.id=image[random].id;
       img.name=image[random].name;
       if (i<2) {
        groundArea[0].appendChild(img);
       }
       else{
        groundArea[1].appendChild(img);
       }
       var found = false;
       while(image[random].getAttribute("src")=="cards/jack_of_clubs.png" ||
           image[random].getAttribute("src")=="cards/jack_of_diamonds.png" ||
           image[random].getAttribute("src")=="cards/jack_of_hearts.png" ||
           image[random].getAttribute("src")=="cards/jack_of_spades.png") {
           found = true;
           random = Math.round(Math.random()*(image.length-1));
       }
       
       if (found == true) {
           img.src = image[random].src;
           img.id=image[random].id;
           img.name=image[random].name;
       }
       image[random].remove();
       image.splice(random,1);
       img.style.marginLeft="15px" ;
    }  
///// player area
    for(var i=0;i<4;i++){
       var random=Math.round(Math.random()*(image.length-1));
       var img=document.createElement("img");
       img.src=image[random].src;
       img.id=image[random].id;
       img.name=image[random].name;
       playerArea[0].appendChild(img);
       image[random].remove();
       image.splice(random,1);
       img.style.marginLeft="15px" ;
    }   
///// computer area
    for(var i=0;i<4;i++){
       var random=Math.round(Math.random()*(image.length-1));
       var img=document.createElement("img");
       img.src=image[random].src;
       img.id=image[random].id;
       img.name=image[random].name;
       var img2=document.createElement("img");
       img2.src=back.src;
       computerArea1[0].appendChild(img2);
       computerArea2[0].appendChild(img);
       //img2.style.display="none";
       image[random].remove();
       image.splice(random,1);
       img.style.marginLeft="15px" ;
       img2.style.marginLeft="15px" ;
    }

//////// playing action for player/////////////////////////
$(".playerArea img").on("click",function(){
   play(this);
  })
}

//////////////////////////// function for playing for player /////////////////////////////
function play (y){

 var found=false;
 if(y.id == 11||y.getAttribute("name")=="come") {
    found=true;
    /*if (parseInt($(".groundArea img").length)== 1 &&
        ($(".groundArea img")[0].id==$(".computerArea2 img").eq(random).attr("id")) ) {
        $(y).remove();
        $(".groundArea img").eq(0).remove();
        $(".playerScore span").html(parseInt($(".playerScore span").html())+1+10);
    }*/
    if (parseInt($(".groundArea img").length)!=0) {
        $(".playerScore span").html(parseInt($(".playerScore span").html())+1+$(".groundArea img").length);
        $(".groundArea img").remove();
        $(y).remove();
    }
    else{
        $(".groundArea div")[0].appendChild(y);
    }
 }
 else{
 var n=0;
 if (y.id <= 10) {
    var numbers = [];
    for(var s = 0; s< $(".groundArea img").length;s++){
      if ($(".groundArea img")[s].id <=10) {
        numbers.push(parseInt($(".groundArea img")[s].id));
      }
    }
    sumSolutions = 0;
    score=0;
    sum_up_target(numbers,y.id,[]);
    if (sumSolutions > 0) {
       $(".playerScore span").html(parseInt($(".playerScore span").html())+1+score);
       if ($(".groundArea img").length==0) {
          $(".playerScore span").html(parseInt($(".playerScore span").html())+9);
       }
       $(y).remove();
    }
    else{
        $(".groundArea div")[0].appendChild(y);
    }
    
 }
 else if(y.id == 12 || y.id == 13){
   for(i=($(".groundArea img").length)-1;i>=0;i--){
        if(y.id==$(".groundArea img")[i].id) {
        found=true;
        n++;
        $(".groundArea img").eq(i).remove();
        }
    }
    if (found==true) {
       $(".playerScore span").html(parseInt($(".playerScore span").html())+n+1);
       $(y).remove();
       if ($(".groundArea img").length==0) {
          $(".playerScore span").html(parseInt($(".playerScore span").html())+9);
       }
    }
    else{
        $(".groundArea div")[0].appendChild(y);
    }
 }   
}
 $(".playerArea").css("pointer-events","none");
 $(".playerScore span").html(parseInt($(".playerScore span").html()));
 $(".round .pla").html(" ");
 $(".round .comp").html("Turn : Player 2");
 setTimeout(function(){
    computer();
 },2000);
}

////////////////////////////// function for computer play ////////////////////////////
function computer(){
var random=Math.round(Math.random()*(($(".computerArea2 img").length)-1));
$(".computerArea1 img").eq(random).css("visibility","hidden");
var found=false;
setTimeout(function(){
    if($(".computerArea2 img").eq(random).attr("id")==11||$(".computerArea2 img").eq(random).attr("name")=="come"){
    found=true;
   /* if (parseInt($(".groundArea img").length)== 1 &&
        ($(".groundArea img")[0].id==$(".computerArea2 img").eq(random).attr("id"))) {
        $(".computerArea2 img").eq(random).remove();
        $(".groundArea img").eq(0).remove();
        $(".computerScore span").html(parseInt($(".computerScore span").html())+1+10);
    }*/
    if (parseInt($(".groundArea img").length)!=0) {
        $(".computerScore span").html(parseInt($(".computerScore span").html())+1+$(".groundArea img").length);
        $(".groundArea img").remove();
        $(".computerArea2 img").eq(random).remove();
    }
    else{
        $(".groundArea div")[0].appendChild($(".computerArea2 img")[random]);
    }
    $(".computerArea1 img").eq(random).remove();
 }
 else{
    debugger;
    if ($(".computerArea2 img").eq(random).attr("id") <= 10) {
      var numbers = [];
      for(var s = 0; s< $(".groundArea img").length;s++){
         if ($(".groundArea img")[s].id <=10) {
            numbers.push(parseInt($(".groundArea img")[s].id));
         }
      }
     sumSolutions = 0;
     score=0;
     sum_up_target(numbers,$(".computerArea2 img").eq(random).attr("id"),[]);
    if (sumSolutions > 0) {
       $(".computerScore span").html(parseInt($(".computerScore span").html())+1+score);
       if ($(".groundArea img").length==0) {
          $(".computerScore span").html(parseInt($(".computerScore span").html())+9);
       }
       $(".computerArea2 img").eq(random).remove();
    }
    else{
        $(".groundArea div")[1].appendChild($(".computerArea2 img")[random]);
    }
    $(".computerArea1 img").eq(random).remove();
   }
    else if ($(".computerArea2 img").eq(random).attr("id")==12
        || $(".computerArea2 img").eq(random).attr("id")==13) {
           var n=0;
           for(i=($(".groundArea img").length)-1;i>=0;i--){
               if($(".computerArea2 img").eq(random).attr("id")==$(".groundArea img").eq(i).attr("id")) {
                   found=true;
                   n++;
                   $(".groundArea img").eq(i).remove();
                }
            }
            if (found==true) {
                $(".computerScore span").html(parseInt($(".computerScore span").html())+n+1);
                $(".computerArea2 img").eq(random).remove();
               if ($(".groundArea img").length==0) {
                   $(".computerScore span").html(parseInt($(".computerScore span").html())+9);
                }
            }
 
            else{
                 $(".groundArea div")[1].appendChild($(".computerArea2 img")[random]);
            }
            $(".computerArea1 img").eq(random).remove();
    }
 } },1000);
 $(".playerArea").css("pointer-events","auto");
 $(".round .comp").html(" ");
 $(".round .pla").html("Turn : Player 1");
 setTimeout(function(){
   if (image.length!=0 && parseInt($(".computerArea2 img").length)==0) {
     clickagain();
   }
   game();
 },2000);
}

////////////////////////// round function //////////////////////////
function clickagain(){
    count++;
    $(".round .theRound").html("Round" +"  "+ count);
    if (count==6) {
        $(".ground .deck").css("display","none");
    }
///// player area
    for(var i=0;i<4;i++){
       var random=Math.round(Math.random()*(image.length-1));
       var img=document.createElement("img");
       img.src=image[random].src;
       img.id=image[random].id;
       img.name=image[random].name;
       playerArea[0].appendChild(img);
       image[random].remove();
       image.splice(random,1);
       img.style.marginLeft="15px" ;
    }   
///// computer area
    for(var i=0;i<4;i++){
       var random=Math.round(Math.random()*(image.length-1));
       var img=document.createElement("img");
       img.src=image[random].src;
       img.id=image[random].id;
       img.name=image[random].name;
       var img2=document.createElement("img");
       img2.src=back.src;
       computerArea1[0].appendChild(img2);
       computerArea2[0].appendChild(img);
       //img2.style.display="none";
       image[random].remove();
       image.splice(random,1);
       img.style.marginLeft="15px" ;
       img2.style.marginLeft="15px" ;
    }

/////////////////// playing action for player/////////////////////////
 $(".playerArea img").on("click",function(){
  play(this);
 })
}

////////////////////////////// play again ////////////////////////////////
function game() {

     if (image.length==0 && parseInt($(".computerArea2 img").length)==0) {
     count=1;
     $(".round").css("display","none");
     $(".groundArea1").css("display","none");
     $(".groundArea2").css("display","none");
     $(".playerScore").css("display","none");
     $(".computerScore").css("display","none");
     $(".groundArea1").html(" ");
     $(".groundArea2").html(" ");
     deck.style.display="none";
     if (parseInt($(".playerScore span").html()) >  parseInt($(".computerScore span").html())) {
        var score=document.createElement("div");
        score.innerHTML="Congratulations you are a winner";
        score.style.textShadow=" 2px 2px 15px  white";
        setTimeout(function(){score.style.display="none"},4000);
        score.style.color="white";
        score.style.fontSize="60px";
        score.style.textAlign="center";
        score.style.marginBottom="40px";
        design.appendChild(score);
        button.style.display="block";
        button.style.borderRadius="25px";
        button.innerText="Play again";
        button.style.width="140px";
        button.style.height="45px";
        button.style.marginLeft="67px";
        $(".playerScore span").html(0);
        $(".computerScore span").html(0);
        $(".groundArea1").html(" ");
        $(".groundArea2").html(" ");
     }
     else{
        button.style.display="block";
        button.style.borderRadius="25px";
        button.innerText="Try again";
        button.style.width="140px";
        button.style.height="45px";
        button.style.marginLeft="67px";
        $(".playerScore span").html(0);
        $(".computerScore span").html(0);
        $(".groundArea1").html(" ");
        $(".groundArea2").html(" ");
     }
var ar=[];
for(copy=0;copy<imageArray.length;copy++){
    ar.push(imageArray[copy]);
 };
image=ar;
  }
}
