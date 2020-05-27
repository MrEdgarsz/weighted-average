/*
Tabela = document.GetElementsByTagName('TBODY')[5]
pierwsze dziecko (wszystkie przedmioty) (tr) = Tabela.children
Drugie dziecko (wszystkie oceny z przedmiotu) (td) = Tabela.children.children
(ocena zamknięta w spanie) (span) = Tabela.children.children.children
(ocena) (a) = Tabela.children.children.children
*/
const tabela = {
	p_oceny: 2,
	p_srednia: 3,
	d_oceny: 5,
	d_srednia: 6,
	srednia_rok: -2
}




var adres = window.location.href;
if (adres.indexOf("przegladaj_oceny/uczen") != -1) {
	function check(number) {
		var flag = akoceny.indexOf(number);
		return flag;
	}
	function semestr(j, p) {
		var Tabela = document.getElementsByTagName('TBODY');
		for (var h = 0; h < Tabela[5].children.length-3; h++) {
			var nazwa = Tabela[5].children[h].hasAttribute("name");
			if (nazwa != true) {
				Tabela[5].children[h].style.height = '26px';
				var czybrakocen = Tabela[5].children[h].children[j].innerHTML;
				if (czybrakocen != "Brak ocen") {
					var flaga = false;
					var sumawag = 0;
					var sumaocen = 0;
					var srednia = 0;
					for (var g = 0; g < Tabela[5].children[h].children[j].children.length; g++) {
						var czynnik = null;
						var czypoprawiana = Tabela[5].children[h].children[j].children[g].getAttribute("class");
						if (czypoprawiana == "grade-box") {
							var zawartoscoceny = Tabela[5].children[h].children[j].children[g].children[0].textContent;
							if (check(zawartoscoceny) != "-1") {
								var flaga = true;
								var ocena = Tabela[5].children[h].children[j].children[g].children[0].textContent;
								var tytul = Tabela[5].children[h].children[j].children[g].children[0].getAttribute("title");
								var miejscewaga = tytul.indexOf("Waga: ") + 6;
								var koniecwagi = tytul.indexOf("<br>", miejscewaga);
								if (miejscewaga == 5) {
									var waga = 1;
								}
								else{
									var waga = parseInt(tytul.substr(miejscewaga, koniecwagi-miejscewaga));
								}			
								var miejscelicz = tytul.indexOf("średniej: ") + 10;
								var licz = tytul.substr(miejscelicz, 3);
								if (ocena.length > 1) {
										var czynnik = ocena.substr(1, 1);
										var ocena = ocena.substr(0, 1);
									if (czynnik == "-") {
										var ocena = parseFloat(ocena) - parseFloat(0.25); 
									}
									if (czynnik == "+") {
										var ocena = parseFloat(ocena) + parseFloat(0.50);
									}
								}		
								if (licz == "tak") {
									//.log("ocena: " + ocena);
									//console.log("waga: " + waga);
									var sumaocen = sumaocen + (ocena * waga);
									var sumawag = (sumawag + waga);

								}
							}
						}	
						else{
							for (var d = 0; d < Tabela[5].children[h].children[j].children[g].children.length; d++) {
								var zawartoscoceny = Tabela[5].children[h].children[j].children[g].children[d].children[0].textContent;
								if (check(zawartoscoceny) != "-1") {
									var flaga = true;
									var ocena = zawartoscoceny;
									var tytul = Tabela[5].children[h].children[j].children[g].children[d].children[0].getAttribute("title");
									var miejscewaga = tytul.indexOf("Waga: ") + 6;
									var koniecwagi = tytul.indexOf("<br>", miejscewaga);
									if (miejscewaga == 5) {
										var waga = 1;
									}
									else{
										var waga = parseInt(tytul.substr(miejscewaga, koniecwagi-miejscewaga));
									}					
									var miejscelicz = tytul.indexOf("średniej: ") + 10;
									var licz = tytul.substr(miejscelicz, 3);
									if (ocena.length > 1) {
										var czynnik = ocena.substr(1, 1);
										var ocena = ocena.substr(0, 1);
										if (czynnik == "-") {
											var ocena = parseFloat(ocena) - parseFloat(0.25); 
										}
										if (czynnik == "+") {
											var ocena = parseFloat(ocena) + parseFloat(0.50); 
										}
									}				
									if (licz == "tak") {
										//console.log("ocena: " + ocena);
										//console.log("waga: " + waga);
										var sumaocen = sumaocen + (ocena * waga);
										var sumawag = (sumawag + waga);
									}
								}
							}
						}					
					}
					if (flaga == true) {
						var srednia = sumaocen / sumawag;
						Tabela[5].children[h].children[p].className = "center";
						Tabela[5].children[h].children[p].innerHTML = Math.round(srednia * 100) / 100;
						Tabela[5].children[h].children[p].setAttribute('sumaocen', sumaocen);
						Tabela[5].children[h].children[p].setAttribute('sumawag', sumawag);
						Tabela[5].children[h].children[p].setAttribute('title', "Suma ocen: " + sumaocen + "\nSuma wag: " + sumawag);
					}
					else {
						Tabela[5].children[h].children[p].className = "center";
						Tabela[5].children[h].children[p].innerHTML = "-";
					}

				}
				else {
					Tabela[5].children[h].children[p].className = "center";
					Tabela[5].children[h].children[p].innerHTML = "-";
				}}}}
	function rok() {
		var Tabela = document.getElementsByTagName('TBODY');
		for (var h = 0; h < Tabela[5].children.length-3; h++) {
			var nazwa = Tabela[5].children[h].hasAttribute("name");
			if (nazwa != true) {
				var handler = Tabela[5].children[h].children[3];
				var czysrednia = handler.hasAttribute('sumaocen');
				var handler1 = Tabela[5].children[h].children[7];
				var czysrednia1 = handler1.hasAttribute('sumaocen');
				if ((czysrednia = true) || (czysrednia1 = true)) {
					var sumaocen1 = handler.getAttribute("sumaocen");
					var sumaocen2 = handler1.getAttribute("sumaocen");
					var sumawag1 = handler.getAttribute("sumawag");
					var sumawag2 = handler1.getAttribute("sumawag");
					if (sumaocen1 == null) {
						var sumaocen1 = 0;
					}
					if (sumawag1 == null) {
						var sumawag1 = 0;
					}
					if (sumaocen2 == null) {
						var sumaocen2 = 0;
					}
					if (sumawag2 == null) {
						var sumawag2 = 0;
					}
					var sumaocenrok = parseFloat(sumaocen1) + parseFloat(sumaocen2);
					var sumawagrok = parseFloat(sumawag1) + parseFloat(sumawag2);
					//console.log(sumaocen1 + "|" + sumaocen2 + "|" + sumawag1 + "|" + sumawag2 + "|" + sumaocenrok + "|" + sumawagrok);
					var sredniarok = parseFloat(sumaocenrok) / parseFloat(sumawagrok);
					Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].className = "center";
					Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].innerHTML = Math.round(sredniarok * 100) / 100;
					Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].setAttribute('sumaocenrok', sumaocenrok);
					Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].setAttribute('sumawagrok', sumawagrok);
					Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].setAttribute('title', "Suma ocen: " + sumaocenrok + "\nSuma wag: " + sumawagrok);
					var czynan = Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].innerHTML;
					if (czynan == "NaN") {
						Tabela[5].children[h].children[Tabela[5].children[h].children.length+tabela.srednia_rok].innerHTML = "-";
	}}}}}
	var akoceny = ["1","1-","1+","2","2+","2-","3","3-","3+","4","4-","4+","5","5-","5+","6"];
	var element = document.createElement('tr');
	var element1 = document.createElement('td');
	element1.name = "podpis";
	element1.colSpan = '12';
	element1.className = "center";
	element1.style.background = "#dbdbdb";
	element1.innerHTML = "Średnia obliczona dzięki oprogramowaniu Dominika Szpilskiego | www.edgarsz.pl";
	document.getElementsByTagName('TBODY')[5].appendChild(element);
	element.appendChild(element1);
	semestr(tabela.p_oceny,tabela.p_srednia);
	semestr(tabela.d_oceny,tabela.d_srednia);
	rok();
}
if (adres.indexOf("przegladaj_oceny/uczen") != -1) {
	// DODAWANIE SZABLONÓW CSS
	var css = 
	'.libsr_button:hover{border-bottom: 2px solid #4a719e!important; cursor: pointer;}';
	var css_holder = document.createElement("style");
	css_holder.type = "text/css";
	css_holder.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(css_holder);
	// PRZYCISKI
	var elements = 
	'<button id="libsr_reloadAVG" class="libsr_button" style="float: left;background-color: #4b7db7;outline: none;border: none;border-bottom: 5px solid #4a719e;color: white;font-weight: bold;margin: 0px; width: 120px;">Przelicz średnią</button>'+
	'<button id="libsr_menu_button" class="libsr_button" style="float: left;background-color: #4b7db7;outline: none;border: none;border-bottom: 5px solid #4a719e;color: white;font-weight: bold;width: 200px;margin: 0px;">Pokaż menu dodawania ocen</button>';
	var libsr_button_holder = document.createElement("div");
	libsr_button_holder.id = "libsr_button_holder";
	libsr_button_holder.style.position = "fixed";
	libsr_button_holder.style.top = "0px";
	libsr_button_holder.style.right = "20px";
	libsr_button_holder.style.zIndex = "10000";
	libsr_button_holder.style.width = "320px";
	libsr_button_holder.innerHTML += elements;
	document.body.appendChild(libsr_button_holder);
	//MENU DODAWANIA OCEN
	var libsr_menu_holder = document.createElement("div");
	libsr_menu_holder.id = "libsr_menu";
	libsr_menu_holder.style.width = "320px";
	libsr_menu_holder.style.position = "fixed";
	libsr_menu_holder.style.top = "40px";
	libsr_menu_holder.style.right = "20px";
	libsr_menu_holder.style.zIndex = "10000";
	libsr_menu_holder.style.backgroundColor = "white";
	libsr_menu_holder.style.display = "none";
	var oceny_options = "";
	for (var i = akoceny.length - 1; i >= 0; i--) {
		oceny_options += '<option value="'+akoceny[i]+'">'+akoceny[i]+'</option>';
	}
	var przedmioty_options = "";
	var Tabela = document.getElementsByTagName('TBODY');
	var optionNr = 0;
	for (var h = 0; h < Tabela[5].children.length-3; h++) {
		var nazwa = Tabela[5].children[h].hasAttribute("name");
		if (nazwa != true) {
			var przedmiot = Tabela[5].children[h].children[1].innerHTML;
			przedmioty_options += '<option value="'+h+'">'+przedmiot+'</option>';
		}
	}
	var menu = 
	'<h3 style="margin: 0;text-align: center;color: white;font-weight: bold;background-color: #4b7db6!important;border-bottom: 5px solid #4a729e;background-color: white;">Dodawanie testowych ocen</h3>'+
	'<div style="margin: auto;width: 170px;text-align: center;">'+
		'<h4>Wybierz Semestr</h4>'+
		'<select id="libsr_semestr" name="semestr">'+
			'<option value="1">Semestr 1</option><option value="2">Semestr 2</option>'+
		'</select>'+
		'<h4>Wybierz Przedmiot</h4>'+
		'<select id="libsr_przedmiot" name="przedmiot">'+
			przedmioty_options+
		'</select>'+
		'<h4>Wybierz Ocenę</h4>'+
		'<select id="libsr_ocena" name="ocena">'+
			oceny_options+
		'</select>'+
		'<h4>Podaj Wagę</h4>'+
		'<input id="libsr_waga" type="text" name="waga"/>'+
	'</div>'+
	'<button id="libsr_addGrade" class="libsr_button" style="background-color: #4b7db7;outline: none;border: none;border-bottom: 5px solid #4a719e;color: white;font-weight: bold;width: 100%;margin: 0px;margin-top: 20px;">Dodaj Ocenę</button>';
	libsr_menu_holder.innerHTML += menu;
	document.body.appendChild(libsr_menu_holder);
	var button1 = document.getElementById('libsr_addGrade');
	button1.addEventListener('click', addGrade, false);
	var button2 = document.getElementById('libsr_menu_button');
	button2.addEventListener('click', toggleMenu, false);
	var button1 = document.getElementById('libsr_reloadAVG');
	button1.addEventListener('click', reloadAVG, false);
	function addGrade() {
		let semestr = document.getElementById("libsr_semestr").options[document.getElementById("libsr_semestr").selectedIndex].value;
		let przedmiot = document.getElementById("libsr_przedmiot").options[document.getElementById("libsr_przedmiot").selectedIndex].value;
		let ocena = document.getElementById("libsr_ocena").options[document.getElementById("libsr_ocena").selectedIndex].value;
		let waga = document.getElementById("libsr_waga").value;
		console.log(' ' + semestr + ' ' + przedmiot + ' ' + ocena + ' ' + waga);
		let nrKolumnyOcen = 2;
		if (semestr == 1) {nrKolumnyOcen = tabela.p_oceny;} else {nrKolumnyOcen = tabela.d_oceny;}
		let spanOcena = document.createElement('span');
		spanOcena.className = "grade-box";
		spanOcena.style.backgroundColor = "#4b7db6";
		spanOcena.style.cursor = "pointer";
		spanOcena.addEventListener('click', deleteGrade, false);
		let aOcena = document.createElement('a');
		aOcena.title = 'Licz do średniej: tak<br>Waga: '+waga+'<br>Dodano za pomocą rozszerzenia Librus Oświata w Radomiu';
		aOcena.className = 'ocena';
		aOcena.innerHTML = ocena;
		aOcena.addEventListener('click', deleteGrade, false);
		spanOcena.appendChild(aOcena);
		if (Tabela[5].children[przedmiot].children[nrKolumnyOcen].innerHTML == "Brak ocen") {Tabela[5].children[przedmiot].children[nrKolumnyOcen].innerHTML = ""}
		Tabela[5].children[przedmiot].children[nrKolumnyOcen].appendChild(spanOcena);

	}
	function toggleMenu() {
		if (document.getElementById('libsr_menu').style.display == "none"){
			document.getElementById('libsr_menu').style.display = "inline-block";
			document.getElementById('libsr_menu_button').innerHTML = "Ukryj menu dodawania ocen";
		}
		else{
			document.getElementById('libsr_menu').style.display = "none";
			document.getElementById('libsr_menu_button').innerHTML = "Pokaż menu dodawania ocen";
		}
	}
	function reloadAVG() {
		semestr(tabela.p_oceny,tabela.p_srednia);
		semestr(tabela.d_oceny,tabela.d_srednia);
		rok();
	}
	function deleteGrade(evt) {if (evt.target.parentNode.className == "grade-box"){evt.target.parentNode.remove();}else {evt.target.remove();}}

}
