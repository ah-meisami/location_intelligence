document.write('<scr' + 'ipt type="text/javascript" src="leaflet/leaflet.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="jquery/jquery-3.3.1.min.js" ></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="Leaflet.Coordinates/dist/Leaflet.Coordinates-0.1.5.min.js" ></scr' + 'ipt>');

var tileServerURL = "http://192.168.230.129:7780";

var objBankNameBankDesc = {
    "eghtesad_novin": "شعب بانک اقتصاد نوین",
    "parsian": "شعب بانک پارسیان",
    "saman": "شعب بانک سامان",
    "kar_afarin": "شعب بانک کارآفرین",
    "passargad": "شعب بانک پاسارگاد",
    "sarmaye": "شعب بانک سرمایه",
    "sina": "شعب بانک سینا",
    "shahr": "شعب بانک شهر",
    "day": "شعب بانک دی",
    "ansar": "شعب بانک انصار",
    "tejarat": "شعب بانک تجارت",
    "refah_kargaran": "شعب بانک رفاه کارگران",
    "saderat_iran": "شعب بانک صادرات ایران",
    "mellat": "شعب بانک ملت",
    "hekmat_iranaian": "شعب بانک حکمت ایرانیان",
    "tourism": "شعب بانک گردشگری",
    "iran_zamin": "شعب بانک ایران زمین",
    "ghavamin": "شعب بانک قوامین",
    "middle_east": "شعب بانک خاورمیانه",
    "ayande": "شعب بانک آینده",
    "sepah": "شعب بانک سپه",
    "post": "شعب شرکت دولتی پست بانک",
    "meli": "شعب بانک ملی ایران",
    "tose_tavon": "شعب بانک توسعه تعاون",
    "export_development": "شعب بانک توسعه صادرات ایران",
    "industry_mine": "شعب بانک صنعت و معدن",
    "agricultural": "شعب بانک كشاورزی",
    "maskan": "شعب بانک مسكن",
    "mehr_iran": "شعب بانک قرض الحسنه مهر ایران",
    "resalat": "شعب بانک قرض الحسنه رسالت",
    "development": "شعب موسسه اعتباری توسعه",
    "kosar": "شعب موسسه اعتباری کوثر",
    "askariye": "شعب موسسه اعتباری عسکریه",
    "noor": "شعب موسسه اعتباری نور"
};

function addGeoJsonLayerBranchDetail(mymap, bankName, ctrlLayer1) {
    var myicon = new L.Icon({
        iconUrl: 'img/bank_marker/ic_' + bankName + '_logo_marker.png',
        iconSize: [20, 20],
    });

    $.getJSON('data/BranchDetailGeojson/' + bankName + '.json', function (data) {
        //console.log(data);

        var geojsonLayer = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                //console.log(latlng, feature);
                return L.marker(latlng, {
                    icon: myicon
                });
            },
            onEachFeature: onEachFeatureBranchDetail
        });

        /**********************************************************/
        ctrlLayer1.addOverlay(geojsonLayer, objBankNameBankDesc[bankName]).addTo(mymap);
        /**********************************************************/
    });
}

function onEachFeatureBranchDetail(feature, layer) {
    // console.log(feature);

    popupHTML =
        "    <table border='0' style='font-family: Tahoma; font-size: 12px; direction: rtl; background-color:rgb(209, 209, 135);' width='300px' align='center'>" +
        "        <tr>" +
        "            <td nowrap align='center' colspan='2'>" +
        "                <img src='img/bank_logo/" + feature.properties.logo + ".jpg' />" +
        "            </td>" +
        "        </tr>" +
        "        <tr style='background-color: #f2f2f2;'>" +
        "            <td nowrap width='10%'>کد شعبه :</td>" +
        "            <td nowrap>" + feature.properties.branchcode + "</td>" +
        "        </tr>" +
        "        <tr>" +
        "            <td nowrap>نام شعبه :</td>" +
        "            <td nowrap>" + feature.properties.branchname + "</td>" +
        "        </tr>" +
        "        <tr style='background-color: #f2f2f2;'>" +
        "            <td nowrap>آدرس شعبه :</td>" +
        "            <td>" + feature.properties.address + "</td>" +
        "        </tr>" +
        "        <tr>" +
        "            <td nowrap>تلفن :</td>" +
        "            <td nowrap>" + feature.properties.telephone + "</td>" +
        "        </tr>" +
        "        <tr style='background-color: #f2f2f2;'>" +
        "            <td nowrap>فکس :</td>" +
        "            <td nowrap>" + feature.properties.fax + "</td>" +
        "        </tr>" +
        "        <tr>" +
        "            <td nowrap>ساعات کاری :</td>" +
        "            <td nowrap>" + feature.properties.workhours + "</td>" +
        "        </tr>" +
        "        <tr style='background-color: #f2f2f2;'>" +
        "            <td nowrap>کد پستی :</td>" +
        "            <td nowrap>" + feature.properties.zipcode + "</td>" +
        "        </tr>" +
        "        <tr>" +
        "            <td nowrap>latitude :</td>" +
        "            <td nowrap>" + feature.properties.latitude + "</td>" +
        "        </tr>" +
        "        <tr style='background-color: #f2f2f2;'>" +
        "            <td nowrap>longitude :</td>" +
        "            <td nowrap>" + feature.properties.longitude + "</td>" +
        "        </tr>" +
        "    </table>";

    layer.bindPopup(popupHTML);
}

function renderBaseMap(mapDivId, centerLat, centerLng, centerZoom) {
    var tileLayerOSM = L.tileLayer(tileServerURL + '/OfflineMapOSM/map_tile_osm/os_{x}_{y}_{z}.png', { id: 'MapID1', attribution: "Open Street Map" }),
        tileLayerGSM = L.tileLayer(tileServerURL + '/OfflineMapGSM/map_tile_gsm/gm_{x}_{y}_{z}.png', { id: 'MapID2', attribution: "Google Street Map" });

    var mymap = L.map(mapDivId, {
        center: [centerLat, centerLng],
        zoom: centerZoom,
        layers: [tileLayerOSM]
    });

    //add configured controls
    L.control.coordinates({
        position: "bottomleft",
        decimalSeperator: ",",
        labelTemplateLat: "Lat: {y}",
        labelTemplateLng: "Lng: {x}",
        useLatLngOrder: true,
    }).addTo(mymap);

    L.control.coordinates({
        position: "bottomright",
        useDMS: true,
        labelTemplateLat: "N {y}",
        labelTemplateLng: "E {x}",
        useLatLngOrder: true
    }).addTo(mymap);

    var baseMaps = {
        "نقشه پایه OSM": tileLayerOSM,
        "نقشه پایه GSM": tileLayerGSM
    };

    var ctrlLayer1 = L.control.layers(baseMaps).addTo(mymap);// Create the layercontrol and add it to the map and finally pass it to addGeoJsonLayer to add other layers to this control. this is usefull when we hava two instance of map.
    for (const key in objBankNameBankDesc) {
        if (objBankNameBankDesc.hasOwnProperty(key)) {
            addGeoJsonLayerBranchDetail(mymap, key, ctrlLayer1);
        }
    }

    var ctrlLayer2 = L.control.layers().addTo(mymap);
    man4(mymap, 'cemetery.json', 'قبرستان تهران', ctrlLayer2);

    man4(mymap, 'data/Shapefile/iran_natural.json', 'عوارض طبیعی', ctrlLayer2);
    man4(mymap, 'data/Shapefile/world.json', 'تقسیمات دنیا', ctrlLayer2);
    man4(mymap, 'data/Shapefile/IRN_adm0.json', 'تقسیمات کشور', ctrlLayer2);
    man4(mymap, 'data/Shapefile/IRN_adm1.json', 'تقسیمات استانی', ctrlLayer2);
    man4(mymap, 'data/Shapefile/IRN_adm2.json', 'تقسیمات شهری', ctrlLayer2);
    man4(mymap, 'data/Shapefile/tehran.json', 'مناطق 22 گانه شهرداری تهران', ctrlLayer2);
    man4(mymap, 'data/Shapefile/tadium-shape.json', 'استادیوم تهران', ctrlLayer2);
    man4(mymap, 'data/Shapefile/power_line.json', 'خطوط برق', ctrlLayer2);
    // man4(mymap, 'data/Shapefile/man4.json', ctrlLayer2);
    man4(mymap, 'data/Shapefile/street_line.json', 'خیابان تهران', ctrlLayer2);

    return mymap;
}
//*********************************************************************************************** */
function man4(mymap, fileName, layerName, ctrlLayer2) {
    $.getJSON(fileName, function (data) {
        // console.log('123');
        //console.log(data);

        var geojsonLayer = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                //console.log(latlng, feature);
                return L.marker(latlng);
            },
            onEachFeature: onEachFeature4
        });

        /**********************************************************/
        ctrlLayer2.addOverlay(geojsonLayer, layerName).addTo(mymap);
        /**********************************************************/
    });
}

function onEachFeature4(feature, layer) {
    //  console.log(feature);
    var popupHTML = "";
    popupHTML = "<table border='0' style='font-family: Tahoma; font-size: 12px; direction: rtl; background-color:rgb(209, 209, 135);' width='300px' align='center'>";
    for (const key in feature.properties) {
        if (feature.properties.hasOwnProperty(key)) {
            popupHTML += "<tr>" +
                "<td nowrap width='10%'>" + key + " : </td>" +
                "<td>" + feature.properties[key] + "</td>" +
                "</tr>";
        }
    }
    popupHTML += "</table>";

    layer.bindPopup(popupHTML);
}
