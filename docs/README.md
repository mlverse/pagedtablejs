# Getting Started

To use `pagedtable.js` first include its javascript and stylesheet:

```html
<link rel="stylesheet" href="../css/pagedtable.css">
<script type="text/javascript" src="../js/pagedtable.js"></script>
```

You can then easily create a table with the JSON embedded as follows:

```html
/*preview*/
<div data-pagedtable>
  <script data-pagedtable-source type="application/json">
    [
      { "name": "Mazda RX4",         "mpg": 21.0 },
      { "name": "Mazda RX4 Wag",     "mpg": 21.0 },
      { "name": "Datsun 710",        "mpg": 22.8 },
      { "name": "Hornet 4 Drive",    "mpg": 21.4 },
      { "name": "Hornet Sportabout", "mpg": 18.7 }
    ]
  </script>
</div>
```

Notice that the data is specified row-wise, which is the default serialization for tables in JSON.

# Paging

Paging is automatically enabled as needed. If there is not enough space to render all rows or all columns, `pagedtable.js` will add paging for you. 

```html
/*preview*/
<div data-pagedtable style="width: 400px">
  <script data-pagedtable-source type="application/json">
    [
      { "Column A": 1, "Column B": 1, "Column C": 1, "Column D": 1, "Column E": 1},
      { "Column A": 2, "Column B": 2, "Column C": 2, "Column D": 2, "Column E": 2},
      { "Column A": 3, "Column B": 3, "Column C": 3, "Column D": 3, "Column E": 3},
      { "Column A": 4, "Column B": 4, "Column C": 4, "Column D": 4, "Column E": 4},
      { "Column A": 5, "Column B": 5, "Column C": 5, "Column D": 5, "Column E": 5},
      { "Column A": 6, "Column B": 6, "Column C": 6, "Column D": 6, "Column E": 6}
    ]
  </script>
</div>
```

# Programmatic

You can also load data programmatically by creating the `PagedTable` object on your:

```html
/*preview*/
<div id="pagedtable"></div>
<script type="application/javascript">
  var dataframe = {
    "columns": [{ "name": "letter" }, { "name": "number" }],
    "data": []
  };

  for (var idx = 0; idx < 26; idx++) {
    dataframe.data[idx] = { letter: String.fromCharCode('A'.charCodeAt(0) + idx), number: idx + 1 };
  }
  
  var pagedTableElem = document.getElementById("pagedtable");
  var pagedTable = new PagedTable(pagedTableElem, dataframe);
  pagedTable.init()
</script>
```

# Loading

You can make use of D3.js and other libraries to load data into `pagedtable.js`; for instance, using D3s `csv()` function we can load data as follows:

```html
<div id="pagedtable-d3"></div>
<script type="application/javascript">
  d3.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv").then(function(dataframe) {
    (new PagedTable("pagedtable-d3", dataframe)).init();
  });
</script>
```
```html
/*display*/
<div id="pagedtable-d3"></div>
```

# Frameworks

You can also integrate `pagedetable.js` with frameworks like Vue.js, React, Svelte and many others. The next example shows how to make use of Vue.js, please make sure that you reference the framework docs to properly integrate and follow best practices.

```html
/*display*/
<iframe src="examples/vue.html" style="height: 460px;"></iframe>
```
