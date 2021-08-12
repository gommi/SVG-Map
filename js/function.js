//$(window).resize(function(){location.reload();});

var code = "https://docs.google.com/spreadsheets/d/1H7LrJ_Z8nIgJuclt0Do3s-MS0suV5c0IAp1DHLmKmBQ/pubhtml";

//var code = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlj-PkhHWJI4c9AWXEoYB8eSyeX1nYPN8v-XIG-S6I5VK0HQgWNuavnxC-4u8UbiQS70rhCRfS45Kr/pubhtml?gid=0&single=true"
//var code = 'https://docs.google.com/spreadsheets/d/2PACX-1vRlj-PkhHWJI4c9AWXEoYB8eSyeX1nYPN8v-XIG-S6I5VK0HQgWNuavnxC-4u8UbiQS70rhCRfS45Kr/pubhtml';

categoryArr = [];
categoryName = ["Gas station", "Hotel", "Rent a Car", "Shop", "Restuarant", "Golf", "Marina", "Village", "Hotel Office"];

function init() {
  Tabletop.init({ 
      key: code,
        callback: function(sheet) {     
            console.log(sheet);
                for (var i in sheet){
                    var place = sheet[i];
                    categoryArr.push({"layerId": place.layerid, "category": place.catname, "id": place.id, "imeObj": place.layer_name, "subTitle":place.subtitle, "time":place.time, "address":place.address, "phone":place.phone, "email":place.email, "site":place.site, "instagram":place.instagram, "facebook":place.facebook, "price":place.price, "description": place.description, "imgLogo":place.imglogo, "tip": place.type, "iconImg": place.iconimg, "lat":place.lat, "lng":place.lng, "phoneIcon":place.phoneicon});
                }
                $('#mapa').load('mapaThree.svg');
                    setTimeout(function() {
                        var eventsHandler;

                        eventsHandler = {
                        haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'], 
                        init: function(options) {
                            var instance = options.instance, 
                            initialScale = 1,
                            pannedX = 0,
                            pannedY = 0

                            // Init Hammer
                            // Listen only for pointer and touch events
                            this.hammer = Hammer(options.svgElement, {
                            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                            })

                            // Enable pinch
                            this.hammer.get('pinch').set({enable: true})

                            // Handle double tap
                            this.hammer.on('doubletap', function(ev){
                            instance.zoomIn()
                            })

                            // Handle pan
                            this.hammer.on('panstart panmove', function(ev){
                            // On pan start reset panned variables
                            if (ev.type === 'panstart') {
                                pannedX = 0
                                pannedY = 0
                            }

                            // Pan only the difference
                            instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
                            pannedX = ev.deltaX
                            pannedY = ev.deltaY
                            })

                            // Handle pinch
                            this.hammer.on('pinchstart pinchmove', function(ev){
                            // On pinch start remember initial zoom
                            if (ev.type === 'pinchstart') {
                                initialScale = instance.getZoom()
                                instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
                            }

                            instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
                            })

                            // Prevent moving the page on some devices when panning over SVG
                            options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
                        }

                        , destroy: function(){
                            this.hammer.destroy()
                        }
                        }

                        panZoomTiger = svgPanZoom('#svgMapa', {
                            zoomEnabled: true,
                            controlIconsEnabled: false,
                            fit: true,
                            center: 1,
                            minZoom: 0.1,
                            customEventsHandler: eventsHandler
                        });
                            panZoomTiger.resize();
                            panZoomTiger.fit();
                            panZoomTiger.center();

                            document.getElementById('zoom-in').addEventListener('click', function(ev){
                                ev.preventDefault()

                                panZoomTiger.zoomIn()
                            });

                            document.getElementById('zoom-out').addEventListener('click', function(ev){
                                ev.preventDefault()

                                panZoomTiger.zoomOut()
                            });

                            document.getElementById('reset').addEventListener('click', function(ev){
                                ev.preventDefault()

                                panZoomTiger.resetZoom()
                            });


                        $("#mapa > svg [id]").each(function () {
                            //console.log($(this).attr('id'));
                            for (c = 0; c < categoryArr.length; c++) {
                               if($(this).attr('id')==categoryArr[c]["layerId"]){
                                   $(this).addClass("pulsiranje")                     
                                } 
                            }
                             //console.log($(this).attr('id'));
                            //if($(this).attr('id')=="GolfCourt1"){
                                //console.log($(this).attr('id'));
                                //$("#GolfCourt1").css({ fill: "#ff0000" });
                            //}
                            //$("#list").append("<option>" + this.id + "</option>");
                        });
                        

                        $("#mapa > svg [id]").click(function() {
                            var idPath = $(this).attr('id');
                            for (j = 0; j < categoryArr.length; j++) {
                                if(idPath == categoryArr[j]["layerId"]){
                                    //console.log(idPath);
                                    //console.log(categoryArr[j]["layerId"]);
                                    idA = categoryArr[j]["layerId"];
                                    fillmodal(idA);
                                    
                                    
                                    //$(this).css({fill: "blue"});
                                    //console.log(categoryArr[j]["layerId"]);
                                    //console.log(idPath);
                                }
                            }
                        })

                        $(function(){
                            $("#mapa > svg [id]").mouseover(function() {    
                                for (m = 0; m < categoryArr.length; m++) {    
                                    if($(this).attr('id') != "Land1" && $(this).attr('id') == categoryArr[m]["layerId"]){
                                        
                                        $(this).addClass("classHover").css('cursor', 'pointer');/*
                                        $(this).addClass("classHover").css("transform-origin", "50% 15%");
                                        $(this).addClass("classHover").css("transform-box", "fill-box");
                                        $(this).addClass("classHover").css("transform", "scale(4)");
                                        $(this).addClass("classHover").css("stroke", "white");*/
                                        
                                        
                                        if(categoryArr[m]["layerId"] != "" ){
                                            if($(this).attr('id') == categoryArr[m]["layerId"]){
                                                if(categoryArr[m]["tip"] == "b"){
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerGasStationRed");
                                                }
                                                if(categoryArr[m]["tip"]== "h"){ //hotel T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerHotelRed");
                                                }

                                                if(categoryArr[m]["tip"] == "w"){ //vine delivery T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerWineDeliveryRed");
                                                }

                                                if(categoryArr[m]["tip"] == "s"){ //shop T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerShopRed");
                                                }

                                                if(categoryArr[m]["tip"] == "i"){ //rent a car T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerRentCarRed");
                                                }

                                                if(categoryArr[m]["tip"] == "c"){ //car club T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerCarClubRed");
                                                }
                                                
                                                if(categoryArr[m]["tip"] == "r"){ //restuarant T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerRestaurantRed");
                                                }
                                                
                                                if(categoryArr[m]["tip"] == "g"){ // golf T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerGolfRed");
                                                }

                                                if(categoryArr[m]["tip"] == "l"){ //spa center T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerSpaRed");
                                                }

                                                if(categoryArr[m]["tip"] == "p"){ //house for sell T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerHouseSellRed");
                                                }

                                                if(categoryArr[m]["tip"] == "m"){ //marina T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerMarinaRed");
                                                }

                                                if(categoryArr[m]["tip"] == "v"){ //vilage T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerVillageRed");
                                                }

                                                if(categoryArr[m]["tip"] == "o"){ //hotell office T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).addClass("markerHotelOfficeRed");
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                            .mouseout(function() {
                                if($(this).attr('id') != "Land1"){
                                    $(this).removeClass("classHover");
                                    /*$(this).removeClass("classHover").css("transform", "scale(1)");*/
                                    //$(this).css({ fill: "#000000" });
                                    for (m = 0; m < categoryArr.length; m++) {
                                        if(categoryArr[m]["layerId"] != "" ){
                                            if($(this).attr('id') == categoryArr[m]["layerId"]){
                                                if(categoryArr[m]["tip"] == "b"){
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerGasStationRed").addClass("markerGasStation");
                                                }
                                                if(categoryArr[m]["tip"]== "h"){ //hotel T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerHotelRed").addClass("markerHotel");
                                                }

                                                if(categoryArr[m]["tip"] == "w"){ //vine delivery T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerWineDeliveryRed").addClass("markerWineDelivery");
                                                }

                                                if(categoryArr[m]["tip"] == "s"){ //shop T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerShopRed").addClass("markerShop");
                                                }

                                                if(categoryArr[m]["tip"] == "i"){ //rent a car T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerRentCarRed").addClass("markerRentCar");
                                                }

                                                if(categoryArr[m]["tip"] == "c"){ //car club T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerCarClubRed").addClass("markerCarClub");
                                                }
                                                
                                                if(categoryArr[m]["tip"] == "r"){ //restuarant T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerRestaurantRed").addClass("markerRestaurant");
                                                }
                                                
                                                if(categoryArr[m]["tip"] == "g"){ // golf T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerGolfRed").addClass("markerGolf");
                                                }

                                                if(categoryArr[m]["tip"] == "l"){ //spa center T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerSpaRed").addClass("markerSpa");
                                                }

                                                if(categoryArr[m]["tip"] == "p"){ //house for sell T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerHouseSellRed").addClass("markerHouseSell");
                                                }

                                                if(categoryArr[m]["tip"] == "m"){ //marina T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerMarinaRed").addClass("markerMarina");
                                                }

                                                if(categoryArr[m]["tip"] == "v"){ //vilage T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerVillageRed").addClass("markerVillage");
                                                }

                                                if(categoryArr[m]["tip"] == "o"){ //hotell office T
                                                    $("#iconPin_"+categoryArr[m]["layerId"]).removeClass("markerHotelOfficeRed").addClass("markerHotelOffice");
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    
                    },2000);
        },
        simpleSheet: true 
    })

/*    
$( document ).ready(function() {
        var win = $(this);
        //console.log(win.width());
        if (win.width() >= 768) { 
            //console.log(win.width());
            $("#list, #box").show();
         }else{
            $("#list, #box").hide();
         }

        $("#buttonToggle").html(`
            <div class="buttonSvg">
                <i class="fas fa-arrow-circle-up"></i>
            </div>`
        );
   
   $("#buttonToggle").on('click', function(){
       $("#list, #box").fadeToggle(500, function(){
           if($("#list, #box").is(':visible')){
                $("#buttonToggle").html(`
                    <div class="buttonSvg">
                        <i class="fas fa-arrow-circle-down arrowC"></i>
                    </div>`)
            }else{
                $("#buttonToggle").html(`
                    <div class="buttonSvg">
                        <i class="fas fa-arrow-circle-up arrowC"></i>
                    </div>`)
            }
       });
   })*/
//});

setTimeout(function(){
        //console.log(categoryArr)
    //$("#list").append(`<div class='brandName row'><div class'logo col-lg-2'>Logo</div><div class='col-lg-8'><p>Brand Name</p></div></div>`);
    $("#list").append(`<div class='accordion'>`);
       for(var x=0; x < categoryName.length; x++){
            var str = categoryName[x];
            var restwo = str.replaceAll(" ", "_");
            $("#list").append(`
                                <div class='accordion-item'> 
                                    <h2 class='accordion-header' id='panelsStayOpen-'`+restwo+`'>
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-`+restwo+`" aria-expanded="false" aria-controls="flush-`+restwo+`">
                                            <div id='iconPin_`+restwo+`' class='col-1 col-md-10 col-lg-2 d-md-flex justify-content-md-center iconPin p-0'></div>
                                            <strong class="col-8 d-block d-md-none d-lg-block">
                                            `
                                                + categoryName[x] +
                                            `
                                            </strong>
                                        </button>
                                    </h2>`
                            );
                for (k = 0; k < categoryArr.length; k++) {
                    if (categoryName[x] == categoryArr[k]["category"]) {
                        $("#list").append(`
                            <div id='flush-`+restwo+`' class='accordion-collapse collapse btn' type='button' style='width:100%; padding:0; background-color: white; border-radius: 0px;' aria-labelledby='flush-`+restwo+`'>
                                <a style='cursor: pointer; text-decoration: none; color:black;' class='itemList' id=`+ categoryArr[k]["layerId"]+` onclick='fillmodalDva(`+ categoryArr[k]["layerId"]+`)'>
                                        <div class='accordion-body d-flex btn-lg m-0' style='font-size:14px;'>
                                            <div id='itemListAccording' class='col-10 p-0 m-0 d-flex align-items-center justify-content-start text-wrap text-start'>`+ categoryArr[k]["imeObj"] + `</div>          
                                        </div>
                                            <hr id='accordHr'>
                                </a>
                            </div> `);
                    }
                }
            

            $("#list").append(`</div>`);
            
        }
    $("#list").append(`</div>`);

        


        (function( $ ){
            $.fn.myfunction = function() {
                for (m = 0; m < categoryName.length; m++) {
                    var strt = categoryName[m];
                    var restwot = strt.replaceAll(" ", "_");
                        
                        //console.log(restwot)

                        if(restwot == "Gas_station"){
                            $("#iconPin_"+restwot).append(`<i class="fas fa-gas-pump"></i>`);
                        }
                        
                        if(restwot == "Hotel"){ //hotel T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-bed"></i>`)
                        }

                        if(restwot == "Shop"){ //shop T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-store"></i>`)
                        }

                        if(restwot == "Rent_a_Car"){ //rent a car T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-car"></i>`)
                        }
                        
                        if(restwot == "Restuarant"){ //restuarant T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-utensils"></i>`)
                        }
                        
                        if(restwot == "Golf"){ // golf T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-golf-ball"></i>`)
                        }

                        if(restwot == "Marina"){ //marina T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-anchor"></i>`)
                        }

                        if(restwot == "Village"){ //vilage T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-home"></i>`)
                        }

                        if(restwot == "Hotel_Office"){ //hotell office T
                            $("#iconPin_"+restwot).append(`<i class="fas fa-building"></i>`)
                        }    
                }   
            }; 
        })( jQuery );
         
        $( ".accordion-button" ).myfunction();
        

       $( ".itemList" ).hover(function() {
           var idItem = $(this).attr("id");
            $("#mapa svg [id]").each(function () {
                var idList = $(this).attr("id");
                //console.log(idList)
                if(idList == idItem){
                    //console.log($(this).attr("id"));
                    //$(this).addClass("markerRestaurant");
                    $(this).addClass("classHover").css('cursor', 'pointer');
                    $(this).addClass("classHover").css("transform-origin", "50% 15%");
                    $(this).addClass("classHover").css("transform-box", "fill-box");
                    $(this).addClass("classHover").css("transform", "scale(1.5)");
                    //$(this).addClass("classHover").css("z-index", "999");
                }           
            });                 
   
        }, function() {
                var idItem = $(this).attr("id");
                $("#mapa svg [id]").each(function () {
                    var idList = $(this).attr("id");
                    if(idList == idItem){
                        //$(this).removeClass("classHover");
                        $(this).removeClass("classHover").css("transform", "scale(1)");
                        //$(this).removeClass("classHover").css("z-index", "0");
                    }
                });
            
        })       
    },3000);
}

$('#loading').hide();

function fillmodal(idA){
    //console.log(idA);
    $('#loading').show().delay(1000).fadeOut();
    Tabletop.init({ 
        key: code,
        callback: function(sheetA){
            for (var r in sheetA){
                var placeA = sheetA[r];
                var a = placeA.layerid;
                //console.log(a)
                var b = placeA.photo;
                var res = b.split(',');

                if(a == idA){
                    //console.log(a)
                        var strlogo = "";
                        var strName = "";
                        var strSubTitle = "";
                        var strLink = "";
                        var strSite = "";
                        var strAdress = "";
                        var strPhone = "";
                        var strTime = "";
                        var strPhoto = "";
                        var strDescBig = "";
                        var strPrice = "";
                        var strEmail = "";

                        if(placeA.imglogo != ""){
                            strlogo += "<div class='col-12 d-flex justify-content-center justify-content-md-start modalLogo p-0'><img class='imgLogo p-2' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.imglogo+"'></div>";
                            }
                            
                            if(placeA.layer_name != ""){
                                strName += "<div class='d-flex justify-content-center justify-content-md-start modalName m-0'>"+placeA.layer_name+"</div>";
                            }

                            if(placeA.subtitle != ""){
                                strSubTitle += "<div class='d-flex justify-content-center justify-content-md-start modalSubTitle m-0'>"+placeA.subtitle+"</div>";
                            }

                            if(placeA.facebook != ""){
                                strLink += "<a class='d-flex justify-content-start justify-content-md-end' href='"+placeA.facebook+"' target='_blank'><img src='https://phi.ba/freelancer/newDanilo/img/"+placeA.facebookicon+"'></a>";
                            } 

                            if(placeA.instagram != ""){
                                strLink += "<a class='d-flex justify-content-start justify-content-md-end' href='"+placeA.instagram+"' target='_blank'><img  src='https://phi.ba/freelancer/newDanilo/img/"+placeA.instaicon+"'></a>";
                            }

                            if(placeA.site != ""){
                                strSite += "<p class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><a id='siteLinkAtag' class='order-2 order-md-1' href='"+placeA.site+"' target='_blank'>URL</a><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.siteicon+"' style='height=15px;'></p>";
                            }

                            if(placeA.address != ""){
                                strAdress += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeA.address+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.addressicon+"' class='iconImg' style='height=15px;'></div>";
                            }

                            if(placeA.phone != ""){
                                strPhone += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeA.phone+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.phoneicon+"' class='iconImg' style='height=15px;'></p></div>";
                            }

                            if(placeA.time != ""){
                                strTime += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeA.time+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.timeicon+"' class='iconImg'></p></div>";
                            }

                            if(placeA.email != ""){
                                strEmail += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeA.email+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeA.emailicon+"' class='iconImg'>";
                            }

                            if(placeA.price != ""){
                                strPrice += "<p class='price'>"+placeA.price+"</p>";
                            }

                            var strImgSlider = "";
                            var strBtnSlider = "";

                            for (p = 0; p < res.length; p++) {
                                var activ = "";
                                if(p==0){
                                    activ = "active";
                                }
                                strImgSlider += `<div class="carousel-item `+ activ +`"><img src='https://phi.ba/freelancer/newDanilo/img/`+res[p].trimStart()+`' class="d-block w-100"></div>`;
                                strBtnSlider += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+p+`" class="`+activ+`" aria-current="true" aria-label="Slide 1"></button>`;         
                            }

                            if(res != ""){
                                strPhoto += `<div class='col-12 col-lg-6 slider'>
                                                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                                    <div class="carousel-indicators">`
                                                    +strBtnSlider+
                                                    `</div>
                                                    <div class="carousel-inner">
                                                        `+strImgSlider+`  
                                                    </div>
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Next</span>
                                                    </button>
                                                    </div>
                                            </div>
                                            <div class='col-12 col-lg-6 pt-3 pt-lg-0 desc'>
                                                `+strPrice+`
                                                `+placeA.description+`
                                            </div>`;
                            }else {
                                strDescBig += "<div class='col-12 desc'>"+placeA.description+"</div>";
                            }

                            $('#myModal').modal('show');
                            var logoRow = `<div class='row rowOne d-flex flex-row m-0 p-0'>
                                                `+strlogo + strName + strSubTitle+`
                                            </div>
                                            <div class='row rowTwo'>
                                                <div class='col-12 socialModal'>
                                                <div class='col-12 d-flex justify-content-end mb-2'><button id="modalButton" type="button" class="btn" data-bs-dismiss="modal">X</button></div>
                                                    <p class='d-flex justify-content-start justify-content-md-end socMedIcon'>`+strLink+`</p>
                                                    `+strSite+`
                                                    `+strAdress+`
                                                    `+strPhone+`
                                                    `+strTime+`
                                                    `+strEmail+`
                                                </div>
                                            </div>`;
                        
                            $('.modal-header').html(logoRow);
                            
                            $('.modal-body').html("<div class='row'>"+strPhoto+strDescBig+"</div>");
                    }
            }
        },
        simpleSheet: true 
    })
}

function fillmodalDva(idB){
    //console.log(idB);
     $('#loading').show().delay(1000).fadeOut();
        Tabletop.init({ 
            key: code,
            callback: function(sheetB){
                for (var r in sheetB){
                    var placeB = sheetB[r];
                    var a = placeB.layerid;
                    //console.log(a)
                    var b = placeB.photo;
                    var res = b.split(',');
                    for(i = 0; i<idB.length; i++){

                        if(a == idB[i]["id"]){

                            var strlogo = "";
                            var strName = "";
                            var strSubTitle = "";
                            var strLink = "";
                            var strSite = "";
                            var strAdress = "";
                            var strPhone = "";
                            var strTime = "";
                            var strPhoto = "";
                            var strDescBig = "";
                            var strPrice = "";
                            var strEmail = "";

                            if(placeB.imglogo != ""){
                            strlogo += "<div class='col-12 d-flex justify-content-center justify-content-md-start modalLogo p-0'><img class='imgLogo p-2' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.imglogo+"'></div>";
                            }
                            
                            if(placeB.layer_name != ""){
                                strName += "<div class='d-flex justify-content-center justify-content-md-start modalName m-0'>"+placeB.layer_name+"</div>";
                            }

                            if(placeB.subtitle != ""){
                                strSubTitle += "<div class='d-flex justify-content-center justify-content-md-start modalSubTitle m-0'>"+placeB.subtitle+"</div>";
                            }

                            if(placeB.facebook != ""){
                                strLink += "<a class='d-flex justify-content-start justify-content-md-end' href='"+placeB.facebook+"' target='_blank'><img src='https://phi.ba/freelancer/newDanilo/img/"+placeB.facebookicon+"'></a>";
                            } 

                            if(placeB.instagram != ""){
                                strLink += "<a class='d-flex justify-content-start justify-content-md-end' href='"+placeB.instagram+"' target='_blank'><img  src='https://phi.ba/freelancer/newDanilo/img/"+placeB.instaicon+"'></a>";
                            }

                            if(placeB.site != ""){
                                strSite += "<p class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><a id='siteLinkAtag' class='order-2 order-md-1' href='"+placeB.site+"' target='_blank'>URL</a><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.siteicon+"' style='height=15px;'></p>";
                            }

                            if(placeB.address != ""){
                                strAdress += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeB.address+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.addressicon+"' class='iconImg' style='height=15px;'></div>";
                            }

                            if(placeB.phone != ""){
                                strPhone += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeB.phone+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.phoneicon+"' class='iconImg' style='height=15px;'></p></div>";
                            }

                            if(placeB.time != ""){
                                strTime += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeB.time+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.timeicon+"' class='iconImg'></p></div>";
                            }

                            if(placeB.email != ""){
                                strEmail += "<div class='sitelink d-flex justify-content-md-end m-0 mt-2 mb-2'><p class='address order-2 order-md-1 m-0 p-0'>"+ placeB.email+"</p><img class='order-1 order-md-2 m-0' src='https://phi.ba/freelancer/newDanilo/img/"+placeB.emailicon+"' class='iconImg'>";
                            }

                            if(placeB.price != ""){
                                strPrice += "<p class='price'>"+placeB.price+"</p>";
                            }

                            var strImgSlider = "";
                            var strBtnSlider = "";

                            for (p = 0; p < res.length; p++) {
                                var activ = "";
                                if(p==0){
                                    activ = "active";
                                }
                                strImgSlider += `<div class="carousel-item `+ activ +`"><img src='https://phi.ba/freelancer/newDanilo/img/`+res[p].trimStart()+`' class="d-block w-100"></div>`;
                                strBtnSlider += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="`+p+`" class="`+activ+`" aria-current="true" aria-label="Slide 1"></button>`;         
                            }

                            if(res != ""){
                                strPhoto += `<div class='col-12 col-lg-6 slider'>
                                                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                                    <div class="carousel-indicators">`
                                                    +strBtnSlider+
                                                    `</div>
                                                    <div class="carousel-inner">
                                                        `+strImgSlider+`  
                                                    </div>
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Next</span>
                                                    </button>
                                                    </div>
                                            </div>
                                            <div class='col-12 col-lg-6 pt-3 pt-lg-0 desc'>
                                                `+strPrice+`
                                                `+placeB.description+`
                                            </div>`;
                            }else {
                                strDescBig += "<div class='col-12 desc'>"+placeB.description+"</div>";
                            }



                            $('#myModal').modal('show');
                            var logoRow = `<div class='row rowOne d-flex flex-row m-0 p-0'>
                                                `+strlogo + strName + strSubTitle+`
                                            </div>
                                            <div class='row rowTwo'>
                                                <div class='col-12 socialModal'>
                                                <div class='col-12 d-flex justify-content-end mb-2'><button id="modalButton" type="button" class="btn" data-bs-dismiss="modal">X</button></div>
                                                    <p class='d-flex justify-content-start justify-content-md-end socMedIcon'>`+strLink+`</p>
                                                    `+strSite+`
                                                    `+strAdress+`
                                                    `+strPhone+`
                                                    `+strTime+`
                                                    `+strEmail+`
                                                </div>
                                            </div>`;
                        
                            $('.modal-header').html(logoRow);
                            
                            $('.modal-body').html("<div class='row'>"+strPhoto+strDescBig+"</div>");
                        }
                    }
                }
            },
            simpleSheet: true 
        })
}







/*
$(document).ready(function() {
            $('#mapa').load('mapaDva.svg');
            setTimeout(function() {
                $("#mapa svg [id]").each(function () {
                    //console.log($(this).attr('id'));
                    if($(this).attr('id')=="GolfCourt1"){
                        //console.log($(this).attr('id'));
                        $("#GolfCourt1").css({ fill: "#ff0000" });
                    }
                    //$("#list").append("<option>" + this.id + "</option>");
                });

                $("g path").click(function() {
                    $(this).find("path").attr('id');
                    console.log($(this).attr('id'));
                })

                $(function(){
                    $("g path").mouseover(function() {         
                        if($(this).attr('id') != "Land1"){
                            $(this).addClass("classHover");
                            //console.log($(this).attr('id'));
                            //$(this).css({ fill: "#ff0000" });
                        }
                    })
                    .mouseout(function() {
                        if($(this).attr('id') != "Land1"){
                            $(this).removeClass("classHover");
                            //$(this).css({ fill: "#000000" });
                        }
                    });
                });
              
            },500);
            
        })*/

init()





/*
                $("g path").hover(function () {
                    console.log($(this).attr('id'));
                    if($(this).attr('id') != "Land1"){
                        $(this).addClass("classHover");
                        //$(this).css({ fill: "#ff0000" });
                    }
                }, function () {
                    if($(this).attr('id') != "Land1"){
                        $(this).removeClass("classHover");
                        //$(this).css({ fill: "#000000" });
                    }
                })*/