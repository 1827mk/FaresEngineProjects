/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var buessEdit;
var transportBusiness;
var transportPrototype={};
var indexModify ;
var createdBy=session.user;
var updatedBy=session.user;

$(document).ready(function () {
    $('.dv-background').show();
    // alert('I love ....');
    clearData();
    findAllTransport();
    $('.dv-background').hide();
});

//=============================== RenderTable ===============================//
function findAllTransport() {
    clearData();
    $('.dv-background').show();
    $("#transportTable").DataTable().destroy();
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
    $('#tbodyTransport').empty();
    $.each(JSON.parse(transportData),function(index,item){

        $('#tbodyTransport').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxTransport"  id="'+item.id+'" version= "'+item.version+'" /></center></td>' +
            '<td><alight="left"><button type="button" id='+item.id+' code="'+item.transportCode+'" name="'+item.transportName+'" buessEdit="'+item.transportBusiness+'" version='+item.version+'  onclick="editData($(this))" class="btn btn-info btn-sm" ><span class="fa fa-pencil"></span></button></alight</td>' +
            '<td><alight="left">'+(item.transportCode==null?'':item.transportCode)+'</alight></td>' +
            '<td><alight="left">'+(item.transportName==null?'':item.transportName)+'</alight></td>' +
            '<td><alight="left">'+(item.transportBusiness==null?'':item.transportBusiness)+'</alight></td>' +
            '</tr>');

        transportPrototype[item.id]=item;
    });

    $('#transportTable').DataTable({
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
    $('.dv-background').hide();
}

function destroyDataTablePromote() {
    $('#transportTable').DataTable({
        paging: false
    });
    $('#transportTable').DataTable({
        destroy: true,
        searching: false
    });
}

$("#checkall").on('change',function(){
    var booleanCheck = $("#checkall").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxTransport']").prop("checked",true);
    }else{
        $("[name='checkboxTransport']").prop("checked",false);
    }
});

//================================== CheckBox ==================================//
function checkboxLine(checkbox) {
    var countCheck = $("input[name ='checkboxTransport']:checked:checked").length;
    var countAll = $("[name='checkboxTransport']").length;
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
    $("#transportBusiness").val("");
    $("#transportBusinessEdit").val("");
    $("#textInputBuess").val("");
    $("#textInputBuessEdit").val("");
    $("[name='checkboxTransport']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

//================================= Insert =====================================//
function insertData(){

    if ($("#textInputCode").val()!="" && $("#textInputName").val()!="" && $("#transportBusiness").val()!="") {
        var transportCode = $("#textInputCode").val();
        var transportName = $("#textInputName").val();
        var textInputBuess = $("#textInputBuess").val();
        $('.dv-background').show();
        var findTransportByCode = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/transports/findTransportCode',
            data: {
                transportCode:transportCode,
                transportName:transportName,
                createdBy:createdBy,
                updatedBy:updatedBy,
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        if (findTransportByCode.length!=2) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        }else{

            var dataTransport= {
                transportCode: transportCode,
                transportName: transportName,
                transportBusiness:textInputBuess,
            }
            $('.dv-background').show();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/transports",
                data:JSON.stringify(dataTransport),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            clearData();
                            $("#transportTable").DataTable().destroy();
                            findAllTransport();
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");
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
                async:false
            }).done(function (){
                //close loader
                $('.dv-background').hide();
            });
        }

    }else{
        if ($("#textInputCode").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสยานพาหนะ");
        };
        if ($("#textInputName").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อยานพาหนะ");
        };
        if ($("#transportBusiness").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อบริษัท");
        };
    }
    $('.dv-background').hide();
    clearData();
}

$("#btnSave").on('click',function(){
    insertData();
});
$("#modalAlertBtnOk").on('click',function(){
    $("#modalAddTransport").modal('hide');
});
$("#btnCancel").on('click',function(){
    clearData();
    $("#modalAddTransport").modal('hide');
});

//================================== EDIT ======================================//
function editData(rowData){
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeEdit = rowData[0].attributes.getNamedItem("code").value;
    nameEdit = rowData[0].attributes.getNamedItem("name").value;
    buessEdit = rowData[0].attributes.getNamedItem("buessEdit").value;
    indexModify = idEdit;

    $('#textEditInputCode').val(codeEdit);
    $('#textEditInputName').val(nameEdit);
    $('#textInputBuessEdit').val(buessEdit);

    $('#modalEditTransport').modal('show');
}

$("#btnEditSave").on('click',function(){
    editMenu();
    $("#modalEditTransport").modal('hide');
});
//$("#modalAlertBtnOk").on('click',function(){
//    $("#modalAddLocation").modal('hide');
//});

$("#btnEditCancel").on('click',function(){
    clearData();
    $("#modalEditTransport").modal('hide');
});

function editMenu(){

    if ($("#textEditInputCode").val()!="" && $("#textEditInputName").val()!="" && $("#textInputBuessEdit").val()!="" ) {
        var transportCode = $("#textEditInputCode").val();
        var transportName = $("#textEditInputName").val();
        var textInputBuessEdit = $("#textInputBuessEdit").val();

        if (codeEdit==$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val() && buessEdit == $("#textInputBuessEdit").val()) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
            clearData();
            $("#modalEditTransport").modal('hide');

        }else if (codeEdit!=$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val()){
            // ตรวจสอบรหัสซ้ำ
            $('.dv-background').show();
            var dataTransportCode = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/transports/findTransportCodeDuplicate',
                data: {
                    transportCode:transportCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataTransportCode.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("รหัสยานพาหนะนี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDateTransport();
            }
        }else if(codeEdit==$("#textEditInputCode").val() && nameEdit!=$("#textEditInputName").val()){
            // ตรวจสอบชื่อซ้ำ
            $('.dv-background').show();
            var dataTransportName = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/transports/findTransportNameDuplicate',
                data: {
                    transportName:transportName
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;
            if (dataTransportName.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("ชื่อยานพาหนะนี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDateTransport();
            }
        }else if(codeEdit!=$("#textEditInputCode").val() && nameEdit!=$("#textEditInputName").val()){
            // ตรวจสอบชื่อและรหัสซ้ำ
            $('.dv-background').show();
            var dataTransport = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/transports/findTransportCode',
                data: {
                    transportCode:transportCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataTransport.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
            }else{
                updateDateTransport();
            }
        }else{
            updateDateTransport();
        }
    }else{
        if ($("#textEditInputCode").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสยานพาหนะ");
        };
        if ($("#textEditInputName").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อยานพาหนะ");
        };
        if ($("#textInputBuessEdit").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อบริษัท");
        };
    }
    $('.dv-background').hide();
}

// Function Update
function updateDateTransport(){
    var transportCode = $("#textEditInputCode").val();
    var transportName = $("#textEditInputName").val();
    var textInputBuessEdit = $("#textInputBuessEdit").val();

    var dataTransport= {
        transportCode: transportCode,
        transportName: transportName,
        transportBusiness: textInputBuessEdit,
        updatedBy:updatedBy,
        version: transportPrototype[indexModify].version
    }
    $('.dv-background').show();
    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url:session['context']+"/transports/"+indexModify,
        data:JSON.stringify(dataTransport),
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    clearData();
                    $("#transportTable").DataTable().destroy();
                    findAllTransport();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("แก้ไขข้อมูลสำเร็จ");
                } else if(xhr.status==403) {
                    $("#alertModal").modal("show");
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");

                }else{
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("แก้ไขข้อมูลไม่สำเร็จ");

                }
            }else{
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("แก้ไขข้อมูลไม่สำเร็จ");
            }
        },
        async:false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    });
    $('.dv-background').hide();
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
    countDeleteSuccess = 0 ;
    countDeleteFail = 0 ;
    var count=1;
    $('.dv-background').show();
    $.each(deleteId,function(index,item){
        var checkDelete = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context'] + '/travels/checkDelete1',
            data: {
                idDelete: item
            },
            async: false
        }).done(function () {
            $('.dv-background').hide();
        }).responseText;
        if(checkDelete.length==2){

            $.ajax({
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/transports/"+item,
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==200){
                            countDeleteSuccess++;
                            if(count==deleteId.length){
                                $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เรคคอร์ด");
                                $("#deleteModalFree").modal("show");
                                findAllTransport();
                                clearData();
                            }
                            count++;

                        } else if(xhr.status==403) {
                            $("#deleteModalFree").modal("show");
                            $("label[id='detailDeleteFree']").text("คุณไม่มีสิทธิใช้งาน");

                        }else{
                            countDeleteFail++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เรคคอร์ด");
                            $("#deleteModalFree").modal("show");
                            findAllTransport();
                            clearData();
                        }
                    }else{
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ");
                        $("#deleteModalFree").modal("show");
                    }
                },
                async:false
            }).done(function (){
                //close loader
                $('.dv-background').hide();
            });
        }else{
            $("label[id='detailDeleteFree']").text("มีข้อมูลที่ไม่ถูกลบ เนื่องจากใช้งานอยู่");
            $("#deleteModalFree").modal("show");
        }
    });
    findAllTransport();
    $('.dv-background').hide();
});
//================================== End Delete ================================//