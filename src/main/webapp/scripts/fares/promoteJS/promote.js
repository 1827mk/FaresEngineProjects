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
    findPromotion();
    $('.dv-background').hide();
});

function clearDataAll() {
    $('#textInputCode').val('');
    $('#textInputPrice').val('');
    $('#selectInputTravel').val('');
    $('#textSourceName').val('');
    $('#textDestinationName').val('');
    $('#textTransportName').val('');
    $('#selectPromote').val('');
    $('#textDate').val('');
    $('#textPromotionName').val('');
    $('#textDiscount').val('');

    $('#textEditInputCode').val('');
    $('#textEditInputPrice').val('');
    $('#selectEditInputTravel').val('');
    $('#textEditSourceName').val('');
    $('#textEditDestinationName').val('');
    $('#textEditTransportName').val('');
    $('#selectEditPromote').val('');
    $('#textEditDate').val('');
    $('#textEditPromotionName').val('');
    $('#textEditDiscount').val('');

    $('#selectInputTravel').empty();
    $('#selectEditInputTravel').empty();
    $('#selectPromote').empty();
    $('#selectEditPromote').empty();

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

        var date = new Date(item.dateFares.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }

        $('#tbodyPromote').append('<tr>' +
            '<td><alight="left"><input type="checkbox" onclick="checkbox(this)" name = "checkboxPromote"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
            "<td><alight='left'><button type='button' id="+item.id+" code='"+item.promoteCode+"' version="+item.version+" price="+item.promotePrice+" idPromotion="+item.promotion.id+" codePromotion="+item.promotion.promotionCode+" dateId="+item.dateFares.id+" dateName="+checkDateDuplicate+" onclick='editData($(this))' class='btn btn-info btn-sm' ><span class='fa fa-pencil'></span></button></alight></td>" +
            '<td><alight="left">'+(item.promoteCode==null?'':item.promoteCode)+'</alight></td>' +
            '<td><alight="left">'+(item.promotePrice==null?'':item.promotePrice)+'</alight></td>' +
            '<td><alight="left">'+(item.promotion.promotionCode==null?'':item.promotion.promotionCode)+'</alight></td>' +
            '<td><alight="left">'+(item.promotion.promotionName==null?'':item.promotion.promotionName)+'</alight></td>' +
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
    findPromotion();
    findDate();
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

var promotionCode;
var promotionCodeEdit;
//============================ find Travel ==========================//
function findPromotion() {
    $('.dv-background').show();
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

    $('#selectInputPromotion').empty();
    $('#selectInputEditPromotion').empty();
    $.each(JSON.parse(promotionData),function(index,item){
        $('#selectInputPromotion').append('<option value="'+item.id+'">'+item.promotionCode+':'+item.promotionName+'</option>');
        $('#selectInputEditPromotion').append('<option value="'+item.id+'">'+item.promotionCode+':'+item.promotionName+'</option>');
    });

    // Add
    $('#selectInputPromotion').on('change',function(){
        var str = $( "#selectInputPromotion option:selected" ).text();
        var res = str.split(":");
        promotionCode = res[0];
        if(promotionCode!=null){
            findPromotionByCode(promotionCode);
        }else{
            console.log("==========");
        }
    });

    var str = $( "#selectInputPromotion option:selected" ).text();
    var res = str.split(":");
    promotionCode = res[0];
    if(promotionCode!=null){
        findPromotionByCode(promotionCode);
    }else{
        console.log("==========");
    }

}

function findPromotionByCode(code) {
    if(code!=null){
        $('.dv-background').show();
        var promotionData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/promotions/findPromotionCode',
            data:{
                promotionCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        // Add
        $('#textPromotionName').empty();
        // Edit
        $('#textEditPromotionName').empty();

        $.each(JSON.parse(promotionData),function(index,item){
            // Add
            $('#textPromotionName').val(item.promotionName);
            // Edit
            $('#textEditPromotionName').val(item.promotionName);

        });
    }else{
        console.log('promotionCode empty');
    }
}
var dateFared;
//============================ find Promote ==========================//
function findDate() {
    $('.dv-background').show();
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

    $('#selectDate').empty();
    $('#selectEditDate').empty();
    $.each(JSON.parse(dateData),function(index,item){


        var date = new Date(item.dateFared).toISOString().split("T")[0];
        var dates = date.split("-");
        var dateOrigin = dates[2];
        var monthOrigin = dates[1];
        var yeaOrigin = dates[0];
        var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

        if(checkDateDuplicate == "10/10/2010"){
            checkDateDuplicate = "----------"
        }

        if(checkDateDuplicate != "10/10/2010") {
            $('#selectDate').append('<option value="' + item.id + '">' + checkDateDuplicate + '</option>');
            $('#selectEditDate').append('<option value="' + item.id + '">' + checkDateDuplicate + '</option>');
        }else{
            $('#selectDate').append('<option value="' + item.id + '">' + "----------" + '</option>');
            $('#selectEditDate').append('<option value="' + item.id + '">' + "----------" + '</option>')
        }
    });
}

//=========================== Insret ===============================//
function insertData() {
    $('.dv-background').show();
    var codePromote = $('#textInputCode').val();
    var pricePromote = $('#textInputPrice').val();

    var selectPromotionText = $("#selectInputPromotion option:selected").text();
    var selectDateText = $("#selectDate option:selected").text();

    if ($('#textInputCode').val() != "" && $('#textInputPrice').val() != "" && $("#selectInputPromotion option:selected").text() != "----------" && $("#selectDate option:selected").text() != "----------") {

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
    }else{
        if ($("#textInputCode").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสการจัดการโปรโมชั่น");
        } else if ($("#textInputPrice").val() == "") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกราคาการจัดการโปรโมชั่น");
        } else if ($("#selectInputPromotion option:selected").text() == "----------") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกรหัสโปรโมชั่น");
        } else {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกวันที่โปรโมชั่น");
        }
    }
}

function insertPromote() {
    var promoteCode = $('#textInputCode').val();
    var promotePrice = $('#textInputPrice').val();
    var selectPromotion = $('#selectInputPromotion').val();
    var selectDate = $('#selectDate').val();
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
            promoteCode:promoteCode,
            promotePrice:parseInt(promotePrice),
            promotion:parseInt(selectPromotion),
            createdBy:createdBy,
            updatedBy:updatedBy,
            date:parseInt(selectDate)
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

}

////////////////////////////////////////////////////////////////////////////

var idEdit;
var versionEdit ;
var codeEdit ;
var priceEdit;
var promotionId;
var promotionEdit;
var date;
var dateEdit;
function editData(rowData) {
    findPromotion();
    findDate();
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    codeEdit =rowData[0].attributes.getNamedItem("code").value;
    versionEdit = rowData[0].attributes.getNamedItem("version").value;
    priceEdit = rowData[0].attributes.getNamedItem("price").value;
    promotionId = rowData[0].attributes.getNamedItem("idPromotion").value;
    promotionEdit = rowData[0].attributes.getNamedItem("codePromotion").value;
    date = rowData[0].attributes.getNamedItem("dateId").value;
    dateEdit = rowData[0].attributes.getNamedItem("dateName").value;
    // indexModify = idEdit;

    $('#textInputEditCode').val(codeEdit);
    $('#textInputEditPrice').val(priceEdit);
    $('#selectInputEditPromotion').val(promotionEdit);
    $('#selectEditDate').val(dateEdit);

    $('#selectInputEditPromotion').prepend('<option value="'+promotionId+'">'+promotionEdit+'</option>');
    $('#selectEditDate').prepend('<option value="'+date+'">'+dateEdit+'</option>');
    // console.log(promotionEdit+promotionId)
    // console.log(dateEdit+date)

    findPromotionByCode(promotionEdit);

    $('#modalEditPromote').modal('show');
}
// Edit
$('#selectInputEditPromotion').on('change',function(){
    var str = $( "#selectInputEditPromotion option:selected" ).text();
    var res = str.split(":");
    promotionCodeEdit = res[0];
    if(promotionCodeEdit!=null){
        findPromotionByCode(promotionCodeEdit);
    }else{
        console.log("==========");
    }
});

//=========================== Edit ===============================//
function editPromote() {

    if ($('#textInputEditCode').val() != "" && $('#textInputEditPrice').val() != "" && $("#selectInputEditPromotion option:selected").text() != "----------" && $("#selectEditDate option:selected").text() != "----------") {

        var codePromote = $('#textInputEditCode').val();
        var pricePromote = $('#textInputEditPrice').val();
        var selectPromotion = $('#selectInputEditPromotion').val();
        var selectDate = $('#selectEditDate').val();

        var str1 = $( "#selectInputEditPromotion option:selected" ).text();
        var res1 = str1.split(":");
        selectPromotionText = res1[0];

        var str2 = $( "#selectEditDate option:selected" ).text();
        var res2 = str2.split(":");
        selectDateText = res2[0];


        if (codePromote == codeEdit && pricePromote == priceEdit && selectPromotionText == promotionEdit && selectDateText == dateEdit) {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        } else {
            // ตรวจสอบรหัสการจัดการโปรโมชั่นเปลี่ยน
            if (codePromote != codeEdit && selectPromotionText == promotionEdit && selectDateText == dateEdit) {
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
                console.log(findPromoteDuplicate.length)
                //ตรวจสอบรหัสโปรโมชั่นกับวันที่เปลี่ยน
                if (findPromoteDuplicate.length == 2) {
                    updatePromote()
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            }else if (codePromote == codeEdit && selectPromotionText != promotionEdit || selectDateText != dateEdit) {
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
                        promotion: selectPromotionText,
                        dateFares: selectDateText
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
            } else {
                if ($("#textInputEditCode").val() == "") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณากรอกรหัสการจัดการโปรโมชั่น");
                } else if ($("#textInputEditPrice").val() == "") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณากรอกราคาการจัดการโปรโมชั่น");
                } else if ($("#selectInputEditPromotion option:selected").text() == "----------") {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณาเลือกรหัสโปรโมชั่น");
                } else {
                    $("#deleteModalFree").modal('show');
                    $("label[id=detailDeleteFree]").text("กรุณาเลือกวันที่โปรโมชั่น");
                }
            }
        }
    }
}
//update function
function updatePromote() {

    var codePromote = $('#textInputEditCode').val();
    var pricePromote = $('#textInputEditPrice').val();
    var selectPromotion = $('#selectInputEditPromotion').val();
    var selectDate = $('#selectEditDate').val();

    var selectTravelText =  $( "#selectInputEditPromotion option:selected" ).text();
    var selectPromoteText = $( "#selectEditDate option:selected" ).text();
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
            promotePrice:parseInt(pricePromote),
            promotion:parseInt(selectPromotion),
            updatedBy: updatedBy,
            date:parseInt(selectDate)
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#PromoteTable").DataTable().destroy();
                    findAllPromote();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จ");
                }
                else if(xhr.status==403) {
                    $("#alertModal").modal("show");
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน");

                }else{
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จไม่สำเร็จ");
                }
            }else{
                $("#alertModal").modal('show');
                $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จไม่สำเร็จ");
            }
        },
        async: false
    }).done(function (){
        $('.dv-background').hide();
    }).responseText;

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
                        if(count==deleteId.length){
                            countDeleteSuccess++;
                            $("label[id='detailDeleteFree']").text("ลบข้อมูลสำเร็จ"+countDeleteSuccess+"เร็คคอด");
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
                        $("label[id='detailDeleteFree']").text("ลบข้อมูลไม่สำเร็จ"+countDeleteFail+"เร็คคอด");
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
});