var stylesToShow = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A'];
var columnsForStylesToShow = 2;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const debug = urlParams.get('dbg');
const debugColumns = urlParams.get('dbgcol');

if(debug > "")
{
	var columnsDesired = parseInt(debugColumns);
	if(columnsDesired > 0)
	{
		columnsForStylesToShow = columnsDesired;
	}
	createDebugPanel();

	// Make the DIV element draggable:
	dragElement(document.getElementById("dbgWnd"));
}

function createDebugPanel()
{
	var templatedColumns = Array(columnsForStylesToShow + 1).join("1fr ").trim();
	
	var txt = `
		<style>
			#dbgWnd {
			  position: absolute;
			  z-index: 9;
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
			</div>
			<div id="dbgWndFooter">
				<button class="dbgWndButton dbgWndRecalc" onclick="populateFixedDetails();populateVariableDetails();">Recalculate</button>
				<button class="dbgWndButton dbgWndAddStyles" onclick="showInlineStyles();">+ Add Styles to Elements</button>
			</div>
		</div>`;
	document.body.insertAdjacentHTML('afterbegin', txt);
}

function populateFixedDetails() {
	document.getElementById("dbgWndDetailsDPR").innerHTML = window.devicePixelRatio;
	document.getElementById("dbgWndDetailsInnerWidth").innerHTML = window.innerWidth;
	document.getElementById("dbgWndDetailsInnerHeight").innerHTML = window.innerHeight;
}

function populateVariableDetails() {
	stylesToShow.forEach((elem) => {
			let found =  document.getElementById(`dbgWndStyle${elem}`);
			let elementStyle = getComputedStyle(found);
			found.innerHTML = elementStyle.fontSize;
			console.log(elementStyle);
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
                found.innerHTML = elem + ' (' + elementStyle.fontSize + ')' + ': ' + found.innerHTML;
            }
    	}
	);
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "Header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
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
		document.onmouseup = null;
		document.onmousemove = null;
	}
}