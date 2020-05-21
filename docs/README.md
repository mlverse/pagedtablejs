# Getting Started

To use `pagedtable.js` first include its javascript source:

```html
<script type="text/javascript" src="js/pagedtable.js"></script>
```

You can then easily create a table with the JSON from a URL:

```html
<div data-pagedtable data-pagedtable-source="https://mlverse.github.io/pagedtablejs/data/iris.json"></div>
```
```html
/*display*/
<div data-pagedtable>
  <script data-pagedtable-source type="application/json">[{"Sepal.Length":5.1,"Sepal.Width":3.5,"Petal.Length":1.4,"Petal.Width":0.2,"Species":"setosa"},{"Sepal.Length":4.9,"Sepal.Width":3,"Petal.Length":1.4,"Petal.Width":0.2,"Species":"setosa"},{"Sepal.Length":4.7,"Sepal.Width":3.2,"Petal.Length":1.3,"Petal.Width":0.2,"Species":"setosa"},{"Sepal.Length":4.6,"Sepal.Width":3.1,"Petal.Length":1.5,"Petal.Width":0.2,"Species":"setosa"},{"Sepal.Length":5,"Sepal.Width":3.6,"Petal.Length":1.4,"Petal.Width":0.2,"Species":"setosa"}]</script>
</div>
```

Or by embedding JSON directly into your HTML as follows:

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
<div data-pagedtable>
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

You can also customize the range of rows and columns to show by adding `options` in your data source:

```html
/*preview*/
<div data-pagedtable>
  <script data-pagedtable-source type="application/json">
    {
      "options": {
        "rows": { "min": 2, "max": 4 },
        "columns": { "min": 2, "max": 3 }
      },
      "data": [
        { "Column A": 1, "Column B": 1, "Column C": 1, "Column D": 1, "Column E": 1},
        { "Column A": 2, "Column B": 2, "Column C": 2, "Column D": 2, "Column E": 2},
        { "Column A": 3, "Column B": 3, "Column C": 3, "Column D": 3, "Column E": 3},
        { "Column A": 4, "Column B": 4, "Column C": 4, "Column D": 4, "Column E": 4},
        { "Column A": 5, "Column B": 5, "Column C": 5, "Column D": 5, "Column E": 5},
        { "Column A": 6, "Column B": 6, "Column C": 6, "Column D": 6, "Column E": 6}
      ]
    }
  </script>
</div>
```

# Customizing

Appart from specifying the minimum rows and columns to display, you can also customize the columns with specific labels, alignment and type.

```html
/*preview*/
<div data-pagedtable style="width: 50%; margin: auto;">
  <style>
    .pagedtable {
      font-style: italic;
    }
    .pagedtable .even {
      background-color: rgba(140, 200, 140, 0.1);
    }
  </style>
  <script data-pagedtable-source type="application/json">
    {
      "columns": [
        { "name": "name", "label": "Automobile", "type": "character" },
        { "name": "mpg",  "label": "MPG",        "type": "numeric" }
      ],
      "options": {
        "columns": { "min": 1, "max": 20 },
        "rows":    { "min": 10, "max": 20 },
        "shadowDOM": true
      },
      "data": [
        { "name": "Mazda RX4",         "mpg": 21.0 },
        { "name": "Mazda RX4 Wag",     "mpg": 21.0 },
        { "name": "Datsun 710",        "mpg": 22.8 },
        { "name": "Hornet 4 Drive",    "mpg": 21.4 },
        { "name": "Hornet Sportabout", "mpg": 18.7 }
      ]
    }
  </script>
</div>
```

Notice that the previous example also makes use of `<style>` to customize additional styles. Under the hood, a paged table makes use of the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to have consistent styling, to turn this off set `shadowDOM` to `false` in the options.

# Programmatic

You can also create a paged table programmatically by creating the `PagedTable` object on your:

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

You can make use of [D3.js](https://d3js.org/) and other libraries to load data into `pagedtable.js`; for instance, using D3s `csv()` function we can load data as follows:

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

You can also integrate `pagedetable.js` with frameworks like [Vue.js](http://vuejs.com/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/) and many others. The next example shows how to make use of Vue.js, please make sure that you reference the framework docs to properly integrate and follow best practices.

```html
/*display*/
<iframe src="examples/vue.html" style="height: 460px;"></iframe>
```
