/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Create a datepicker calendar based on YUI Calendar
 * @requires YUI
 */
VGR.calendar = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
		sHiddenClass:'hidden',
		sYearId:'selYear',
		sMonthId:'selMonth',
		sDayId:'selDay',
		sFormId:'dates',
		sCalendarContainerId:'event-cal',
		sButtonContainer:'submit-area'
	};
	/**
	 * Sets the selected options of the select elements to match the date in the calendar.
	 */
	function handleSelect(type,args,obj) {
		var dates = args[0];
		var date = dates[0];
		var year = date[0];
		var month = date[1];
		var day = date[2];
		var selYear = document.getElementById(config.sYearId);
		var selMonth = document.getElementById(config.sMonthId);
		var selDay = document.getElementById(config.sDayId);

		selMonth.selectedIndex = month - 1;
		selDay.selectedIndex = day - 1;

		for (var y=0;y<selYear.options.length;y++) {
			if (parseInt(selYear.options[y].text, 10) === year) {
				selYear.selectedIndex = y;
				break;
			}
		}
	}
	/**
	 * Updates the calendar when a date has been set in the select elements.
	 */
	function updateCal() {
		var selYear = document.getElementById(config.sYearId);
		var selMonth = document.getElementById(config.sMonthId);
		var selDay = document.getElementById(config.sDayId);
		var month = parseInt(selMonth.options[selMonth.selectedIndex].text, 10);
		var day = parseInt(selDay.options[selDay.selectedIndex].value, 10);
		var year = parseInt(selYear.options[selYear.selectedIndex].value, 10);
		if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
			var date = year + "/" + month + "/" + day;
			VGR.calendar.cal1.select(date);
			VGR.calendar.cal1.cfg.setProperty("pagedate", month + "/" + year);
			VGR.calendar.cal1.render();
		}
	}
	/**
	 * Initialises the calendar and sets up localisation.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		var oSubmitArea = YUD.getElementsByClassName(config.sButtonContainer, '*', document.getElementById(config.sFormId))[0];
		if (oSubmitArea) {
			YUD.addClass(oSubmitArea, config.sHiddenClass);
		}
		var selYear = document.getElementById(config.sYearId);
		var selMonth = document.getElementById(config.sMonthId);
		var selDay = document.getElementById(config.sDayId);
		VGR.calendar.cal1 = new YAHOO.widget.Calendar("cal1", config.sCalendarContainerId, {
			LOCALE_WEEKDAYS:'short',
			// First day of week is Monday
			START_WEEKDAY:1
		});
		// Set up Swedish localisation for the calendar
		VGR.calendar.cal1.cfg.setProperty("MDY_DAY_POSITION", 3);
		VGR.calendar.cal1.cfg.setProperty("MDY_MONTH_POSITION", 2);
		VGR.calendar.cal1.cfg.setProperty("MDY_YEAR_POSITION", 1);
		VGR.calendar.cal1.cfg.setProperty("MD_DAY_POSITION", 1);
		VGR.calendar.cal1.cfg.setProperty("MD_MONTH_POSITION", 2);
		VGR.calendar.cal1.cfg.setProperty("MONTHS_SHORT",   ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]);
		VGR.calendar.cal1.cfg.setProperty("MONTHS_LONG",    ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]);
		VGR.calendar.cal1.cfg.setProperty("WEEKDAYS_1CHAR", ["S", "M", "T", "O", "T", "F", "L"]);
		VGR.calendar.cal1.cfg.setProperty("WEEKDAYS_SHORT", ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"]);
		VGR.calendar.cal1.cfg.setProperty("WEEKDAYS_MEDIUM",["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]);
		VGR.calendar.cal1.cfg.setProperty("WEEKDAYS_LONG",  ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]);
		if (selMonth && selDay && selYear) {
			VGR.calendar.cal1.selectEvent.subscribe(handleSelect, VGR.calendar.cal1, true);
			YUE.addListener([config.sYearId, config.sMonthId, config.sDayId], "change", updateCal);
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var day = today.getDate();
			handleSelect('select', [[[year, month, day]]], VGR.calendar.cal1);
		}
		VGR.calendar.cal1.render();
	}
	return {
		init:init
	};
}();

/**
 * Initialise scripts when the DOM is ready
 * @requires YAHOO.util.Event
 * @requires VGR
 */
YAHOO.util.Event.onDOMReady(function() {
	VGR.calendar.init();
});