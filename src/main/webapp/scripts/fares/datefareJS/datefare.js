/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var versionedit;
var nameEdit;
var datePrototype={};
var indexModify ;
$(document).ready(function () {
    // alert('I love ....');
    clearData();
    findAllDate();
});

//=============================== RenderTable ===============================//
function findAllDate() {
    var dateData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/datefareses/findAllDatefared',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#tbodyDate').empty();
    $.each(JSON.parse(dateData),function(index,item){

        var date = new Date(item.dateFared).toISOString().split("T")[0];

        console.log(date)
        var dates = date.split("-");

        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        $('#tbodyDate').append('<tr>' +
            '<td><center><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxDate"  id="'+item.id+'" version= "'+item.version+'" /></center></td>' +
            "<td><button type='button' id="+item.id+" date='"+item.dateFared+"' dateName='"+item.dateName+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></td>" +
            '<td><alight="left">'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</alight></td>' +
            '<td><alight="left">'+(item.dateName==null?'':item.dateName)+'</alight></td>' +
            '</tr>');

        datePrototype[item.id]=item;
    });
}

$("#checkall").on('change',function(){
    var booleanCheck = $("#checkall").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxDate']").prop("checked",true);
    }else{
        $("[name='checkboxDate']").prop("checked",false);
    }
});

//================================== CheckBox ==================================//
function checkboxLine(checkbox) {
    var countCheck = $("input[name ='checkboxDate']:checked:checked").length;
    var countAll = $("[name='checkboxDate']").length;
    if (countCheck == countAll) {
        $("#checkall").prop("checked",true);
    }else{
        $("#checkall").prop("checked",false);
    }
}

//================================= Clear Data =================================//
function clearData(){
    $("#txtDate_Add").val("");
    $("#txtDate_Name").val("");
    $("#txtDate_Edit").val("");
    $("#txtEditDate_Name").val("");
    $("[name='checkboxDate']").prop("checked",false);
    $("#checkall").prop("checked",false);
}

//================================= Insert =====================================//
function insertData(){

    if ($("#txtDate_Add").val()!="" && $("#txtDate_Name").val()!="") {

        var dates = $("#txtDate_Add").val().split(" ")[0];
        var date = parseInt(dates.split('/')[0]);
        var month = parseInt(dates.split('/')[1]);
        var year = parseInt(dates.split('/')[2]);
        var dateNew = parseInt(date+1);
        var dateFull = month+'/'+dateNew+'/'+year;
        var dateName = $("#txtDate_Name").val();
        //var checkDateDuplicate = year+'/'+month+'/'+dateNew;

        var findDateByCode = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/datefareses/findDateCode',
            data: {
                dateFared:dateFull
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        if (findDateByCode.length!=2) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        }else{

            var dataDate= {
                dateFared: dateFull,
                dateName: dateName
            }

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                    Accept: "application/json"
                },
                url:session['context']+"/datefareses",
                data:JSON.stringify(dataDate),
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            clearData();
                            findAllDate();
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");

                        }else if(xhr.status==403){
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน!!");

                        }else {
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
        if ($("#txtDate_Add").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสโปรโมชั่น");
        }else {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกชื่อวันที่");
        }
    }
}

$("#btnSave").on('click',function(){
    insertData();
});
$("#modalAlertBtnOk").on('click',function(){
    $("#modalAddDate").modal('hide');
});
$("#btnCancel").on('click',function(){
    clearData();
    $("#modalAddDate").modal('hide');
});

//================================== EDIT ======================================//
function editData(rowData){
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeEdit = rowData[0].attributes.getNamedItem("date").value;
    nameEdit = rowData[0].attributes.getNamedItem("dateName").value;
    indexModify = idEdit;

    $('#txtDate_Edit').val(codeEdit);
    $('#txtEditDate_Name').val(nameEdit);
    $('#txtDate_Edit').val("");
    $('#modalEditDate').modal('show');
}

$("#btnEditSave").on('click',function(){
    editMenu();
    $("#modalEditDate").modal('hide');
});
//$("#modalAlertBtnOk").on('click',function(){
//    $("#modalAddLocation").modal('hide');
//});

$("#btnEditCancel").on('click',function(){
    clearData();
    $("#modalEditDate").modal('hide');
});

function editMenu() {



    if ($("#txtDate_Edit").val() != "" && $("#txtEditDate_Name").val() != "") {

        var dates = $("#txtDate_Edit").val().split(" ")[0];
        var date = parseInt(dates.split('/')[0]);
        var month = parseInt(dates.split('/')[1]);
        var year = parseInt(dates.split('/')[2]);
        var dateNew = parseInt(date+1);
        var dateFull = month+'/'+dateNew+'/'+year;
        var dateName = $("#txtEditDate_Name").val();

        if (codeEdit == $("#txtDate_Edit").val()) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
            clearData();
            $("#modalEditDate").modal('hide');

        } else if (codeEdit != $("#txtDate_Edit").val()) {
            // ตรวจสอบรหัสซ้ำ
            var dataDateCode = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context'] + '/datefareses/findDateDuplicate',
                data: {
                    dateFared: dateFull
                },
                async: false
            }).done(function () {
                $('.dv-background').hide();
            }).responseText;

            if (dataDateCode.length != 2) {
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("รหัสโปรโมชั่นนี้มีอยู่ในระบบแล้ว!!");
            } else {
                updateDateDate();
            }
        } else {
            updateDateDate();
        }
    } else {
        if ($("#txtDate_Edit").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสโปรโมชั่น");
        }
        ;
    }
}

// Function Update
function updateDateDate(){

    var dates = $("#txtDate_Edit").val().split(" ")[0];
    var date = parseInt(dates.split('/')[0]);
    var month = parseInt(dates.split('/')[1]);
    var year = parseInt(dates.split('/')[2]);
    var dateNew = parseInt(date+1);
    var dateFull = month+'/'+dateNew+'/'+year;
    var dateName = $("#txtEditDate_Name").val();


    var dataDate= {
        dateFared: dateFull,
        dateName: dateName,
        version: datePrototype[indexModify].version
    }
    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        url:session['context']+"/datefareses/"+indexModify,
        data:JSON.stringify(dataDate),
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200) {
                    clearData();
                    findAllDate();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("แก้ไขข้อมูลสำเร็จ");
                }
                else if(xhr.status==403) {
                        $("#alertModal").modal('show');
                        $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน!!");
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
            url:session['context']+"/datefareses/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){

                        if(count==deleteId.length){
                            $("label[id='message']").text("ลบข้อมูลสำเร็จ");
                            $("#resultModal").modal("show");
                            findAllDate();
                            clearData();
                        }
                        count++;
                    }
                    else if(xhr.status==403) {
                        $("#alertModal").modal('show');
                        $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน!!");
                        
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

$('#txtDate_Add').bootstrapMaterialDatePicker({
    weekStart : 0,
    time: false,
    format: "DD/MM/YYYY"
});

$('#txtDate_Edit').bootstrapMaterialDatePicker({
    weekStart : 0,
    time: false,
    format: "DD/MM/YYYY"
});

$('#btn_EventDate').on('click',function(){
    $("#txtDate_Add").focus();
});

$('#btn_EventDate_Edit').on('click',function(){
    $("#txtDate_Edit").focus();
});