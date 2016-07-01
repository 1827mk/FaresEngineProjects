/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeEdit;
var versionedit;
var nameEdit;
var datePrototype={};
var indexModify ;
var createdBy=session.user;
var updatedBy=session.user;
$(document).ready(function () {
    $('.dv-background').show();
    // alert('I love ....');
    clearData();
    findAllDate();
    $('.dv-background').hide();
});

//=============================== RenderTable ===============================//
function findAllDate() {
    $('.dv-background').show();
    $("#dateTable").DataTable().destroy();
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

        // console.log(date)
        var dates = date.split("-");

        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;
        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }

        $('#tbodyDate').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkboxLine(this)" name = "checkboxDate"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
            '<td><alight="left"><button type="button" id="'+item.id+'" date="'+checkDateDuplicate+'" dateName="'+item.dateName+'" version='+item.version+'  onclick="editData($(this))" class="btn btn-info btn-sm" ><span class="fa fa-pencil"></span></button></alight</td>' +
            '<td><alight="left">'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</alight></td>' +
            '<td><alight="left">'+(item.dateName==null?'':item.dateName)+'</alight></td>' +
            '</tr>');

        datePrototype[item.id]=item;
    });

    $('#dateTable').DataTable({
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
    $('.dv-background').show();
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
                dateName: dateName,
                createdBy:createdBy,
                updatedBy:updatedBy
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
                            $("#dateTable").DataTable().destroy();
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
            $("#newModal").modal('show');
            $("label[id=newModalMessage]").text("กรุณากรอกวันที่");
        }else {
            $("#newModal").modal('show');
            $("label[id=newModalMessage]").text("กรุณากรอกชื่อวันที่");
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
    // console.log(codeEdit)
    if(codeEdit == "----------"){
        codeEdit="";
        $('#txtDate_Edit').val(codeEdit);
        $('#txtEditDate_Name').val(nameEdit);
    }else {
        $('#txtDate_Edit').val(codeEdit);
        $('#txtEditDate_Name').val(nameEdit);
    }

    // $('#txtDate_Edit').val("");
    $('#modalEditDate').modal('show');
}

$("#btnEditSave").on('click',function(){
    editMenu();
    // $("#modalEditDate").modal('hide');
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
            $('.dv-background').show();
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
            $("#newModal").modal('show');
            $("label[id=newModalMessage]").text("กรุณากรอกวันที่");
        }
        if ($("#txtEditDate_Name").val() == "") {
            $("#newModal").modal('show');
            $("label[id=newModalMessage]").text("กรุณากรอกชื่อวันที่");
        }
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
        updatedBy:updatedBy,
        version: datePrototype[indexModify].version
    }
    $('.dv-background').show();
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
                    $("#dateTable").DataTable().destroy();
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
            url:session['context']+"/datefareses/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("#dateTable").DataTable().destroy();
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
                            $("#deleteModalFree").modal("show");
                            findAllDate();
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
                        findAllDate();
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
    findAllDate();
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