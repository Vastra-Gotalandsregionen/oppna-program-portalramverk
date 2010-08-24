<style>
#slide-container {
  position: relative;
  clear: both;
  height:750px;
  margin:1em 0;
  overflow:hidden;
  width:100%;
}
#slide-container .slide-column {
  position: absolute;
  bottom:0;
  right:0;
  width:20%;
  height:100%;
}

#content-wrapper {
  left: 0;
  position: absolute;
  width: 80%;
}

#column-1 {
  float: left;
}

#column-2 {
  float: right;
}
</style>

<div id="slide-container">
  <div class="columns-2" id="content-wrapper">
    <button>slide it</button>
    <div class="lfr-column fifty" id="column-1">
        $processor.processColumn("column-2")
    </div>
    <div class="lfr-column fifty" id="column-2">
        $processor.processColumn("column-3")
    </div>
  </div>
  <div class="slide-column">$processor.processColumn("column-4")</div>
</div>