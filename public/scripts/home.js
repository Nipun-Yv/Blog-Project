var x;
$(window).on("load",function(){
    $(".special>form").hide();
    $(".special>div").show();
})
$(".special").click(function(event){
    var y=Number($(this).attr("class").split(/\s+/)[1]);
    $("."+y+">form").show();
    $("."+y+">div").hide();
})
$(".special").mouseleave(function(){
    var y=Number($(this).attr("class").split(/\s+/)[1]);
    $("."+y+">form").hide();
    $("."+y+">div").show();
})
$(".special>form>button").mouseover(function(){
    $(this).css("background-image","linear-gradient( to bottom right,white,pink)")
    $(this).css("color","purple");
})
$(".special>form>button").mouseleave(function(){
    $(this).css("background-image","linear-gradient(to bottom right,blueviolet,deeppink,pink)")
    $(this).css("color","white");
})