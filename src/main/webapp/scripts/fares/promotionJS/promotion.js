/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var versionedit;
var promotionPrototype={};
var indexModify ;
$(document).ready(function () {
    // alert('I love ....');
    clearData();
    findAllPromotion();
});

//=============================== RenderTable ===============================//
function findAllPromotion() {
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
            '<td><center><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxPromotion"  id="'+item.id+'" version= "'+item.version+'" /></center></td>' +
            "<td><button type='button' id="+item.id+" code='"+item.promotionCode+"' name='"+item.promotionName+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></td>" +
            '<td><alight="left">'+(item.promotionCode==null?'':item.promotionCode)+'</alight></td>' +
            '<td><alight="left">'+(item.promotionName==null?'':item.promotionName)+'</alight></td>' +
            '</tr>');

        promotionPrototype[item.id]=item;
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
                promotionName: promotionName
            }

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
                            findAllPromotion();
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");

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
        version: promotionPrototype[indexModify].version
    }
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
                    findAllPromotion();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("แก้ไขข้อมูลสำเร็จ");

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
            url:session['context']+"/promotions/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){

                        if(count==deleteId.length){
                            $("label[id='message']").text("ลบข้อมูลสำเร็จ");
                            $("#resultModal").modal("show");
                            findAllPromotion();
                            clearData();
                        }
                        count++;

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