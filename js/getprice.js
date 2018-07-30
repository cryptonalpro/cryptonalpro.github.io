$(document).ready(function() {//why


let priceFromServer =function(){
		$.ajax({
			method:'post',
			url:'rate',
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


let cryptoPrice={
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
    PERCENTBUY:{
        BTC:5,
        ETH:5,
        EOS:5
    },
    PERCENTSELL:{
        BTC:5,
        ETH:5,
        EOS:5
    },
    getPrice:function(param1, param2){
        return this[param1][param2];
    },

}

//запрос с кракена
let request_kraken = {
    host: 'api.kraken.com',
    path: '/0/public/Ticker?pair=xbtusd,eosusd,ethusd,xbteur,eoseur,etheur'
};

//колбек с кракена
let callback_kraken = function(response) {
    let answer='';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
            let JSONResult = JSON.parse(answer);
            if(JSONResult.error.length>0){
               //generatioin exception
                throw new Error(JSONResult.error);
            }
//          console.log('kraken = ' + JSON.stringify(JSONResult));
            cryptoPrice.USD.BTC=JSONResult.result.XXBTZUSD.c[0];
            cryptoPrice.USD.ETH=JSONResult.result.XETHZUSD.c[0];
            cryptoPrice.USD.EOS=JSONResult.result.EOSUSD.c[0];
            cryptoPrice.EUR.BTC=JSONResult.result.XXBTZEUR.c[0];
            cryptoPrice.EUR.ETH=JSONResult.result.XETHZEUR.c[0];
            cryptoPrice.EUR.EOS=JSONResult.result.EOSEUR.c[0];
            console.log(cryptoPrice);
            http.request(request_fiat, callback_fiat).end();
        }catch(err){
            console.log('error callback kraken '+err);
            getPriceBitfinex();
            http.request(request_fiat, callback_fiat).end();
        }
         });
}

//requestS bitFinex
function requestBitfinex(pair){
    return {
        host: 'api.bitfinex.com',
        path: '/v1/pubticker/'+pair
    }
}

//callbackS bitfinex
let callback_bitfinex_usdbtc = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
            let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.USD.BTC = JSONResult.last_price;
            }else{
                JSON.stringify(JSONResult);
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.message);
                }
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.error);
                }
            }
        } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}
let callback_bitfinex_usdeth = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
            let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.USD.ETH = JSONResult.last_price;
            }else {
                JSON.stringify(JSONResult);
                if (JSONResult.message !== undefined) {
                    throw new Error(JSONResult.message);
                }
                if (JSONResult.message !== undefined) {
                    throw new Error(JSONResult.error);
                }
            }
            } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}
let callback_bitfinex_usdeos = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
            let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.USD.EOS = JSONResult.last_price;
            }else{
                JSON.stringify(JSONResult);
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.message);
                }
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.error);
                }
            }
        } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}
let callback_bitfinex_eurbtc = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
             let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.EUR.BTC = JSONResult.last_price;
            }else{
                JSON.stringify(JSONResult);
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.message);
                }
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.error);
                }
            }
        } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}
let callback_bitfinex_eureth = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
            let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.EUR.ETH = JSONResult.last_price;
            }else{
                JSON.stringify(JSONResult);
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.message);
                }
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.error);
                }
            }
        } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}
let callback_bitfinex_eureos = function(response) {
    let answer = '';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function () {
        try {
           let JSONResult = JSON.parse(answer);
//          console.log('bitfinex = ' + JSON.stringify(JSONResult));
            if((JSONResult.message===undefined)&&(JSONResult.error===undefined)){
                cryptoPrice.EUR.EOS = JSONResult.last_price;
            }else{
                JSON.stringify(JSONResult);
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.message);
                }
                if(JSONResult.message!==undefined) {
                    throw new Error(JSONResult.error);
                }
            }
        } catch (err) {
            console.log('error callback bitfinex ' + err);
        }
    })
}

//запрос на фиат с 1
let request_fiat = {
    host: 'www.cbr-xml-daily.ru',
    path: '/daily_json.js'
};

//колбек фиат1
let callback_fiat = function(response) {
    let answer='';
    response.on('data', function (chunk) {
        answer += chunk;
    });
    response.on('end', function (err) {
        try {
            let JSONResult = JSON.parse(answer);
//          console.log('fiat = ' + JSON.stringify(JSONResult));
            cryptoPrice.RUR.BTC=cryptoPrice.USD.BTC*JSONResult.Valute.USD.Value;
            cryptoPrice.RUR.ETH=cryptoPrice.USD.ETH*JSONResult.Valute.USD.Value;
            cryptoPrice.RUR.EOS=cryptoPrice.USD.EOS*JSONResult.Valute.USD.Value;
            console.log(cryptoPrice);
        }catch(err){
            console.log('error callback fiat '+err);
        }
    });
}

setInterval(()=>{https.request(request_kraken, callback_kraken).end()},3000);
//http.request(request_fiat, callback_fiat).end();
//https.request(request_kraken, callback_kraken).end();
let getPriceBitfinex = function(){
    https.request(requestBitfinex('BTCUSD'), callback_bitfinex_usdbtc).end();
    https.request(requestBitfinex('ETHUSD'), callback_bitfinex_usdeth).end();
    https.request(requestBitfinex('EOSUSD'), callback_bitfinex_usdeos).end();
    https.request(requestBitfinex('BTCEUR'), callback_bitfinex_eurbtc).end();
    https.request(requestBitfinex('ETHEUR'), callback_bitfinex_eureth).end();
    https.request(requestBitfinex('EOSEUR'), callback_bitfinex_eureos).end();
}





})