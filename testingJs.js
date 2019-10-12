$(document).ready(function() {
    $("#woee").text("Press Button to get request food api");
});

function testy(food){
    //alert(food);
    $('#foodName').html(food);

    var urlFood=encodeURI(food);
    $.get( "https://api.edamam.com/api/food-database/parser?ingr="+urlFood+"&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0", function( data, status) {
        console.log(data);
        var obj=data;
        //var objs;
        //console.log(data.hints[0].measures[1].label);
        var foodId;

        $.each(obj, function (key, value) {
            if(key=="hints"){
                //objs=value[0];
                console.log(value[0]);
                foodId=value[0].food.foodId;
                console.log("Food Id: "+foodId);
            }
        });

        /*
        $.each(objs, function(key, value){
            if(key=="food"){
                console.log(value);
            }
        });*/

        var nutrientReq={
            "ingredients": [
                {
                    "quantity": 100,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "foodId": foodId,
                }
            ]
        };

        $.ajax({
            type: "POST",
            data :JSON.stringify(nutrientReq),
            url: "https://api.edamam.com/api/food-database/nutrients?app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0",
            contentType: "application/json",
            success: function(glyc){
                console.log(glyc);
                //$("#result").html(glyc);
            }
        });


        //var testyJSON=JSON.parse(data);
        //console.log(testyJSON);
        alert( "Load was performed." + JSON.stringify(data) );
    });


}