var helper = {
	touchEnabled: function() {
		var msTouchEnabled = window.navigator.msMaxTouchPoints;
		var generalTouchEnabled = "ontouchstart" in document.createElement("div");
		if (msTouchEnabled || generalTouchEnabled) {
			
			return true;
		}
		return false;
	}
}
var format = {
	danishNumber: {
		whole: function(value) {
			if (value.length > 0) {	
				//Remove the dash
				var cleanValue = value.split("-").join(""),
					//Only allow numbers and dash to be typed
					numberOnly = cleanValue.replace(/[^0-9\-]+/g, ''),
					//Auto insert Danish thousand separator 
					formattedValue = numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
					prefix = "";
				//If a dash has been typed, override the prefix
				if (value.indexOf("-") === 0) prefix = "-";
				return prefix + formattedValue;
			}
		},
		negative: function(value) {
			if (value.length > 0) {
				//Only allow numbers to be typed
				var numberOnly = value.replace(/[^0-9]+/g, ''),
					//Auto insert Danish thousand separator 
					formattedValue = numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				return "-" + formattedValue;
			}
		},
		procent: function(value) {
			if (value.length > 0) {
				//Only allow numbers and comma to be typed
				var numberOnly = value.replace(/[^0-9\,]+/g, '');			
					//Auto insert the Danish decimal 
					formattedValue = numberOnly.replace(/(\d\d)(?=(\d\d)+$)/g, "$1,");
					/*
					if (parseFloat(value.split(",").join("")) > 100 && numberOnly.length < 5) {
						formattedValue = numberOnly.replace(/(\d)(?=(\d\d)+$)/g, "$1,");
					}	
					*/
				return formattedValue;
			}
		}
	}
}

var page = {
	scrolling: false,
	init: function() {
	
		//Autonumeric
		//Can test for local value (if applied in a loop) with : ($this.attr("data-v-max") !== undefined) ? $this.attr("data-v-max") : '99999999',
		
		//If touch enabled device
		if (helper.touchEnabled()) {
			//Change the input types of the "number" classes (currency, number and procent) to "tel"
			$(".skts-input-currency, .skts-input-currency-negative, .skts-input-currency-positive, .skts-input-number, .skts-input-procent").attr("type", "tel");
			// set click event
			page.clickEvent = "touchend";
			//Detect for IE mobile without touch
			if (page.clickEvent === "touchend" && navigator.msMaxTouchPoints > 1){
				page.clickEvent = "click"; 			 
			}
		}
		$(".skts-input-currency").each(function() {
			$(this).val(format.danishNumber.whole($(this).val()));
		});
		//Set the negative currency formatting
		$(".skts-input-currency-negative").each(function() {
			$(this).val(format.danishNumber.negative($(this).val()));
		});
		//Set the procent formatting
		$(".skts-input-procent").each(function() {
			$(this).val(format.danishNumber.procent($(this).val()));
		});
		//Test if the date field is working
		if (!Modernizr.inputtypes.date) {
			$("input[type = date]").each(function () {
				var $this = $(this)
				if ($this.val() !== "") {
					$this.val(format.danishDate($this.val()));
				}
			})
		}
	},
	bindUIActions: function() {	
		if (helper.touchEnabled()) {
			$(".skts-list-header a").on("touchmove", function (e) {
				page.scrolling = true;			
			 });
		}
		//Format the negative fields		
		$(".skts-input-currency-negative").on("blur", function() {
			var $this = $(this),
				value = $this.val();
			if(value !== "" && value.indexOf("-") === - 1) {				
				$this.val("-"+value);
			}
			//$(this).val(format.danishNumber.negative($(this).val()));
		});	
		$(".skts-list-header a").on(page.clickEvent, function(e) {
			var $this = $(this);
			//Don't toggle if there standard links in the header
			if (!$this.hasClass("skts-standard-link")) {				
				e.preventDefault();
				
				if (!page.scrolling) {
					var $header= $this.closest(".skts-list-header");
					toggle.expanded($header);
					toggle.listItems($header);
				}
				else {
					page.scrolling = false;			
				}				
			}
		});
	}
}
var validation = {
	//Show the list items that do not pass the validation rules defined in validation.isCleanField
	showListItems: function() {
		$(".skts-show-hide-list .skts-label-wrapper").each(function(){
			var $this = $(this)
			if (!validation.isCleanField($("input, select", $this))) {
				$this.slideDown("fast");
			}
		})
		//If block 5 contains an open field wrapper, show the list overview
		/********* REMOVE THIS  - START ************/
		/*
		$("#skts-block-5 .skts-label-wrapper").each(function(){
			if ($(this).css("display") !== "none") {
				var $section = $(".skts-show-all");
				$section.addClass("skts-expanded");
				toggle.listItems($section);	
				return false;
			}
		})
		*/
		/********* REMOVE THIS  - END ************/
	}
}