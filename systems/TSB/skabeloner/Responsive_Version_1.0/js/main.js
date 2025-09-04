var appTexts = {
	bottomButton: 'Vis forskudsopgørelsen fra ',
	fieldInfo: 'Tallet medregnes, når du trykker "beregn"',
	pdfWarning: 'Du skal være opmærksom på, at din browser kan gemme en kopi af det pdf-dokument, du åbner.\n\n Hvis andre har adgang til denne computer, anbefaler vi derfor, at du sletter browserens midlertidige filer, når du er færdig med at bruge TastSelv. Du kan få hjælp til dette, efter du er logget af TastSelv.',
	searchNoResult: '<span>Ikke fundet</span>',
	searchResultLink: 'Gå til felt '
}
var appVars = {
	cookieDomain: '', //TODO - skal rettes til ".skat.dk"
	expandedHiddenFieldPrefix: 'expandedStatusFor_', //TODO - Set the correct name for the fields that save the expanded section status (as expected on the server)
	formSelector: '#mainForm' //TODO - set the PROD form name and perhaps move this function to the page
}
var cookieName = 'cookie4u',
	cookieNo = 'ok4u=no',
	cookieYes = 'ok4u=yes',
	cookieDomain = appVars.cookieDomain,
	cookiePath = '/', 
	cookieList = { cookiesToDelete: [{ name: 'cookie4u', path: '/', domain: appVars.cookieDomain }, { name: 'WT_FPC', path: '/', domain: '.' }] };
var cookieWarning = {
	init: function() {
		var currentCookieSetting = readCookie(cookieName);
		if ($('html').is('.ie8')) {
			var head = document.getElementsByTagName('head')[0],
				style = document.createElement('style');
			style.type = 'text/css';
			style.styleSheet.cssText = ':before,:after{content:none !important';
			head.appendChild(style);
			setTimeout(function () {
				head.removeChild(style);
			}, 0);
		}		
		if (currentCookieSetting !== cookieYes && currentCookieSetting !== cookieNo) {
			$('.skts-cookieouter').show();
			writeCookie(cookieName, cookieYes, 365, cookieDomain, cookiePath);
		}
	}
}
var helper = {
	addCheckForChangesByClassName: function (klassenavn) {
		if (document.getElementsByClassName) {
			var elements = document.getElementsByClassName(klassenavn);
			for (i = 0; i < elements.length; i++) {
				helper.addOnClick(elements[i]);
			}
		}
	},
	addOnClick: function(elem) {
		elem.onclick = (function () {
			var origOnClick = elem.onclick; // Gemmer den oprindelige funktions pointer i en variabel så denne kan blive kaldt.
			return function () { // Returner den nye onclick funktion som udfører checkForlade side, efterfulgt af den gamle onclick
				if (!validation.approvePdf()) { // Hvis vi skal forlade siden, returnerer vi false, for så bliver der ikke udført mere.
					return false;
				}
				if (origOnClick != null) { // Hvis der var en gammel onclick, bliver den udført
					return origOnClick();
				}
			}
		})();
	}
}
var page = {
	clickEvent: "click",
	init: function() {
		//Bind all the page load actions
		this.bindUIActions();
		//Set the state of the expanded sections (if present) and show fields that contain values or errors
		if ($(".skts-expanded").length > 0) page.setExpanded();
		//Show list items that do not meet the validation.isCleanField requirements 
		validation.showListItems();
		//Add the info message under all input/select fields in block 4 and 5
		page.addInfoMsg();
		//Make the truncate fields accessible
		$(".skts-truncate").each(function() {
			$(this).attr("tabindex", -1);
		});
		//Set the formatting
		$(".skts-input-currency, .skts-input-number").autoNumeric('init', {
			aSep: '.', 
			aDec: ',',
			aForm: false, //Don't format on page load
			vMax: '999999999',
			vMin: '-999999999'
		});
		$(".skts-input-currency-positive").autoNumeric('init', {
			aSep: '.', 
			aDec: ',',
			aForm: false,
			vMax: '999999999',
			vMin: '0'
		});
		$(".skts-input-procent").autoNumeric('init', {
			aSep: '.', 
			aDec: ',',
			aForm: false,
			vMax: '100.00',
			vMin: '0'
		});
		$(".skts-input-search-text").autoNumeric('init', {
			aForm: false,
			aSep: '',
			vMax: '9999',
			lZero: 'keep',
			vMin: '0'
		});	
	},
	//Adds the text displayed below each currency field in block 4 and 5
	addInfoMsg: function() {
		$("#skts-block-4 li[class^='skts-placeholder-kr'], #skts-block-5 li[class^='skts-placeholder-kr']").each(function() {
			var $this = $(this),			
				labelID = $("label", $this.closest(".skts-section-wrapper"	)).attr("id"); //Use the label ID for the aria-described-by attribute
			$this.after('<li class="skts-info-value" aria-describedby="' + labelID + '">'+appTexts.fieldInfo+'</li>');
		});
	},
	bindUIActions: function() {
		//Set the select submit button for the forskudsopgørelse list
		$(".skts-select-follow-link").on("change keyup", function() {
			var versionDate = $("option:selected", this).html().substring(0,8);
			($(this)[0].selectedIndex === 0) ? $("#forskudVersionBt").slideUp("fast") : $("#forskudVersionBt").slideDown("fast");
			$("#forskudVersionBt").text(appTexts.bottomButton + versionDate);
		});
		//Remove the truncate in Block 3 when a link is in focus
		$(".skts-truncate a").on("focus", function() {
			$(this).parent().removeClass("skts-truncate");
		});
		$(".skts-truncate").on(page.clickEvent, function() {
			$(this).removeClass("skts-truncate");
		});
		//Remove the truncate in Block 3 when a field is in focus
		$("#skts-block-3 input, #skts-block-3 select").on("focus", function() {
			$(".skts-truncate", $(this).closest(".skts-section-wrapper")).removeClass("skts-truncate");
		});
		//Set the page print functionality
		$(".skts-print-icon").on(page.clickEvent, function() {
			window.print();
		});
		//Set the pdf warning
		helper.addCheckForChangesByClassName("skts-pdf-warning");
		//Set the form submit validation		
		$(appVars.formSelector).on("submit", function() {	
			//TODO: REMOVE
			/********* REMOVE THIS  - START ************/				
			//Stop form submit for demo purposes
			return false;
			/********* REMOVE THIS  - END *************/
			//Client validation
			//TODO: Uncomment the line below once the code above is removed
			//return validation.checkAllFields();
		});
	},	
	//Insert the sub (left) menu
	cloneMenu: function(from, to) {
		$(from).clone().appendTo(to);
	},
	//Toggle the list items. 
	setExpanded: function () {
		$(".skts-expanded").each(function() {
			toggle.listItems($(this));
		});
	}
}
//TODO: show checkbox and radio
var search =  {
	init: function() {
		this.bindUIActions();
	},
	bindUIActions: function() {	
		//Set the section search input
		$("#skts-searchField").on("keyup", function(e) {
			e.preventDefault();
			var code = e.keyCode ? e.keyCode : e.which;
			//search on enter key
			if (code === 13) {
				search.findSection();
			}
		});
		//Set the section search button
		$(".skts-search-bt").on(page.clickEvent, function(e) {
			e.preventDefault();			
			search.findSection();			
		});
	},
	findSection: function() {
		var resultPlaceholder = $(".skts-search-result"),
			resultStr = appTexts.searchNoResult,				
			searchText = $(".skts-input-search-text").val(),
			previousList = $(".skts-show-search-result").closest(".skts-show-hide-list"),
			previousLabelWrapper = $(".skts-show-search-result").closest(".skts-section-wrapper");
		
		//If the previous result list item is not in an expanded section		
		if (previousList.length > 0 && !previousList.prev().hasClass("skts-expanded")) {
			//Remove the previous result class so the field can be checked
			$("li").removeClass("skts-show-search-result");
			//If the field is clean, hide the list item
			if (validation.isCleanField($("input, select", previousLabelWrapper))) {
				previousLabelWrapper.slideUp("fast");
			}			
		}
		else {
			//Remove the previous result class
			$("li").removeClass("skts-show-search-result");
		}		
		//Perform the search by looping through all the sections
		$(".skts-section-nr").each(function() {
			var $this = $(this),				
				sectionNr = $this.text().match(/\d+/g), //Only numbers
				sectionNrStripped = 0;
			//In case of null value
			if ($.isArray(sectionNr)) {
				sectionNrStripped = sectionNr[0];
			}
			if (searchText === sectionNrStripped) {
				//Find the input field's ID from the parent label "for" attribute
				var $label = $this.parent(),
					inputID = $label.attr("for");
				//If radio buttons
				if ($label.hasClass("skts-label-text")) {
					//Find the input in the ul list beside the label
					inputID = $("input", $label.next()).attr("id");
				}
				//Show the field by adding the class "skts-show-search-result" (executed by validation.showListItems())
				$("#"+inputID).closest("li").addClass("skts-show-search-result");	
				//Set the link that places focus on the input field
				resultStr = '<a href="javascript:void(0);" class="skts-link-enhance" onclick="fokusRubrik(document.getElementById(\''+ inputID +'\'))">'+appTexts.searchResultLink + sectionNr +'</a>';
				return false;
			}			
		});
		//Write the "jump to" link
		resultPlaceholder.html(resultStr);
		//Shows the list items
		validation.showListItems();
	}
}
var toggle = {
	init: function() {
		this.bindUIActions();
	},
	bindUIActions: function() {		
			//Toggle the menu
		$(".skts-toggle-menu").on(page.clickEvent, function() {
			toggle.menu();
			$(this).toggleClass("selected");
		});
		//Toggle the calculation sub sections, any read only fields in block 3 and sub sections in both blocks 4 and 5
		$(".skts-list-header a").on(page.clickEvent, function(e) {
			var $this = $(this);
			//Don't toggle the standard links in the header
			if (!$this.hasClass("skts-standard-link")) {
				e.preventDefault();
				var $header = $this.closest(".skts-list-header");
				toggle.expanded($header);
				toggle.listItems($header);
			}
		});
	},
	//Toggles the skts-list-header (arrrow right or down) and saves the state to a hidden field
	expanded: function($listHeader) {
		$listHeader.toggleClass("skts-expanded");
		var listIsExpanded = $listHeader.hasClass("skts-expanded"),
			//Id of the list header (add/remove the class "skts-expanded" on the server to this element)
			listID = $listHeader.attr("id");
			//The hidden field created below
			$hiddenField = $("#"+appVars.expandedHiddenFieldPrefix + listID +"");
		//If the hidden field exists, change the value to the current expanded status
		if ($hiddenField.length > 0) {
			$hiddenField.val(listIsExpanded)
		}
		//Otherwise create the hidden field
		else {
			$( "<input/>", {
				"type": "hidden",
				"id": appVars.expandedHiddenFieldPrefix + listID,
				"name": listID,
				"value": true
			})
			.appendTo(appVars.formSelector);
		}
	},
	//Toggles the list items
	//Force shows any list items that contain a non clean field (as defined in validation.isCleanField)
	//Force show is NOT run on read only list items
	listItems: function($this) {
		var listIsExpanded = $this.hasClass("skts-expanded"),			
			$ulElem = $this.next(), //The adjacent ul list			
			$listItems = $(" > li", $ulElem), //The immediate li children (first level)			
			listIsReadOnly = $ulElem.hasClass("skts-read-only"); //Check if the list is read only			
		if (listIsExpanded) {
			
			$listItems.each(function() {
				//Expand the list item
				$(this).show();			
			});
		}
		else {
			$listItems.each(function() {			
				if (listIsReadOnly) {
					//Close the list item
					$(this).hide();
				}
				//Only check for clean fields if the list is NOT read only
				else {
					var $inputField = $("input, select", this);
					if (validation.isCleanField($inputField)) {
						$(this).hide();						
					}
				}
			});
		}
	},
	//Toggle the menu(s) on devices below 760px
	menu: function() {
		$(".skts-main-nav, .skts-global-nav").slideToggle("fast");
	}
}
var validation = {
	init: function() {
		this.bindUIActions();
	},
	bindUIActions: function() {	
		//Show the saved/suggested values when input is changed
		$(".skts-section-wrapper input[type='text'], .skts-section-wrapper input[type='tel'], .skts-section-wrapper input[type='password'] ").on("keyup blur", function(e) {
			validation.processField($(this), e);
		});	
		//Show the saved/suggested values when select is changed
		$(".skts-section-wrapper select, .skts-section-wrapper input[type='radio'], .skts-section-wrapper input[type='checkbox']").on("change", function(e) {
			validation.processField($(this), e);
		});
	},
	//Confirm box for when a pdf link is activated
	approvePdf: function () {
		if (window.confirm(appTexts.pdfWarning)) { 
			return true;
		}
	},
	//Check if any max/min/req fields contain errors
	//Force show the error list items
	//Set focus on the first occurring error field
	//Return true or false (allows the form to be submitted or not)
	checkAllFields: function () {
		var result = true,
			$focusField = null;
		//Loop through all the fields that demand client side validation
		$("input[data-validation-type], select[data-validation-type]").each(function() {
			var $this = $(this);			
			//TODO - SERVER: The aria-invalid must be set on the field if the field is required and empty/not selected/not checked
			//If the error is client side OR the field is invalid and NOT a server error
			if ($this.closest("li").hasClass("skts-field-error") || ($this.attr("aria-invalid") === "true" && !$this.closest("li").hasClass("skts-field-server-error"))) {
				//stops the form submit
				result = false;
				//Show the error
				validation.showError($this);
				//Sets the focus item one time
				if ($focusField === null) $focusField = $this;
			}
		});
		//Show any fields that may be hidden
		validation.showListItems();
		//Set the focus if a field with an error has been found
		if ($focusField !== null) $focusField.focus();
		//Stop/allow the form to submit
		return result;
	},
	//Immediate validation of min, max or required
	checkField: function($this) {
		//The number to validate against
		var dataNumberValue = parseInt($this.attr("data-validation-value")), 	
			fieldNumberValue = parseInt($this.val().replace(/\./g,'')), //The field as a Number value	
			fieldValue = "false", //Set the non number field value to false so it is only validated when isRequired
			fieldType = $this.prop("type"), //Set the field type	
			isRequired = $this.attr("aria-required"); //If the field is required	
		//If the field value is required, set the field value without converting to a number
		if (isRequired) fieldValue = $this.val();
		switch($this.attr("data-validation-type")) {
			case "max":
				//Convert both values to positive and check max
				dataNumberValue = Math.abs(dataNumberValue);
				fieldNumberValue = Math.abs(fieldNumberValue);
				//The fieldValue test allows for double testing (max and required)
				(fieldNumberValue > dataNumberValue || fieldValue === "") ? this.showError($this) : this.hideError($this);
				break;
			case "pnr":
				(!validation.checkPnr($this) || fieldValue === "") ? this.showError($this) : this.hideError($this);
				break;
			case "tsCode":
				(!validation.checkTScode($this) || fieldValue === "") ? this.showError($this) : this.hideError($this);
				break;
			case "min":
				//The fieldValue test allows for double testing (min and required)
				(fieldNumberValue < dataNumberValue || fieldValue === "") ? this.showError($this) : this.hideError($this);
				break;
			case "req":
				//If not a checkbox and has an empty value OR if a checkbox and is not checked
				//Radio buttons only return	a value if selected and are therefore a part of the normal fieldValue !== "" test
				//Select boxes must have an empty value as the first option for this to work
				//Checkboxes are checked separately as they always return a value of true with val()
				((fieldType !== "checkbox" && fieldValue === "") || (fieldType === "checkbox" && !$this.is(":checked"))) ? this.showError($this) : this.hideError($this);
				break;
		}
	},
	checkPnr: function($input) {
		var pnr = formater_input_vaerdi($input.val());
		var fejlkod = fejl_pnr(pnr);
		if (fejlkod != "") {
			return false;
		}
		else {
			return true;
		}
	},
	checkTScode: function($input) {
		var tastselvkod = formater_input_vaerdi($input.val());
		var fejlkod = fejl_tastselvkod(tastselvkod);
		if (fejlkod != "") {
			return false;
		}
		else {
			return true;
		}
	},
	//Hide the max/min/req error
	hideError: function($formField) {		
		//If input is radio
		if ($formField.prop("type") === "radio") {
			//Set the formField to all the radio buttons so the error is removed throughout
			$formField = $("input[name ='"+$formField.prop("name")+"']");
		}
		$formField.attr("aria-invalid", false);
		$formField.closest("li").removeClass("skts-field-error");
		$(".skts-error-text", $formField.closest("ul")).removeClass("skts-show");		
	},
	isCleanField: function ($formField) {
		var $closestLi = $formField.closest("li"),		
			$fieldType = $formField.prop("type");
		//The field is NOT clean if:
		//The field's <li> container has a client error OR
		//The field's <li> container has a server error OR
		//The field's <li> container is a search result OR
		//The field's <li> container has the override-show class OR
		//The input type is text or tel, and has a value, and the field's <li> container doesn't have the skts-override-hidden class OR
		//The select box has a selected option (that is not the first option) and the field's <li> container doesn't have the skts-override-hidden class OR
		//A radio or checkbox is checked and the field's <li> container doesn't have the skts-override-hidden class OR
		//The field is showing the "saved" value beneath
		if (
			$closestLi.hasClass("skts-field-error") || 
			$closestLi.hasClass("skts-field-server-error") ||
			$closestLi.hasClass("skts-show-search-result") || 
			$closestLi.hasClass("skts-override-show") ||
			(($fieldType === "text") && ($formField.val() !== ""  && !$closestLi.hasClass("skts-override-hidden"))) || 
			($fieldType === "select-one" && ($formField[0].selectedIndex > 0 && !$closestLi.hasClass("skts-override-hidden"))) ||
			((($fieldType === "checkbox" || $fieldType === "radio")) && ($formField.is(":checked") && !$closestLi.hasClass("skts-override-hidden"))) ||
			$(".skts-saved-value", $formField.closest(".skts-section-wrapper")).hasClass("skts-show")
		) {
			return false;
		}
		else {
			return true;
		}
	},
	//Show the saved/suggested/info value based on the changes made to a form field and validate where applicable
	processField: function($formField, e) {
		var currentValue = $formField.val(),
			savedValueElem = $(".skts-saved-value", $formField.closest("ul")),
			suggestedValueElem = $(".skts-suggested-value", $formField.closest("ul")),
			infoElem = $(".skts-info-value", $formField.closest("ul")),
			savedValueText =  $(".skts-saved-value-text", savedValueElem).text(),			
			suggestedValueText = $(".skts-suggested-value-text", suggestedValueElem).text();
		//If there is no suggested value and the field value is not the same as the saved (fortrykt) value
		if (suggestedValueText === ""  && currentValue !== savedValueText ) {
			//Show the relevant texts
			if (!savedValueElem.hasClass("skts-show")) savedValueElem.addClass("skts-show");
			if (!infoElem.hasClass("skts-show")) infoElem.addClass("skts-show");
		}
		// or if there is a suggested value and the field value is not the same as the suggested (forslået) value
		else if ( suggestedValueText !== "" && currentValue !== suggestedValueText ) {
			//Show the relevant texts
			if (!suggestedValueElem.hasClass("skts-show")) suggestedValueElem.addClass("skts-show");
			if (!infoElem.hasClass("skts-show")) infoElem.addClass("skts-show");
		}
		//If the field should be validated		
		if($formField.attr("data-validation-type")){
			//If the field is NOT only to be validated on blur and the event is NOT blur and the tab key is NOT pressed
			if($formField.attr("data-validation-event") !== "blur" && e.type !== "blur" &&  e.keyCode !== 9 ) {
				validation.checkField($formField);
			}
			//If a blur event (used to validate the login cpr and password fields)
			else if (e.type === "blur") {
				validation.checkField($formField);
			}
		}
	},
	//Show the max/min/req error
	showError: function($formField) {
		$formField.attr("aria-invalid", true);
		$formField.closest("li").addClass("skts-field-error");
		$(".skts-error-text", $formField.closest("ul")).addClass("skts-show");
	},
	//Show the list items that do not pass the validation rules defined in validation.isCleanField
	showListItems: function() {
		$(".skts-show-hide-list .skts-section-wrapper").each(function(){
			var $this = $(this)
			if (!validation.isCleanField($("input, select", $this))) {
				$this.slideDown("fast");
			}
		});
	}
}
$(document).ready(function() {
	//TODO: REMOVE
	/********* REMOVE THIS  - START ************/
	//Hide the warning boxes for demo purposes
	$(".skts-warning-box").hide();
	//Hide the action boxes for demo purposes
	$(".skts-action-box").hide();		
	//Hide the error boxes for demo purposes
	$(".skts-error-box").hide();
	
	//Hide the b tax value and button for demo purposes
	$("#FLOW-b-skat-value").hide();
	$("#FLOW-b-skat").hide();
	
	//Hide the Ekisterende ejendomme for demo purposes
	$("#FLOW-exisitingProperties").hide();
	
	//Hide extra sections in block 4 
	$("#list001a").parent().hide();
	$("#list001b").parent().hide();
	
	//Hide receipt text for login
	$("#FLOW-login-receipt-email").hide();
	$("#FLOW-login-receipt-sms").hide();
	$("#FLOW-login-receipt-brev").hide();
	//Set the help links so they are not all the same text
	
	//TODO: SERVER - set the differentiated links in the HTML directly
	setHelpLinks();
	//Setup the workflows on the relevant pages
	setQueries();
	//Toggle the b-skat reply
	$("#BtnBestilGiroKort").on(page.clickEvent, function(e) {
		e.preventDefault();
		$("#FLOW-b-skat-svar").show();
		$("#FLOW-b-skat").hide();
		$(".skts-action-box").hide();
	});
	//Set the workflow for Uskiftet bo
	$("#FLOW-sendUskiftetBo").on(page.clickEvent, function() {
		if ($('input[name=rdoValg]:checked').val() === undefined) {
			$(".skts-error-box").show();
		}
		else {
			window.location.href = "forskud_ret.html?undivided=" +  $('input[name=rdoValg]:checked').val();
		}
	});
	/********* REMOVE THIS  - END ************/
	page.init();
	toggle.init();
	validation.init();
	search.init();
	cookieWarning.init();
	
});
//TODO: REMOVE
/********* REMOVE THIS  - START ************/
function getSelectedRadio() {	
	return $("input[type='radio']:checked").val();
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function setHelpLinks() {
	$(".skts-help").each(function(){
		var $this = $(this),
			sectionNr = $(".skts-section-nr", $this.prev()).text().replace(/\(|\)/g, ''),
			tooltip = $(".skts-tooltip", $this);
		tooltip.append(" til felt " + sectionNr);
	})
}
function setQueries() {
	if (getUrlVars().sendType === "email") {
		$("#FLOW-login-receipt-email").show();
	}
	if (getUrlVars().sendType === "sms") {
		$("#FLOW-login-receipt-sms").show();
	}
	if (getUrlVars().sendType === "brev") {
		$("#FLOW-login-receipt-brev").show();
	}
	if (getUrlVars().btax === "1") {
		$("#FLOW-b-skat").show();
		$("#FLOW-b-skat-value").show();
	}
	if (getUrlVars().property === "1") {
		$("#FLOW-exisitingProperties").show();
		$("#list011").toggleClass("skts-expanded");
		toggle.listItems($("#list011"));
		$("#FLOW-propUpdated").show();
		
		if (getUrlVars().propType !== "") {
			switch (getUrlVars().propType)  {
				case "sell": 
					$("#FLOW-propType").text("Sælg");
					$("#FLOW-propLocation").on("click", function(e) {
						window.location.href='ejendom_salg.html';						
					})
					break;
				case "update":
					$("#FLOW-propType").text("Ret");
					$("#FLOW-propLocation").on("click", function(e) {
						window.location.href='ejendom_dansk_ret.html';						
					})
					break;
				case "update_f":
					$("#FLOW-propType").text("Ret");
					$("#FLOW-propLocation").on("click", function(e) {
						window.location.href='ejendom_udenlandsk_ret.html';						
					})
					break;
				case "buy": 
					$("#FLOW-propType").text("Køb");
					$("#FLOW-propLocation").on("click", function(e) {
						window.location.href='ejendom_dansk.html';						
					})
					break;
				case "buy_f": 
					$("#FLOW-propType").text("Køb");
					$("#FLOW-propLocation").on("click", function(e) {
						window.location.href='ejendom_udenlandsk.html';						
					})
					break;
			}			
		}		
	}
	if (getUrlVars().auto === "1") {
		$("#FLOW-updated-card").show();
		$("#FLOW-propUpdated").hide();
		$("#sec_10").parent().toggleClass("skts-input-selected");
		$("#sec_10").parent().parent().next().toggleClass("skts-show");
	}
	if (getUrlVars().spouse === "1") {
		var sygListen = $("#list001b").parent();
		sygListen.show();
		$("#skts-block-3  ul.skts-bordered-list >li").hide();		
		$("#skts-block-3  ul.skts-bordered-list").append('<li id="FLOW-med-indtaegt" class="skts-section-wrapper skts-read-only"><span class="skts-label-text skts-truncate">Indtægt for medarbejdende ægtefælle </span><span class="skts-value-text">200.000 kr.</span></li>');			
		$("#sec_363Label").parent().parent().clone().appendTo($("ul", sygListen))
	}
	if (getUrlVars().nothing === "1") {
		var nytListen = $("#list001a").parent();
		nytListen.show();
		$("#skts-block-2").hide();						
		var felt10 = $("#sec_10Label").parent().parent().clone().appendTo($("ul.skts-show-hide-list", nytListen)),
			felt50 = $("#sec_50Label").parent().parent().clone().appendTo($("ul.skts-show-hide-list", nytListen)),
			felt52 = $("#sec_52Label").parent().parent().clone().appendTo($("ul.skts-show-hide-list", nytListen));
		$("#skts-block-3  ul.skts-bordered-list >li").hide();					
		$("input", felt10).val("");
		$("input", felt50).val("");
		$("input", felt52).val("");					
		$(".skts-label-text", felt10).removeClass("skts-truncate");
		$(".skts-label-text", felt50).removeClass("skts-truncate");
		$(".skts-label-text", felt52).removeClass("skts-truncate");					
		felt10.removeClass("skts-odd");
		felt50.removeClass("skts-odd");
		felt52.removeClass("skts-odd");
		$(".skts-calculator-icon", felt10).appendTo($(".skts-placeholder-kr-year", felt10));
		$("#skts-block-3  ul.skts-bordered-list").append('<li id="FLOW-no-result" class="skts-section-wrapper">Intet registreret</li>');
		
	}
	if (getUrlVars().sick === "1") {
		var sygListen = $("#list001b").parent();
		sygListen.show();
		var felt221 = $("#sec_221Label").parent().parent().clone().appendTo($("#skts-block-3  ul.skts-bordered-list"));
		var felt435 = $("#sec_435Label").parent().parent().clone().appendTo($("#skts-block-3  ul.skts-bordered-list"));
		felt221.addClass("skts-odd");
		$(".skts-label-text", felt221).addClass("skts-truncate");
		$(".skts-placeholder-kr-year input", felt221).val("50.000");
		$(".skts-placeholder-kr-year", felt221).after('<li class="skts-saved-value" aria-describedby="sec_221Label"><span class="skts-saved-desc-text">Rettet fra: </span><span class="skts-saved-value-text">50.000</span> kr.</li>');
		$(".skts-info-value", felt221).addClass("hide-overrule");		
		
		$(".skts-label-text", felt435).addClass("skts-truncate");
		$(".skts-placeholder-kr-year input", felt435).val("10.000");
		$(".skts-placeholder-kr-year", felt435).after('<li class="skts-saved-value" aria-describedby="sec_435Label"><span class="skts-saved-desc-text">Rettet fra: </span><span class="skts-saved-value-text">10.000</span> kr.</li>');
		$(".skts-info-value", felt435).addClass("hide-overrule");
		
		$("#sec_363Label").parent().parent().clone().appendTo($("ul", sygListen))	
	}
	
	if (getUrlVars().undivided === "1") {
		$("#FLOW-uskiftet-bo").show();
		$("#FLOW-vis-ikke-uskiftet-bo").show();
	}
	if (getUrlVars().error === "1") {
		$(".skts-error-box").show();	
		setForskudFejl();
		validation.showListItems();
	}
	
	if (getUrlVars().undivided === "B") {
		$("#FLOW_normalBts").hide();
		$("#FLOW_uskiftetBts_1").show();
	}
	if (getUrlVars().undivided === "3") {
		//Knapper
		$("#FLOW_normalBts").hide();
		$(".skts-calculator-icon").hide();
		$("#FLOW-uskiftet-svar").show();
		$("#FLOW_uskiftetBts_2").show();

		//Skjul Ejendom i blok 4, B-skat og indregnet restskat sektionen
		$(".FLOW-fjern-hvis-doede").addClass("hide-overrule");
		//Vis Rubrik 707
		$(".FLOW-vis-hvis-doede").removeClass("hide-overrule");
		//Skift kr placeholder til IKKE årsbaseret
		$(".skts-placeholder-kr-year").attr("class", "skts-placeholder-kr");
	}
	if (getUrlVars().search === "1") {
		$('#FLOW-showMe').show();
		$('#FLOW-status').appendTo('#FLOW-status-2')
	}
}
function showSectionStatus(e) {
	e.preventDefault();
	var res = "";
	$("input[type='hidden']").each(function() {
		res += $(this).attr("name") + ": " + $(this).attr("value") + "\n";
	})	
	alert(res);
}
//TODO (SERVER) - Implement the error handling as shown below then REMOVE the code below.
//Test of server side error handling
function setForskudFejl() {
	/*** The following values should be set by the server when a server side error is returned ***/
	
	/** Server error for Ret forskud **/
	//server error class on parent li element
	$("#sec_243").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#sec_243").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#sec_243').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "sec_243Error" : "sec_243Error";
	});
	
	//server error class on parent li element
	$("#sec_568").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#sec_568").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#sec_568').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "sec_243Error" : "sec_243Error";
	});
	
	//server error class on parent li element
	$("#sec_569").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#sec_569").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#sec_569').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "sec_243Error" : "sec_243Error";
	});
	
	/** Server error for Ret udenlandsk ejendom **/
	//server error class on parent li element
	$("#test008bc").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#test008bc").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#test008bc').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "test008Error" : "test008Error";
	});	
	
	/** Server error for Login med tastselv kode **/
	//server error class on parent li element
	$("#pnr").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#pnr").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#pnr').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "pnrServerError" : "pnrServerError";
	});
	
	//server error class on parent li element
	$("#tastselvKode").closest("li").addClass("skts-field-server-error");
	//aria-invalid
	$("#tastselvKode").attr("aria-invalid", "true");
	//aria-describedby (set to the description at the top of the page)
	//adds to the aria-describedby attribute if already present
	$('#tastselvKode').attr('aria-describedby', function (i, old) {
		return old ? old + ' ' + "tastselvKodeServerError" : "tastselvKodeServerError";
	});	
}
/********* REMOVE THIS  - END ************/