let rootDiv;
let rows = [];
let createdRows = [];

function Listen() {
	rootDiv = document.getElementById("rows");
	addRow();
}

function addRow() {
	let x = rows.length;

	let row = document.createElement("div");
	row.setAttribute("class", "row");
	row.setAttribute("id", "r-" + x);
	rows[x] = row;

	let grade = document.createElement("input");
	grade.setAttribute("type", "number");
	grade.setAttribute("id", "g-" + x);
	grade.setAttribute("data-amount", x);

	let weight = document.createElement("input");
	weight.setAttribute("type", "number");
	weight.setAttribute("id", "w-" + x);
	weight.setAttribute("data-amount", x);

	row.appendChild(grade);
	row.appendChild(weight);
	rootDiv.appendChild(row);

	document.getElementById("g-" + x).addEventListener("change", checkChange);
	document.getElementById("w-" + x).addEventListener("change", checkChange);
}

function checkChange() {

	if (this.value < 0 || this.value > 100) {
		alert('only 0-100 numbers');
		this.value = '';
		return;
	}

	let grade = document.getElementById("g-" + this.dataset.amount).value;
	if (this.id === "w-" + this.dataset.amount) {

		if (grade < 0 || this.value > 100 || grade === "") {
			return;
		}
	}

	let weight = document.getElementById("w-" + this.dataset.amount).value;
	if (this.id === "g-" + this.dataset.amount) {
		if (weight < 0 || this.value > 100 || weight === "") {
			return;
		}
	}

	console.log(createdRows[this.dataset.amount]);
	console.log(createdRows[this.dataset.amount] === undefined);
	if (createdRows[this.dataset.amount] === undefined){
		addRow();
	}

	createdRows[this.dataset.amount] = [];
	createdRows[this.dataset.amount]["grade"] = grade;
	createdRows[this.dataset.amount]["weight"] = weight;

	calculate();
}

function calculate() {
	let horni = 0;
	let dolni = 0;

	createdRows.forEach((value, index) => {
		let g = parseInt(value["grade"]);
		let w = parseInt(value["weight"]);

		horni += g * w;
		dolni += w;
	});

	let result = horni/dolni;
	document.getElementById("mean").innerText = Math.round(result*100)/100 + '%';


	if(result >= 35){
		result = "no";
		document.getElementById("result").setAttribute("class","green")
	} else {
		result = "YES!!!";
		document.getElementById("result").setAttribute("class","red")
	}
	document.getElementById("result").innerText = result;

}
