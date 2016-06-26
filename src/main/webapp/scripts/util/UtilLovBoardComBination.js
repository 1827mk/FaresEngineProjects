
var UtilLovBoardComBination = {};
UtilLovBoardComBination.obejctPagging = {};

UtilLovBoardComBination.onLoadInputLovBoardComBination = function(id,idModalPaging,idModalTableBody,idModal){
	var o = Object.create(UtilPagination);
	var urlSize = "/boardCombinations/findBoardCombinationByCodeSize";
	var urlData = "/boardCombinations/findBoardCombinationByCode"; 
	idModalTableBody = "#"+idModalTableBody;
	o.setId("#"+idModalPaging);
	o.setUrlData(urlData);
	o.setUrlSize(urlSize);

	o.loadTable = function(json){

	    $(idModalTableBody).empty();

	    for(i=0;i<json.length;i++){
	        var code = "";

	        if(json[i].code){
	        	code = json[i].code;
	        }
	        
	        $(idModalTableBody).append(
	            '<tr>'+
	                '<td>'+code+'</td>'+
	                '<td>'+'<button id="'+id+'BtnIdSelectModal'+i+'" type="button" data-modal="'+idModal+'" data-target="'+id+'" onclick="UtilLovBoardComBination.setValueInput(this)" class="btn btn-sm btn-success btn-raised remove-margin-bottom remove-margin-top" value="'+code+'">select</button>'+'</td>'+
	            '</tr>'
	        );
	    }

	};

	UtilLovBoardComBination.obejctPagging[id] = o;
};

UtilLovBoardComBination.setValueInput = function(btn){
	var idBtn = "#"+btn.id;
	var idInput = "#" + $(idBtn).attr("data-target");
	var idModal = "#" + $(idBtn).attr("data-modal");
	var value = $(idBtn).val(); 

	$(idInput).val(value);
	$(idModal).modal("hide");

};


UtilLovBoardComBination.lovBoardComBination = function(btn) {
	var idBtn = "#"+btn.id;
	var idInput = "#" + $(idBtn).attr("target"); 
	var idModal = idInput+"ModalSelect"; 

	$(idModal).modal("show");

};

UtilLovBoardComBination.lovBoardComBinationModalSearch = function(btn) {
	var btnId = "#"+btn.id;
	var inputId = "#" + $(btnId).attr("data-target");
	var boardComBinationCode = $(inputId).val();
	var idOrigin = $(btnId).attr("data-id");
    var dataSearch = {
            code : boardComBinationCode
        };

    var o = UtilLovBoardComBination.obejctPagging[idOrigin];
    o.setDataSearch(dataSearch);
    o.search(o);

};

