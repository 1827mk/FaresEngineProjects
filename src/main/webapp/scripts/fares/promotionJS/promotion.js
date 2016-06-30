/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var versionedit;
var createdBy=session.user;
var updatedBy=session.user;
var promotionPrototype={};
var indexModify ;
$(document).ready(function () {
    $('.dv-background').show();
    // alert('I love ....');
    clearData();
    findAllPromotion();
    $('.dv-background').hide();
});

//=============================== RenderTable ===============================//
function findAllPromotion() {
    $('.dv-background').show();
    $("#promotionTable").DataTable().destroy();
    var promotionData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/promotions/findAllPromotion',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;
    $('#tbodyPromotion').empty();
    $.each(JSON.parse(promotionData),function(index,item){

        $('#tbodyPromotion').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxPromotion"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
            "<td><alight='left'><alight type='button' id="+item.id+" code='"+item.promotionCode+"' name='"+item.promotionName+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></alight></td>" +
            '<td><alight="left">'+(item.promotionCode==null?'':item.promotionCode)+'</alight></td>' +
            '<td><alight="left">'+(item.promotionName==null?'':item.promotionName)+'</alight></td>' +
            '</tr>');

        promotionPrototype[item.id]=item;
    });

    $('#promotionTable').DataTable({
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

$("#checkall").on('change',function(){
    var booleanCheck = $("#checkall").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxPromotion']").prop("checked",true);
    }else{
        $("[name='checkboxPromotion']").prop("checked",false);
    }
});

//================================== CheckBox ==================================//
function checkboxLine(checkbox) {
    var countCheck = $("input[name ='checkboxPromotion']:checked:checked").length;
    var countAll = $("[name='checkboxPromotion']").length;
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
    $("[name='checkboxPromotion']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

//================================= Insert =====================================//
function insertData(){

    if ($("#textInputCode").val()!="" && $("#textInputName").val()!="") {
        var promotionCode = $("#textInputCode").val();
        var promotionName = $("#textInputName").val();
        $('.dv-background').show();
        var findPromotionByCode = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/promotions/findPromotionCode',
            data: {
                promotionCode:promotionCode,
                promotionName:promotionName
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        if (findPromotionByCode.length!=2) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        }else{

            var dataPromotion= {
                promotionCode: promotionCode,
                promotionName: promotionName,
                createdBy:createdBy,
                updatedBy:updatedBy
            }
            $('.dv-background').show();
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/promotions",
                data:JSON.stringify(dataPromotion),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            clearData();
                            $("#promotionTable").DataTable().destroy();
                            findAllPromotion();
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
            $("label[id=detailAlert]").text("กรุณากรอกรหัสโปรโมชั่น");
        };
        if ($("#textInputName").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อโปรโมชั่น");
        };
    }
}

$("#btnSave").on('click',function(){
    insertData();
});
$("#modalAlertBtnOk").on('click',function(){
    $("#modalAddPromotion").modal('hide');
});
$("#btnCancel").on('click',function(){
    clearData();
    $("#modalAddPromotion").modal('hide');
});

//================================== EDIT ======================================//
function editData(rowData){
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeEdit = rowData[0].attributes.getNamedItem("code").value;
    nameEdit = rowData[0].attributes.getNamedItem("name").value;
    indexModify = idEdit;

    $('#textEditInputCode').val(codeEdit);
    $('#textEditInputName').val(nameEdit);

    $('#modalEditPromotion').modal('show');
}

$("#btnEditSave").on('click',function(){
    editMenu();
    $("#modalEditPromotion").modal('hide');
});
//$("#modalAlertBtnOk").on('click',function(){
//    $("#modalAddLocation").modal('hide');
//});

$("#btnEditCancel").on('click',function(){
    clearData();
    $("#modalEditPromotion").modal('hide');
});

function editMenu(){

    if ($("#textEditInputCode").val()!="" && $("#textEditInputName").val()!="") {
        var promotionCode = $("#textEditInputCode").val();
        var promotionName = $("#textEditInputName").val();

        if (codeEdit==$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val()) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
            clearData();
            $("#modalEditPromotion").modal('hide');

        }else if (codeEdit!=$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val()){
            // ตรวจสอบรหัสซ้ำ
            $('.dv-background').show();
            var dataPromotionCode = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/promotions/findPromotionCodeDuplicate',
                data: {
                    promotionCode: promotionCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataPromotionCode.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("รหัสโปรโมชั่นนี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDatePromotion();
            }
        }else if(codeEdit==$("#textEditInputCode").val() && nameEdit!=$("#textEditInputName").val()){
            // ตรวจสอบชื่อซ้ำ
            $('.dv-background').show();
            var dataPromotionName = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/promotions/findPromotionNameDuplicate',
                data: {
                    promotionName: promotionName
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;
            if (dataPromotionName.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("ชื่อโปรโมชั่นนี้มีอยู่ในระบบแล้ว!!");
            }else{
                updateDatePromotion();
            }
        }else if(codeEdit!=$("#textEditInputCode").val() && nameEdit!=$("#textEditInputName").val()){
            // ตรวจสอบชื่อและรหัสซ้ำ
            $('.dv-background').show();
            var dataPromotion = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/promotions/findPromotionCode',
                data: {
                    promotionCode:promotionCode
                },
                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;

            if (dataPromotion.length!=2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
            }else{
                updateDatePromotion();
            }
        }else{
            updateDatePromotion();
        }
    }else{
        if ($("#textEditInputCode").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสโปรโมชั่น");
        };
        if ($("#textEditInputName").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อโปรโมชั่น");
        };
    }
}

// Function Update
function updateDatePromotion(){
    var promotionCode = $("#textEditInputCode").val();
    var promotionName = $("#textEditInputName").val();

    var dataPromotion= {
        promotionCode: promotionCode,
        promotionName: promotionName,
        updatedBy:updatedBy,
        version: promotionPrototype[indexModify].version
    }
    $('.dv-background').show();
    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url:session['context']+"/promotions/"+indexModify,
        data:JSON.stringify(dataPromotion),
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    clearData();
                    $("#promotionTable").DataTable().destroy();
                    findAllPromotion();
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
        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url:session['context']+"/promotions/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
                            $("#deleteModalFree").modal("show");
                            findAllPromotion();
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
                        findAllPromotion();
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
    });
    findAllPromotion();
});
//================================== End Delete ================================//