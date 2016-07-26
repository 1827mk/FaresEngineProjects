/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var versionedit;
var promotePrototype={};
var indexModify ;
var codeTravels;
var createdBy=session.user;
var updatedBy=session.user;

$(document).ready(function () {
    $('.dv-background').show();
    clearDataAll();
    findAllPromote();
    // findPromotion();
    $('.dv-background').hide();
});

function clearDataAll() {
    $('#textInputCode').val('');
    $('#textInputPrice').val('');
    $('#textInputPromotion').val('');
    $('#textDate').val('');

    $('#textEditInputCode').val('');
    $('#textEditInputPrice').val('');
    $('#textInputEditPromotion').val('');
    $('#textEditDate').val('');

    $("#checkboxAll").prop("checked",false);
    $("[name='checkboxFares']").prop("checked",false);
}

function findAllPromote() {
    $('.dv-background').show();
    $("#PromoteTable").DataTable().destroy();
    var promoteData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/promotes/findAllPromote',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

    $('#tbodyPromote').empty();
    $.each(JSON.parse(promoteData),function(index,item){

        var date = new Date(item.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "-"
        }

        $('#tbodyPromote').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkbox(this)" name = "checkboxPromote"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
            "<td><alight='left'><button type='button' id="+item.id+" code='"+item.promoteCode+"' version="+item.version+" price="+item.promotePrice+" promotion="+item.promotion+" dateFared="+item.dateFared+" dateName="+checkDateDuplicate+" onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></alight></td>" +
            '<td><alight="left">'+(item.promoteCode==null?'':item.promoteCode)+'</alight></td>' +
            '<td><alight="left">'+(item.promotePrice==null?'':item.promotePrice)+'</alight></td>' +
            '<td><alight="left">'+(item.promotion==null?'':item.promotion)+'</alight></td>' +
            // '<td><alight="left">'+(item.promotion.promotionName==null?'':item.promotion.promotionName)+'</alight></td>' +
            '<td><alight="left">'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</alight></td>' +
            '</tr>');

        promotePrototype[item.id]=item;
    });

    $('#PromoteTable').DataTable({
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
    $('#PromoteTable').DataTable( {
        paging: false
    } );
    $('#PromoteTable').DataTable( {
        destroy: true,
        searching: false
    } );
}

//=========================== Button ==============================//
$('#btnCancel').on('click',function () {
    $('#modalAddPromote').modal('hide');
    clearDataAll();
})
$('#btnEditCancel').on('click',function () {
    $('#modalEditPromote').modal('hide');
    clearDataAll();
})
$('#add').on('click',function () {
    clearDataAll();
    // findPromotion();
    // findDate();
})
$('#btnEditSave').on('click',function () {
    editPromote();
    // findPromote();
    // findTravel();

})
$('#modalAlertBtnOk').on('click',function () {
    $('#modalEditPromote').modal('hide');
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
$('#textInputPromotion').popover();



$('input').blur(function(){
    if( !$(this).val() ) {
        $(this).popover({
            placement: 'right'
        }).popover('show');
    } else {
        $(this).popover('destroy');
    }
});


//================================== CheckBox ==================================//
$("#checkboxAll").on('change',function(){
    var booleanCheck = $("#checkboxAll").prop("checked");

    if (booleanCheck) {
        $("[name='checkboxPromote']").prop("checked",true);
    }else{
        $("[name='checkboxPromote']").prop("checked",false);
    }
});

function checkbox(checkbox) {
    var countCheck = $("input[name ='checkboxPromote']:checked:checked").length;
    var countAll = $("[name='checkboxPromote']").length;

    if (countCheck == countAll) {
        $("#checkboxAll").prop("checked",true);
    }else{
        $("#checkboxAll").prop("checked",false);
    }
}


//=========================== Insret ===============================//
function insertData() {
    $('.dv-background').show();
    var codePromote = $('#textInputCode').val();
    var pricePromote = $('#textInputPrice').val();
    var promotion = $('#textInputPromotion').val();
    var datePromotion = $('#textDate').val();

    var dates = $("#textDate").val().split(" ")[0];
    var date = parseInt(dates.split('/')[0]);
    var month = parseInt(dates.split('/')[1]);
    var year = parseInt(dates.split('/')[2]);
    var dateNew = parseInt(date+1);
    var dateFull = month+'/'+dateNew+'/'+year;


    if ($('#textInputCode').val() != "" && $('#textInputPrice').val() != "" && $("#textInputPromotion").val() != "" && $("#textDate").val() != "") {
        var findPromoteDuplicate = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context'] + '/promotes/findPromotesByCode',
            data: {
                promoteCode: codePromote
            },
            async: false
        }).done(function () {
            //close loader
            $('.dv-background').hide();
        }).responseText;

        if (findPromoteDuplicate.length == 2) {
            insertPromote();
        }else {
            // Duplicate
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("มีข้อมูลนี้ในระบบแล้ว กรุณาตรวจสอบ!!");
        }
    }else if (promotion != "" || datePromotion != "") {
        $('.dv-background').show();
        var findPromoteDuplicateCD = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context'] + '/promotes/findPromoteDuplicateCD',
            data: {
                promotion: promotion,
                dateFares: dateFull
            },

            async: false
        }).done(function () {
            //close loader
            $('.dv-background').hide();
        }).responseText;
        if (findPromoteDuplicateCD.length == 2) {
            insertPromote();
        } else {
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("รหัสโปรโมชั่นและวันที่นี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
        }
    }else{
        if ($("#textInputCode").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสการจัดการโปรโมชั่น");

        } else if ($("#textInputPrice").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกราคาการจัดการโปรโมชั่น");

        } else if ($("#textInputPromotion").val() == "-") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกโปรโมชั่น");

        } else {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกวันที่จัดโปรโมชั่น");
        }
    }
    $('.dv-background').hide();
}

function insertPromote() {
    var codePromote = $('#textInputCode').val();
    var pricePromote = $('#textInputPrice').val();
    var promotion = $('#textInputPromotion').val();
    // var datePromotion = $('#textDate').val();

    var dates = $("#textDate").val().split(" ")[0];
    var date = parseInt(dates.split('/')[0]);
    var month = parseInt(dates.split('/')[1]);
    var year = parseInt(dates.split('/')[2]);
    var dateNew = parseInt(date+1);
    var dateFull = month+'/'+dateNew+'/'+year;

    //var selectPromotion =  $( "#selectInputPromotion option:selected" ).text();
    //var selectDate = $( "#selectDate option:selected" ).text();
    $('.dv-background').show();
    var insertDatas = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/promotes/insertsData',
        data: {
            promoteCode:codePromote,
            promotePrice:pricePromote,
            promotion:promotion,
            createdBy:createdBy,
            updatedBy:updatedBy,
            date:dateFull
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==201){
                    clearDataAll();
                    $("#PromoteTable").DataTable().destroy();
                    findAllPromote();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");
                    $('#modalAddPromote').modal('hide');
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
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
    $('.dv-background').hide();
}

////////////////////////////////////////////////////////////////////////////

var idEdit;
var versionEdit ;
var codeEdit ;
var priceEdit;
var promotion;
var promotionEdit;
var dateEdit;
function editData(rowData) {
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    codeEdit =rowData[0].attributes.getNamedItem("code").value;
    versionEdit = rowData[0].attributes.getNamedItem("version").value;
    priceEdit = rowData[0].attributes.getNamedItem("price").value;
    promotionEdit = rowData[0].attributes.getNamedItem("promotion").value;
    dateEdit = rowData[0].attributes.getNamedItem("dateName").value;
    // indexModify = idEdit;

    $('#textInputEditCode').val(codeEdit);
    $('#textInputEditPrice').val(priceEdit);
    $('#textInputEditPromotion').val(promotionEdit);
    $('#textEditDate').val(dateEdit);

    $('#modalEditPromote').modal('show');
}

//=========================== Edit ===============================//
function editPromote() {

    if ($('#textInputEditCode').val() != "" && $('#textInputEditPrice').val() != "" && $("#textInputEditPromotion").val() != "" && $("#textEditDate").val() != "-") {

        var codePromote = $('#textInputEditCode').val();
        var pricePromote = $('#textInputEditPrice').val();
        var editPromotion = $('#textInputEditPromotion').val();
        var editDate = $('#textEditDate').val();

        var dates = $("#textEditDate").val().split(" ")[0];
        var date = parseInt(dates.split('/')[0]);
        var month = parseInt(dates.split('/')[1]);
        var year = parseInt(dates.split('/')[2]);
        var dateNew = parseInt(date+1);
        var dateFull = month+'/'+dateNew+'/'+year;

        if (codePromote == codeEdit && pricePromote == priceEdit && editPromotion == promotionEdit && editDate == dateEdit) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        } else {
            // ตรวจสอบรหัสการจัดการโปรโมชั่นเปลี่ยน
            if (codePromote != codeEdit && editPromotion == promotionEdit && editDate == dateEdit) {
                $('.dv-background').show();
                var findPromoteDuplicate = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/promotes/findPromoteCodeDuplicate',
                    data: {
                        promote: codePromote
                    },

                    async: false
                }).done(function () {
                    //close loader
                    $('.dv-background').hide();
                }).responseText;
                // console.log(findPromoteDuplicate.length)
                //ตรวจสอบรหัสโปรโมชั่นกับวันที่เปลี่ยน
                if (findPromoteDuplicate.length == 2) {
                    updatePromote()
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            }else if (codePromote == codeEdit &&  editPromotion != promotionEdit || editDate != dateEdit) {

                $('.dv-background').show();
                var findPromoteDuplicateCD = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/promotes/findPromoteDuplicateCD',
                    data: {
                        promotion: editPromotion,
                        dateFares: dateFull
                    },

                    async: false
                }).done(function () {
                    //close loader
                    $('.dv-background').hide();
                }).responseText;
                if (findPromoteDuplicateCD.length == 2) {
                    updatePromote();
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัสโปรโมชั่นและวันที่นี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            }else if (1==1) {
                updatePromote();
            } else {
                if ($("#textInputEditCode").val() == "") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณากรอกรหัสการจัดการโปรโมชั่น");

                } else if ($("#textInputEditPrice").val() == "") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณากรอกราคาการจัดการโปรโมชั่น");

                } else if ($("#textInputEditPromotion").val() == "") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณาเลือกรหัสโปรโมชั่น");

                } else {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณาเลือกวันที่จัดโปรโมชั่น");
                }
            }
        }
    }
    $('.dv-background').hide();
}
//update function
function updatePromote() {

    var codePromote = $('#textInputEditCode').val();
    var pricePromote = $('#textInputEditPrice').val();
    var editPromotion = $('#textInputEditPromotion').val();
    // var editDate = $('#textEditDate').val();

    var dates = $("#textEditDate").val().split(" ")[0];
    var date = parseInt(dates.split('/')[0]);
    var month = parseInt(dates.split('/')[1]);
    var year = parseInt(dates.split('/')[2]);
    var dateNew = parseInt(date+1);
    var dateFull = month+'/'+dateNew+'/'+year;

    $('.dv-background').show();
    var insertDataPromote = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/promotes/updatesData',
        data: {
            promoteId:idEdit,
            promoteCode:codePromote,
            promotePrice:pricePromote,
            promotion:editPromotion,
            updatedBy: updatedBy,
            date:dateFull
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#PromoteTable").DataTable().destroy();
                    findAllPromote();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลสำเร็จ");
                }
                else if(xhr.status==403) {
                    $("#alertModal").modal("show");
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");

                }else{
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลไม่สำเร็จ");
                }
            }else{
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("อัพเดตข้อมูลไม่สำเร็จ");
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;
    $('.dv-background').hide();
}

//=========================== Delete ===============================//
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
        $("#alertModalError").modal('show');
        $("label[id=detailAlertError]").text("กรุณาเลือกข้อมูลที่ต้องการลบ!!");

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
            url:session['context']+"/promotes/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        countDeleteSuccess++;
                        if(count==deleteId.length){
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เรคคอร์ด");
                            $("#deleteModalFree").modal("show");
                            findAllPromote();
                            clearDataAll();
                        }
                        count++;

                    } else if(xhr.status==403) {
                        $("#deleteModalFree").modal("show");
                        $("label[id='detailDeleteFree']").text("คุณไม่มีสิทธิใช้งาน");

                    }else{
                        countDeleteFail++;
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เรคคอร์ด");
                        $("#deleteModalFree").modal("show");
                        findAllPromote();
                        clearDataAll();
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
    findAllPromote();
    $('.dv-background').hide();
});


$('#textDate').bootstrapMaterialDatePicker({
    weekStart : 0,
    time: false,
    format: "DD/MM/YYYY"
});

$('#textEditDate').bootstrapMaterialDatePicker({
    weekStart : 0,
    time: false,
    format: "DD/MM/YYYY"
});

$('#btn_EventDate').on('click',function(){
    $("#textDate").focus();
});

$('#btn_EventDate_Edit').on('click',function(){
    $("#textEditDate").focus();
});