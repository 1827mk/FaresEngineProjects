/**
 * Created by tanaphatdev on 1/5/2559.
 */
$(document).ready(function () {
    $("#RoleTable").DataTable().destroy();
    findAllRole();
});
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
var dates = yyyy+'/'+mm+'/'+dd;

var rolePrototype={};
var indexModify ;
var createdBy = session.user;
var updatedBy = session.user;
var createdDate = dates;
var updatedDate = dates;

function findAllRole() {
    $("#RoleTable").DataTable().destroy();
    var findAllRole = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/approles/findAllRole',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#tbodyRole').empty();
    $.each(JSON.parse(findAllRole),function(index,item){
        
        $('#tbodyRole').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkbox(this)" name = "checkboxRole"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
            "<td><alight='left'><button type='button' id="+item.id+" name='"+item.name+"' description='"+item.description+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></alight></td>" +
            '<td><alight="left">'+(item.name==null?'':item.name)+'</alight></td>' +
            '<td><alight="left">'+(item.description==null?'':item.description)+'</alight></td>' +
            '</tr>');
        rolePrototype[item.id]=item;
    });
    $('#RoleTable').DataTable({
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

function clearAll() {
    $('#textRoleName').val('');
    $('#textDescription').val('');
    $('#textRoleNameEdit').val('');
    $('#textDescriptionEdit').val('');
    $("#checkboxAll").prop("checked",false);
    $("[name='checkboxRole']").prop("checked",false);
}
$("#btnSave").on('click',function(){
    insertData();
});
$("#add").on('click',function(){
    clearAll();
});
$("#btnCancel").on('click',function(){
    $('#modalAddRole').modal('hide');
});
$("#btnEditSave").on('click',function(){
    Update();
});
$("#btnEditCancel").on('click',function(){
    $('#modalEditRole').modal('hide');
});
$("#modalAlertBtnOk").on('click',function(){
    $('#modalAddRole').modal('hide');
    $('#modalEditRole').modal('hide');
})
;$("#modalAlertErrorBtnOk").on('click',function(){

});

function insertData(){

    if ($("#textRoleName").val()!="" && $("#textDescription").val()!="") {
        var roleName = $("#textRoleName").val();
        var description = $("#textDescription").val();

        var findCheckDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/approles/findCheckDuplicate',
            data: {
                name:roleName,
                description:description
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;
        if (findCheckDuplicate.length!=2) {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        }else{
            var insertDatafares = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/approles/insertData',
                data: {
                    name: roleName,
                    description: description,
                    createdBy:createdBy,
                    updatedBy:updatedBy

                },
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            $("#RoleTable").DataTable().destroy();
                            clearAll();
                            findAllRole();
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
            });
        }

    }else{
        if ($("#textRoleName").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกชื่อ");
        }else if ($("#textDescription").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกคำอธิบาย");
        }
    }
}

var idEdit;
var nameEdit;
var descriptionEdit;
var versionEdit;
function editData(rowData){
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    nameEdit = rowData[0].attributes.getNamedItem("name").value;
    descriptionEdit = rowData[0].attributes.getNamedItem("description").value;
    indexModify = idEdit;

    $('#textRoleNameEdit').val(nameEdit);
    $('#textDescriptionEdit').val(descriptionEdit);
    $('#modalEditRole').modal('show');
}

// Function Update
function Update(){
    var name = $("#textRoleNameEdit").val();
    var description = $("#textDescriptionEdit").val();

    if (nameEdit==$("#textRoleNameEdit").val() && descriptionEdit==$("#textDescriptionEdit").val()) {
        $("#alertModal").modal('show');
        $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        clearAll();

    }else if (nameEdit!=$("#textRoleNameEdit").val() ||  descriptionEdit!=$("#textDescriptionEdit").val()) {

        var findCheckDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context'] + '/approles/findCheckDuplicate',
            data: {
                name: name,
                description: description
            },
            async: false
        }).done(function () {
            //close loader
            $('.dv-background').hide();
        }).responseText;
        if (findCheckDuplicate.length != 2) {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
        } else {
            var update = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/approles/updateData',
                data: {
                    id:idEdit,
                    name: name,
                    description: description,
                    version: rolePrototype[indexModify].version,
                    updatedBy:updatedBy

                },
                complete:function(xhr){
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            clearAll();
                            findAllRole();
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("แก้ไขข้อมูลสำเร็จ");
                        } else if(xhr.status==403) {
                            $("#alertModal").modal("show");
                            $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");

                        } else {
                            $("#alertModal").modal('show');
                            $("label[id=detailAlert]").text("แก้ไขข้อมูลไม่สำเร็จ");

                        }
                    } else {
                        $("#alertModal").modal('show');
                        $("label[id=detailAlert]").text("แก้ไขข้อมูลไม่สำเร็จ");
                    }
                },
                async: false
            });
        }
    }
}

$("#checkboxAll").on('change',function(){
    var booleanCheck = $("#checkboxAll").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxRole']").prop("checked",true);
    }else{
        $("[name='checkboxRole']").prop("checked",false);
    }
});

function checkbox(checkbox) {
    var countCheck = $("input[name ='checkboxRole']:checked:checked").length;
    var countAll = $("[name='checkboxRole']").length;
    if (countCheck == countAll) {
        $("#checkboxAll").prop("checked",true);
    }else{
        $("#checkboxAll").prop("checked",false);
    }
}

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
        $("#alertModalError").modal("show");
        $("label[id='detailAlertError']").text("กรุณาเลือกอย่างน้อย 1 เรคคอร์ด");

    }
});


var countDeleteSuccess = 0 ;
var countDeleteFail = 0 ;

$("#modalAlertBtnOkDelete").on('click',function(){
    var count=1;
    $.each(deleteId,function(index,item){
        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url:session['context']+"/approles/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
                            $("#deleteModalFree").modal("show");
                            findAllRole();
                            clearAll();
                        }
                        count++;

                    } else if(xhr.status==403) {
                        $("#deleteModalFree").modal("show");
                        $("label[id='detailDeleteFree']").text("คุณไม่มีสิทธิใช้งาน");

                    }else{
                        countDeleteFail++;
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เร็คคอด");
                        $("#deleteModalFree").modal("show");
                        findAllRole();
                        clearAll();
                    }
                }else{
                    $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ");
                    $("#deleteModalFree").modal("show");
                }
            },
            async:false
        });
    });
    findAllRole();
});
//================================== End Delete ================================//

