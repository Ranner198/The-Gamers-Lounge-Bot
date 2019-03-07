<h1 align="center">Print Stack</h1>

<p align="center"> Stack tracing module that shows the script's name and line number of the position called </p>

<hr/>

<p>  I was needing a way to display all of the errors in my huge discord script as far as Script Name and line number so I could track it down better, with this package you can easily and quickly find where your errors are at. </p>

<h3> List of features </h3>

<ul>
<li>Ability to call the Print Stack function with optional overloading for error logging with or without an additional comment passed.</li>
</ul>

<hr/>

<h3> Example Usage </h3>


<h3> Download & Installation </h3>

```shell
$ npm i printstack
```
<h3>Usage</h3>

```javascript
var Stack = require('printstack');
Stack.PrintStack();
//File: <The File Name>
//Line Number: <Line Number>
//or
Stack.PrintStack("This is a comment that will show up.");
//File: <The File Name>
//Line Number: <Line Number>
//This is a comment that will show up.
```

<hr/>

<h3>Authors or Acknowledgments</h3>
<ul>
<li>Ran Crump <ranner198></li>
</ul>

<h3>License</h3>
<p>This project is licensed under the MIT License</p>

