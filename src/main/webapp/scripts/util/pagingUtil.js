
var UtilPagination = new function(){
	var _this = this;
	var id = "#null";
	var limitData = 10;
	var page = 0;
	var totalPage = 0;
	var urlSize ="";
	var urlData = "";
	var dataSearch = {};
	var numberOfPages = 3;
	var maxData = 0;
	var startDisplayRecords = 0;
	var toDisplayRecords = 0;

	this.setLimitData = function(num){
		limitData = num;
	};

	this.getLimitData = function(){
		return limitData;
	};

	this.setNumberOfPages = function(num){
		numberOfPages = num;
	};

	this.getNumberOfPages = function(){
		return numberOfPages;
	};

	this.setUrlSize = function(url){
		urlSize = url;
	};

	this.getUrlSize = function(){
		return urlSize;
	}

	this.setUrlData = function(url){
		urlData = url;
	};

	this.getUrlData = function(){
		return urlData;
	};

	this.setDataSearch = function(jsonData){
		dataSearch = jsonData;
	}

	this.getDataSearch = function(){
		return dataSearch;
	}

	this.loadTable = function(json){
	};

	function loadData(firstResult,maxResult,object){
			var temp = _this.getDataSearch();
			var defualt = {
				firstResult:firstResult,
				maxResult:maxResult
			};

			$.extend(temp,defualt);

			var jsonText = AjaxUtil.get(_this.getUrlData(),temp,false).responseText;
			var json = JSON.parse(jsonText);

			if(maxData == 0){
				startDisplayRecords = 0;
				toDisplayRecords = 0;
			}
			else
			{
				startDisplayRecords = firstResult;
				if(startDisplayRecords == 0){
					toDisplayRecords = startDisplayRecords + json.length;
					startDisplayRecords = 1;
				}
				else
				{
					startDisplayRecords = firstResult;
					toDisplayRecords = startDisplayRecords+json.length;
				}
			
				
			}

			object.loadTable(json);
			this.updateLabel();	
	}

	this.setId = function(newId){
		id = newId;
	};

	this.getId = function(){
		return id;
	}

	this.getPage = function(){
		return page;
	};

	this.setPage = function(p){
		page = p;
	};

	this.loadData = loadData;

	this.search = function(object){

		var temp = _this.getDataSearch();

		var jsonSizeText = AjaxUtil.get(_this.getUrlSize(),temp,false).responseText;
		var jsonSize = JSON.parse(jsonSizeText);

		maxData = jsonSize.size; 

		totalPage = Math.ceil(maxData/limitData);


    	_this.setPage(1);
			var firstResult = 0;
        _this.loadData(firstResult,limitData,object);


		if(totalPage != 0){
			var options = {
			    currentPage: 1,
			    totalPages: totalPage,
			    numberOfPages : _this.getNumberOfPages(),
			    onPageClicked: function(e,originalEvent,type,page){
			       
			    	_this.setPage(page);
	 				var firstResult = (page - 1)*limitData;
			        _this.loadData(firstResult,limitData,object);
			    }
			};

			$(_this.getId()).bootstrapPaginator(options);

			$(id+"Label").removeAttr("style");
			$(id).removeAttr("style");
		}
		else{
			$(id).attr("style","display:none");
		}

	};

	this.loadPage = function (page,object){
		if(page > totalPage){
			return;
		}

    	_this.setPage(page);
    	var firstResult = (page - 1)*limitData;

        _this.loadData(firstResult,limitData,object);

		if(totalPage != 0){
			var options = {
			    currentPage: page,
			    totalPages: totalPage,
			    numberOfPages : _this.getNumberOfPages(),
			    onPageClicked: function(e,originalEvent,type,page){
			       
			    	_this.setPage(page);
	 				var firstResult = (page - 1)*limitData;
			        _this.loadData(firstResult,limitData,object);

			    }
			};

			$(_this.getId()).bootstrapPaginator(options);

			$(id+"Label").removeAttr("style");
			$(id).removeAttr("style");
		}
		else
		{
			$(id).attr("style","display:none");
		}
    };

	this.updateLabel = function () {

        if(page > 1) 
        {
                $(id+ "StartDisplayRecords").text(startDisplayRecords+1);
        }
        else 
        {
                $(id+ "StartDisplayRecords").text(startDisplayRecords);
        }

        $(id+ "ToDisplayRecords").text(toDisplayRecords);
        $(id+ "DisplayTotalRecord").text(maxData);        
	}

};
