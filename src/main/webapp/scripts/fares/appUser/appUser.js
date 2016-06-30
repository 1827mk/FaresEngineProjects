
/**
 * Created by tanaphatdev on 1/5/2559.
 */

$(document).ready(function () {
    $('.dv-background').show();
    findAllUser();
    $("#needLoginTrue").prop("checked", true);
    fineAppRole();
    clearAll();
});
var userPrototype={};
var indexModify ;
var createdBy = session.user;
var updatedBy = session.user;
var appRoleName;
function fineAppRole() {
    $('.dv-background').show();
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
    $('#selectRole').empty();
    $('#selectRoleEdit').empty();
    $.each(JSON.parse(findAllRole),function(index,item){
        $('#selectRole').append('<option value="'+item.id+'">'+item.name+':'+item.description+'</option>');
        $('#selectRoleEdit').append('<option value="'+item.id+'">'+item.name+':'+item.description+'</option>');
    });
}

function findAllUser() {
    $('.dv-background').show();
    $("#UserTable").DataTable().destroy();
    var findAllUser = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/appusers/findAlluser',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#tbodyUser').empty();
    $.each(JSON.parse(findAllUser),function(index,item){
        var statusUser ;
       if(item.needLogin == true){
           statusUser = "อนุญาติ"
       }else{
           statusUser = "ปฏิเสธิ"
       }
        $('#tbodyUser').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkbox(this)" name = "checkboxUser"  id="'+item.id+'" version= "'+item.version+'" value="'+item.username+'"  /></alight></td>' +
            "<td><alight='left'><button type='button' id="+item.id+" name='"+item.username+"' mail='"+item.userEmail+"' roleName='"+item.userRole.name+"' roleId='"+item.userRole.id+"' roleDest='"+item.userRole.description+"'  needLogin='"+item.needLogin+"' version="+item.version+"  onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></alight></td>" +
            '<td><alight="left">'+(item.username==null?'':item.username)+'</alight></td>' +
            '<td><alight="left">'+(item.userEmail==null?'':item.userEmail)+'</alight></td>' +
            '<td><alight="left">'+(statusUser==null?'':statusUser)+'</alight></td>' +
            '</tr>');
        userPrototype[item.id]=item;
    });
    $('#UserTable').DataTable({
        "sScrollX": "100%",
        // "sScrollY": "980px",
        "bSort": false,
        "ordering": false,
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
    $('#textUserName').val('');
    $('#textPass1').val('');
    $('#textPass2').val('');
    $('#textMail').val('');
    
    $('#textUserNameEdit').val('');
    $('#textPass1Edit').val('');
    $('#textPass2Edit').val('');
    $('#textMailEdit').val('');
    $("[name='checkboxUser']").prop("checked",false);
    $("#checkboxAll").prop("checked",false);
}
$("#btnSave").on('click',function(){
    insertData();
});
$("#add").on('click',function(){
    clearAll();
});
$("#btnCancel").on('click',function(){
    $('#modalAddUser').modal('hide');
});
$("#btnEditSave").on('click',function(){
    Update();
});
$("#btnEditCancel").on('click',function(){
    $('#modalEditUser').modal('hide');
});
$("#modalAlertBtnOk").on('click',function(){
    $('#modalAddUser').modal('hide');
    $('#modalEditUser').modal('hide');
})
// ;$("#delete").on('click',function(){
//
// });

var checkMail = "false" ;
function insertData(){
    var needLogin;
    var selectedOption = $("input:radio[name=optradio]:checked").val();
    if(selectedOption==01){
        needLogin = true;
    }else {
        needLogin = false;
    }

    var selectRole = $('#selectRole').val();
    
    var username = $('#textUserName').val();
    var password = $('#textPass1').val();
    var confirmpassword = $('#textPass2').val();
    var userEmail = $('#textMail').val();

    var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    checkMail = emailCheck.test(userEmail);

    if ($("#textUserName").val()!="" && $("#textPass1").val()!="" && $("#textPass2").val()!="" &&$("#textPass1").val()==$("#textPass2").val() && checkMail!= false) {
        $('.dv-background').show();
        var findCheckDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/appusers/findCheckDuplicateUser',
            data: {
                username:username,
                userEmail:userEmail
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
                url: session['context']+'/appusers/insertDataUser',
                data: {
                    username:username,
                    password:password,
                    confirmpassword:confirmpassword,
                    needLogin:needLogin,
                    userEmail:userEmail,
                    createdBy:createdBy,
                    updatedBy:updatedBy,
                    userRole:selectRole

                },
                complete:function(xhr){
                    if(xhr.readyState==4){
                        if(xhr.status==201){
                            $("#UserTable").DataTable().destroy();
                            clearAll();
                            findAllUser();
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
        if ($("#textUserName").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณากรอกชื่อ");
        }else if ($("#textPass1").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณาระบุรหัสผ่าน");
        }else if ($("#textPass2").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณายืนยันรหัสผ่าน");
        }else if ($("#textPass1").val()!= $("#textPass2").val()) {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบ!");
        }else {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("ระบุอีเมลไม่ถูกต้อง");
        }
    }
}

$('#textUserNameEdit').val('');
$('#textPass1Edit').val('');
$('#textPass2Edit').val('');
$('#textMailEdit').val('');

var idEdit;
var versionEdit;
var nameEdit;
var mailEdit;
var roleIdEdit;
var roleNameEdit;
var roleDestEdit;
var needLogin = true;
function editData(rowData){
    fineAppRole();
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    nameEdit = rowData[0].attributes.getNamedItem("name").value;
    mailEdit = rowData[0].attributes.getNamedItem("mail").value;
    needLogin = rowData[0].attributes.getNamedItem("needLogin").value;
    roleIdEdit = rowData[0].attributes.getNamedItem("roleId").value;
    roleNameEdit = rowData[0].attributes.getNamedItem("roleName").value;
    roleDestEdit = rowData[0].attributes.getNamedItem("roleDest").value;
    indexModify = idEdit;

    $('#textUserNameEdit').val(nameEdit);
    $('#textMailEdit').val(mailEdit);
    $("#textPass1Edit").val("") ;
    $("#textPass2Edit").val("") ;
    $("#textPassOldEdit").val("");
    var textSelect = "(ปัจจุบัน)"
    $('#selectRoleEdit').prepend('<option  selected="selected" value="'+roleIdEdit+'">'+roleNameEdit+':'+roleDestEdit+':'+textSelect+'</option>');


    if(needLogin==true || needLogin=="true"){
        needLogin = true;
        $("#needLoginTrueEdit").prop("checked", true);
    }else {
        needLogin = false;
        $("#needLoginFlaseEdit").prop("checked", true);
    }
    $('#modalEditUser').modal('show');
}

// Function Update
var needLoginEdit = false;
function Update(){

    var userName = $("#textUserNameEdit").val();
    var userMail = $("#textMailEdit").val();
    var passOld = $("#textPassOldEdit").val();
    var pass1 = $("#textPass1Edit").val();
    var pass2 = $("#textPass2Edit").val();
    var userRole = $("#selectRoleEdit").val();

    var selectedOption = $("input:radio[name=optradio2]:checked").val();

    if(selectedOption=="01"){
        needLoginEdit = true;
    }else if(selectedOption=="02"){
        needLoginEdit = false;
    }else{

    }


    if (nameEdit==$("#textUserNameEdit").val() && mailEdit==$("#textMailEdit").val() &&  needLoginEdit==needLogin && $("#textPass1Edit").val()=="" && $("#textPass2Edit").val()=="" && $("#textPassOldEdit").val()=="" && roleIdEdit==$("#selectRoleEdit").val()) {
        $("#alertModal").modal('show');
        $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        clearAll();

    }else if (nameEdit!=$("#textUserNameEdit").val() && mailEdit!=$("#textMailEdit").val() && needLoginEdit==needLogin  && $("#textPass1Edit").val()=="" && $("#textPass2Edit").val()=="" && $("#textPassOldEdit").val()=="" && roleIdEdit==$("#selectRoleEdit").val()) {
        $('.dv-background').show();
        var findCheckDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context'] + '/appusers/findCheckDuplicateUserAndMail',
            data: {
                username: userName,
                userEmail: userMail
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

            updateUser();
        }
    }else if (nameEdit!=$("#textUserNameEdit").val() && mailEdit==$("#textMailEdit").val() && needLoginEdit==needLogin  && $("#textPass1Edit").val()=="" && $("#textPass2Edit").val()=="" && $("#textPassOldEdit").val()=="" && roleIdEdit==$("#selectRoleEdit").val()) {

            var findCheckDuplicate = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context'] + '/appusers/findCheckDuplicateUser',
                data: {
                    username: userName
                },
                async: false
            }).done(function () {
                //close loader
                $('.dv-background').hide();
            }).responseText;
            if (findCheckDuplicate.length != 2) {
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("ข้อมูลที่กรอกมีในระบบแล้ว กรุณาตรวจสอบใหม่อีกครั้ง");
            }else{

                updateUser();
            }
        
    }else if ($("#textPass1Edit").val()!="" || $("#textPass2Edit").val()!="" && nameEdit ==$("#textUserNameEdit").val() && mailEdit==$("#textMailEdit").val() && needLoginEdit==needLogin ){

        if($("#textPass1Edit").val() != $("#textPass2Edit").val()){

            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("รหัสผ่านไม่ตรงกัน!");
        }else if($("#textPassOldEdit").val() =="") {

            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณาระบุรหัสผ่านเดิม!");
        }else {

            var checkOldPass = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context'] + '/appusers/checkOldPass',
                data: {
                    username: userName,
                    password: passOld
                },
                async: false
            }).done(function () {
                //close loader
                $('.dv-background').hide();
            }).responseText;
            if (checkOldPass.length == 2) {
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("รหัสผ่านเดิมไม่ถูกต้อง!");
            }else {

                updateUser();
            }
        }

    }else if($("#textPassOldEdit").val()!="" && nameEdit==$("#textUserNameEdit").val() && mailEdit==$("#textMailEdit").val() &&  needLoginEdit==needLogin && $("#textPass1Edit").val()=="" && $("#textPass2Edit").val()=="") {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("กรุณาตรวจสอบข้อมูล!");
    }else{
        updateUser();

    }
}

function updateUser() {

    var userName = $("#textUserNameEdit").val();
    var userMail = $("#textMailEdit").val();
    var pass1 = $("#textPass1Edit").val();
    var pass2 = $("#textPass2Edit").val();
    var role = $("#selectRoleEdit").val();
    $('.dv-background').show();
    var update = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context'] + '/appusers/updateDataUser',
        data: {
            id: idEdit,
            username: userName,
            password: pass1,
            confirmpassword: pass2,
            needLogin: needLoginEdit,
            updatedBy: updatedBy,
            userEmail: userMail,
            userRole: role,
            version: userPrototype[indexModify].version,
        },
        complete: function (xhr) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    clearAll();
                    findAllUser();
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
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    });
}

$("#checkboxAll").on('change',function(){
    var booleanCheck = $("#checkboxAll").prop("checked");
    if (booleanCheck) {
        $("[name='checkboxUser']").prop("checked",true);
    }else{
        $("[name='checkboxUser']").prop("checked",false);

    }
});

function checkbox(checkbox) {
    var countCheck = $("input[name ='checkboxUser']:checked:checked").length;
    var countAll = $("[name='checkboxUser']").length;
    if (countCheck == countAll) {
        $("#checkboxAll").prop("checked",true);
    }else{
        $("#checkboxAll").prop("checked",false);
    }
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var deleteId=[];
var deleteAllId=[];
var deleteItem ;
var checkedValue =[];

$("#delete").on('click',function(){
    checkedValue.clear();

    var checkbox=$("tbody input[type='checkbox']");
    deleteId.clear();
    $.each(checkbox,function(index,item){
        var $this = $(this);
        if(item.checked){
            deleteItem =item.id;
            deleteId.push(item.id);
            checkedValue.push($this.attr("value"));
      
        }

    });

    var user = createdBy;
    checkedValue.contains(user);

    if( checkedValue.contains(user) == true){
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("พบชื่อผู้ใช้งานปัจจุบันในระบบ ไม่สามารถลบข้อมูลได้!");
    }else{
        if(deleteId.length>0){
            $("#deleteModal").modal("show");
            $("label[id='detailDelete']").text("คุณต้องการลบ"+' '+deleteId.length + ' '+"เรคคอร์ด" );
        }else{
            $("#alertModalError").modal("show");
            $("label[id='detailAlertError']").text("กรุณาเลือกอย่างน้อย 1 เรคคอร์ด");

        }
    }

});

var countDeleteSuccess = 0 ;
var countDeleteFail = 0 ;

$("#modalAlertBtnOkDelete").on('click',function(){
    countDeleteSuccess = 0 ;
    countDeleteFail = 0 ;
    var count=1;
    $.each(deleteId,function(index,item){
        $('.dv-background').show();
        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                Accept: "application/json"
            },
            url:session['context']+"/appusers/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
                            $("#deleteModalFree").modal("show");
                            findAllUser();
                            clearAll();
                        }
                        count++;
                    } else if(xhr.status==403) {
                        $("#deleteModalFree").modal("show");
                        $("label[id=detailDeleteFree]").text("คุณไม่มีสิทธิใช้งาน");

                    }else{
                        countDeleteFail++;
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เร็คคอด");
                        $("#deleteModalFree").modal("show");
                        findAllUser();
                        clearAll();
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
    findAllUser();
});

//================================== End Delete ================================//

