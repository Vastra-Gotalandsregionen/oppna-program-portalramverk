<span id="slide-buttons">
  <a id="hide" href="#">Dölj notifieringar</a>
  <a id="show" href="#">Visa notifieringar</a>
</span>
<div id="main-content">
  <div id="content-wrapper" class="columns-2 slide">
    <div id="layout-grid" class="lfr-grid portlet-layout">
      <div id="main-container">
        <div id="column-1" class="fifty">
          <div class="lfr-column portlet-column portlet-column-first" style="display: block;">
            $processor.processColumn("column-1", "portlet-column-content portlet-column-content-first")
          </div>
        </div>
        <div id="column-2" class="fifty">
          <div class="lfr-column portlet-column portlet-column-last" style="display: block;">
            $processor.processColumn("column-2", "portlet-column-content portlet-column-content-last")
          </div>
        </div>
      </div>
      <div id="slide-container">
        <div id="column-3" class="hundred">
          <div class="lfr-column">
            ##Adding static portlet to right column
            $theme.runtime("TaskList_WAR_tasklistportlet")
            $theme.runtime("MyUsdIssues_WAR_myusdissuescoremoduleportlet")
		$theme.runtime("RaindanceNotifier_WAR_raindancenotifiercoremoduleportlet")
		$theme.runtime("MedControl_WAR_medcontrolcorebcmoduleportlet")
          </div>
        </div>
      </div>
    </div>
  </div>
</div>