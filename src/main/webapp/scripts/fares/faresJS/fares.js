/**
 * Created by tanaphatdev on 1/5/2559.
 */
var codeedit;
var nameedit;
var versionedit;
var faresPrototype={};
var indexModify ;
var codeTravels;

var createdBy = session.user;
var updatedBy = session.user;

$(document).ready(function () {
    $('.dv-background').show();
    findAllfares();
    clearDataAll();
    findTravel();
    findPromote();
    // loadTableFares();
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

function findAllfares() {
    $('.dv-background').show();
    var faresData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/fareses/findAllFares',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

        $('#tbodyFares').empty();
        $.each(JSON.parse(faresData),function(index,item){

            var date = new Date(item.promote.dateFares.dateFared).toISOString().split("T")[0];
            var dates = date.split("-");
            var dateOrigin = dates[2];
            var monthOrigin = dates[1];
            var yeaOrigin = dates[0];
            var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

            if(checkDateDuplicate == "10/10/2010"){
                checkDateDuplicate = "----------"
            }

            $('#tbodyFares').append('<tr>' +
                '<td><alight="left"><input type="checkbox" onclick="checkbox(this)" name = "checkboxFares"  id="'+item.id+'" version= "'+item.version+'" /></alight></td>' +
                '<td><alight="left"><button type="button" id="+item.id+" code="'+item.faresCode+'" sourceName="'+item.travel.locationSourName+'" destName="'+item.travel.locationDisName+'"  version="+item.version+" price="+item.price+" codeTravel="+item.travel.travelCode+" travelId="+item.travel.id+" codePromote="+item.promote.promoteCode+"  promoteId="+item.promote.id+"  onclick="editData($(this))" class="btn btn-info btn-sm" ><span class="fa fa-pencil"></span></button></alight></td>"' +
                '<td><alight="left">'+(item.faresCode==null?'':item.faresCode)+'</alight></td>' +
                '<td><alight="left">'+(item.price==null?'':item.price)+'</alight></td>' +
                '<td><alight="left">'+(item.travel.locationSourName==null?'':item.travel.locationSourName)+'</alight></td>' +
                '<td><alight="left">'+(item.travel.locationDisName==null?'':item.travel.locationDisName)+'</alight></td>' +
                '<td><alight="left">'+(item.travel.transport.transportName==null?'':item.travel.transport.transportName)+'</alight></td>' +
                '<td><alight="left">'+(item.travel.transport.transportBusiness==null?'':item.travel.transport.transportBusiness)+'</alight></td>' +
                '<td><alight="left">'+(checkDateDuplicate==null?'':checkDateDuplicate)+'</alight></td>' +
                '<td><alight="left">'+(item.promote.promotion.promotionName==null?'':item.promote.promotion.promotionName)+'</alight></td>' +
                '<td><alight="left">'+(item.promote.promotePrice==null?'':item.promote.promotePrice)+'</alight></td>' +
                '</tr>');

            faresPrototype[item.id]=item;
        });

    $('#FaresTable').DataTable({
        "sScrollX": "100%",
        // "sScrollY": "980px",
        "bSort": false,
        "responsive": true,
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

function destroyDataTableFares() {
    $('#FaresTable').DataTable( {
        paging: false
    } );
    $('#FaresTable').DataTable( {
        destroy: true,
        searching: false
    } );
}

//=========================== Button ==============================//
$('#btnCancel').on('click',function () {
    $('#modalAddFares').modal('hide');
    clearDataAll();
})
$('#btnEditCancel').on('click',function () {
    $('#modalEditFares').modal('hide');
    clearDataAll();
})
$('#add').on('click',function () {
    clearDataAll();
    findPromote();
    findTravel();
})
$('#btnEditSave').on('click',function () {
    editFares();

})
$('#modalAlertBtnOk').on('click',function () {
    $('#modalEditFares').modal('hide');
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
    var regex = /[\@\#\%\/\\\^\&\*\(\)\_\+\!\$]/;

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
            $("[name='checkboxFares']").prop("checked",true);
        }else{
            $("[name='checkboxFares']").prop("checked",false);
        }
});

function checkbox(checkbox) {
    var countCheck = $("input[name ='checkboxFares']:checked:checked").length;
    var countAll = $("[name='checkboxFares']").length;
    
        if (countCheck == countAll) {
            $("#checkboxAll").prop("checked",true);
        }else{
            $("#checkboxAll").prop("checked",false);
        }
}

var travelCode;
var travelCodeEdit;

//============================ find Travel ==========================//
function findTravel() {
    $('.dv-background').show();
    var faresData = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/travels/findAllTravel',
        async: false
    }).done(function (){
        //close loader
        $('.dv-background').hide();
    }).responseText;

        $('#selectInputTravel').empty();
        $('#selectEditInputTravel').empty();
        $.each(JSON.parse(faresData),function(index,item){
            $('#selectInputTravel').append('<option value="'+item.id+'">'+item.travelCode+':'+item.locationSourName+':'+item.locationDisName+':'+item.transport.transportName+'</option>');
            $('#selectEditInputTravel').append('<option value="'+item.id+'">'+item.travelCode+':'+item.locationSourName+':'+item.locationDisName+':'+item.transport.transportName+'</option>');
        });

        // Add
        $('#selectInputTravel').on('change',function(){
            var str = $( "#selectInputTravel option:selected" ).text();
            var res = str.split(":");
            travelCode = res[0];

            if(travelCode!=null){
                findTravelByCode(travelCode);
            }else{
                console.log("==========");
            }
        });

        var str = $( "#selectInputTravel option:selected" ).text();
        var res = str.split(":");
        travelCode = res[0];
        if(travelCode!=null){
            findTravelByCode(travelCode);
        }else{
            console.log("==========");
        }

}
function findTravelByCode(code) {
    $('.dv-background').show();
    if(code!=null){
        var travelData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/travels/findTravelsByCode',
            data:{
                travelCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;
        // Add
        $('#textSourceName').empty();
        $('#textDestinationName').empty();
        $('#textTransportName').empty();
        $('#textTransportBusiness').empty();
        // Edit
        $('#textEditSourceName').empty();
        $('#textEditDestinationName').empty();
        $('#textEditTransportName').empty();
        $('#textEditTransportBusiness').empty();

        $.each(JSON.parse(travelData),function(index,item){
            // Add
            $('#textSourceName').val(item.locationSourName);
            $('#textDestinationName').val(item.locationDisName);
            $('#textTransportName').val(item.transport.transportName);
            $('#textTransportBusiness').val(item.transport.transportBusiness);
            // Edit
            $('#textEditSourceName').val(item.locationSourName);
            $('#textEditDestinationName').val(item.locationDisName);
            $('#textEditTransportName').val(item.transport.transportName);
            $('#textEditTransportBusiness').val(item.transport.transportBusiness);

        });
    }else{
        console.log('travelcode empty');
    }
}
var promoteCode;
var promoteCodeEdit;
//============================ find Promote ==========================//
function findPromote() {
    $('.dv-background').show();
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

    $('#selectPromote').empty();
    $('#selectEditPromote').empty();
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
        $('#selectPromote').append('<option value="'+item.id+'">'+item.promoteCode+':'+item.promotion.promotionName+':'+checkDateDuplicate+'</option>');
        $('#selectEditPromote').append('<option value="'+item.id+'">'+item.promoteCode+':'+item.promotion.promotionName+':'+checkDateDuplicate+'</option>');
    });

        $('#selectPromote').on('change',function(){
            var str = $( "#selectPromote option:selected" ).text();
            var res = str.split(":");
            promoteCode = res[0];

            if(promoteCode!=null){
                findPromoteByCode(promoteCode);
            }else{
                console.log("==========");
            }
        });

        var str = $( "#selectPromote option:selected" ).text();
        var res = str.split(":");
        promoteCode = res[0];
        if(promoteCode!=null){
            findPromoteByCode(promoteCode);
        }else{
            console.log("==========");
        }
}

function findPromoteByCode(code) {
    $('.dv-background').show();
    if(code!=null){
        $('.dv-background').show();
        var promoteData = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/promotes/findPromotesByCode',
            data:{
                promoteCode:code
            },
            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;

        $('#textDate').empty();
        $('#textDiscount').empty();
        $('#textPromotionName').empty();

        $.each(JSON.parse(promoteData),function(index,item){

            var date = new Date(item.dateFares.dateFared).toISOString().split("T")[0];
            var dates = date.split("-");
            var dateOrigin = dates[2];
            var monthOrigin = dates[1];
            var yeaOrigin = dates[0];
            var checkDateDuplicate = dateOrigin+'/'+monthOrigin+'/'+yeaOrigin;

            if(checkDateDuplicate == "10/10/2010"){
                $('#textDate').val("----------");
                $('#textPromotionName').val(item.promotion.promotionName);
                $('#textDiscount').val(item.promotePrice);

                $('#textEditDate').val("----------");
                $('#textEditPromotionName').val(item.promotion.promotionName);
                $('#textEditDiscount').val(item.promotePrice);

            }else{
                $('#textDate').val(checkDateDuplicate);
                $('#textPromotionName').val(item.promotion.promotionName);
                $('#textDiscount').val(item.promotePrice);

                $('#textEditDate').val(checkDateDuplicate);
                $('#textEditPromotionName').val(item.promotion.promotionName);
                $('#textEditDiscount').val(item.promotePrice);
            }

        });
    }else{
        console.log('travelcode empty');
    }
}

//=========================== Insret ===============================//
function insertData(){

    var codeFares = $('#textInputCode').val();
    var priceFares = $('#textInputPrice').val();
    var selectTravel = $('#selectInputTravel').val();
    var selectPromote = $('#selectPromote').val();

    var str1 = $( "#selectInputTravel option:selected" ).text();
    var res1 = str1.split(":");
    var selectTravelText = res1[0];

    var str2 = $( "#selectPromote option:selected" ).text();
    var res2 = str2.split(":");
    var selectPromoteText = res2[0];


    if($('#textInputCode').val()!="" && $('#textInputPrice').val()!="" && $( "#selectInputTravel option:selected" ).text()!="----------" ){
        $('.dv-background').show();
        var findFaresDuplicateFare = $.ajax({
            type: "GET",
            headers: {
                Accept: 'application/json'
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: session['context']+'/fareses/findFaresDuplicate',
            data: {
                faresCode:codeFares,
                price:priceFares,
                travel:selectTravelText,
                promote:selectPromoteText
            },

            async: false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        }).responseText;
        if(findFaresDuplicateFare.length==2){
            $('.dv-background').show();
           var checkDuplicateFTP = $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json'
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: session['context']+'/fareses/checkDuplicateCodeFTP',
                data: {
                    faresCode:codeFares,
                    travel:selectTravelText,
                    promote:selectPromoteText
                },

                async: false
            }).done(function (){
                $('.dv-background').hide();
            }).responseText;
            if(checkDuplicateFTP.length==2){
                $('.dv-background').show();
               var checkDuplicateCodeTP = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context']+'/fareses/checkDuplicateCodeTP',
                    data: {
                        travel:selectTravelText,
                        promote:selectPromoteText
                    },
                    async: false
                }).done(function (){
                    $('.dv-background').hide();
                }).responseText;
                if(checkDuplicateCodeTP.length==2){
                    $('.dv-background').show();
                    var checkDuplicateCodeFares = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context']+'/fareses/checkDuplicateCode',
                        data: {
                            faresCode:codeFares
                        },
                        async: false
                    }).done(function (){
                        $('.dv-background').hide();
                    }).responseText;
                        if(checkDuplicateCodeFares.length==2){
                            insertFaresEngine();
                        }else {
                            // Duplicate
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("มีรหัสนี้ในระบบแล้ว กรุณาตรวจสอบ!!");
                        }
                }else {
                    // Duplicate
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("สถานที่และโปรโมชั่นมีในระบบแล้ว กรุณาตรวจสอบ!!");
                }
            }else{
                // Duplicate
                $("#alertModalError").modal('show');
                $("label[id=detailAlertError]").text("รหัสและสถานที่มีในระบบแล้ว กรุณาตรวจสอบ!!");
            }
        }else{
            // Duplicate
            $("#alertModalError").modal('show');
            $("label[id=detailAlertError]").text("มีข้อมูลนี้ในระบบแล้ว กรุณาตรวจสอบ!!");
        }
    }else {
        if ($("#textInputCode").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกรหัสอัตราค่าโดยสาร");
        }else if ($("#textInputPrice").val()=="") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณากรอกราคาอัตราค่าโดยสาร");
        }else if ($( "#selectInputTravel option:selected" ).text()=="----------") {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกสถานที่");
        }else {
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("กรุณาเลือกโปรโมชั่น");
        }
    }
}

function insertFaresEngine() {
    var codeFares = $('#textInputCode').val();
    var priceFares = $('#textInputPrice').val();
    var selectTravel = $('#selectInputTravel').val();
    var selectPromote = $('#selectPromote').val();
    // var selectTravelText =  $( "#selectInputTravel option:selected" ).text();
    // var selectPromoteText = $( "#selectPromote option:selected" ).text();

    $('.dv-background').show();
    var insertDatas = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/fareses/insertData',
        data: {
            faresCode:codeFares,
            price:parseInt(priceFares),
            travel:parseInt(selectTravel),
            promote:parseInt(selectPromote),
            createdBy:createdBy,
            updatedBy:updatedBy
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==201){
                    clearDataAll();
                    $("#FaresTable").DataTable().destroy();
                    findAllfares();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("บันทึกข้อมูลสำเร็จ");
                    $('#modalAddFares').modal('hide');
                }
                else if(xhr.status==403) {
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน!!");

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

var idEdit;
var versionEdit ;
var codeEdit ;
var priceEdit;
var travelEdit;
var promoteEdit;
var travelId;
var promoteId;
function editData(rowData) {
    findPromote();
    findTravel();
    idEdit = rowData[0].attributes.getNamedItem("id").value;
    versionEdit =rowData[0].attributes.getNamedItem("version").value;
    codeEdit = rowData[0].attributes.getNamedItem("code").value;
    priceEdit = rowData[0].attributes.getNamedItem("price").value;
    travelEdit = rowData[0].attributes.getNamedItem("codeTravel").value;
    promoteEdit = rowData[0].attributes.getNamedItem("codePromote").value;
    travelId = rowData[0].attributes.getNamedItem("travelId").value;
    promoteId = rowData[0].attributes.getNamedItem("promoteId").value;
    sourceName = rowData[0].attributes.getNamedItem("sourceName").value;
    destName = rowData[0].attributes.getNamedItem("destName").value;
    // indexModify = idEdit;
    
    $('#textEditInputCode').val(codeEdit);
    $('#textEditInputPrice').val(priceEdit);
    $('#selectEditInputTravel').val(travelEdit);
    $('#selectEditPromote').val(promoteEdit);

    $('#selectEditInputTravel').prepend('<option value="'+travelId+'">'+travelEdit+':'+sourceName+':'+destName+'</option>');
    $('#selectEditPromote').prepend('<option value="'+promoteId+'">'+promoteEdit+':'+sourceName+':'+destName+'</option>');

    findTravelByCode(travelEdit);
    findPromoteByCode(promoteEdit);

    $('#modalEditFares').modal('show');
}
// Edit
$('#selectEditInputTravel').on('change',function(){
    var str = $( "#selectEditInputTravel option:selected" ).text();
    var res = str.split(":");
    travelCodeEdit = res[0];
    if(travelCodeEdit!=null){
        findTravelByCode(travelCodeEdit);
    }else{
        console.log("==========");
    }
});

$('#selectEditPromote').on('change',function(){
    var str = $( "#selectEditPromote option:selected" ).text();
    var res = str.split(":");
    promoteCodeEdit = res[0];
    if(promoteCodeEdit!=null){
        findPromoteByCode(promoteCodeEdit);
    }else{
        console.log("==========");
    }
});

//=========================== Edit ===============================//
function editFares(){

    if($('#textEditInputCode').val()!="" && $('#textEditInputPrice').val()!="" && $("#selectEditInputTravel option:selected" ).text()!="----------" ){

        var codeFares = $('#textEditInputCode').val();
        var priceFares = $('#textEditInputPrice').val();
        // var selectTravel = $('#selectEditInputTravel').val();
        // var selectPromote = $('#selectEditPromote').val();

        var str1 = $( "#selectEditInputTravel option:selected" ).text();
        var res1 = str1.split(":");
        var selectTravelText = res1[0];

        var str2 = $( "#selectEditPromote option:selected" ).text();
        var res2 = str2.split(":");
        var selectPromoteText = res2[0];




        if(codeFares==codeEdit && priceFares==priceEdit && selectTravelText==travelEdit && selectPromoteText==promoteEdit){
            $("#alertModal").modal('show');
            $("label[id=detailAlert]").text("ข้อมูลไม่มีการเปลี่ยนแปลง");
        }else {
            // ตรวจสอบทุกช่องเปลี่ยนหมด
            if (codeFares != codeEdit && priceFares != priceEdit && selectTravelText != travelEdit && selectPromoteText != promoteEdit) {
                $('.dv-background').show();
                var findFaresDuplicateFare1 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/fareses/findFaresDuplicate',
                    data: {
                        faresCode: codeFares,
                        price: priceFares,
                        travel: selectTravelText,
                        promote: selectPromoteText
                    },

                    async: false
                }).done(function () {
                    //close loader
                    $('.dv-background').hide();
                }).responseText;
                if (findFaresDuplicateFare1.length == 2) {
                    $('.dv-background').show();
                    var checkDuplicateFTP1 = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context'] + '/fareses/checkDuplicateCodeFTP',
                        data: {
                            faresCode: codeFares,
                            travel: selectTravelText,
                            promote: selectPromoteText
                        },

                        async: false
                    }).done(function () {
                        $('.dv-background').hide();
                    }).responseText;
                    if (checkDuplicateFTP1.length == 2) {
                        $('.dv-background').show();
                        var checkDuplicateCodeTP1 = $.ajax({
                            type: "GET",
                            headers: {
                                Accept: 'application/json'
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: session['context'] + '/fareses/checkDuplicateCodeTP',
                            data: {
                                travel: selectTravelText,
                                promote: selectPromoteText
                            },
                            async: false
                        }).done(function () {
                            $('.dv-background').hide();
                        }).responseText;
                        if (checkDuplicateCodeTP1.length == 2) {
                            var faresCodeDuplicate1 = $.ajax({
                                type: "GET",
                                headers: {
                                    Accept: 'application/json'
                                },
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                url: session['context'] + '/fareses/checkDuplicateCode',
                                data: {
                                    faresCode: codeFares
                                },
                                async: false
                            }).done(function () {
                                $('.dv-background').hide();
                            }).responseText;
                            if (faresCodeDuplicate1.length == 2) {
                                updateFaresEngine();
                            } else {
                                $("#alertModalError").modal('show');
                                $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                            }
                        } else {
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                        }
                    } else {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("รหัส สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                    }
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("ข้อมูลนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
                // ตรวจสอบ farecode travel promote เปลี่ยนแปลง
            } else if (codeFares != codeEdit && selectTravelText != travelEdit && selectPromoteText != promoteEdit) {
                $('.dv-background').show();
                var checkDuplicateFTP2 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/fareses/checkDuplicateCodeFTP',
                    data: {
                        faresCode: codeFares,
                        travel: selectTravelText,
                        promote: selectPromoteText
                    },

                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;

                if (checkDuplicateFTP2.length == 2) {
                    $('.dv-background').show();
                    var checkDuplicateCodeTP2 = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context'] + '/fareses/checkDuplicateCodeTP',
                        data: {
                            travel: selectTravelText,
                            promote: selectPromoteText
                        },
                        async: false
                    }).done(function () {
                        $('.dv-background').hide();
                    }).responseText;
                    if (checkDuplicateCodeTP2.length == 2) {
                        $('.dv-background').show();
                        var faresCodeDuplicate2 = $.ajax({
                            type: "GET",
                            headers: {
                                Accept: 'application/json'
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: session['context'] + '/fareses/checkDuplicateCode',
                            data: {
                                faresCode: codeFares
                            },
                            async: false
                        }).done(function () {
                            $('.dv-background').hide();
                        }).responseText;

                        if (faresCodeDuplicate2.length == 2) {
                            updateFaresEngine();
                        } else {
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                        }
                    } else {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                    }
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัส สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
                // ตรวจสอบ travel promote เปลี่ยนแปลง
            }else if (selectTravelText != travelEdit || selectPromoteText != promoteEdit) {
                $('.dv-background').show();
                var checkDuplicateCodeTP3 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/fareses/checkDuplicateCodeTP',
                    data: {
                        travel: selectTravelText,
                        promote: selectPromoteText
                    },
                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (checkDuplicateCodeTP3.length == 2) {
                    updateFaresEngine();
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
                // ตรวจสอบ fares code เปลี่ยนแปลง
            }else if (codeFares != codeEdit) {
                $('.dv-background').show();
                var faresCodeDuplicate4 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/fareses/checkDuplicateCode',
                    data: {
                        faresCode: codeFares
                    },
                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;
                if (faresCodeDuplicate4.length == 2) {
                    updateFaresEngine();
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            }else if (codeFares != codeEdit && selectTravelText != travelEdit || codeFares != codeEdit && selectPromoteText != promoteEdit ) {
                $('.dv-background').show();
                var checkDuplicateFTP5 = $.ajax({
                    type: "GET",
                    headers: {
                        Accept: 'application/json'
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: session['context'] + '/fareses/checkDuplicateCodeFTP',
                    data: {
                        faresCode: codeFares,
                        travel: selectTravelText,
                        promote: selectPromoteText
                    },

                    async: false
                }).done(function () {
                    $('.dv-background').hide();
                }).responseText;

                if (checkDuplicateFTP5.length == 2) {
                    $('.dv-background').show();
                    var checkDuplicateCodeTP5 = $.ajax({
                        type: "GET",
                        headers: {
                            Accept: 'application/json'
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: session['context'] + '/fareses/checkDuplicateCodeTP',
                        data: {
                            travel: selectTravelText,
                            promote: selectPromoteText
                        },
                        async: false
                    }).done(function () {
                        $('.dv-background').hide();
                    }).responseText;
                    if (checkDuplicateCodeTP5.length == 2) {
                        $('.dv-background').show();
                        var faresCodeDuplicate5 = $.ajax({
                            type: "GET",
                            headers: {
                                Accept: 'application/json'
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: session['context'] + '/fareses/checkDuplicateCode',
                            data: {
                                faresCode: codeFares
                            },
                            async: false
                        }).done(function () {
                            $('.dv-background').hide();
                        }).responseText;

                        if (faresCodeDuplicate5.length == 2) {
                            updateFaresEngine();
                        } else {
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("รหัสนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                        }
                    } else {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                    }
                } else {
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("รหัส สถานที่และโปรโมชั่นนี้มีอยู่แล้ว กรุณาตรวจสอบ!!");
                }
            } else {
                updateFaresEngine();
            }
        }

    }else {
        if ($("#textEditInputCode").val()=="") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณากรอกรหัสอัตราค่าโดยสาร");
        }else if ($("#textEditInputPrice").val()=="") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณากรอกราคาอัตราค่าโดยสาร");
        }else if ($( "#selectEditInputTravel option:selected" ).text()=="----------") {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณาเลือกสถานที่");
        }else {
            $("#deleteModalFree").modal('show');
            $("label[id=detailDeleteFree]").text("กรุณาเลือกโปรโมชั่น");
        }
    }
}
// update function
function updateFaresEngine() {

    var codeFares = $('#textEditInputCode').val();
    var priceFares = $('#textEditInputPrice').val();
    var selectTravel = $('#selectEditInputTravel').val();
    var selectPromote = $('#selectEditPromote').val();

    // var selectTravelText =  $( "#selectEditInputTravel option:selected" ).text();
    // var selectPromoteText = $( "#selectEditPromote option:selected" ).text();
    $('.dv-background').show();
    var insertDatafares = $.ajax({
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: session['context']+'/fareses/updateData',
        data: {
            fareId:idEdit,
            faresCode:codeFares,
            price:parseInt(priceFares),
            travel:parseInt(selectTravel),
            promote:parseInt(selectPromote),
            updatedBy:updatedBy
            
        },
        complete:function(xhr){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    $("#FaresTable").DataTable().destroy();
                    findAllfares();
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("อัพเดตข้อมูลำเร็จ");
                }
                else if(xhr.status==403) {
                    $("#alertModal").modal('show');
                    $("label[id=detailAlert]").text("คุณไม่มีสิทธิใช้งาน!!");
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
            url:session['context']+"/fareses/"+item,
            complete:function(xhr){
                if(xhr.readyState==4){
                    if(xhr.status==200){

                        if(count==deleteId.length){
                            $("#alertModalError").modal('show');
                            $("label[id=detailAlertError]").text("ลบข้อมูลสำเร็จ");
                            $("#FaresTable").DataTable().destroy();
                            findAllfares();
                            clearDataAll();
                        }
                        count++;
                    }
                    else if(xhr.status==403) {
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("คุณไม่มีสิทธิใช้งาน!!");

                    }else{
                        $("#alertModalError").modal('show');
                        $("label[id=detailAlertError]").text("ลบข้อมูลสำเร็จ");
                    }
                }else{
                    $("#alertModalError").modal('show');
                    $("label[id=detailAlertError]").text("ลบข้อมูลไม่สำเร็จ");
                }
            },
            async:false
        }).done(function (){
            //close loader
            $('.dv-background').hide();
        });
    });
});
