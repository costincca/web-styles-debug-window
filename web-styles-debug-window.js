/******************************************/
/* Constantin Coșoiu - Bucharest, Romania */
/******************************************/
/* 2024-01-01 * ver. 1.3 * CC 0 Universal */
/******************************************/

var stylesToShow = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A'];
var columnsForStylesToShow = 2;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const debug = urlParams.get('dbg');
const debugColumns = urlParams.get('dbgcol');
const columnsDesired = parseInt(debugColumns);
if(columnsDesired > 0) { columnsForStylesToShow = columnsDesired; }
const templatedColumns = Array(columnsForStylesToShow + 1).join("1fr ").trim();

if(debug === "1") { //Full draggable debug panel
	createFullDebugPanel();

	// Make the DIV element draggable
	dragElement(document.getElementById("dbgWnd"));
} else if(debug === "2") { // Simple semitransparent non-draggable debug panel floating on top
	createFixedDebugPanel();
} else if(debug === "3") { // Simple scrolling debug panel on top of the page
	createStickyDebugPanel();
} else if(debug === "4") { // Simple scrolling debug panel on top of the page
	createSmallDebugPanel();
}

function createFullDebugPanel()
{
	var txt = `
		<style>
			#dbgWnd {
			  position: absolute;
			  z-index: 10000;
			  background-color: #f1f1f1;
			  border: 1px solid #333333;
			  text-align: center;
			}

			#dbgWndHeader {
				cursor: move;
			}

			#dbgWndHeader, #dbgWndFooter {
			  padding: 10px;
			  z-index: 10;
			  background-color: #2196F3;
			  color: #fff;
			}
			
			#dbgWndVariableDetails {
				display: grid;
				grid-template-columns: ${templatedColumns};
				grid-gap: 3px;
			}
			
			.dbgWndVariableDetailsStyle {
				margin-left: 5px;
				margin-right: 5px;
				border: 1px solid grey;
				align-self: center;
				background-color: white;
				border-radius: 3px;
			}
			
			.dbgWndButton {
				background-color: transparent;
				color: white;
				border: 1px solid white;
				border-radius: 3px;
				padding: 3px 5px;
			}

			.dbgWndButton:hover {
				background-color: white;
				color: #007bff;
				border-radius: 3px;
				cursor: pointer;
			}
			
			.dbgWndRecalc {
				background-color: green;
			}
			
			.dbgWndAddStyles {
				background-color: purple;
			}
			
			.dbgWndUniformStyle {
				font-size: 20px;
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
		</style>
		<!-- Draggable DIV -->
		<div id="dbgWnd">
			<!-- Include a header DIV with the same name as the draggable DIV, followed by "Header" -->
			<div id="dbgWndHeader">Drag to move</div>
			<div id="dbgWndFixedDetails">
				DPR: <span id="dbgWndDetailsDPR">-</span>
				<br>
				Width: <span id="dbgWndDetailsInnerWidth">- </span>px
				<br>
				Height: <span id="dbgWndDetailsInnerHeight">- </span>px
			</div>`;
		txt += `
			<div id="dbgWndVariableDetails">`;
				stylesToShow.forEach((elem) => {
						txt += `<${elem} class="dbgWndVariableDetailsStyle">${elem}: <span id="dbgWndStyle${elem}">-</span></${elem}>`;
					}
				);
		txt += `
			</div>`;
		txt += `
			<div id="dbgWndFooter">
				<button class="dbgWndButton dbgWndRecalc" onclick="deactivateUniformStyle();populateFixedDetails();populateVariableDetails();">Recalculate</button>
				<button class="dbgWndButton dbgWndToggleStyles" onclick="toggleUniformStyle();">Toggle Element Style</button>
				<button class="dbgWndButton dbgWndAddStyles" onclick="showInlineStyles();disableButton(this);">+ Add Styles to Elements</button>
			</div>`;
		txt += `
		</div>`;
	document.body.insertAdjacentHTML('afterbegin', txt);
}

function createFixedDebugPanel()
{
	var txt = `
		<style>
			#dbgWnd {
			  position: fixed;
			  top: 0;
			  left: 0;
			  width: 100%;
			  height: auto;
			  z-index: 10000;
			  background-color: rgba(128, 128, 128, 0.3);
			  border: 1px solid #333333;
			  text-align: center;
			  text-shadow: 1px 1px white, 0px 0px 5px white, 0px 0px 10px white;
			}

			#dbgWndHeader {
				cursor: move;
			}

			#dbgWndHeader, #dbgWndFooter {
			  padding: 10px;
			  z-index: 10;
			  background-color: rgba(128, 128, 128, 0.3);
			  color: #fff;
			}
			
			#dbgWndFixedDetails {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-gap: 3px;
				font-weight: bold;
			}
			
			#dbgWndVariableDetails {
				display: grid;
				grid-template-columns: ${templatedColumns};
				grid-gap: 3px;
			}
			
			.dbgWndVariableDetailsStyle {
				margin-left: 5px;
				margin-right: 5px;
				border: 1px solid grey;
				align-self: center;
				background-color: transparent;
				border-radius: 3px;
			}
			
			.dbgWndButton {
				background-color: transparent;
				color: white;
				border: 1px solid white;
				border-radius: 3px;
				padding: 3px 5px;
			}

			.dbgWndButton:hover {
				background-color: white;
				color: #007bff;
				border-radius: 3px;
				cursor: pointer;
			}
			
			.dbgWndRecalc {
				background-color: rgba(0, 255, 0, 0.2);
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
			
			.dbgWndToggleStyles {
				background-color: rgba(0, 0, 255, 0.2);
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
			
			.dbgWndAddStyles {
				background-color: rgba(128,0,128, 0.2);
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
			
			.dbgWndUniformStyle {
				font-size: 20px;
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
		</style>
		<!-- Fixed DIV -->
		<div id="dbgWnd">
			<div id="dbgWndFixedDetails">
				<div>DPR: <span id="dbgWndDetailsDPR">-</span></div>
				<div>Width: <span id="dbgWndDetailsInnerWidth">- </span>px</div>
				<div>Height: <span id="dbgWndDetailsInnerHeight">- </span>px</div>
			</div>`;
		txt += `
			<div id="dbgWndVariableDetails">`;
				stylesToShow.forEach((elem) => {
						txt += `<${elem} class="dbgWndVariableDetailsStyle">${elem}: <span id="dbgWndStyle${elem}">-</span></${elem}>`;
					}
				);
		txt += `
			</div>`;
		txt += `
			<div id="dbgWndFooter">
				<button class="dbgWndButton dbgWndRecalc" onclick="deactivateUniformStyle();populateFixedDetails();populateVariableDetails();">Recalculate</button>
				<button class="dbgWndButton dbgWndToggleStyles" onclick="toggleUniformStyle();">Toggle Element Style</button>
				<button class="dbgWndButton dbgWndAddStyles" onclick="showInlineStyles();disableButton(this);">+ Add Styles to Elements</button>
			</div>`;
		txt += `
		</div>`;
	document.body.insertAdjacentHTML('afterbegin', txt);
}

function createStickyDebugPanel()
{
	var txt = `
		<style>
			#dbgWnd {
			  position: sticky;
			  top: 0;
			  left: 0;
			  width: 100%;
			  height: auto;
			  z-index: 10000;
			  background-color: #f1f1f1;
			  border: 1px solid #333333;
			  text-align: center;
			  text-shadow: 1px 1px white, 0px 0px 5px white, 0px 0px 10px white;
			}

			#dbgWndHeader {
				cursor: move;
			}

			#dbgWndHeader, #dbgWndFooter {
			  padding: 10px;
			  z-index: 10;
			  background-color: rgba(128, 128, 128, 0.3);
			  color: #fff;
			}
			
			#dbgWndFixedDetails {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-gap: 3px;
				
				background-color: #dddddd;
				font-weight: bold;
			}
			
			#dbgWndVariableDetails {
				display: grid;
				grid-template-columns: ${templatedColumns};
				grid-gap: 3px;

				background-color: #dddddd;
			}
			
			.dbgWndVariableDetailsStyle {
				margin-left: 5px;
				margin-right: 5px;
				border: 1px solid grey;
				align-self: center;
				background-color: white;
				border-radius: 3px;
			}
			
			.dbgWndButton {
				background-color: transparent;
				color: white;
				border: 1px solid white;
				border-radius: 3px;
				padding: 3px 5px;
			}

			.dbgWndButton:hover {
				background-color: white;
				color: #007bff;
				border-radius: 3px;
				cursor: pointer;
			}
			
			.dbgWndRecalc {
				background-color: green;
				color: white;
				font-weight: bold;
			}
			
			.dbgWndToggleStyles {
				background-color: rgba(0, 0, 255, 0.6);
				color: white;
				font-weight: bold;
			}
			
			.dbgWndAddStyles {
				background-color: purple;
				color: white;
				font-weight: bold;
			}
			
			.dbgWndUniformStyle {
				font-size: 20px;
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
		</style>
		<!-- Fixed DIV -->
		<div id="dbgWnd">
			<div id="dbgWndFixedDetails">
				<div>DPR: <span id="dbgWndDetailsDPR">-</span></div>
				<div>Width: <span id="dbgWndDetailsInnerWidth">- </span>px</div>
				<div>Height: <span id="dbgWndDetailsInnerHeight">- </span>px</div>
			</div>`;
		txt += `
			<div id="dbgWndVariableDetails">`;
				stylesToShow.forEach((elem) => {
						txt += `<${elem} class="dbgWndVariableDetailsStyle">${elem}: <span id="dbgWndStyle${elem}">-</span></${elem}>`;
					}
				);
		txt += `
			</div>`;
		txt += `
			<div id="dbgWndFooter">
				<button class="dbgWndButton dbgWndRecalc" onclick="deactivateUniformStyle();populateFixedDetails();populateVariableDetails();">Recalculate</button>
				<button class="dbgWndButton dbgWndToggleStyles" onclick="toggleUniformStyle();">Toggle Element Style</button>
				<button class="dbgWndButton dbgWndAddStyles" onclick="showInlineStyles();disableButton(this);">+ Add Styles to Elements</button>
			</div>`;
		txt += `
		</div>`;
	document.body.insertAdjacentHTML('afterbegin', txt);
}

function createSmallDebugPanel()
{
	var txt = `
		<style>
			#dbgWnd {
			  x-position: sticky;
			  top: 0;
			  left: 0;
			  width: 100%;
			  height: auto;
			  x-z-index: 10000;
			  background-color: #f1f1f1;
			  border: 1px solid #333333;
			  text-align: center;
			  text-shadow: 1px 1px white, 0px 0px 5px white, 0px 0px 10px white;
			}

			#dbgWndHeader {
				cursor: move;
			}

			#dbgWndHeader, #dbgWndFooter {
			  padding: 10px;
			  z-index: 10;
			  background-color: rgba(128, 128, 128, 0.3);
			  color: #fff;
			}
			
			#dbgWndFixedDetails {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-gap: 3px;
				
				background-color: #dddddd;
				font-weight: bold;
			}
			
			#dbgWndVariableDetails {
				display: grid;
				grid-template-columns: ${templatedColumns};
				grid-gap: 3px;

				background-color: #dddddd;
			}
			
			.dbgWndVariableDetailsStyle {
				margin-left: 5px;
				margin-right: 5px;
				border: 1px solid grey;
				align-self: center;
				background-color: white;
				border-radius: 3px;
			}
			
			.dbgWndButton {
				background-color: transparent;
				color: white;
				border: 1px solid white;
				border-radius: 3px;
				padding: 3px 5px;
			}

			.dbgWndButton:hover {
				background-color: white;
				color: #007bff;
				border-radius: 3px;
				cursor: pointer;
			}
			
			.dbgWndRecalc {
				background-color: green;
				color: white;
				font-weight: bold;
			}
			
			.dbgWndToggleStyles {
				background-color: rgba(0, 0, 255, 0.6);
				color: white;
				font-weight: bold;
			}
			
			.dbgWndAddStyles {
				background-color: purple;
				color: white;
				font-weight: bold;
			}
			
			.dbgWndUniformStyle {
				font-size: 20px;
				color: black;
				text-shadow: 1px 1px white;
				font-weight: bold;
			}
		</style>
		<!-- Fixed DIV -->
		<div id="dbgWnd">
			<div id="dbgWndFixedDetails">
				<div>DPR: <span id="dbgWndDetailsDPR">-</span></div>
				<div>Width: <span id="dbgWndDetailsInnerWidth">- </span>px</div>
				<div>Height: <span id="dbgWndDetailsInnerHeight">- </span>px</div>
			</div>`;
		txt += `
			<div id="dbgWndVariableDetails">`;
				stylesToShow.forEach((elem) => {
						txt += `<${elem} class="dbgWndVariableDetailsStyle">${elem}: <span id="dbgWndStyle${elem}">-</span></${elem}>`;
					}
				);
		txt += `
			</div>`;
		txt += `
			<div id="dbgWndFooter">
				<button class="dbgWndButton dbgWndRecalc" onclick="deactivateUniformStyle();populateFixedDetails();populateVariableDetails();">Recalculate</button>
				<button class="dbgWndButton dbgWndToggleStyles" onclick="toggleUniformStyle();">Toggle Element Style</button>
				<button class="dbgWndButton dbgWndAddStyles" onclick="showInlineStyles();disableButton(this);">+ Add Styles to Elements</button>
			</div>`;
		txt += `
		</div>`;
	document.body.insertAdjacentHTML('afterbegin', txt);
}

function disableButton(button) {
	button.disabled = true;
	button.style.backgroundColor = "lightgrey";
	button.innerHTML = "Already added style";
}

function deactivateUniformStyle() {
	var foundItems = document.getElementsByClassName("dbgWndVariableDetailsStyle");
	for (let found of foundItems) {
		found.classList.remove("dbgWndUniformStyle");
	};
}

function toggleUniformStyle() {
	var foundItems = document.getElementsByClassName("dbgWndVariableDetailsStyle");
	for (let found of foundItems) {
		found.classList.toggle("dbgWndUniformStyle");
	};
}

function populateFixedDetails() {
	document.getElementById("dbgWndDetailsDPR").innerHTML = window.devicePixelRatio.toFixed(2);
	document.getElementById("dbgWndDetailsInnerWidth").innerHTML = window.innerWidth.toFixed(2);
	document.getElementById("dbgWndDetailsInnerHeight").innerHTML = window.innerHeight.toFixed(2);
}

function populateVariableDetails() {
	stylesToShow.forEach((elem) => {
			let found =  document.getElementById(`dbgWndStyle${elem}`);
			let elementStyle = getComputedStyle(found);
			found.innerHTML = elementStyle.fontSize.toFixed(2);
		}
	);	
}

function showInlineStyles() {
	stylesToShow.forEach((elem) => 
    	{
        	var foundArray = document.querySelectorAll(`${elem}:not(#dbgWndVariableDetails ${elem})`);

        	for(found of foundArray)
            {
                let elementStyle = getComputedStyle(found);
                found.innerHTML = elem + ' (' + elementStyle.fontSize.toFixed(2) + ')' + ': ' + found.innerHTML;
            }
    	}
	);
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "Header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "Header").onpointerdown = dragPointerDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onpointerdown = dragPointerDown;
	}

	function dragPointerDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onpointerup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onpointermove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onpointerup = null;
		document.onpointermove = null;
	}
}