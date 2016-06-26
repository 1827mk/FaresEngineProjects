/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var versionedit;
var transportPrototype={};
var indexModify ;
$(document).ready(function () {
    // alert('I love ....');
    clearData();
    findAllTransport();
});

//=============================== RenderTable ===============================//
function findAllTransport() {
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
            '<td><center><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxTransport"  id="'+item.id+'" version= "'+item.version+'" /></center></td>' +
            "<td><button type='button' id="+item.id+" code='"+item.transportCode+"' name='"+item.transportName+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></td>" +
            '<td><alight="left">'+(item.transportCode==null?'':item.transportCode)+'</alight></td>' +
            '<td><alight="left">'+(item.transportName==null?'':item.transportName)+'</alight></td>' +
            '</tr>');

        transportPrototype[item.id]=item;
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
    $("[name='checkboxTransport']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

//================================= Insert =====================================//
function insertData(){

    if ($("#textInputCode").val()!="" && $("#textInputName").val()!="") {
        var transportCode = $("#textInputCode").val();
        var transportName = $("#textInputName").val();

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
                transportName:transportName
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
                transportName: transportName
            }

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
                            findAllTransport();
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
            $("label[id=detailAlert]").text("กรุณากรอกรหัสยานพาหนะ");
        };
        if ($("#textInputName").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อยานพาหนะ");
        };
    }
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
    indexModify = idEdit;

    $('#textEditInputCode').val(codeEdit);
    $('#textEditInputName').val(nameEdit);

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

    if ($("#textEditInputCode").val()!="" && $("#textEditInputName").val()!="") {
        var transportCode = $("#textEditInputCode").val();
        var transportName = $("#textEditInputName").val();

        if (codeEdit==$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val()) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
            clearData();
            $("#modalEditTransport").modal('hide');

        }else if (codeEdit!=$("#textEditInputCode").val() && nameEdit==$("#textEditInputName").val()){
            // ตรวจสอบรหัสซ้ำ
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
    }
}

// Function Update
function updateDateTransport(){
    var transportCode = $("#textEditInputCode").val();
    var transportName = $("#textEditInputName").val();

    var dataTransport= {
        transportCode: transportCode,
        transportName: transportName,
        version: transportPrototype[indexModify].version
    }
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
                    findAllTransport();
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
            url:session['context']+"/transports/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){

                        if(count==deleteId.length){
                            $("label[id='message']").text("ลบข้อมูลสำเร็จ");
                            $("#resultModal").modal("show");
                            findAllTransport();
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