/*==================================
 * by:Yangyunhe——David Yang
 * 2017-7-7
 * http:www.yangyunhe.me
 * 省市区三级联动菜单插件-含最新官方数据库数据
 *==================================*/
+function($) {
	$.fn.citys = function(options) {
		//定义参数
		var _options = $.extend({
				url : './jquery-citys.json',					//省市区json数据地址
				patternPro : /\d{2}0000/,							//初始化正则匹配省数据
				patternCity : /1101\d{2}/,						//初始化正则匹配市数据
				type : 'code',												//下拉框值的类型,code行政区划代码,name地名
				code: 0,															//地区编码
				province : '',												//省份(省级),可以为地区编码或者名称
				city : '',														//城市(地级),可以为地区编码或者名称
				area : '',														//地区(县区级),可以为地区编码或者名
				selState : 0,													//联动级别判断值，二级联动状态值为0，三级为1
				selProvince : "province",							//省份、直辖市列表框name
				selCity : "city",											//城市、区列表框name
				selArea : "area",											//区、县列表框name
		}, options);
		var proHtml = '',													//省份html数据
				cityHtml = '',												//城市html数据
				areaHtml = '',												//地区html数据
				_this = $(this),											//指向调用插件对象
				citys = '',														//省市区json数据
				patternPro = _options.patternPro,			//初始化正则匹配省数据
				patternCity = _options.patternCity,		//初始化正则匹配市数据
				type = _options.type,									//下拉框值的类型,code行政区划代码,name地名
				code = _options.code,									//地区编码
				province = _options.province,					//省份(省级),可以为地区编码或者名称
				city = _options.city,									//城市(地级),可以为地区编码或者名称
				area = _options.area,									//地区(县区级),可以为地区编码或者名
				selState = _options.selState,					//联动级别判断值，二级联动状态值为0，三级为1
				$selProvince =  _this.find('select[name="'+ _options.selProvince +'"]'), 	//省份、直辖市列表框name
				$selCity =  _this.find('select[name="'+ _options.selCity +'"]'), 					//城市、区列表框name
				$selArea = _this.find('select[name="'+ _options.selArea +'"]'); 					//区、县列表框name
		/*-----------获取省市区json数据----------*/
		$.getJSON(_options.url,function(data){
			citys = data;
			//执行初始化命令
			init();
		}) 
		/*-----------初始化列表数据----------*/
		var init = function(){
			//初始化默认数据					
			proHtml = "<option> - 请选择 - </option>";
			cityHtml = "<option> - 请选择 - </option>";					
			for(var i in citys){
				if(patternPro.test(i)){	//添加一级列表数据
					proHtml += "<option value='"+(type=="code"?i:citys[i])+"' data-code='"+ i +"'>"+ citys[i] +"</option>";
				}
			}
			//渲染省份一级列表
			$selProvince.html(proHtml);
			//渲染城市二级列表
			$selCity.html(cityHtml);
			//默认隐藏区三级列表
			$selArea.hide();
			//填写地区编码时，利用编码定位
			if(type == 'code' && code){
				var c = code - code%1e4;
				province = c;
				c = code - (code%1e4 ? code%1e2 : code);
				city = c;
				c = code%1e2 ? code : 0;
				area = c;
			}
			//添加默认初始值
			$selProvince.find('option').each(function(){
				if(type == 'code' && province != ''){
					if(province == $(this).data('code')){
						$(this).attr('selected',true);
						changeProvince($(this).data('code'));
					}
				}else if(type == 'name' && province != ''){
					if(province == $(this).val()){
						$(this).attr('selected',true);
						changeProvince($(this).data('code'));
					}
				}
			})
			$selCity.find('option').each(function(){
				if(type == 'code' && city != ''){
					if(city == $(this).data('code')){
						$(this).attr('selected',true);
						changeCity($(this).data('code'));
					}
				}else if(type == 'name' && city != ''){
					if(city == $(this).val()){
						$(this).attr('selected',true);
						changeCity($(this).data('code'));
					}
				}
			})
			$selArea.find('option').each(function(){ 
				//三级联动时，匹配对应地区
				if(selState == 1){ 
					if(type == 'code' && area != ''){
						if(area == $(this).data('code')){
							$(this).attr('selected',true);
						}
					}else if(type == 'name' && area != ''){
						if(area == $(this).val()){
							$(this).attr('selected',true);
						}
					}
				}
			})
		}
		/*----------省列表值变化绑定事件-----------*/
		$selProvince.on('change',function(){
			var _thisVal = $(this).find('option:selected').data('code') || $(this).find('option').eq(0).data('code');
			changeProvince(_thisVal);
		})
		/*----------市列表值变化绑定事件-----------*/
		$selCity.on('change',function(){
			var _thisVal = $(this).find('option:selected').data('code') || $(this).find('option').eq(0).data('code');
			changeCity(_thisVal);
		})

		/*----------一级列表变化执行逻辑-----------*/
		function changeProvince(val){
			var valStr = val.toString().substr(0,2),//被选中省市前缀代码
					patternThree = new RegExp(valStr + "0100"); //符合正则匹配为三级联动，否则为二级联动
			selState = 0; //默认为二级菜单联动（直辖市）
			for(var i in citys){
				if(patternThree.test(i)){ //状态值为三级菜单联动（省市区）
					selState = 1;
				}
			}
			if(selState == 0){ 
				//二级菜单联动（直辖市）
				$selArea.hide();
				city = area; 	//二级联动时，城市代码即为区代码
				var pattern = new RegExp(valStr + "\\d{4}"), //匹配二级菜单数据正则
						cityHtml = "",
						arr = [];
				cityHtml = "<option> - 请选择 - </option>"; //添加列表头
				for(var i in citys){
					if(pattern.test(i) && i != valStr + "0000"){
						arr[i] = citys[i];
					}
				}
				cityHtml += pushHtml(arr);
				$selCity.html(cityHtml);
			}else if(selState == 1){ 
				//三级菜单联动（省市区）
				$selArea.show();
				var pattern = new RegExp(valStr + "\\d{2}00"), //匹配三级菜单数据正则
						cityHtml = "",
						arr = [];
				cityHtml = "<option> - 请选择 - </option>"; //添加列表头
				for(var i in citys){
					if(pattern.test(i) && i != valStr + "0000"){
						arr[i] = citys[i];
					}
				}
				cityHtml += pushHtml(arr);
				$selCity.html(cityHtml);
			}
			changeCity(val);
		}
		/*---------二级列表变化执行逻辑---------*/
		function changeCity(val){
			var valStr = val.toString().substr(0,4),//被选中省市前缀代码
					pattern = new RegExp(valStr + "\\d{2}"),
					areaHtml = "",
					arr = [];
			areaHtml = "<option> - 请选择 - </option>"; //添加列表头
			if(selState == 1){
				for(var i in citys){
					if(pattern.test(i) && i != valStr + "00"){
						arr[i] = citys[i];
					}
				}
				areaHtml += pushHtml(arr);
			}else{
				areaHtml = "";
			}
			$selArea.html(areaHtml);
		}
		/*-------添加省市区html方法---------*/
		function pushHtml(arr){
			var citysArr = arr,
					html = "";
			for(var i in citysArr){
				html += "<option value='"+(type=="code"?i:citys[i])+"' data-code='"+ i +"'>"+ citys[i] +"</option>"; 
			}
			return html;
		}
	}
}(jQuery);