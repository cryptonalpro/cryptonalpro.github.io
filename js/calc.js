$(document).ready(function() {//why



	let priceFromServer =function(){
		$.ajax({
			method:'post',
			url:'https://bestbitcoinprice.pro/rate',
			success:function(result){
				priceFromExc=result;
				priceFromExc.getPrice=function(param1, param2){
					return this[param1][param2];
				};
				console.log(result);
			},
			error:function(XHR, error){
				console.log(XHR.status+', '+XHR.statusText);
				priceFromExc={
					USD:{
						BTC:0,
						ETH:0,
						EOS:0
					},
					EUR:{
						BTC:0,
						ETH:0,
						EOS:0
					},
					RUR:{
						BTC:0,
						ETH:0,
						EOS:0
					},
					getPrice:function(param1, param2){
						return this[param1][param2];
					},
					PERCENTBUY:{
						BTC:5,
						ETH:5,
						EOS:5
					},
					PERCENTSELL: {
						BTC:5,
						ETH:5,
						EOS:5
					}
				};
			}
		});
	}

priceFromServer();	

	setInterval(function(){
		priceFromServer();
	},40000);

//меняем картинку  поля получить в соответствии с выбранной валютой 
function hideMoney_2(param){
	$('#money_logo_2').attr('src','img/'+param+'.png');
}

//меняем валюту в поле получить в зависимости от выбора в поле отдать
function changeSelectedForIDSelect_2(param){
	$("#select_2 option:selected").prop('selected', false);
	$("#select_2 #"+param).prop('selected', true);
}

// если в первом поле фиат, то в нижнем крипта и наоборот
function hideMoney_1(param){
	let usd='USD';
	let btc='BTC';
	if(param.attr('class')==='fiat'){
		$('.hide_fiat').addClass('hidden');
		$('.hide_crypt').removeClass('hidden');
		$('#money_logo_1').attr('src','img/'+param.text()+'.png');
		hideMoney_2(btc);
		changeSelectedForIDSelect_2(btc);
	}else{
		$('.hide_fiat').removeClass('hidden');
		$('.hide_crypt').addClass('hidden');
		$('#money_logo_1').attr('src','img/'+param.text()+'.png');
		hideMoney_2(usd);
		changeSelectedForIDSelect_2(usd);
	}
};

$('.input_money').bind("keyup input", function() {
	if(this.value.length===0){
		inputCleen();
	}
	let dot=this.value.search(/\./);
	let firstinput=this.id==='inmoney_1'?true:false;
	let pair={};
	pair.typefiat=$("#select_1 option:selected").attr('class')==='fiat'?true:false;
	pair.select_1text=$("#select_1 option:selected").text();
	pair.select_2text=$("#select_2 option:selected").text();
	pair.amount=+this.value;

	if(dot<=0){
		this.value = this.value.replace(/[^0-9]/g, '');	
		if(this.value.length>0){
			if(firstinput){
				$('#inmoney_2').val(calcResult(firstinput, pair));	//, objpercentbuy, objpercentsell
			}else{
				$('#inmoney_1').val(calcResult(firstinput, pair));	
			}
		}
	}else{
		if((this.value.length-(dot+1))<=8){
			this.value = this.value.substring(0, dot+1)+ this.value.substring(dot+1).replace(/[^0-9]/g, '');		
			if(firstinput){
				$('#inmoney_2').val(calcResult(firstinput, pair));	
			}else{
				$('#inmoney_1').val(calcResult(firstinput, pair));	
			}
		}else{
			this.value = this.value.substring(0, dot+1)+ this.value.substring(dot+1, (dot+1)+8);
		}
	}	
});




function calcResult(firstinput, pair){
	let objcalc={};
	let res;
	if(firstinput){
		if(pair.typefiat){
			objcalc.percent=priceFromExc.PERCENTBUY[pair.select_2text];
			objcalc.price=priceFromExc.getPrice(pair.select_1text, pair.select_2text);
			objcalc.amount=pair.amount;
			res=fiatCryptIn1(objcalc);
		}else{
			objcalc.percent=priceFromExc.PERCENTSELL[pair.select_1text];
			objcalc.price=priceFromExc.getPrice(pair.select_2text, pair.select_1text);
			objcalc.amount=pair.amount;
		//	console.log(objcalc);
		res=cryptFiatIn1(objcalc);
		//	console.log(res);
	}
}else{
	if(pair.typefiat){
		objcalc.percent=priceFromExc.PERCENTBUY[pair.select_2text];
		objcalc.price=priceFromExc.getPrice(pair.select_1text, pair.select_2text);
		objcalc.amount=pair.amount;
		//	console.log(objcalc);
		res=fiatCryptIn2(objcalc);
	}else{
		objcalc.percent=priceFromExc.PERCENTSELL[pair.select_1text];
		objcalc.price=priceFromExc.getPrice(pair.select_2text, pair.select_1text);
		objcalc.amount=pair.amount;
		//	console.log(objcalc);
		res=cryptFiatIn2(objcalc);
	}
}
let result_string=res+'';
	//проверям есть ли дробная часть в результате вычислений
	let dot1=result_string.search(/\./);
	//если в результате есть дробь и знаков после точки>8, то округляем до 8ми знаков
	if((dot1>0)&&(result_string.length-(dot1+1)>8)){
		return res.toFixed(8);	
	}else{
		//иначе проста записываем рещультат
		return res;
	}
}




hideMoney_1($("#select_1 option:selected"));

function inputCleen(){
	$('.input_money').val('');
}

	//меняем картинки волюты в поле отда и скрываем валюту в поле получить
	$('#select_1').change(function(){
		hideMoney_1($("#select_1 option:selected"));
		inputCleen();

	});

	//меняем картинки волюты в поле получить
	$('#select_2').change(function(){
		hideMoney_2($("#select_2 option:selected").text());
		inputCleen();
	});

//формулы  расчетов

//покупка крипты за фиат(поле1)
function fiatCryptIn1(objcalc){
//	console.log('fiatCryptIn1');
return objcalc.amount/(objcalc.price*(100+objcalc.percent)/100);
}
//покупка крипты(поле2) за фиат
function fiatCryptIn2(objcalc){
	//console.log('fiatCryptIn2');
	return objcalc.amount*(objcalc.price*(100+objcalc.percent)/100);
}

//продажа крипты(поле1) за фиат
function cryptFiatIn1(objcalc){
//	console.log('cryptFiatIn1');
return objcalc.amount*(objcalc.price*(100-objcalc.percent)/100);
}
//продажа крипты за фиат(поле2)
function cryptFiatIn2(objcalc){
//	console.log('cryptFiatIn2');
return objcalc.amount/(objcalc.price*(100-objcalc.percent)/100);
}



});