/*
 * (C) Copyright IBM Corp. 2003  All Rights Reserved
 * 
 */
/*
## NLS_ENCODING=UTF-8
## NLS_MARKUP=IBMUHTM3
## G11N GA UI	General Audience resources follow.
*/
//==================================================================
// DISCLAIMER OF WARRANTIES.  The following [enclosed] code is
// sample code created by IBM Corporation.  This sample code is
// not part of any standard or IBM product and is provided to you
// solely for the purpose of assisting you in the development of
// your applications.  The code is provided "AS IS", without
// warranty of any kind.  IBM shall not be liable for any damages
// arising out of your use of the sample code, even if they have
// been advised of the possibility of such damages.
//==================================================================
//------------------------------------------------
// Javascript Alert and Confirm Messages			|
//------------------------------------------------
// Note: messages with arguments does not support multiple entries with same number.
// This means that if in one message, there are two {0}, only the first one will get replaced.
// Therefore please make sure to assign no duplicate number within one message.

//binder.js
var error_on_propertybinder = "Fel i egenskapsbindningen {0}: {1}";
var invalid_value_OnPropertyBinderChange = "Ogiltigt v\u00e4rde {0} f\u00f6r typen {1}";

//eclass.js
var unable_create_object = "Det g\u00e5r inte att skapa e-objekt utan modell.";
var name_notexist_model = "{0} finns inte i modellen f\u00f6r klassen {1}.";
var invalid_value_4type = "Ogiltigt v\u00e4rde {0} f\u00f6r typen {1}.";
var maximum_size_allowed_attribute = "St\u00f6rsta till\u00e5tna storlek \u00e4r {0} f\u00f6r attributet {1}";
var minimum_size_allowed_attribute = "Minsta till\u00e5tna storlek \u00e4r {0} f\u00f6r attributet {1}";
var maximum_size_allowed_reference = "St\u00f6rsta till\u00e5tna storlek \u00e4r {0} f\u00f6r referensen {1}";
var minimum_size_allowed_reference = "Minsta till\u00e5tna storlek \u00e4r {0} f\u00f6r referensen {1}";

//eobject.js
var invalid_argument="Ogiltigt argument.";
var xml_parse_error = "Xml-fel p\u00e5 rad {0} position {1} \nK\u00e4lla: {2} \nOrsak: {3}";
var missing_model = "Modellen saknas.";
var reference_missing_inmodel = "Referensen {0} f\u00f6r klassen {1} saknas i modellen.";
var not_a_reference = "{0} \u00e4r inte en referens f\u00f6r klassen {1}.";
var member_missing_inmodel = "Medlemmen {0} av klassen {1} saknas i modellen.";
var member_not_eatt_or_eref_inmodel = "Medlemmen {0} av klassen {1} \u00e4r varken ett e-attribut eller en e-referens i modellen.";
var member__inmodel = "Medlemmen {0} av klassen {1} \u00e4r varken ett e-attribut eller en e-referens i modellen.";
var reference_not_class = "Referensen {0} f\u00f6r klassen {1} \u00e4r inte en klass.";
var attribute_not_multivalue_inmodel = "attributet {1} i klassen {2} kan inte ha flera v\u00e4rden. ";
var class_missing_inmodel = "{0} f\u00f6r klassen {1} saknas i modellen."
var attributecalculate_missing_indata = "Attributber\u00e4kningen {0} f\u00e5r inte finnas i data.";
var unable_create_object = "Det g\u00e5r inte att skapa e-objekt f\u00f6r egenskapen {0} utan modell.";
var invalid_property = "Ogiltig egenskap: {0}";
var invalid_expression = "Ogiltigt uttryck: {0}.{1}.";
var property_cant_change = "Egenskapen {0} \u00e4r ett ber\u00e4knat attribut som inte kan \u00e4ndras."
var root_member_name_missing_error = "Rotmedlemsnamn f\u00f6r \u00f6verg\u00e5ngsgraf saknas";
var ecore_namespace_missing_error = "E-core-namnomr\u00e5det f\u00f6r generering av diffgram saknas ";
var ereference_list_as_key_error ="Referensen {0} f\u00f6r klassen {1} har h\u00f6gre kardinalitet \u00e4n 1 och kan inte anv\u00e4ndas som en del av en nyckel. ";
var multivalue_attr_as_key_error ="Attributet {0} f\u00f6r klassen {1} har en kardinalitet som \u00e4r h\u00f6gre \u00e4n 1 och kan inte anv\u00e4ndas som en del av en nyckel. ";


//ecreator.js
var unable_create_reference_nomodel = "Det g\u00e5r inte att l\u00e4gga till e-referens utan modell.";
var unable_create_reference_noreference = "Det g\u00e5r inte att l\u00e4gga till e-referenser utan referensinformation.";
var add_attribute_2nullclass = "F\u00f6rs\u00f6ker l\u00e4gga till attribut till en tom e-klass.";
var no_attribute_supply = "F\u00f6rs\u00f6ker l\u00e4gga till attribut till e-klass '{0}' men det finns inget attribut.";
var add_reference_2nullclass = "F\u00f6rs\u00f6ker l\u00e4gga till e-referenser till en tom e-klass.";
var mismatch_reference_length = "E-klass '{0}' definierar {1} referenser, men endast {2} skickades.";


//datagridcontrol.js
var error_datagrid_action = "Fel vid datarutn\u00e4ts\u00e5tg\u00e4rden {0}: {1}";
var label_delete = "Ta bort";
var label_add_newrow = "L\u00e4gg till ny rad...";
var label_previous = "<";
var label_next = ">";
var label_accept = "Acceptera";
var label_cancel = "Avbryt";
var label_symbol = "symbol";
var action_datagrid_addrow = "l\u00e4gger till rad";
var action_datagrid_removerow = "tar bort rad";
var symbol = "Symbol";
var price = "Pris";
var quantity = "Antal";
var total = "Summa";
var name = "Namn";
var selectColName = "V\u00e4lj";
var odcDGImgPrevious = "klicka f\u00f6r att g\u00e5 till f\u00f6reg\u00e5ende sida";
var odcDGImgFirst = "klicka f\u00f6r att g\u00e5 till f\u00f6rsta sidan";
var odcDGImgNext = "klicka f\u00f6r att g\u00e5 till n\u00e4sta sida";
var odcDGImgLast = "klicka f\u00f6r att g\u00e5 till sista sidan";
var odcDGImgGo = "klicka f\u00f6r att g\u00e5 till den sida du anger";
var odcDGSkipToMainContent = "g\u00e5 till inneh\u00e5llsf\u00f6rteckningen";
var odcDGAscending = "stigande sortering";
var odcDGDescending = "fallande sortering";
var odcDGNavigationPage = "Sida {0} av {1}";
var odcDGNavigationJump = "G\u00e5 till sida: ";
var invalid_filter_expression = "Det uttryck du angav, {0}, \u00e4r ogiltigt. Felmeddelandet \u00e4r {1}";
var odcdgindexhead = "Radnr";
var odcDGSelection = "Urval";


//currency.js
var add_mismatch_currencycode = "Fel: summering av belopp med olika valutor. Den f\u00f6rsta valutakoden: {0} \u00e4r inte samma som den andra valutakoden: {1}";
var subtract_mismatch_currencycode = "Fel: subtraktion av belopp med olika valutor. Den f\u00f6rsta valutakoden: {0} \u00e4r inte samma som den andra valutakoden: {1}";

//NLSService.js
var invalid_date_format = "Det finns ingen information om datumformat.";
var invalid_date = "Datumet {0} \u00e4r inte ett giltigt datum baserat p\u00e5 det format som du har valt: {1}";
var invalid_time_format = "Det finns ingen information om tidsformat.";
var invalid_time = "Tiden {0} \u00e4r inte giltigt baserat p\u00e5 det format som du har valt: {1}";

//tabbedpanelcontrol.js
var label_tab_previous = "< Bak\u00e5t";
var label_tab_next = "N\u00e4sta >";
var label_tab_cancel = "Avbryt";
var label_tab_finish = "Slutf\u00f6r";

//detectBrowser.js
var browser_not_support = "Den webbl\u00e4sare du anv\u00e4nder, {0}, fungerar inte med det h\u00e4r programmet.";

//treeControl.js
var odcTreeimgExpand = "Klicka f\u00f6r att ut\u00f6ka";
var odcTreeimgCollapse = "Klicka f\u00f6r att komprimera";
var odcTreeimgFolderOpen = "\u00d6ppen mapp";
var odcTreeimgFolderNormal = "St\u00e4ngd mapp";
var odcTreeimgLeaf = "Mapp";


//chart draw variables
var chartdraw_lblPie = "Cirkeldiagram";
var chartdraw_lblBar = "Stapeldiagram";
var chartdraw_lblLine = "Linjediagram";
var chartdraw_tooltipShare = "Del";
var chartdraw_tooltipSeries = "Serie";
var chartdraw_tooltipLabel = "Etikett";
var chartdraw_tooltipValue = "V\u00e4rde";
var chartdraw_msgPieChartError = "Cirkeldiagrammet kan inte ritas upp.";
var no_data_series = "Ingen dataserie angavs. L\u00e4gg till minst en dataserie i diagrammet.";
var no_data_atttribute = "Inget dataattributsnamn angavs f\u00f6r serien - {0}. \nV\u00e4lj ett giltigt dataattribut f\u00f6r den h\u00e4r serien.";
var no_label_attribute = "Inget etikettattribut angavs. \nV\u00e4lj ett giltigt etikettattribut.";
var no_group_operation_specified= "Ingen gruppering angavs f\u00f6r serien: \n{0}.";
var invalid_group_operation = "Ogiltig gruppering - {1} - angavs f\u00f6r serien - {0}. \nTill\u00e5tna grupperingar \u00e4r - SUM, AVG, COUNT, MAX, MIN, FIRST, LAST.";
var invalid_label_attribute = "Ogiltigt etikettattribut. \nV\u00e4lj ett giltigt etikettattribut.";
var invalid_data_atttribute = "Ogiltigt dataattributnamn angavs f\u00f6r serien - {0}. \nV\u00e4lj ett giltigt dataattribut f\u00f6r den h\u00e4r serien.";
var invalid_series_attribute_data_type = "Ogiltig datatyp angavs f\u00f6r attributnamnet i serien - {0}. \nF\u00f6r att diagrammet ska kunna ritas m\u00e5ste attributv\u00e4rdena vara tal eller datum. ";
var thousands_str = "tusen";
var thousands10_str = "10-tals tusen";
var thousands100_str = "100-tals tusen";
var millions_str = "miljoner";
var millions10_str = "10-tals miljoner";
var millions100_str = "100-tals miljoner";
var billions_str = "miljarder";
var billions10_str = "10-tals miljarder";
var billions100_str = "100-tals miljarder";

/***** PLEASE DO NOT TRANSLATE THIS -- START *****************/
var Scales = new Array();  
Scales = [[100000000000.0, billions100_str] , [10000000000.0, billions10_str] , [1000000000.0, billions_str] , [100000000.0, millions100_str] , [10000000.0, millions10_str],  [1000000.0, millions_str],  [100000.0, thousands100_str] , [10000.0, thousands10_str] , [1000.0, thousands_str] ];
/***** PLEASE DO NOT TRANSLATE THIS -- END ********************/



//mask error variable
var mask_not_matched = "Str\u00e4ngens l\u00e4ngd eller inneh\u00e5ll motsvarar inte den mask som anv\u00e4nds f\u00f6r den";

//webservice
var error_mapping_output = "Ogiltigt avbildningsuttryck angavs som utparameter. ";
var no_flash_component = "Hittar inte den n\u00f6dv\u00e4ndiga flash-spelaren";
var error_mapping_input = "Ogiltigt avbildningsuttryck angavs som inparameter. ";
var error_accessing_flash = "Hittar inte den n\u00f6dv\u00e4ndiga flash-spelaren";

//progressbar
var start_load_model = "Starta inl\u00e4sning av datamodellen {0}";
var end_load_model = "Avsluta inl\u00e4sning av datamodellen {0}";
var start_load_instance = "Starta inl\u00e4sning av f\u00f6rekomstdata f\u00f6r modellen {0}";
var end_load_instance = "Avsluta inl\u00e4sning av f\u00f6rekomstdata f\u00f6r modellen {0}";
var start_render_control = "Starta \u00e5tergivning av kontrollen {0}";
var end_render_control = "Avsluta \u00e5tergivning av kontrollen {0}";
var status_string =  "Status: ";
var progressbar_header = "L\u00e4ser in sida";
var tabbed_panel = "Flikpanel";
var datagrid = "Datarutn\u00e4t";
var webservice = "Webbtj\u00e4nst";
var treeview = "Tr\u00e4dvy";
var graphdraw = "Diagramritning";

