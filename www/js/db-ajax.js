var refreshIntervalId;
var refreshIntervalSearchProviderId;

function listaDrivers()         
            // Capturar o clique no botão #btnClientes...

            {
                // Limpar todos os itens da lista...
                $("#listaDrivers").empty();
         
                // Exibe a mensagem 'Carregndo clientes'
                $("#situacao").html("<center>Buscando Drivers no banco de dados (API)...</center>");
         
                $.ajax({
                    type: "GET",
                    url: getURL()+"relatorio.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        // JSON return...
                        var drivers = JSON.parse(result);
         
                        $.each(drivers,function(i, driver){
                            var item = "<li><h2>"+driver.NAME+"</h2><p><b>Mobile.:</b> "+driver.MOBILE+"</p><p><b>Email:</b> "+driver.EMAIL+"</p></li>";
                            $("#listDrivers").append(item);
                        });
         
                        $("#situacao").html("<center>Found "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // Exibir mensagem de erro, caso aconteça...
                        $("#situacao").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    }
function getURL()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
             return 'http://localhost/webservice/';
         
    } 	
function getURLcgi()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
             return 'http://localhost/cgi-bin/';
         
    }   



function loginUsr()         
            {
                $("#message-login").html("<center>Finding email information....</center>");
                var $email = document.getElementById('email').value;
                var $password = document.getElementById('password').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"login.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"email":$email, "password":$password},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#iduser").val(userData.ID);
							$("#username").val(userData.NAME);
							$("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');
				//			listItems() ;                           
							activate_page("#cliente");
//                            activate_page("#pg-items");
                       }
                       else
                       {
                           $("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy(login) try again later...  "+$email + $password +status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }
function getUserDetails()         

            {
         
                var uid = document.getElementById('iduser').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":uid},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#app-address").val(userData.ADDRESS);
                       }
                       else
                       {
                           $("#app-address").val('');

                       }                   
         
                        $("#message-login").html("<center>Found "+userData.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // error message...
                        $("#app-address").val("");
 
                    },
                });
         
    }
   function listItems()         

            {
                // clean list div...
                $("#listItems").empty();
				var descricao = document.getElementById('selDescrProduto').value;
                $("#msgListItem").html("");

				showCategory(descricao);
				
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-items.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td>"+service.IMG+"</td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+service.ID+")'>Select</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listItems").append(item); 
                        });
         
                        $("#msgListItem").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListItem").html("<center>Server busy try again later(listitems)...  "+status+"</center>");
                    },
                });
         
    } 

   function listServices()         

            {
                // clean list div...
                $("#listServices").empty();
				var descricao = document.getElementById('selDescrProduto').value;
                $("#msgListServ").html("");

				showCategory(descricao);
				
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-services.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><img src='"+service.IMG+"' height='100px' /></td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailService("+service.ID+")'>Detail/Quote/Appointment</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listServices").append(item); 
                        });
         
                        $("#msgListServ").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListServ").html("<center>Servidor Sobrecarrecado tente mais tarde...  "+status+"</center>");
                    },
                });
         
    } 


   function listItemsByCategory(category)         

            {
                // clean list div...
                $("#listItems").empty();
                $("#msgListItem").html("<center>Pesquisando...</center>");
				var descricao = document.getElementById('selDescrProduto').value;
				console.log('listItemsByCategory'+category+descricao);
				showCategory(descricao);
                $.ajax({
                    type: "GET",
                    url: getURL()+"list-produtos.php",
                    timeout: 5000,
					data: {"category":category, "descr":descricao },
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var itens = JSON.parse(result);
         
                        $.each(itens,function(i, produto){
							
                            var item = "<table width='100%'><tr><td>"+produto.IMG+"</td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+produto.NAME+"</h4><p><b>$ </b> "+produto.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+produto.ID+")'>Detalhes</button></p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+produto.ID+")'>Comprar</button></p>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listItems").append(item); 
                        });
         
                        $("#msgListItem").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListItem").html("<center>Tente mais tarde...  "+status+"</center>");
                    },
                });
         
    } 	

   function listItemsByDescricao(produto)         

            {
				// lista produtos por codigo ou descricao (parametro de entrada  descricao)
                // clean list div...
                $("#listselitemvenda").empty();
                $("#msgselitemvenda").html("<center>Pesquisando...</center>");
				console.log('listItemsByCodDescricao'+produto);
                $.ajax({
                    type: "GET",
                    url: getURL()+"list-proddescr.php",
                    timeout: 5000,
					data: {"produto":produto },
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var itens = JSON.parse(result);
						console.log(itens);
         
                        $.each(itens,function(i, produto){
							
                            var item = "<table width='100%'><tr><td>"+produto.IMG+"</td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+produto.NAME+"</h4><p><b>$ </b> "+produto.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+produto.ID+")'>Detalhes</button></p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+produto.ID+")'>Selecionar</button></p>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listselitemvenda").append(item); 
							activate_page("#sel-item-venda");
							uib_sb.toggle_sidebar($("#menu"));  
                        });
         
                        $("#msgselitemvenda").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgselitemvenda").html("<center>Tente mais tarde...  "+status+"</center>");
                    },
                });
         
    } 	



	function listServicesByCategory(category)         

            {
                // clean list div...
                $("#listServices").empty();
         
                $("#msgListServ").html("<center>Fetching Services...</center>");

				showCategory("selectListCategory","listServices");
				
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-produtos.php",
                    timeout: 5000,
					data: {"category":category},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><img src='"+service.IMG+"' height='100px' /></td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailService("+service.ID+")'>Detail/Quote/Appointment</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listServices").append(item); 
                        });
         
                        $("#msgListServ").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListServ").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 
function listarVendas()         

            {
                // clean list div...
                $("#listItems").empty();
				var descricao = document.getElementById('selDescrProduto').value;
                $("#msgListItem").html("");

				showCategory(descricao);
				
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-vendas.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td>"+service.NUMERO+"</td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.DATA+"</h4><p><b>R$ </b> "+service.TOTAL+"</p>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.CLIENTE+"</h4>";
                                item = item + "<p align='right'><button class='btn-success' onclick='detailItem("+service.NUMERO+")'>Abrir</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listItems").append(item); 
                        });
         
                        $("#msgListItem").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListItem").html("<center>Problema com o servidor tente mais tarde...  "+status+"</center>");
                    },
                });
         
    } 
	
   function detailService($ids)         

            {
                $("#msgListServ").html("");

                $.ajax({
                    type: "GET",
                    url: getURL()+"serv-detail.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids":$ids},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
 
                       if (userData.MESSAGE == "OK"){
                           $("#idservice").val(userData.ID);
                           $("#serviceImg").html('<center><img src="'+userData.IMG+'" height="200px"></center>');
                           $("#serviceName").html('<center><b>'+userData.NAME+'</center>');
                           $("#serviceFare").html('Fare: $<b>'+userData.FARE+'</b>');
                           $("#serviceDescription").html('<center><b>'+userData.DETAILS+'</center>');
                            activate_page("#srv-detail");
                       }
                       else
                       {
                           $("#msgListServ").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListServ").html("<center>Server busy try again later... "+status+"</center>");
                    },
                });
         
    } 	

   function detailItem($idp)         

            {
                $("#msgListItem").html("");
				console.log('detailItem:'+$idp);
                $.ajax({
                    type: "GET",
                    url: getURL()+"item-detail.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"idp":$idp},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
 
                       if (userData.MESSAGE == "OK"){
                           $("#idItem").val(userData.ID);
                           $("#itemImg").html('<center>'+userData.IMG+'</center>');
                           $("#itemDescr").html('<center><b>'+userData.NAME+'</center>');
                           $("#itemPreco").html('Valor Venda: R$ <b>'+userData.FARE+'</b>');
                           $("#itemDetalhes").html('<center><b>'+userData.DETAILS+'</center>');
                            activate_page("#item-detail");
                       }
                       else
                       {
                           $("#msgListItem").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListItem").html("<center>Problema com servidor... "+status+"</center>");
                    },
                });
         
    } 	


	function showServices(category)         

            {
                // clean list div...
				console.log("Category: "+category);
                $("#message-showserv").empty();
                $("#listShowServ").empty();
				
				showCategory("selectShowCategory","showServices");
				
                        
                $("#message-showserv").html("");
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-services.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><img src='"+service.IMG+"' height='100px' /></td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='showDetailService("+service.ID+")'>Detail</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listShowServ").append(item); 
                        });
         
                        $("#message-showserv").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

  function showServicesByCategory(category,fieldResultServices)         

            {
                // clean list div...
				console.log("Category: "+category);
                $("#message-showserv").empty();
                $("#" + fieldResultServices).empty();
                       
                $("#message-showserv").html("");
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-services.php",
                    timeout: 5000,
					data: {"category":category},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><img src='"+service.IMG+"' height='100px' /></td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='showDetailService("+service.ID+")'>Detail</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#" + fieldResultServices).append(item); 
                        });
         
                        $("#message-showserv").html("");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 
	
   function showCategory(descricao)         

            {
                // clean list div...
                $("#selectListCategory").empty();
                var item = "<label class='narrow-control label-inline'>Categoria</label>";
				item = item + "<select class='wide-control form-control default'id='sel_showcategory' onchange='listItemsByCategory(this.value);'>";
				item = item + "<option value='0' selected>Selecione</option>";


				$.ajax({
                    type: "GET",
                    url: getURL()+"list-category.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
					console.log('result:'+result.trim());
                        var jsonReturn = JSON.parse(result);
         
                        $.each(jsonReturn,function(i, category){
							
                                item = item + "<option value='" + category.ID + "'> "+category.NAME+"</option>";
                        });
						$("#selectListCategory").append(item); 
         
                        $("#message-showserv").html("<center>Selecione o Produto: </center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });

         
    } 
		
   function showDetailService($ids)         

            {
                $("#message-showserv").html("");

                $.ajax({
                    type: "GET",
                    url: getURL()+"serv-detail.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids":$ids},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
 
                       if (userData.MESSAGE == "OK"){
                           $("#idservice").val(userData.ID);
                           $("#serviceImgShow").html('<center><img src="'+userData.IMG+'" height="200px"></center>');
                           $("#serviceNameShow").html('<center><b>'+userData.NAME+'</center>');
                           $("#serviceFareShow").html('Fare: $<b>'+userData.FARE+'</b>');
                           $("#serviceDescriptionShow").html('<center><b>'+userData.DETAILS+'</center>');
                            activate_page("#show-detail");
                       }
                       else
                       {
                           $("#message-showserv").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later... "+status+"</center>");
                    },
                });
         
    } 	

   function addBooking()         
            {
				
					var idUser = document.getElementById('iduser').value;
					var idService = document.getElementById('idservice').value;
					var timeService = document.getElementById('app-time').value;
					var dateService = document.getElementById('datepicker').value;
					var address = document.getElementById('app-address').value;
					var error = true;
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-booking.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids": idService, "uid":idUser, "time":timeService, "date":dateService, "address":address},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#cardbid").val(userData.BID);
                           $("#cardfare").val(userData.FARE);
						   $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
//						   activate_page("#pg-credit-card");
							bookingSuccess();
						   error = true;
                       }
                       else
                       {
                           $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	
  function addQuote()         
            {
				
					var idUser = document.getElementById('iduser').value;
					var idService = document.getElementById('idservice').value;
					var timeService = document.getElementById('app-time').value;
					var dateService = document.getElementById('datepicker').value;
					var address = document.getElementById('app-address').value;
					var comments = document.getElementById('quoteComment').value;
					var error = true;
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-quote.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids": idService, "uid":idUser, "time":timeService, "date":dateService, "address":address, "comments":comments},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#cardbid").val(userData.BID);
                           $("#cardfare").val(userData.FARE);
						   $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
						   listBookings();
						   activate_page("#bookings");
							bookingSuccess();
						   error = true;
                       }
                       else
                       {
                           $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	

function iniciarVenda()         
            {
				
					var idUser = document.getElementById('iduser').value;
					var userName = document.getElementById('username').value;
					var error = true;
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-sale.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid":idUser,"username":userName},
                    success: function (result, jqXHR) {
                       var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
                           $("#vid").val(userData.VID);
						   $("#vendaHeader1").html('<center>Nr.: <b>'+userData.nrnota_nt+'</b>  <h3>Total: <b> R$ 0,00 </b></h3></center>');
						   activate_page("#venda");
						   error = true;
                       }
                       else
                       {
                           $("#vendaHeader1").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
                    },
                    error: function (jqXHR, status) {
                        $("#vendaHeader1").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					},
                });
				return error;
    } 	










	function makeStripePayment()         
            

    {
				var ccName = document.getElementById('cardholdername').value,
				ccNum = document.getElementById('cardnumber').value,
				cvcNum = document.getElementById('cvv').value,
				expMonth = document.getElementById('exp-month').value,
				expYear = document.getElementById('exp-year').value;	
				
					// Get the Stripe token:
					Stripe.card.createToken({
						number: ccNum,
						cvc: cvcNum,
						exp_month: expMonth,
						exp_year: expYear
					}, stripeResponseHandler);
				
				
	}
	
	function stripeResponseHandler(status, response) {

			if (response.error) {
				$("#message-card").html('<center><b>'+response.error.message+'</center>');
			} else { 
			   var f = $("#payment-form");
				var token = response.id;
				var fare = document.getElementById('cardfare').value;				 
				var bid = document.getElementById('cardbid').value;				 
				var ccName = document.getElementById('cardholdername').value,
				ccNum = document.getElementById('cardnumber').value,
				cvcNum = document.getElementById('cvv').value,
				expMonth = document.getElementById('exp-month').value,
				expYear = document.getElementById('exp-year').value;	
				$.ajax({
                    type: "GET",
                    url: getURL()+"charge-card.php",
                    timeout: 20000,
                    contentType: "application/json; charset=utf-8",
					data: {"stripeToken": token, "fare":fare, "bid":bid,"ccname":ccName,"ccnum":ccNum,"cvcnum":cvcNum,"expmonth":expMonth, "expyear":expYear },
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {  
	                   var userData = JSON.parse(result);
                        $("#message-card").html("<center>"+userData.MESSAGE+"</center>");
						document.getElementById("btconfirmpay").disabled = true;
						bookingSuccess();
                    },
                    error: function (jqXHR, status) {
                        $("#message-card").html("<center>Payment was not made... "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                        error = false;
					
					},
					
				});		
				
			}
	
	}
	
   function bookingSuccess()         
            

            {
               
				
				var bid = document.getElementById('cardbid').value;
                var retorno = true;

                $.ajax({
                    type: "GET",
                    url: getURL()+"bookingSuccess.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"bid": bid},
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
						   refreshIntervalId = setInterval(checkBookingUser,10000);	
						   refreshIntervalBookNotSchedId = setInterval(checkBookingNotSchedUser,10000);	
						   activate_page("#bookings");
                           retorno = true;
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        retorno = false;
					
					},
                });
				
				return retorno;
         
    } 	


function checkBookingUser()         
            

            {
                // check bookings not scheduled yet ...
                var uid = document.getElementById('iduser').value; 
				uid = 39;
				console.log('checkBookingUser'+uid);
                var tembooking = 'OK';
                $.ajax({
                    type: "GET",
                    url: getURL()+"check-bookinguser.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var bookings = JSON.parse(result);

			 
							$.each(bookings,function(i, book){
								if (book.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + book.SERVICE+"\n";
								item = item + "DATE.: "+book.DATE+" TIME.: "+book.TIME+"\n";
								item = item + "PROVIDER.: "+book.PROVIDER+"\n";
								item = item + "MOBILE.:"+book.MOBILE+"\n";
								item = item + "DISTANCE.:"+book.DISTANCE+"\n";
								alert(item);
                                tembooking = 'OK';
								}
                                else {
									tembooking = 'NOK';
									clearInterval(refreshIntervalId);
								}
							});
                            if (tembooking === "OK") 
							   activate_page("#new-booking-confirm");
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
  } 
	

function checkBookingNotSchedUser()         
            

            {
                // check bookings not scheduled yet ...
                var uid = document.getElementById('iduser').value; 
				console.log('checkBookingUser'+uid);
                var tembooking = 'OK';
                $.ajax({
                    type: "GET",
                    url: getURL()+"check-bookingnotscheduser.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var bookings = JSON.parse(result);

			 
							$.each(bookings,function(i, book){
								if (book.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + book.SERVICE+"\n";
								item = item + "DATE.: "+book.DATE+" TIME.: "+book.TIME+"\n";
								item = item + "MOBILE.:"+book.MOBILE+"\n";
								item = item + "ADDRESS.:"+book.ADDRESS+"\n";
								item = item + "LATITUDE.:"+book.LATITUDE+"\n";
								item = item + "LONGITUDE.:"+book.LONGITUDE+"\n";
								alert(item);
                                tembooking = 'OK';
								getNearestProvider(book.ID);
								
								}
                                else {
									tembooking = 'NOK';
									clearInterval(refreshIntervalSearchProviderId);
								}
							});
                            if (tembooking === "OK") 
							   activate_page("#new-booking-confirm");
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
  } 
	
	function getNearestProvider(bid)
	{
				console.log('getNearestProvider'+bid);
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-nearestprovider.php",
                    timeout: 8000,
					data: {"bid": bid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var provider = JSON.parse(result);

			 
								if (provider.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + provider.NAME+"\n";
								item = item + "MOBILE.:"+provider.MOBILE+"\n";
								item = item + "LATITUDE.:"+provider.LATITUDE+"\n";
								item = item + "LONGITUDE.:"+provider.LONGITUDE+"\n";
								alert(item);
								
								}
                    },
                    error: function (jqXHR, status) {
                        console.log("<center>Server busy try again later...  "+status+"</center>");
                    },
                });	
	
	}
	



	function addUser()         

            {
				
					var email = document.getElementById('emailuser').value;
					var mobile = document.getElementById('mobileuser').value;
					var pwd = document.getElementById('passworduser').value;
					var error = true;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"articles/add-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"email": email, "mobile":mobile, "pwd":pwd},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#iduser").val(userData.UID);
						   $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
						   activate_page("#signup2");
						   error = true;
                       }
                       else
                       {
                           $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	
  function updateUser()         

            {
				
					var uid = document.getElementById('iduser').value;
					var name = document.getElementById('name').value;
					var address = document.getElementById('address').value;
					var gender = document.getElementById('gender').value;
					var height = document.getElementById('height').value;
					var weight = document.getElementById('weight').value;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid, "name":name, "address":address , "gender":gender, "height":height, "weight":weight},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#uid").val(userData.UID);
						   $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                           sendText(userData.UID);
						   activate_page("#signup2");
                       }
                       else
                       {
                           $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	

	
	
  function sendText(uid)         

            {
				
					console.log('sendText');
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-text.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       $("#message-signup-3").html('<center><b>'+userData.MESSAGE+'</center>');
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup-3").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	
   function listBookings()         
            

            {
                $("#listbook").empty();
 
                $("#message-listbook").html("<center>Fetching Bookings...</center>");
                var uid = document.getElementById('iduser').value; 
                console.log('listBookings'+uid);
                $.ajax({
                    type: "GET",
                    url: getURL()+"list-bookings.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var bookings = JSON.parse(result);
         
                        $.each(bookings,function(i, book){
							
                            var item = "<p><h4 class='list-group-item-heading'>"+book.SERVICE+"</h4>";
							item = item + "<p><b>DATE.:</b> "+book.DATE+"<b> TIME.:</b> "+book.TIME+"</p>";
							item = item + "<p><b>FARE.:</b> "+book.FARE+"</p>";
								var wStatus;
								switch (book.STATUS){
									case "0":
									  wStatus = "Not Confirmed";
									  break;
									case "1":
									  if (book.TYPE == '0')
									  {wStatus = "Request for quote received";}
									  else	
									  {wStatus = "Request for appointment received";}
									  break;
									case "2":
									  wStatus = "Request - Scheduled";
									  item = item + "<p><b>PROVIDER.:</b> "+book.PROVIDER+"</p>";
									  item = item + "<p><b>PROVIDER MOBILE.:</b> "+book.PROVIDERMOBILE+"</p>";
									  break;
									case "3":
									  wStatus = "Request - started";
									  item = item + "<p><b>JOB STARTED AT.:</b> "+book.STARTJOB+"</p>";
									  break;
									case "4":
									  wStatus = "Request - Completed";
									  item = item + "<p><b>PROVIDER.:</b> "+book.PROVIDER+"</p>";
									  item = item + "<p><b>JOB STARTED AT.:</b> "+book.STARTJOB+"</p>";
									  item = item + "<p><b>JOB ENDED AT...:</b> "+book.ENDJOB+"</p>";
									  break;
								}
								item = item + "<p><b>STATUS.:</b> "+wStatus+"</p>";
								if (book.STATUS === "4" && book.FEEDBACK !== "1"){
								item = item + "<p><button class='btn-success' value='feedback' onclick='showFeedbackPage("+book.BID+",4)'>Leave Feedback</button></p>";
								}
								item = item + "<p><b>COMMENTS.:</b> "+book.COMMENTS+"</p>";


							item = item + "<p><hr width=100%></hr>";
                            $("#listbook").append(item); 
							 
                        });
         
                        $("#message-listbook").html("<center>"+ bookings.length+" QUOTES FOUND </center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

function showFeedbackPage(bid)         
{
	console.log("showFeedback"+bid);
	$("#idbooking").val(bid);
	activate_page("#feedback");
	
}            
function saveStar(star)         
{
	console.log("saveStar"+star);
	$("#starselect").val(star);
	
}            
	
	
function sendFeedback(bid)         
            

            {
                // clean message div
                $("#message-feed").html("<center></center>");
                var star = document.getElementById('starselect').value; 
                var comment = document.getElementById('comment-feedback').value; 
                console.log('sendFeedback'+bid+'star:'+star+' Comment:'+comment);
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-feedback.php",
                    timeout: 8000,
					data: {"bid": bid,"star": star,"bid": bid,"comment": comment,"origin": "1"},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var feed = JSON.parse(result);
         
							
                        
									
                        $("#message-feed").html("<center>Thank you for your feedback.</center>");
						listBookings();
						activate_page("#bookings");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-feed").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 
	
function profile()         
            {
                $("#message-profile").html("<center>Finding profile information....</center>");
                var $uid = document.getElementById('iduser').value;
                $.ajax({
                    type: "GET",
                    url: getURL()+"profile.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":$uid},
                    success: function (result, jqXHR) {
                       console.log(result);
						var userData = JSON.parse(result);
                       
                       
                       if (userData.MESSAGE == "OK"){
							$("#message-profile").html('<center><b>PROFILE</center>');
							$("#profileName").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Name:</b></td><td class="text-left">'+userData.NAME.trim()+'</td></tr></table>');
							$("#profileEmail").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Email: </b></td><td  class="text-left"">'+userData.EMAIL.trim()+'</td></tr></table>');
							$("#profileMobile").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Mobile: </b></td><td  class="text-left">'+userData.MOBILE.trim()+'</td></tr></table>');
							$("#profileAddress").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Address: </b></td><td  class="text-left">'+userData.ADDR.trim()+'</td></tr></table>');
							$("#profileGender").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Gender: </b></td><td  class="text-left">'+userData.GENDER.trim()+'</td></tr></table>');
							$("#profileHeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Height: </b></td><td  class="text-left">'+userData.HEIGHT.trim()+'</td></tr></table>');
							$("#profileWeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Weight: </b></td><td  class="text-left">'+userData.WEIGHT.trim()+'</td></tr></table>');
							activate_page("#profile");
                       }
                       else
                       {
                           $("#message-profile").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
//                        $("#message-login").html("<center>Foram encontrado "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }

	
	
function sendEmail()         
            

            {
                $("#message-feed").html("<center></center>");
                var uid = document.getElementById('iduser').value; 
                var subject = document.getElementById('subject').value; 
                var email = document.getElementById('emailtext').value; 
                console.log('sendEmail'+uid+'text:'+email);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
					data: {"uid": uid,"subject": subject,"email": email},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
						console.log(result);
                        var feed = JSON.parse(result);
                        $("#message-feed").html("<center>Thank you for your feedback.</center>");
						listBookings();
						activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-feed").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

function addCliente()         
            
            {
                $("#message-cliente").html("<center>Adicionando.....</center>");
                var uid = document.getElementById('iduser').value; 
                var nome = document.getElementById('nomecli').value; 
                var ender = document.getElementById('endercli').value; 
                var num = document.getElementById('numcli').value; 
                var cid = document.getElementById('cidcli').value; 
                var uf = document.getElementById('ufcli').value; 
                var cep = document.getElementById('cepcli').value; 
                var cpf = document.getElementById('cpfcli').value; 
                var email = document.getElementById('emailcli').value; 
                var fone = document.getElementById('fonecli').value; 
                console.log('addcliente'+uid+'nome:'+nome);
                $.ajax({
                    type: "GET",
                    url: getURLcgi()+"Cliente_Atu.exe",
                    timeout: 8000,
                    data: {"uid": uid,"NOME": nome,"ENDER": ender,"NUMER": num,
                    "CIDADE": cid,"ESTADO": uf,"CEP": cep,"CPF": cpf,
                    "EMAIL": email,"FONE": fone,"FUN": "IN"},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log(result);
                        var userData = JSON.parse(result);
                        

                       if (userData.MESSAGE == "OK")
                        $("#message-cliente").html("<center>Cliente Cadastrado com sucesso.</center>");
                       else  
                        $("#message-cliente").html("<center>Cliente NAO Cadastrado, CPF/CNPJ ja existe no sistema.</center>");
                    },
                    error: function (jqXHR, status) {
                        $("#message-cliente").html("<center>Problema acesso ao servidor(add-cliente)...  "+status+"</center>");
                    },
                });
         
    } 


