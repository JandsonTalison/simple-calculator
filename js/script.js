var painel = document.getElementById('painel');
var botoes = document.getElementsByClassName('btn');

function imprimirResultado(){
	var resultado = eval(painel.innerHTML);

	const erroDivisaoZero = "Divisões por zero não são permitidas!";
	const erroOperacaoVazia = "Operação não encontrada!";
	if (resultado!=Infinity && resultado!=undefined && isNaN(resultado)==false){

		var resultadoEmString = resultado.toString();

		if(resultadoEmString.indexOf('.')>-1){
			painel.innerHTML = resultado.toFixed(3);
		}
		else{
			painel.innerHTML = resultado;	
		}
			
	}
	else if(resultado==undefined){
		limparPainel();
		alert(erroOperacaoVazia);
	}
	else{
		limparPainel();
		alert(erroDivisaoZero);
	}
	
}

function limparUltimoCaractere(){
	painel.innerHTML = painel.innerHTML.substring(0,(painel.innerHTML.length-1));
}

function limparPainel(){
	painel.innerHTML = '';
}

function verificaArray(valor,array) {
	var condicao = false;
	for(var i = 0;i<array.length;i++){
		if(valor==array[i]){
			condicao = true;
			break;
		}
	}

	return condicao;
}

for(var k = 0;botoes.length;k++){
	botoes[k].addEventListener('click',function(){

		var valor = this.value;

		if(valor=='='){
			imprimirResultado();
		}
		else if(valor=='clearAll'){
			limparPainel();
		}
		else if(valor=='clear'){
			limparUltimoCaractere();	
		}
		else{

			var caracteres = ['+','-','*','/'];
			var ultimoCaractere = painel.innerHTML[painel.innerHTML.length-1];

			if(painel.innerHTML.length==1 && ultimoCaractere=='0' && valor=='0'){
				//Não permite a inserção consecutivos zeros no início da operação
			}
			
			else if(painel.innerHTML=='' && (verificaArray(valor,caracteres))){
				//Não permite a inserção de operadores quando o painel estiver limpo
			}
			else if(verificaArray(ultimoCaractere,caracteres) && verificaArray(valor,caracteres)){
				//Não permite a inserção de dois operadores consecutivos
				limparUltimoCaractere();
				painel.innerHTML+=valor;
			}else{
				if(painel.innerHTML.length==1 && painel.innerHTML=='0' && !verificaArray(valor,caracteres)){
					//Substitui o zero inicial pelo valor digitado caso seja um número
					limparPainel();
					painel.innerHTML = valor;
				}
				else{
					painel.innerHTML +=valor;
				}
			}
			
		}
	});
}