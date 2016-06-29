/**
 * Created by tanaphatdev on 1/5/2559.
 */
var travelPrototype={};
var createdBy=session.user;
var updatedBy=session.user;
var indexModify ;
$(document).ready(function () {
    // alert('I love ....');
    clearData();
    findAllTravel();
    findTransport();
    findLocationSource();
    findLocationDis();
});

//=============================== RenderTable ===============================//
function findAllTravel() {
    var travelData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context'] + '/travels/findAllTravel',
        async: false
    }).done(function () {
        //close loader
        $('.dv-background').hide();
    }).responseText;
    $('#tbodyTravel').empty();
    $.each(JSON.parse(travelData), function (index, item) {

        $('#tbodyTravel').append('<tr>' +
            '<td><center><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxTravel"  id="' + item.id + '" version= "' + item.version + '" /></center></td>' +
            "<td><button type='button' id=" + item.id + " travelcode='" + item.travelCode + "' sourcode='" + item.locationSourCode + "' sourName='" + item.locationSourName + "'  discode='" + item.locationDisCode + "' disName='" + item.locationDisName + "' transId='"+item.transport.id+"' transcode='" + item.transport.transportCode + "' transname='" + item.transport.transportName + "' version=" + item.version + "  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></td>" +
            '<td><alight="left">' + (item.travelCode == null ? '' : item.travelCode) + '</alight></td>' +
            '<td><alight="left">' + (item.locationSourCode == null ? '' : item.locationSourCode) + '</alight></td>' +
            '<td><alight="left">' + (item.locationSourName == null ? '' : item.locationSourName) + '</alight></td>' +
            '<td><alight="left">' + (item.locationDisCode == null ? '' : item.locationDisCode) + '</alight></td>' +
            '<td><alight="left">' + (item.locationDisName == null ? '' : item.locationDisName) + '</alight></td>' +
            '<td><alight="left">' + (item.transport.transportName == null ? '' : item.transport.transportName) + '</alight></td>' +
            '</tr>');

        travelPrototype[item.id] = item;
    });

    $('#travelTable').DataTable({
        "bSort": false,
        "language": {
            "lengthMenu": "แสดง _MENU_ รายการ",
            "zeroRecords": "ไม่พบข้อมูล",
            "info": "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
            "infoEmpty": "ไม่พบเรคคอร์ด",
            "infoFiltered": "(กรองข้อมูล _MAX_ แถว)",
            "decimal":        "",
            "emptyTable":     "ไม่มีข้อมูลในตาราง",
            "infoPostFix":    "",
            "thousands":      ",",
            "loadingRecords": "โหลด...",
            "processing":     "กำลังดำเนินการ...",
            "search":         "ค้นหา:",
            "paginate": {
                "first":      "หน้าแรก",
                "last":       "หน้าสุดท้าย",
                "next":       "ถัดไป",
                "previous":   "ก่อนหน้า"
            },
            "aria": {
                "sortAscending":  ": เปิดใช้งานคอลัมน์ในการจัดเรียงจากน้อยไปมาก",
                "sortDescending": ": เปิดใช้งานคอลัมน์ในการเรียงลำดับจากมากไปน้อย"
            }
        }
    });
}

$("#checkall").on('change',function(){
    var booleanCheck = $("#checkall").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxTravel']").prop("checked",true);
    }else{
        $("[name='checkboxTravel']").prop("checked",false);
    }
});

//================================== CheckBox ==================================//
function checkboxLine(checkbox) {
    var countCheck = $("input[name ='checkboxTravel']:checked:checked").length;
    var countAll = $("[name='checkboxTravel']").length;
    if (countCheck == countAll) {
        $("#checkall").prop("checked",true);
    }else{
        $("#checkall").prop("checked",false);
    }
}

//================================= Clear Data =================================//
function clearData(){
    $("#textInputTravelCode").val("");
    $("#sourCode").val("");
    $("#textInputSourName").val("");
    $("#disCode").val("");
    $("#textInputDisName").val("");
    $("#transportName").val("");
    $("#textEditInputTravelCode").val("");
    $("#sourCodeEdit").val("");
    $("#textEditInputSourName").val("");
    $("#disCodeEdit").val("");
    $("#textEditInputDisName").val("");
    $("#transportNameEdit").val("");
    $("[name='checkboxTravel']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

var transportCode;
//============================ find Transport ==========================//
function findTransport() {
    var transportData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/transports/findAllTransport',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#selectTransportCode').empty();
    $('#selectEditTransportCode').empty();
    $.each(JSON.parse(transportData),function(index,item){
        $('#selectTransportCode').append('<option value="'+item.id+'">'+item.transportCode+':'+item.transportName+'</option>');
        $('#selectEditTransportCode').append('<option value="'+item.id+'">'+item.transportCode+':'+item.transportName+'</option>');
    });

    // Add
    $('#selectTransportCode').on('change',function(){
        var str = $( "#selectTransportCode option:selected" ).text();
        var res = str.split(":");
        transportCode = res[0];
        if(transportCode!=null){
            findTransportByCode(transportCode);
        }else{
            console.log("==========");
        }
    });

    var str = $( "#selectTransportCode option:selected" ).text();
    var res = str.split(":");
    transportCode = res[0];
    if(transportCode!=null){
        findTransportByCode(transportCode);
    }else{
        console.log("==========");
    }

}

function findTransportByCode(code) {
    if(code!=null){
        var transportData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/transports/findTransportsByCode',
            data:{
                transportCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        // Add
        $('#textTransportName').empty();
        // Edit
        $('#textEditTransportName').empty();

        $.each(JSON.parse(transportData),function(index,item){
            // Add
            $('#textTransportName').val(item.transportName);
            // Edit
            $('#textEditTransportName').val(item.transportName);

        });
    }else{
        console.log('transportCode empty');
    }
}

var locationSourCode;
//============================ find Location ==========================//
function findLocationSource() {
    var locationData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/locations/findAllCustom',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#sourCode').empty();
    $('#sourCodeEdit').empty();

    $.each(JSON.parse(locationData),function(index,item){
        $('#sourCode').append('<option value="'+item.id+'">'+item.locationCode+':'+item.locationName+'</option>');
        $('#sourCodeEdit').append('<option value="'+item.id+'">'+item.locationCode+':'+item.locationName+'</option>');

    });

    // Add
    $('#sourCode').on('change',function(){
        var str = $( "#sourCode option:selected" ).text();
        var res = str.split(":");
        locationSourCode = res[0];
        if(locationSourCode!=null){
            findLocationSourByCode(locationSourCode);
        }else{
            console.log("==========");
        }
    });

    var str = $( "#sourCode option:selected" ).text();
    var res = str.split(":");
    locationSourCode = res[0];
    if(locationSourCode!=null){
        findLocationSourByCode(locationSourCode);
    }else{
        console.log("==========");
    }
}

function findLocationSourByCode(code) {
    if(code!=null){
        var locationData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/locations/findLocationsByCode',
            data:{
                locationCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        // Add
        $('#textInputSourName').empty();
        // Edit
        $('#textEditInputSourName').empty();

        $.each(JSON.parse(locationData),function(index,item){
            // Add
            //$('#textInputSourName').val(item.locationName);
            $('#textInputSourName').val(item.locationName);
            // Edit
            //$('#sourCodeEdit').val(item.locationCode);
            $('#textEditInputSourName').val(item.locationName);

        });
    }else{
        console.log('locationSourCode empty');
    }
}

var locationDisCode;
//============================ find Location ==========================//
function findLocationDis() {
    var locationData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/locations/findAllCustom',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#disCode').empty();
    $('#disCodeEdit').empty();
    $.each(JSON.parse(locationData),function(index,item){
        $('#disCode').append('<option value="'+item.id+'">'+item.locationCode+':'+item.locationName+'</option>');
        $('#disCodeEdit').append('<option value="'+item.id+'">'+item.locationCode+':'+item.locationName+'</option>');
    });

    // Add
    $('#disCode').on('change',function(){
        var str = $( "#disCode option:selected" ).text();
        var res = str.split(":");
        locationDisCode = res[0];
        if(locationDisCode!=null){
            findLocationDisByCode(locationDisCode);
        }else{
            console.log("==========");
        }
    });

    var str = $( "#disCode option:selected" ).text();
    var res = str.split(":");
    locationDisCode = res[0];
    if(locationDisCode!=null){
        findLocationDisByCode(locationDisCode);
    }else{
        console.log("==========");
    }

}

function findLocationDisByCode(code) {
    if(code!=null){
        var locationData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/locations/findLocationsByCode',
            data:{
                locationCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        // Add
        $('#textInputDisName').empty();
        // Edit
        $('#textEditInputDisName').empty();

        $.each(JSON.parse(locationData),function(index,item){
            // Add
            $('#textInputDisName').val(item.locationName);
            // Edit
            $('#textEditInputDisName').val(item.locationName);

        });
    }else{
        console.log('locationDisCode empty');
    }
}

//=========================== Insret ===============================//
function insertData() {

    var codeTravel = $('#textInputTravelCode').val();
    var selectTravel = $('#selectInputTravel').val();
    var selectPromote = $('#selectPromote').val();

    var str1 = $( "#sourCode option:selected" ).text();
    var res1 = str1.split(":");
    var sourCode = res1[0];

    var str2 = $( "#disCode option:selected" ).text();
    var res2 = str2.split(":");
    var disCode = res2[0];

    var str3 = $( "#selectTransportCode option:selected" ).text();
    var res3 = str3.split(":");
    var transportCode = res3[0];

    if ($('#textInputTravelCode').val() != "" && $("#sourCode option:selected").text() != "L000" && $("#disCode option:selected").text() != "L000" && $("#selectTransportCode option:selected").text() != "----------") {

        var findTravelDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/travels/findTravelDuplicate',
            data: {
                travelCode:codeTravel,
                locationSourCode:sourCode,
                locationDisCode:disCode,
                transport:transportCode
            },

            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;
        if(findTravelDuplicate.length==2){
            var checkDuplicateCodeSDT = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/travels/checkDuplicateCodeSDT',
                data: {
                    locationSourCode:sourCode,
                    locationDisCode:disCode,
                    transport:transportCode
                },

                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;
            if(checkDuplicateCodeSDT.length==2){
                var checkDuplicateCode = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context']+'/travels/checkDuplicateCode',
                    data: {
                        travelCode:codeTravel
                    },
                    async: false
                }).done(function (){
                    $('.dv-background').hide();
                }).responseText;
                if(checkDuplicateCode.length==2){
                    insertTravel();
                }else {
                    // Duplicate
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("มีรหัสนี้ในระบบแล้ว กรุณาตรวจสอบ!!");
                }
            }else{
                // Duplicate
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("สถานที่และยานพาหนะมีอยู่ในระบบแล้ว กรุณาตรวจสอบ!!");
            }
        }else{
            // Duplicate
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("มีข้อมูลนี้ในระบบแล้ว กรุณาตรวจสอบ!!");
        }
    }else{
        if ($("#textInputTravelCode").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสการจัดการสถานที่");
        } else if ($("#sourCode option:selected").text() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกรหัสสถานที่เริ่มต้น");
        } else if ($("#disCode option:selected").text() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกรหัสสถานที่สิ้นสุด");
        } else {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกยานพหนะ");
        }
    }
}

function insertTravel() {
    var travelCode = $('#textInputTravelCode').val();

    var str1 = $( "#sourCode option:selected" ).text();
    var res1 = str1.split(":");
    var sourCode = res1[0];

    var sourName = $('#textInputSourName').val();
    var disName = $('#textInputDisName').val();

    var str2 = $( "#disCode option:selected" ).text();
    var res2 = str2.split(":");
    var disCode = res2[0];

    var transportCode = $('#selectTransportCode').val();

    var insertDatas = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/travels/insertsData',
        data: {
            travelCode:travelCode,
            sourName:sourName,
            sourCode:sourCode,
            disName:disName,
            disCode:disCode,
            createdBy:createdBy,
            updatedBy:updatedBy,
            transportCode:parseInt(transportCode)
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==201){
                    clearData();
                    $("#travelTable").DataTable().destroy();
                    findAllTravel();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");
                    $('#modalAddTravel').modal('hide');
                } else if(xhr.status==403) {
                    $("#alertModal").modal("show");
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");

                }else{
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("บันทึกข้อมูลไม่สำเร็จ");
                }
            }else{
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("บันทึกข้อมูลไม่สำเร็จ");
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
}

////////////////////////////////////////////////////////////////////////////

//=========================== Button ==============================//
$('#btnCancel').on('click',function () {
    $('#modalAddTravel').modal('hide');
    clearData();
})
$('#btnEditCancel').on('click',function () {
    $('#modalEditTravel').modal('hide');
    clearData();
})
$('#add').on('click',function () {
    clearData();
    findTransport();
    findLocationSource();
    findLocationDis();
})
$('#btnEditSave').on('click',function () {
    editMenu();
    // findPromote();
    // findTravel();

})
$('#modalAlertBtnOk').on('click',function () {
    $('#modalEditTravel').modal('hide');
    $("#alertModal").modal('hide');
    // clearDataAll();
})

$('#btnSave').on('click',function () {
    insertData();
})
// $('#delete').on('click',function () {
//     // $('[data-toggle="popover"]').popover();
// })
jQuery('.numbersOnly').keyup(function () {
    // $('[data-toggle="popover"]').popover();
    $('.pop').popover().click(function () {
        setTimeout(function () {
            $('.pop').popover('hide');
        }, 2000);
    });

    this.value = this.value.replace(/[^0-9\.]/g,'');
});

// ตรวจสอบอักษรพิเศษ
$("#textInputCode" ).keyup( function() {
    var str = $('#textInputCode').val();
    var regex = /[\@\#\%\/\\\^\&\*\(\)\_\+\!]/;

    if(regex.test(str) == true) {
        $("#alertModal").modal('show');
        $("label[id=detailAlert]").text("ใส่ข้อมูลไม่ถูกต้อง");
    }

});

$('#textInputCode').popover();
$('#textInputPrice').popover();

$('input').blur(function(){
    if( !$(this).val() ) {
        $(this).popover({
            placement: 'right'
        }).popover('show');
    } else {
        $(this).popover('destroy');
    }
});

//================================== EDIT ======================================//
var idEdit;
var versionEdit;
var codeEdit;
var sourEdit;
var disEdit;
var transId;
var transEdit;
var sourNameEdit;
var disNameEdit;
var transNameEdit;

function editData(rowData){
    //findTransport();
    findLocationSource();
    findLocationDis();


    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeEdit = rowData[0].attributes.getNamedItem("travelcode").value;
    sourNameEdit = rowData[0].attributes.getNamedItem("sourName").value;
    sourEdit = rowData[0].attributes.getNamedItem("sourcode").value;
    disEdit = rowData[0].attributes.getNamedItem("discode").value;
    disNameEdit = rowData[0].attributes.getNamedItem("disName").value;
    transId = rowData[0].attributes.getNamedItem("transId").value;
    transEdit = rowData[0].attributes.getNamedItem("transcode").value;
    transNameEdit = rowData[0].attributes.getNamedItem("transname").value;

    clearData();
    //indexModify = idEdit;
    $('#textEditInputTravelCode').val(codeEdit);
    $('#sourCodeEdit').val(sourEdit);
    $('#disCodeEdit').val(disEdit);
    $('#textEditInputSourName').val(sourNameEdit);
    $('#textEditInputDisName').val(disNameEdit);
    $('#selectEditTransportCode').val(transEdit);
    //findLocationSource();
    //findLocationDis();
    //
    $('#sourCodeEdit').prepend('<option value="">'+sourEdit+':'+sourNameEdit+'</option>');
    $('#disCodeEdit').prepend('<option value="">'+disEdit+':'+disNameEdit+'</option>');

    //$('#sourCodeEdit').prepend('<option value="'+transId+'">'+sourEdit+'</option>');

    findLocationSourByCode(sourEdit);
    findLocationDisByCode(disEdit);

    //findLocationSource();
    //findLocationDis();
    //findLocationSource();
    //findLocationDis();
    $('#selectEditTransportCode').prepend('<option value="'+transId+'">'+transEdit+':'+transNameEdit+'</option>');
    findTransportByCode(transEdit);
    console.log(transId);
    $('#modalEditTravel').modal('show');
}

$('#sourCodeEdit').on('change',function(){
    var str = $( "#sourCodeEdit option:selected" ).text();
    var res = str.split(":");
    var sourCodeEdit = res[0];
    if(sourCodeEdit!=null){
        findLocationSourByCode(sourCodeEdit);
    }else{
        console.log("==========");
    }
});

$('#disCodeEdit').on('change',function(){
    var str = $( "#disCodeEdit option:selected" ).text();
    var res = str.split(":");
    var disCodeEdit = res[0];
    if(disCodeEdit!=null){
        findLocationDisByCode(disCodeEdit);
    }else{
        console.log("==========");
    }
});

$('#selectEditTransportCode').on('change',function(){
    var str = $( "#selectEditTransportCode option:selected" ).text();
    var res = str.split(":");
    var transportEdit = res[0];
    if(transportEdit!=null){
        findTransportByCode(transportEdit);
    }else{
        console.log("==========");
    }
});

//======================================================
function editMenu() {

    if ($('#textEditInputTravelCode').val() != "" && $("#sourCodeEdit option:selected").text() != "L000" && $("#disCodeEdit option:selected").text() != "L000" && $("#selectEditTransportCode option:selected").text() != "----------") {

        var travelCode = $('#textEditInputTravelCode').val();

        var str1 = $( "#sourCodeEdit option:selected" ).text();
        var res1 = str1.split(":");
        var sourCode = res1[0];

        var str2 = $( "#disCodeEdit option:selected" ).text();
        var res2 = str2.split(":");
        var disCode = res2[0];

        var str3 = $( "#selectEditTransportCode option:selected" ).text();
        var res3 = str3.split(":");
        var transportCode = res3[0];


        if (travelCode == codeEdit && sourCode == sourEdit && disCode == disEdit && transportCode == transEdit) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        } else {
            //ตรวจสอบทุกช่องเปลี่ยนหมด
            if (travelCode != codeEdit && sourCode != sourEdit && disCode != disEdit && transportCode != transEdit) {
                var findTravelDuplicateTravel1 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/travels/findTravelDuplicate',
                    data: {
                        travelCode: travelCode,
                        locationSourCode: sourEdit,
                        locationDisCode: disCode,
                        transport: transportCode
                    },
                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (findTravelDuplicateTravel1.length == 2) {
                    var checkDuplicateSDT1 = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context'] + '/travels/checkDuplicateCodeSDT',
                        data: {
                            locationSourCode: sourCode,
                            locationDisCode: disCode,
                            transport: transportCode
                        },

                        async: false
                    }).done(function () {
                        $('.dv-background').hide();
                    }).responseText;
                    if (checkDuplicateSDT1.length == 2) {
                        var checkDuplicateCode1 = $.ajax({
                            type: "GET",
                            headers: {
                                Accept: 'application/json'
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: session['context'] + '/travels/checkDuplicateCode',
                            data: {
                                travelCode: travelCode
                            },

                            async: false
                        }).done(function () {
                            $('.dv-background').hide();
                        }).responseText;
                        if (checkDuplicateCode1.length == 2) {
                            updateTravel()
                        } else {
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                        }
                    } else {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("สถานที่และยานพาหนะนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                    }
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("ข้อมูลนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
                //ตรวจสอบ sour,dis,trans มีการเปลี่ยนแปลง
            } else if (travelCode == codeEdit && sourCode != sourEdit && disCode != disEdit && transportCode != transEdit) {
                var checkDuplicateSDT2 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/travels/checkDuplicateCodeSDT',
                    data: {
                        locationSourCode: sourCode,
                        locationDisCode: disCode,
                        transport: transportCode
                    },

                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (checkDuplicateSDT2.length == 2) {
                    updateTravel()
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("สถานที่และยานพาหนะนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
                //ตรวจสอบ travelCode มีการเปลี่ยนแปลง
            } else if (travelCode != codeEdit) {
                var checkDuplicateCode4 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/travels/checkDuplicateCode',
                    data: {
                        travelCode: travelCode
                    },

                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (checkDuplicateCode4.length == 2) {
                    updateTravel()
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            }else if (travelCode != codeEdit && sourCode != sourEdit ||travelCode != codeEdit && disCode != disEdit) {
                var checkDuplicateSDT5 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/travels/checkDuplicateCodeSDT',
                    data: {
                        locationSourCode: sourCode,
                        locationDisCode: disCode,
                        transport: transportCode
                    },

                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (checkDuplicateSDT5.length == 2) {
                    var checkDuplicateCode5 = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context'] + '/travels/checkDuplicateCode',
                        data: {
                            travelCode: travelCode
                        },

                        async: false
                    }).done(function () {
                        $('.dv-background').hide();
                    }).responseText;
                    if (checkDuplicateCode5.length == 2) {
                        updateTravel()
                    } else {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                    }
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("สถานที่และยานพาหนะนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            } else {
                updateTravel();
            }
        }

    } else {
        if ($("#textEditInputTravelCode").val() == "") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณากรอกรหัสการจัดการโปรโมชั่น");
        } else if ($("#sourCodeEdit option:selected").text() == "----------") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณาเลือกรหัสสถานที่เริ่มต้น");
        } else if ($("#disCodeEdit option:selected").text() == "----------") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณาเลือกรหัสสถานที่สิ้นสุด");
        } else {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณาเลือกรหัสยานพาหนะ");
        }
    }
}
// Function Update
function updateTravel() {

    var codeTravel = $('#textEditInputTravelCode').val();
    //var sourCode = $('#sourCodeEdit').val();
    //var disCode = $('#disCodeEdit').val();
    var transportCode = $('#selectEditTransportCode').val();
    var sourName = $('#textEditInputSourName').val();
    var disName = $('#textEditInputDisName').val();
    var str1 = $( "#sourCodeEdit option:selected" ).text();
    var res1 = str1.split(":");
    var sourCode = res1[0];

    var str2 = $( "#disCodeEdit option:selected" ).text();
    var res2 = str2.split(":");
    var disCode = res2[0];


    var insertDatafares = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/travels/updatesData',
        data: {
            travelId:idEdit,
            travelCode:codeTravel,
            sourCode:sourCode,
            sourName:sourName,
            disName:disName,
            disCode:disCode,
            updatedBy:updatedBy,
            transportCode:parseInt(transportCode)
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#travelTable").DataTable().destroy();
                    findAllTravel();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลลำเร็จ");
                } else if(xhr.status==403) {
                    $("#alertModal").modal("show");
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");
                }else{
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จไม่สำเร็จ");
                }
            }else{
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จไม่สำเร็จ--");
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;

}
//============================ delete ============================//

var deleteId=[];
var deleteAllId=[];
var deleteItem ;
$("#delete").on('click',function(){

    var checkbox=$("tbody input[type='checkbox']");

    deleteId.clear();
    $.each(checkbox,function(index,item){
        if(item.checked){
            deleteItem =item.id;
            deleteId.push(item.id);
        }
    });

    if(deleteId.length>0){
        $("#deleteModal").modal("show");
        $("label[id='detailDelete']").text("คุณต้องการลบ"+' '+deleteId.length + ' '+"เรคคอร์ด" );
    }else{
        $("#test").modal("show");
        $("label[id='messagersc']").text("กรุณาเลือกอย่างน้อย 1 เรคคอร์ด");

    }
});

$("#modalAlertBtnOk1").on('click',function(){
    var count=1;
    $.each(deleteId,function(index,item){
        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url:session['context']+"/travels/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){

                        if(count==deleteId.length){
                            $("label[id='message']").text("ลบข้อมูลสำเร็จ");
                            $("#resultModal").modal("show");
                            $("#travelTable").DataTable().destroy();
                            findAllTravel();
                            clearData();
                        }
                        count++;
                    } else if(xhr.status==403) {
                        $("#resultModal").modal("show");
                        $("label[id='message']").text("คุณไม่มีสิทธิใช้งาน");

                    }else{
                        $("label[id='message']").text("ลบข้อมูลไม่สำเร็จ");
                        $("#resultModal").modal("show");
                    }
                }else{
                    $("label[id='message']").text("ลบข้อมูลไม่สำเร็จ");
                    $("#resultModal").modal("show");
                }
            },
            async:false
        });
    });
});
//================================== End Delete ================================//