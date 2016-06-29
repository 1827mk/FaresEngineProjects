/**
 * Created by tanaphatdev on 1/5/2559.
 */
var idEdit ;
var codeedit;
var nameedit;
var imageEdit ;
var versionedit;
var createdBy=session.user;
var updatedBy=session.user;
var imageName;
var locationPrototype={};
var indexModify ;
$(document).ready(function () {
    // alert('I love ....');
    clearData();
    findAllLocation();

});

//=============================== RenderTable ===============================//
var partImages = "FaresEngineProjects";
function findAllLocation() {
    $("#locationTable").DataTable().destroy();
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
    $('#tbodyLocation').empty();
    $.each(JSON.parse(locationData),function(index,item){
        $('#tbodyLocation').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxLocation"  id="'+item.id+'" version= "'+item.version+'" /></alight</td>' +
            '<td><alight="left"><button type="button" id='+item.id+' code="'+item.locationCode+'" name="'+item.locationName+'" imageName="'+item.fileName+'" version='+item.version+'  onclick="editData($(this))" class="btn btn-info btn-sm" ><span class="fa fa-pencil"></span></button></alight></td>' +
            '<td><alight="left">'+(item.locationCode==null?'':item.locationCode)+'</alight></td>' +
            '<td><alight="left">'+(item.locationName==null?'':item.locationName)+'</alight></td>' +
            '<td onmouseover="zoomImage()"> <img src="/FaresEngine/resources/UploadResource/locationImage/'+item.fileName+'" style="min-height:30px;height:40px;width:40px;min-width:30px;z-index:9999" /></td>' +
            '</tr>');

        locationPrototype[item.id]=item;
    });
    $('#locationTable').DataTable({
        // "sScrollY": "980px",
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
function zoomImage() {
    $('td img').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });

}

$('#textInputCode').popover();
$('#textInputName').popover();

$('input').blur(function(){
    if( !$(this).val() ) {
        $(this).popover({
            placement: 'right'
        }).popover('show');
    } else {
        $(this).popover('destroy');
    }
});

// ตรวจสอบอักษรพิเศษ
$("#textInputCode" ).keyup( function() {
    var str = $('#textInputCode').val();
    var regex = /[\@\#\%\/\\\^\&\*\(\)\_\+\!\$]/;

    if(regex.test(str) == true) {
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("ใส่ข้อมูลไม่ถูกต้อง");
    }

});

// ตรวจสอบอักษรพิเศษ
$("#textInputName" ).keyup( function() {
    var str = $('#textInputName').val();
    var regex = /[\@\#\%\/\\\^\&\*\(\)\_\+\!\$]/;

    if(regex.test(str) == true) {
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("ใส่ข้อมูลไม่ถูกต้อง");
    }

});

$("#checkall").on('change',function(){
    var booleanCheck = $("#checkall").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxLocation']").prop("checked",true);
    }else{
        $("[name='checkboxLocation']").prop("checked",false);
    }
});

//================================== CheckBox ==================================//
function checkboxLine(checkbox) {
    var countCheck = $("input[name ='checkboxLocation']:checked:checked").length;
    var countAll = $("[name='checkboxLocation']").length;
    if (countCheck == countAll) {
        $("#checkall").prop("checked",true);
    }else{
        $("#checkall").prop("checked",false);
    }
}

//================================= Clear Data =================================//
function clearData(){
    $("#textInputCode").val("");
    $("#textInputName").val("");
    $("#textEditInputCode").val("");
    $("#textEditInputName").val("");
    $("#textImageFile").val("")
    $("#textImageFileEdit").val("")
    $("#fileedit").empty();
    $("#fileedit").val("");
    $("#file").empty();
    $("#file").val("");
    $("[name='checkboxLocation']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

$("#file").on('change', function () {
    var piccheck = $("#file").val().split(".");
    if (!(piccheck[piccheck.length - 1] == "png" || piccheck[piccheck.length - 1] == "jpeg" || piccheck[piccheck.length - 1] == "jpg"
        || piccheck[piccheck.length - 1] == "bmp" || piccheck[piccheck.length - 1] == "gif")) {
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("กรุณาเลือกไฟล์ที่เป็นรูปภาพ");
        $("#file").val("");
    }
});
$("#fileedit").on('change', function () {
    var piccheck = $("#fileedit").val().split(".");
    if (!(piccheck[piccheck.length - 1] == "png" || piccheck[piccheck.length - 1] == "jpeg" || piccheck[piccheck.length - 1] == "jpg"
        || piccheck[piccheck.length - 1] == "bmp" || piccheck[piccheck.length - 1] == "gif")) {
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("กรุณาเลือกไฟล์ที่เป็นรูปภาพ");
        $("#fileedit").val("");
    }
});

$('#file').on('change', function() {
    if ($(this).val()) {
        $('#textImageFile').val($(this).val());
    }
});

$('#fileedit').on('change', function() {
    if ($(this).val()) {
        $('#textImageFileEdit').val($(this).val());
    }
});


//================================= Insert =====================================//

function insertData(){

    if ($("#textInputCode").val()!="" && $("#textInputName").val()!="" && $('#textImageFile').val()!="") {
        var locationCode = $("#textInputCode").val();
        var locationName = $("#textInputName").val();
        var imageFile = $("#file").val();
     
        var dataLocation= {
            locationCode: locationCode,
            locationName: locationName,
            fileName : imageFile,
            updatedBy:updatedBy,
            createdBy:createdBy
            
        }

        var formData = new FormData();
        formData.append("json", JSON.stringify(dataLocation));
        formData.append("file", file.files[0]);

        var findLocationByCode = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/locations/findLocationCode',
            data: {
                locationCode:locationCode,
                locationName:locationName
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        if (findLocationByCode.length!=2) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        }else{

            $.ajax({
                type: "POST",
                headers: {
                    Accept: 'application/json',
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context'] + '/locations/insertLocation/',
                processData: false,
                contentType: false,
                data: formData,
                complete: function (xhr) {
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            $("#locationTable").DataTable().destroy();
                            clearData();
                            findAllLocation();
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");
                        }
                        else if(xhr.status==403) {
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
                async:false
            });
        }

    }else{
        if ($("#textInputCode").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกรหัสสถานที่");
        }else if ($("#textInputName").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกชื่อสถานที่");
        }else if ($("#textImageFile").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณาเลือกรูปภาพ");
        };
    }
}

$("#add").on('click',function(){
    clearData();
});
$("#btnSave").on('click',function(){
    insertData();
});
$("#modalAlertBtnOk").on('click',function(){
    $("#modalAddLocation").modal('hide');
});
$("#btnCancel").on('click',function(){
    clearData();
    $("#modalAddLocation").modal('hide');
});

//================================== EDIT ======================================//
function editData(rowData){
    // clearData();
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeedit = rowData[0].attributes.getNamedItem("code").value;
    nameedit = rowData[0].attributes.getNamedItem("name").value;
    imageEdit = rowData[0].attributes.getNamedItem("imageName").value;
    indexModify = idEdit;

    $('#textEditInputCode').val(codeedit);
    $('#textEditInputName').val(nameedit);

    if(imageEdit != 'null' ){
        $('#textImageFileEdit').val(imageEdit);
    }else {
        $('#textImageFileEdit').val("No file selected..");
    }

    $('#modalEditLocation').modal('show');
}

$("#btnEditSave").on('click',function(){
    editMenu();

});
//$("#modalAlertBtnOk").on('click',function(){
//    $("#modalAddLocation").modal('hide');
//});

$("#btnEditCancel").on('click',function(){
    $("#modalEditLocation").modal('hide');
    clearData();
});
$("#modalAlertErrorFIXBtnOk").on('click',function(){
    $("#modalEditLocation").modal('hide');
    clearData();
});

function editMenu(){

    if ($("#textEditInputCode").val()!="" && $("#textEditInputName").val()!="" && $("#textImageFileEdit").val()!="") {
        var locationCode = $("#textEditInputCode").val();
        var locationName = $("#textEditInputName").val();
        // var imageName = $("#fileedit").val();


        if (codeedit==$("#textEditInputCode").val() && nameedit==$("#textEditInputName").val() &&  $("#textImageFileEdit").val()==imageEdit) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
            clearData();
            $("#modalEditLocation").modal('hide');
        }else if (codeedit!=$("#textEditInputCode").val() && nameedit==$("#textEditInputName").val() && imageEdit == $('#textImageFileEdit').val()){
            // ตรวจสอบรหัสซ้ำ
            var dataLocationCode = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/locations/findLocationCodeDuplicate',
                data: {
                    locationCode:locationCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataLocationCode.length!=2) {
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("รหัสสถานที่นี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDateLocationNoImage();
            }
        }else if(codeedit==$("#textEditInputCode").val() && nameedit!=$("#textEditInputName").val() && imageEdit == $('#textImageFileEdit').val()){
            // ตรวจสอบชื่อซ้ำ
            var dataLocationName = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/locations/findLocationNameDuplicate',
                data: {
                    locationName:locationName
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;
            if (dataLocationName.length!=2) {
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("ชื่อสถานที่นี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDateLocationNoImage();
            }
        }else if(codeedit!=$("#textEditInputCode").val() && nameedit!=$("#textEditInputName").val() && imageEdit == $('#textImageFileEdit').val()){
            // ตรวจสอบชื่อและรหัสซ้ำ
            var dataLocation = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/locations/findLocationCode',
                data: {
                    locationCode:locationCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataLocation.length!=2) {
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
            }else{
                updateDateLocationNoImage();
            }
        }else if(imageEdit!= $('#textImageFileEdit').val()){
            updateDateLocation();
        }
    }else{
        if ($("#textEditInputCode").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกรหัสสถานที่");
        }else if ($("#textEditInputName").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกชื่อสถานที่");
        }else if ($("#textImageFileEdit").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณาเลือกรูปภาพ");
        };
    }
}

// Function Update
function updateDateLocation(){
    var id = indexModify;
    var locationCode = $("#textEditInputCode").val();
    var locationName = $("#textEditInputName").val();
    var imageName = $("#fileedit").val();
    
    var dataLocation= {
        id:id,
        locationCode: locationCode,
        locationName: locationName,
        fileName : imageName,
        version : locationPrototype[indexModify].version,
        createdBy:createdBy,
        updatedBy:updatedBy
    }

    var formData = new FormData();
    formData.append("jsonedit", JSON.stringify(dataLocation));
    formData.append("fileedit", fileedit.files[0]);

    $.ajax({
        type: "POST",
        headers: {
            Accept: 'application/json',
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context'] + '/locations/updateLocation/',
        processData: false,
        contentType: false,
        data: formData,
        complete: function (xhr) {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#locationTable").DataTable().destroy();
                    clearData();
                    findAllLocation();
                    $("#alertModalFIXError").modal('show');
                    $("label[id=detailAlertFIXError]").text("แก้ไขข้อมูลสำเร็จ");
                }
                else if(xhr.status==403) {
                    $("#alertModalFIXError").modal("show");
                    $("label[id=detailAlertFIXError]").text("คุณไม่มีสิทธิใช้งาน");
                }else{
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("แก้ไขข้อมูลไม่สำเร็จ");
                }
            }else{
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("แก้ไขข้อมูลไม่สำเร็จ");
            }
        },
        async:false
    });
}

// Function Update No Image
function updateDateLocationNoImage(){
    var id = indexModify;
    var locationCode = $("#textEditInputCode").val();
    var locationName = $("#textEditInputName").val();
    var imageName = $("#textImageFileEdit").val();

    $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/locations/updateLocationNoImage',
        data: {
            locationId:id,
            locationCode:locationCode,
            locationName:locationName,
            fileName:imageName,
            version:locationPrototype[indexModify].version

        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#locationTable").DataTable().destroy();
                    clearData();
                    findAllLocation();
                    $("#alertModalFIXError").modal('show');
                    $("label[id=detailAlertFIXError]").text("แก้ไขข้อมูลสำเร็จ");
                }
                else if(xhr.status==403) {
                    $("label[id=detailAlertFIXError]").text("คุณไม่มีสิทธิใช้งาน");
                    $("#alertModalFIXError").modal("show");
                }else{
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("แก้ไขข้อมูลไม่สำเร็จ");
                }
            }else{
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("แก้ไขข้อมูลไม่สำเร็จ");
            }
        },
        async:false
    });
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

var countDeleteSuccess = 0 ;
var countDeleteFail = 0 ;
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
            url:session['context']+"/locations/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
                            $("#deleteModalFree").modal("show");
                            findAllLocation();
                            clearData();
                        }
                        count++;

                    } else if(xhr.status==403) {
                        $("#deleteModalFree").modal("show");
                        $("label[id='detailDeleteFree']").text("คุณไม่มีสิทธิใช้งาน");

                    }else{
                        countDeleteFail++;
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เร็คคอด");
                        $("#deleteModalFree").modal("show");
                        findAllLocation();
                        clearData();
                    }
                }else{
                    $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ");
                    $("#deleteModalFree").modal("show");
                }
            },
            async:false
        });
    });
    findAllLocation();
    
});
//================================== End Delete ================================//