<style>
#column-1, #column-2, #column-3 {
  float: left;
}

.fifty {
 width: 50%;
}

div #content-wrapper {
  clear: both;
  overflow: hidden;
  width: 100%;
  position: relative;
  min-height: 100px;
}

#main-container {
 width: 80%;
 left: 0;
}

#slide-container {
  position: absolute;
  width: 20%;
  right: 0;
}

#slide-buttons {
  float: right;
}
#slide-buttons a {
  display: none;
}
</style>


<span id="slide-buttons">
  <a id="hide" href="#">Dölj notifieringar</a>
  <a id="show" href="#">Visa notifieringar</a>
</span>
<div id="content-wrapper" class="columns-2">
    <div id="layout-grid" class="lfr-grid">
      <div id="main-container">
        <div id="column-1" class="fifty">
          <div class="lfr-column">
            $processor.processColumn("column-1")
          </div>
        </div>
        <div id="column-2" class="fifty">
          <div class="lfr-column">
            $processor.processColumn("column-2")
          </div>
        </div>
      </div>
      <div id="slide-container">
        <div id="column-3">
          <div class="lfr-column">
            $processor.processColumn("column-3")
          </div>
        </div>
      </div>
    </div>
  </div>
