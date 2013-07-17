/*
namespace:
version 0.7.1
build 6 - 2013/07/17 23:00:39
Copyright (c) 2013 Tsuyoshi Kodama

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var namespace=function(h){var b={},c=function(a,b){var f=h,d=a.split("."),e,c;e=0;for(c=d.length;e<c;e++)"undefined"===typeof f[d[e]]&&(f[d[e]]=e<c-1?{}:b||{}),f=f[d[e]];return f};c.define=function(a,c){if(b[a])throw Error("namespce.define: Define MultiPlexed.");b[a]={func:c,constructing:!1}};c.require=function(a){if(!b[a]){var g=h,f=a.split("."),d,e;d=0;for(e=f.length;d<e;d++){if("undefined"===typeof g[f[d]])throw Error("namespace.require: required namespce is not defined.");g=g[f[d]]}b[a]={obj:g};
return b[a].obj}if(b[a].obj)return b[a].obj;if(b[a].constructing)throw Error("namespace.require: looped dependensies.");b[a].constructing=!0;b[a].obj=c(a,b[a].func());return b[a].obj};c.reset_=function(){b={}};return c}(this);