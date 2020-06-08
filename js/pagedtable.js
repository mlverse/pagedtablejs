// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this === null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}

var pagedTableStyle = "\
.pagedtable {\
  overflow: hidden;\
  padding-left: 8px;\
  padding-right: 8px;\
  color: #333;\
  font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;\
  font-size: 14px;\
}\
\
.pagedtable-wrapper {\
  border-radius: 4px;\
}\
\
.pagedtable table {\
  width: 100%;\
  max-width: 100%;\
  margin: 0;\
}\
\
.pagedtable th {\
  padding: 0 5px 3px 5px;\
  border: none;\
  border-bottom: 2px solid #dddddd;\
\
  min-width: 45px;\
}\
\
.pagedtable-empty th {\
  display: none;\
}\
\
.pagedtable td {\
  padding: 8px 8px 8px 8px;\
}\
\
.pagedtable .even {\
  background-color: rgba(140, 140, 140, 0.1);\
}\
\
.pagedtable-padding-col {\
  display: none;\
}\
\
.pagedtable a {\
  -webkit-touch-callout: none;\
  -webkit-user-select: none;\
  -khtml-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;\
}\
\
.pagedtable-index-nav {\
  cursor: pointer;\
  padding: 0 5px 0 5px;\
  float: right;\
  border: 0;\
}\
\
.pagedtable-index-nav-disabled {\
  cursor: default;\
  text-decoration: none;\
  color: #999;\
}\
\
a.pagedtable-index-nav-disabled:hover {\
  text-decoration: none;\
  color: #999;\
}\
\
.pagedtable-indexes {\
  cursor: pointer;\
  float: right;\
  border: 0;\
}\
\
.pagedtable-index-current {\
  cursor: default;\
  text-decoration: none;\
  font-weight: bold;\
  color: #333;\
  border: 0;\
}\
\
a.pagedtable-index-current:hover {\
  text-decoration: none;\
  font-weight: bold;\
  color: #333;\
}\
\
.pagedtable-index {\
  width: 30px;\
  display: inline-block;\
  text-align: center;\
  border: 0;\
}\
\
.pagedtable-index-separator-left {\
  display: inline-block;\
  color: #333;\
  font-size: 9px;\
  padding: 0 0 0 0;\
  cursor: default;\
}\
\
.pagedtable-index-separator-right {\
  display: inline-block;\
  color: #333;\
  font-size: 9px;\
  padding: 0 4px 0 0;\
  cursor: default;\
}\
\
.pagedtable-footer {\
  padding-top: 4px;\
  padding-bottom: 5px;\
}\
\
.pagedtable-not-empty .pagedtable-footer {\
  border-top: 2px solid #dddddd;\
}\
\
.pagedtable-info {\
  overflow: hidden;\
  color: #999;\
  white-space: nowrap;\
  text-overflow: ellipsis;\
}\
\
.pagedtable-header-name {\
  overflow: hidden;\
  text-overflow: ellipsis;\
}\
\
.pagedtable-header-type {\
  color: #999;\
  font-weight: 400;\
}\
\
.pagedtable-na-cell {\
  font-style: italic;\
  opacity: 0.3;\
}\
";

var PagedTable = function (pagedTable, source) {
  
  //Setup functions
  
  //set "this" as "me" <- why?
  var me = this;
  
  // immediately evaluate and extract/parse "source" w/ some error handling
  var source = function(pagedTable, source) {
    if (typeof(source) === "undefined") {
      var sourceElems = [].slice.call(pagedTable.children).filter(function(e) {
        return e.hasAttribute("data-pagedtable-source");
      });

      if (sourceElems === null || sourceElems.length !== 1) {
        throw("A single data-pagedtable-source was not found");
      }

      source = JSON.parse(sourceElems[0].innerHTML);
    }

    return source;
  }(pagedTable, source);

  // get the paged table element, apply styling using shadowDOM,
  var pagedTable = function(pagedTable, source) {
    if (typeof(pagedTable) === "string") {
      pagedTable = document.getElementById(pagedTable);
    }

    // custom style
    var appliedStyle = pagedTableStyle;
    var styleElems = [].slice.call(pagedTable.children).filter(function(e) {
      return e.nodeName === "STYLE";
    });
    if (styleElems !== null && styleElems.length === 1) {
      appliedStyle = appliedStyle + styleElems[0].innerHTML;
    }

    // create style
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = appliedStyle; // IE8 and below.
    } else {
      style.appendChild(document.createTextNode(appliedStyle));
    }

    var useShadowDOM = typeof(source.options) === "undefined" ||
                       typeof(source.options.shadowDOM) === "undefined" || source.options.shadowDOM;
    useShadowDOM = (document.head.createShadowRoot || document.head.attachShadow) && useShadowDOM;
    if (useShadowDOM) {
      pagedTable = pagedTable.attachShadow({mode: 'open'});
      pagedTable.appendChild(style);
    }
    else {
      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(style);
    }

    return pagedTable;
  }(pagedTable, source);

  // update "source" with more details/columns
  source = function(source) {
    if (typeof(source.data) === "undefined") {
      source.data = source;
    }

    if (typeof(source.columns) === "undefined") {
      var columns = [];
      var keys = Object.keys(source.data[0]);
      for (var idx = 0; idx < keys.length; idx++) {
        columns[idx] = { name: keys[idx] };
      }

      source.columns = columns;
    }
    // if the column contains an array of names, not dictionary
    else if (typeof(source.columns[0].length) !== "undefined") {
      var columns = []
      for (var idx = 0; idx < source.columns.length; idx++) {
        columns[idx] = { name: source.columns[idx] };
      }

      source.columns = columns;
    }

    for (var idx = 0; idx < source.columns.length ; idx++) {
      if (typeof(source.columns[idx].label) === "undefined")
        source.columns[idx].label = source.columns[idx].name;
    }

    return source;
  }(source);

  // get and create options about the paged table. 
  var options = function(source) {
    var options = typeof(source.options) !== "undefined" &&
      source.options !== null ? source.options : {};

    var columns = typeof(options.columns) !== "undefined" ? options.columns : {};
    var rows = typeof(options.rows) !== "undefined" ? options.rows : {};
    var colhtml = typeof(options.html) !== "undefined" ? options.html : {};

    //if html is not defined for field, assume is not
    Object.keys(source.data[0]).forEach(function(colname){
      var colhtml_status = colhtml[colname];
      if(typeof(colhtml_status) === "undefined"){
        colhtml_status = false
      }
      if(typeof(colhtml_status) !== "boolean"){
         colhtml_status = false
      }
      colhtml[colname] = colhtml_status
    });

    var positiveIntOrNull = function(value, def) {
      return parseInt(value) >= 0 ? parseInt(value) : def;
    };

    return {
      pages: positiveIntOrNull(options.pages, null),
      rows: {
        min: positiveIntOrNull(rows.min, 5),
        max: positiveIntOrNull(rows.max, 10),
        total: positiveIntOrNull(rows.total, null)
      },
      columns: {
        min: positiveIntOrNull(columns.min, 1),
        max: positiveIntOrNull(columns.max, 10),
        total: positiveIntOrNull(columns.total, null)
      },
      html : colhtml
    };
  }(source);
  
  // function that will convert a text entry (as is) into an html element or preserve it as text
  var makeCellContents = function(entry){
    var cellContents
    var sanitized = DOMPurify.sanitize(entry);
    
    if(sanitized.length === 0){
      cellContents = document.createTextNode(entry);
    } else {
      cellContents = sanitized;
    }
    return(cellContents);
  };

  // function that when invoked determines what the 
  // average size of a text entry is to determine how wide to make text fields. 
  var Measurer = function() {

    // set some default initial values that will get adjusted in runtime
    me.measures = {
      padding: 12,
      character: 8,
      height: 15,
      defaults: true
    };

    me.calculate = function(measuresCell) {
      if (!me.measures.defaults)
        return;

      var measuresCellStyle = window.getComputedStyle(measuresCell, null);

      var newPadding = parsePadding(measuresCellStyle.paddingLeft) +
            parsePadding(measuresCellStyle.paddingRight);

      var sampleString = "ABCDEFGHIJ0123456789";
      var newCharacter = Math.ceil(measuresCell.clientWidth / sampleString.length);

      if (newPadding <= 0 || newCharacter <= 0)
        return;

      me.measures.padding = newPadding;
      me.measures.character = newCharacter;
      me.measures.height = measuresCell.clientHeight;
      me.measures.defaults = false;
    };

    return me;
  };

  var Page = function(data, options) {
    var me = this;

    var defaults = {
      max: 7,
      rows: 10
    };

    var totalPages = function() {
      return Math.ceil(data.length / me.rows);
    };

    me.number = 0;
    me.max = options.pages !== null ? options.pages : defaults.max;
    me.visible = me.max;
    me.rows = options.rows.min !== null ? options.rows.min : defaults.rows;
    me.total = totalPages();
    
    me.setRows = function(newRows) {
      me.rows = newRows;
      me.total = totalPages();
    };

    me.setPageNumber = function(newPageNumber) {
      if (newPageNumber < 0) newPageNumber = 0;
      if (newPageNumber >= me.total) newPageNumber = me.total - 1;

      me.number = newPageNumber;
    };

    me.setVisiblePages = function(visiblePages) {
      me.visible = Math.min(me.max, visiblePages);
      me.setPageNumber(me.number);
    };

    me.getVisiblePageRange = function() {
      var start = me.number - Math.max(Math.floor((me.visible - 1) / 2), 0);
      var end = me.number + Math.floor(me.visible / 2) + 1;
      var pageCount = me.total;

      if (start < 0) {
        var diffToStart = 0 - start;
        start += diffToStart;
        end += diffToStart;
      }

      if (end > pageCount) {
        var diffToEnd = end - pageCount;
        start -= diffToEnd;
        end -= diffToEnd;
      }

      start = start < 0 ? 0 : start;
      end = end >= pageCount ? pageCount : end;

      var first = false;
      var last = false;

      if (start > 0 && me.visible > 1) {
        start = start + 1;
        first = true;
      }

      if (end < pageCount && me.visible > 2) {
        end = end - 1;
        last = true;
      }

      return {
        first: first,
        start: start,
        end: end,
        last: last
      };
    };

    me.getRowStart = function() {
      var rowStart = page.number * page.rows;
      if (rowStart < 0)
        rowStart = 0;

      return rowStart;
    };

    me.getRowEnd = function() {
      var rowStart = me.getRowStart();
      return Math.min(rowStart + me.rows, data.length);
    };

    me.getPaddingRows = function() {
      var rowStart = me.getRowStart();
      var rowEnd = me.getRowEnd();
      return data.length > me.rows ? me.rows - (rowEnd - rowStart) : 0;
    };
    
    me.getVisRows = function(){
      var visRowsPage = [] 
      for( var i = me.getRowStart(); i < me.getRowEnd(); i++){
        visRowsPage.push(i);
      }
      return visRowsPage
    }
  };

  var Columns = function(data, columns, options) {
    var me = this;

    me.defaults = {
      min: 5
    };

    me.number = 0;
    me.visible = columns.length ;
    me.total = columns.length;
    me.subset = [];
    me.padding = 0;
    me.min = options.columns.min !== null ? options.columns.min : me.defaults.min;
    me.max = options.columns.max !== null ? options.columns.max : null;
    me.widths = {};
    me.visCols = []

    var widthsLookAhead = Math.max(100, options.rows.min);
    var paddingColChars = 10;

    me.emptyNames = function() {
      columns.forEach(function(column) {
        if (columns.label !== null && columns.label !== "")
          return false;
      });

      return true;
    };

    var parsePadding = function(value) {
      return parseInt(value) >= 0 ? parseInt(value) : 0;
    };

    me.calculateWidths = function(measures) {
      // --> Here is where we want to precompute the html columns.
      columns.forEach(function(column) {
        var maxChars = Math.max(
          column.label.toString().length,
          column.type ? column.type.toString().length : 0
        );
        
        if(!options.html[column.name.toString()]){
          for (var idxRow = 0; idxRow < Math.min(widthsLookAhead, data.length); idxRow++) {
            var content = data[idxRow][column.name.toString()];
            if (typeof(content) !== "string") content = content.toString();
            maxChars = Math.max(maxChars, content.length);
          }
        }

        me.widths[column.name] = {
          // width in characters
          chars: maxChars,
          // width for the inner html columns
          inner: maxChars * measures.character,
          // width adding outer styles like padding
          outer: maxChars * measures.character + measures.padding,
          // Is width based on internal html
          html: options.html[column.name.toString()]
        };
      });
    };

    me.getWidth = function() {
      
      var widthOuter = 0;
      for (var idxCol = 0; idxCol < me.subset.length; idxCol++) {
        var columnName = me.subset[idxCol].name;
        widthOuter = widthOuter + me.widths[columnName].outer;
      }

      widthOuter = widthOuter + me.padding * paddingColChars * measurer.measures.character;

      if (me.hasMoreLeftColumns()) {
        widthOuter = widthOuter + columnNavigationWidthPX + measurer.measures.padding;
      }

      if (me.hasMoreRightColumns()) {
        widthOuter = widthOuter + columnNavigationWidthPX + measurer.measures.padding;
      }

      return widthOuter;
    };
    
    me.getColWidth = function(idx){
      var columnName = me.subset[idx].name;
      return([
        me.widths[columnName].outer,
        me.widths[columnName].html
      ]);
    }
    
    me.setColWidth = function(idx, width){
       me.subset[idx].outer = width;
    };
    
    me.setVisibleColumns = function(avail){
      me.visCols = avail
    };
    
    me.updateSlice = function() {
      if (me.number + me.visible >= me.total)
        me.number = me.total - me.visible;

      if (me.number < 0) me.number = 0;

      me.subset = columns.slice(me.number, Math.min(me.number + me.visible, me.total));

      me.subset = me.subset.map(function(column) {
        Object.keys(column).forEach(function(colKey) {
          column[colKey] = column[colKey] === null ? "" : column[colKey].toString();
        });

        column.width = null;
        return column;
      });
    };
    
    me.incColumnNumber = function(increment) {
      me.number = me.number + increment;
    };

    me.setColumnNumber = function(newNumber) {
      me.number = newNumber;
    };

    me.setPaddingCount = function(newPadding) {
      me.padding = newPadding;
    };

    me.getPaddingCount = function() {
      return me.padding;
    };

    me.hasMoreLeftColumns = function() {
      return me.number > 0;
    };

    me.hasMoreRightColumns = function() {
      return me.number + me.visible < me.total;
    };
    
    me.updateSlice(0);
    return me;
  };
  
  // Start evaluating the data
  var data = source.data;
  var page = new Page(data, options);
  var measurer = new Measurer(data, options);
  var columns = new Columns(data, source.columns, options);

  var table = null;
  var tableDiv = null;
  var header = null;
  var footer = null;
  var tbody = null;

  // Caches pagedTable.clientWidth, specially for webkit
  var cachedPagedTableClientWidth = null;

  var columnNavigationWidthPX = 5;

  var renderColumnNavigation = function(direction) {
    var arrow = document.createElement("div");
    arrow.setAttribute("style",
      "border-top: " + columnNavigationWidthPX + "px solid transparent;" +
      "border-bottom: " + columnNavigationWidthPX + "px solid transparent;" +
      "border-" + (direction != "right" ? "right" : "left") + ": " + columnNavigationWidthPX + "px solid;");
      
    var header = document.createElement("th");

    header.appendChild(arrow);
    header.setAttribute("style",
      "cursor: pointer;" +
      "vertical-align: middle;" +
      "min-width: " + columnNavigationWidthPX + "px;" +
      "width: " + columnNavigationWidthPX + "px;");
    header.setAttribute("class",(direction != "right" ? "right" : "left") + "-arrow " + 
                  (direction != "right" ? "right" : "left") + "-navigator-column");

    header.onclick = function() {
      columns.incColumnNumber(direction != "right");
      me.animateColumns(direction != "right");
      renderFooter();
    };
    
    header.on

    return header;
  };

  var maxColumnWidth = function(width) {
    var padding = 80;
    var columnMax = Math.max(cachedPagedTableClientWidth - padding, 0);

    return parseInt(width) > 0 ?
      Math.min(columnMax, parseInt(width)) + "px" :
      columnMax + "px";
  };
  
  var makeColumnHeaderElement = function(idx){
    var columnData = columns.subset[idx]
    
    var column = document.createElement("th");
    column.setAttribute("class", "col_" + idx)

    if (typeof(columnData.align) === "undefined") columnData.align = "left";
    column.setAttribute("align", columnData.align);
    column.style.textAlign = columnData.align;
    column.style.display = "";

    column.style.maxWidth = maxColumnWidth(null);
    if (columnData.width) {
      column.style.minWidth = column.style.maxWidth = maxColumnWidth(columnData.width);
    }

    var columnName = document.createElement("div");
    columnName.setAttribute("class", "pagedtable-header-name");
    if (columnData.label === "") {
      columnName.innerHTML = "&nbsp;";
    } else {
      columnName.appendChild(document.createTextNode(columnData.label));
    }
    column.appendChild(columnName);

    var columnType = document.createElement("div");
    columnType.setAttribute("class", "pagedtable-header-type");
    if (columnData.type === "") {
      columnType.innerHTML = "&nbsp;";
    } else {
      if (typeof(columnData.type) !== "undefined") {
        columnType.appendChild(document.createTextNode("<" + columnData.type + ">"));
      }
    }
    column.appendChild(columnType)
    return(column);
  };
  
  var makeColumnBodyElements = function(idx){
    
    var columnData = columns.subset[idx]

    var fragment = document.createDocumentFragment();
    
    // assumption that all fields have the same keys? valid?
    var idx_name = columnData.name
    
    var column_elements = []
    
    data.forEach(function(dataRow,idxRow) {
      
      var dataCell = dataRow[idx_name];
      var htmlCell = document.createElement("td");
      htmlCell.setAttribute("class", "col_" + idx)
      htmlCell.style.display = "";


      if (typeof(dataCell) !== "string") dataCell = dataCell.toString();
      if (dataCell === "NA") htmlCell.setAttribute("class", "pagedtable-na-cell");
      if (dataCell === "__NA__") dataCell = "NA";

      var cellText = document.createElement('div');
      cellText.style.width = "fit-content"
      
      //revert for REALSIES // ************************************************************************
      //cellText.innerHTML = makeCellContents(dataCell);
      if(options.html[idx_name]){
        cellText.innerHTML = dataCell.trim()
      }else{
        var cellText = document.createTextNode(dataCell);
        htmlCell.appendChild(cellText);
      }
      
      htmlCell.appendChild(cellText);
      if (dataCell.length > 50 & !columns.widths[idx_name]["html"]) {
        htmlCell.setAttribute("title", dataCell);
      }
      htmlCell.setAttribute("align", columnData.align);
      htmlCell.style.textAlign = columnData.align;
      htmlCell.style.maxWidth = maxColumnWidth(null);
      if (columnData.width) {
        htmlCell.style.minWidth = htmlCell.style.maxWidth = maxColumnWidth(columnData.width);
      }
      
      column_elements[idxRow] = htmlCell;
    });
    
    return(column_elements)
  };
  
  me.toggleColumnNavigation = function(direction){
    
    var el_class = (direction == "right" ? "right" : "left") + "-navigator-column"; 
    me.toggleColumn(el_class);
    
  }
  
  me.toggleColumn = function(el_class){
    var colNav = pagedTable.querySelectorAll("." + el_class); 
    
    colNav.forEach(function(el){
      el.style.display = el.style.display == "none" ? "" : "none"
    })
  }
  
  me.toggleRow = function(rownum){
    var row = pagedTable.querySelector(".row_" + rownum);
    row.style.visibility = row.style.visibility == "visible" ? "collapse" : "visible"
  }
  
 // to try to prevent double calculation, the columns must be created. 
  me.makeColumn = function(column_idx, backwards){
    // add column to header
    var pt_header = pagedTable.querySelector("thead");
    var pt_body = pagedTable.querySelector("tbody");
    
    // If the column already exists, toggle its visibility, otherwise create it.
    var colExists = pt_header.querySelector(".col_" + column_idx) != null;
    if(colExists){
      me.toggleColumn("col_" + column_idx);
      
    }else{
      
      var header_element = makeColumnHeaderElement(column_idx);
      var body_elements = makeColumnBodyElements(column_idx);
      
      if(backwards){
        pt_header.querySelector(".right-navigator-column").after(header_element);
      } else{     
        pt_header.querySelector(".left-navigator-column").before(header_element);
      }
      
      body_elements.map(function(el, idxRow){
        var row = pt_body.querySelector(".row_"+idxRow)
        
        if(backwards){
          row.querySelector(".right-navigator-column").after(el);
        } else{     
          row.querySelector(".left-navigator-column").before(el);
        }
      })
    }
     
  };
  
  var ForEach = function(array, direction, func){
    
    var arr = array;
    
    if(direction){
      arr = arr.slice().reverse();
    }
    
    arr.forEach(func);
  }
  
  me.animateColumns = function(backwards) {
    
    var currentCols = columns.visCols

    var startCol = backwards ? currentCols[0] -1 : currentCols[currentCols.length - 1] + 1 ; 
    
    me.addTableContents(startCol, backwards);
    
    var newCols = columns.visCols
    
    // disappear the old columns
    
    ForEach(currentCols, backwards, function(col_idx){
      me.toggleColumn("col_" + col_idx);
    })
    
    // rules about showing the left/right arrows
    if(newCols.includes(columns.total-1)){
      me.toggleColumnNavigation("left");
    }
    
    if(currentCols[0] === 0 & !newCols.includes(0)){
      me.toggleColumnNavigation("right")
    }
    
    if(currentCols[currentCols.length - 1] === columns.total-1 & backwards){
      me.toggleColumnNavigation("left")
    }
    
    if(newCols.includes(0) & !currentCols.includes(0)){
      me.toggleColumnNavigation("right");
    }
    
    renderFooter();
    
  }
  
  me.updateDisplayedPage = function(oldRows, newRows){
    oldRows.forEach(function(x){
      me.toggleRow(x);
    })
    
    newRows.forEach(function(x){
      me.toggleRow(x);
    })
  }

  me.onChange = function(callback) {
    onChangeCallbacks.push(callback);
  };

  var triggerOnChange = function() {
    onChangeCallbacks.forEach(function(onChange) {
      onChange();
    });
  };

  var getLabelInfo = function() {
    var pageStart = page.getRowStart();
    var pageEnd = page.getRowEnd();
    var totalRows = data.length;

    var totalRowsLabel = options.rows.total ? options.rows.total : totalRows;
    var totalRowsLabelFormat = totalRowsLabel.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

    var infoText = (pageStart + 1) + "-" + pageEnd + " of " + totalRowsLabelFormat + " rows";
    if (totalRows < page.rows) {
      infoText = totalRowsLabel + " row" + (totalRows != 1 ? "s" : "");
    }
    if (columns.total > columns.visCols.length) {
      var totalColumnsLabel = options.columns.total ? options.columns.total : columns.total;

      infoText = infoText + " | " + (columns.visCols[0] + 1) + "-" +
        (columns.visCols[columns.visCols.length - 1] + 1)  +
        " of " + totalColumnsLabel + " columns";
    }

    return infoText;
  };

  var clearFooter = function() {
    footer = pagedTable.querySelectorAll("div.pagedtable-footer")[0];
    footer.innerHTML = "";

    return footer;
  };

  var createPageLink = function(idxPage) {
    var pageLink = document.createElement("a");
    pageLinkClass = idxPage === page.number ? "pagedtable-index pagedtable-index-current" : "pagedtable-index";
    pageLink.setAttribute("class", pageLinkClass);
    pageLink.setAttribute("data-page-index", idxPage);
    pageLink.onclick = function() {
      var oldRows = page.getVisRows()
      page.setPageNumber(parseInt(this.getAttribute("data-page-index")));
      var newRows = page.getVisRows()
      me.updateDisplayedPage(oldRows, newRows);
      renderFooter();
    };

    pageLink.appendChild(document.createTextNode(idxPage + 1));

    return pageLink;
  }

  var renderFooter = function() {
    footer = clearFooter();

    var next = document.createElement("a");
    next.appendChild(document.createTextNode("Next"));
    
    next.onclick = function() {
      var oldRows = page.getVisRows()
      page.setPageNumber(page.number + 1);
      var newRows = page.getVisRows()
      me.updateDisplayedPage(oldRows, newRows);
      renderFooter();
    };
    
    if (data.length > page.rows) footer.appendChild(next);

    var pageNumbers = document.createElement("div");
    pageNumbers.setAttribute("class", "pagedtable-indexes");

    var pageRange = page.getVisiblePageRange();

    if (pageRange.first) {
      var pageLink = createPageLink(0);
      pageNumbers.appendChild(pageLink);

      var pageSeparator = document.createElement("div");
      pageSeparator.setAttribute("class", "pagedtable-index-separator-left");
      pageSeparator.appendChild(document.createTextNode("..."))
      pageNumbers.appendChild(pageSeparator);
    }

    for (var idxPage = pageRange.start; idxPage < pageRange.end; idxPage++) {
      var pageLink = createPageLink(idxPage);

      pageNumbers.appendChild(pageLink);
    }

    if (pageRange.last) {
      var pageSeparator = document.createElement("div");
      pageSeparator.setAttribute("class", "pagedtable-index-separator-right");
      pageSeparator.appendChild(document.createTextNode("..."))
      pageNumbers.appendChild(pageSeparator);

      var pageLink = createPageLink(page.total - 1);
      pageNumbers.appendChild(pageLink);
    }

    if (data.length > page.rows) footer.appendChild(pageNumbers);

    var previous = document.createElement("a");
    previous.appendChild(document.createTextNode("Previous"));
    previous.onclick = function() {
      var oldRows = page.getVisRows()
      page.setPageNumber(page.number - 1);
      var newRows = page.getVisRows()
      me.updateDisplayedPage(oldRows, newRows);
      renderFooter();
    };
    if (data.length > page.rows) footer.appendChild(previous);

    var infoLabel = document.createElement("div");
    infoLabel.setAttribute("class", "pagedtable-info");
    infoLabel.setAttribute("title", getLabelInfo());
    infoLabel.appendChild(document.createTextNode(getLabelInfo()));
    footer.appendChild(infoLabel);

    var enabledClass = "pagedtable-index-nav";
    var disabledClass = "pagedtable-index-nav pagedtable-index-nav-disabled";
    previous.setAttribute("class", page.number <= 0 ? disabledClass : enabledClass);
    next.setAttribute("class", (page.number + 1) * page.rows >= data.length ? disabledClass : enabledClass);
  };

  var measuresCell = null;

  var renderMeasures = function() {
    var measuresTable = document.createElement("table");
    measuresTable.style.visibility = "hidden";
    measuresTable.style.position = "absolute";
    measuresTable.style.whiteSpace = "nowrap";
    measuresTable.style.height = "auto";
    measuresTable.style.width = "auto";

    var measuresRow = document.createElement("tr");
    measuresTable.appendChild(measuresRow);

    measuresCell = document.createElement("td");
    var sampleString = "ABCDEFGHIJ0123456789";
    measuresCell.appendChild(document.createTextNode(sampleString));

    measuresRow.appendChild(measuresCell);

    tableDiv.appendChild(measuresTable);
  }
  
  // Create paged table shell
  var drawTableShell = function() {
    
    tableDiv = document.createElement("div");
    pagedTable.appendChild(tableDiv);
    var pagedTableClass = data.length > 0 ?
      "pagedtable pagedtable-not-empty" :
      "pagedtable pagedtable-empty";

    if (columns.total == 0 || (columns.emptyNames() && data.length == 0)) {
      pagedTableClass = pagedTableClass + " pagedtable-empty-columns";
    }

    tableDiv.setAttribute("class", pagedTableClass);

    table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("class", "table table-condensed");
    tableDiv.appendChild(table);

    table.appendChild(document.createElement("thead"));

    var footerDiv = document.createElement("div");
    footerDiv.setAttribute("class", "pagedtable-footer");
    tableDiv.appendChild(footerDiv);

    // if the host has not yet provided horizontal space, render hidden
    if (tableDiv.clientWidth <= 0) {
      tableDiv.style.opacity = "0";
    }
    
  }
  
  // create table shell initial contents
  var drawTableShellContents = function(){
    
    cachedPagedTableClientWidth = pagedTable.clientWidth;
    var table = pagedTable.querySelector("table");

    var fragment = document.createDocumentFragment();
    //Header
    var header = table.querySelector("thead");
    var tableheader_row = document.createElement("tr");
    header.appendChild(tableheader_row);
    
    tableheader_row.appendChild(renderColumnNavigation("left"));
    tableheader_row.appendChild(renderColumnNavigation("right"));
    
    var visRowsPage = page.getVisRows()
    
    //Body
    data.forEach(function(dataRow, idxRow) {
      
      var htmlRow = document.createElement("tr");
      htmlRow.setAttribute("class", ((idxRow % 2 !==0) ? "even" : "odd") + " row_"+idxRow);
      if(visRowsPage.includes(idxRow)){
          htmlRow.style.visibility = "visible";
      }else{
          htmlRow.style.visibility = "collapse";
      }
      
      var left_nav_cell = document.createElement("td");
      left_nav_cell.setAttribute("class","right-navigator-column");
      var right_nav_cell = document.createElement("td");
      right_nav_cell.setAttribute("class","left-navigator-column");
      
      htmlRow.appendChild(left_nav_cell);
      htmlRow.appendChild(right_nav_cell)

      fragment.appendChild(htmlRow);
    });

    tbody = document.createElement("tbody");
    tbody.appendChild(fragment);

    table.appendChild(tbody);
    
  }

  // draw table framework/shell to be filled
  me.drawTable = function(){
    drawTableShell();
    drawTableShellContents();
  };
  
  me.addTableContents = function(startCol, backwards){

    if (tableDiv.clientWidth > 0) {
      tableDiv.style.opacity = 1;
    }

    var visibleColumns = []
    var columnNumber = startCol;

    var tableDivStyle = window.getComputedStyle(tableDiv, null);
    var tableDivPadding = parsePadding(tableDivStyle.paddingLeft) +
      parsePadding(tableDivStyle.paddingRight);

    var currentWidth = 0;
    
    while (true) {
      
      var columnWidth = columns.getColWidth(columnNumber)
      var currentWidth = currentWidth + columnWidth[0];
      
      //If we know the width of the element, and it will be too wide, nah dog, break out of this loop
      
      if (tableDiv.clientWidth - tableDivPadding < currentWidth) {
        break;
      }
      
      me.makeColumn(columnNumber, backwards)
      
      // we do not pre-define html element widths, so who knows how wide it will be?
      if(columnWidth[1]){
        
        var html_column = pagedTable.querySelector("table").querySelector("tbody").querySelectorAll(".col_" + columnNumber);
        // get width for each element and compare against current persribed width
        html_column.forEach(function(el){
          columnWidth[0] = Math.max( columnWidth[0], 
          el.children[0].offsetWidth);
        })
        currentWidth = currentWidth + columnWidth[0]
        columns.setColWidth(columnNumber, columnWidth[0]);

        if (tableDiv.clientWidth - tableDivPadding < currentWidth) {
          // we need to hide the column that is too wide
          // hiding prevents having to re-generate
          me.toggleColumn("col_" + columnNumber);
          break;
        }
        
      }
      
      visibleColumns.push(columnNumber)
      
      if(columnNumber ===  columns.total -1 ){
        break
      }

      // dont try to add more fields columns than exist      
      if( (columnNumber  === 0 & backwards) ){
        // if we are moving backwards and hit the first column, but did 
        // not fill the table, repopulate with the "old" columns
        if( tableDiv.clientWidth - tableDivPadding > currentWidth){
          backwards = !backwards
          columnNumber = visibleColumns[0]
          visibleColumns = visibleColumns.slice().reverse();
        }else{
          break
        }
      }
      
      if( (columnNumber === columns.total-1 & !backwards)){
        // if we are moving to the right and hit the last column, but did 
        // not fill the table, repopulate with the "old" columns
        if( tableDiv.clientWidth - tableDivPadding > currentWidth & visibleColumns[0] != 0){
          backwards = !backwards
          columnNumber = visibleColumns[0]
          visibleColumns = visibleColumns.slice().reverse();
        }else{
          break
        }
      }
      
      
      if(backwards){
        columnNumber -= 1;
      } else {
        columnNumber += 1;
      }
    }
    
    if(backwards){
      visibleColumns = visibleColumns.slice().reverse();
    }
    
    columns.setVisibleColumns(visibleColumns)

  };

  // called on initialization of the table, and should be used to first draw table
  me.init = function() {
    
    //create framework table
    me.drawTable()
    
    //initialization of stuff
    renderMeasures();
    measurer.calculate(measuresCell);
    columns.calculateWidths(measurer.measures);
    
    //add table contents
    me.addTableContents(0, false);
    
    renderFooter();

    me.toggleColumnNavigation("right");
    
    if(columns.visCols.length === columns.total){
      me.toggleColumnNavigation("left");
    }

    // retry seizing columns later if the host has not provided space
    function retryFit() {
      if (tableDiv.clientWidth <= 0) {
        setTimeout(retryFit, 100);
      } else {
        me.render();
        triggerOnChange();
      }
    }
    if (tableDiv.clientWidth <= 0) {
      retryFit();
    }

    return me;
  };

  var registerWidths = function() {
    columns.subset = columns.subset.map(function(column) {
      column.width = columns.widths[column.name].inner;
      return column;
    });
  };

  var parsePadding = function(value) {
    return parseInt(value) >= 0 ? parseInt(value) : 0;
  };

  me.fixedHeight = function() {
    return options.rows.max != null;
  }

  me.fitRows = function() {
    if (me.fixedHeight())
      return;

    measurer.calculate(measuresCell);

    var rows = options.rows.min !== null ? options.rows.min : 0;
    var headerHeight = header !== null && header.offsetHeight > 0 ? header.offsetHeight : 0;
    var footerHeight = footer !== null && footer.offsetHeight > 0 ? footer.offsetHeight : 0;

    if (pagedTable.offsetHeight > 0) {
      var availableHeight = pagedTable.offsetHeight - headerHeight - footerHeight;
      rows = Math.floor((availableHeight) / measurer.measures.height);
    }

    rows = options.rows.min !== null ? Math.max(options.rows.min, rows) : rows;

    page.setRows(rows);
  }

  me.render = function() {
    
    // 06/05/2020 EHH
    // Proposal to redraw the frame of the table, then fit in the
    // columns one at a time
    //me.drawTable()
    //me.fitColumns(false);

    /*
    me.fitColumns(false);
    
    // render header/footer to measure height accurately
    renderHeader();
    renderFooter();

    me.fitRows();
    renderBody();

    // re-render footer to match new rows
    renderFooter();
    */
  }

  var resizeLastWidth = -1;
  var resizeLastHeight = -1;
  var resizeNewWidth = -1;
  var resizeNewHeight = -1;
  var resizePending = false;

  me.resize = function(newWidth, newHeight) {

    function resizeDelayed() {
      resizePending = false;

      if (
        (resizeNewWidth !== resizeLastWidth) ||
        (!me.fixedHeight() && resizeNewHeight !== resizeLastHeight)
      ) {
        resizeLastWidth = resizeNewWidth;
        resizeLastHeight = resizeNewHeight;

        setTimeout(resizeDelayed, 200);
        resizePending = true;
      } else {
        me.render();
        triggerOnChange();

        resizeLastWidth = -1;
        resizeLastHeight = -1;
      }
    }

    resizeNewWidth = newWidth;
    resizeNewHeight = newHeight;

    if (!resizePending) resizeDelayed();
  };
};

var PagedTableDoc;
(function (PagedTableDoc) {
  var allPagedTables = [];

  PagedTableDoc.initAll = function() {
    allPagedTables = [];

    var pagedTables = [].slice.call(document.querySelectorAll('[data-pagedtable="false"],[data-pagedtable=""]'));
    pagedTables.forEach(function(pagedTable, idx) {
      pagedTable.setAttribute("data-pagedtable", "true");
      pagedTable.setAttribute("pagedtable-page", 0);
      pagedTable.setAttribute("class", "pagedtable-wrapper");

      if (pagedTable.hasAttribute("data-pagedtable-source")) {
        var xmlhttp = new XMLHttpRequest();
        var url = pagedTable.getAttribute("data-pagedtable-source");

        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var source = JSON.parse(this.responseText);

            allPagedTables.push((new PagedTable(pagedTable, source)).init());
          }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
      }
      else {
        var pagedTableInstance = new PagedTable(pagedTable);
        pagedTableInstance.init();

        allPagedTables.push(pagedTableInstance);
      }
    });
  };

  PagedTableDoc.resizeAll = function() {
    allPagedTables.forEach(function(pagedTable) {
      pagedTable.render();
    });
  };

  window.addEventListener("resize", PagedTableDoc.resizeAll);

  return PagedTableDoc;
})(PagedTableDoc || (PagedTableDoc = {}));

window.onload = function() {
  PagedTableDoc.initAll();
};

pagedtable = {
  create: function(dataframe, element, options) {
    if (typeof(options) === "undefined") options = {};
    (new PagedTable(element, Object.assign(dataframe, { options: options }))).init();
    return dataframe;
  }
};
