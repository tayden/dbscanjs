const rangeQuery = (data, dist, q, eps) =>
  data.filter(p => dist(p.data, q.data) <= eps);

function dbscan(data, dist, eps, minPts) {
  c = 0;
  data = data.map((p, i) => ({
    idx: i,
    data: p,
    label: -1
  }));

  data.forEach(p => {
    // Only process unlabelled points
    if (p.label !== -1) return;

    // Get all the points neighbors
    n = rangeQuery(data, dist, p, eps);

    // Check if point is noise
    if (n.length < minPts) {
      p.label = 0;
      return;
    }

    c += 1; // Next cluster label
    p.label = c; // Label initial point

    // Remove point p from n
    s = n.filter(q => q.idx !== p.idx);

    // Process every seed point
    while (s.length) {
      q = s.pop();

      if (q.label === 0) q.label = c; // Change noise to border
      if (q.label !== -1) continue; // Previously processed
      q.label = c; // Label neighbor

      // Find neighbors
      n = rangeQuery(data, dist, q, eps);

      // Add new neighbors to seed
      if (n.length >= minPts) s = s.concat(n);
    }
  });

  return data.map(d => d.label - 1);
}

module.exports = dbscan;
