# DBSCAN.js

This library implements a minimal DBSCAN algorithm in javascript.

## Usage

This library exposes a single function `dbscan`.

### dbscan(data, distance, epsilon, minPts) => _labels [array]_

1.  `data`: A list-like object of data to perform the clustering on
2.  `distance`: a function that takes any two items from the data array and returns a scalar value describing the distance between them.
3.  `epsilon`: The maximum distance between two points for them to be considered as being in the same neighborhood.
4.  `minPts`: The minimum number of points in any group for them to be considered a distinct group. All other points are considered to be noise, and will receive a label of -1.

`labels` is the returned list of clustered group labels. These labels correspond to the data points in `data` with the same array index. A label of -1 indicates the point is noise. All points with a value >= 0 indicate those points are in the same cluster, _e.g._ all points with label 1 belong to cluster 1.

## Example

```javascript
const dbscan = require("dbscan");

const data = [
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 1],
  [3, 2],
  [10, 12],
  [12, 10],
  [13, 11],
  [13, 10],
  [8, 9]
];

function distance(a, b) {
  x = Math.pow(a[0] - b[0], 2);
  y = Math.pow(a[1] - b[1], 2);
  return Math.sqrt(x + y);
}

epsilon = 3;
minPts = 2;
labels = dbscan(data, distance, epsilon, minPts);

console.log(labels);
// [1, 1, 1, 1, 1, 0, 0, 0, 0, -1]
```
