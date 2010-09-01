<span id="slide-buttons">
  <a id="hide" href="#">Dölj notifieringar</a>
  <a id="show" href="#">Visa notifieringar</a>
</span>
<div id="content-wrapper" class="columns-4 slide">
    <div id="layout-grid" class="lfr-grid">
      <div id="main-container">
        <div id="column-1" class="hundred">
          <div class="lfr-column">
            $processor.processColumn("column-1")
          </div>
        </div>
        <div id="column-2" class="fifty">
          <div class="lfr-column">
            $processor.processColumn("column-2")
          </div>
        </div>
        <div id="column-3" class="fifty">
          <div class="lfr-column">
            $processor.processColumn("column-3")
          </div>
        </div>
      </div>
      <div id="slide-container">
        <div id="column-4" class="hundred">
          <div class="lfr-column">
            ##Adding static portlet to right column
            $theme.runtime("TaskList_WAR_tasklistportlet")
            $theme.runtime("MyUsdIssues_WAR_myusdissuescoremoduleportlet")
          </div>
        </div>
      </div>
    </div>
  </div>
