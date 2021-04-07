function drawBackdrop() {
    // select the div which is particles
    var viz = d3.select("#home-backdrop"),
        // get the width of the div
        width = d3.getSize(viz.style('width')),
        // assign the height
        height = 600,
        // particle radius
        radius = 4.5, //4.0
        // min distance between particles
        minDistance = 50, //40
        // max distance between particles
        maxDistance = 80, //80
        minDistance2 = minDistance * minDistance,
        maxDistance2 = maxDistance * maxDistance,
        // number of particles
        n = 100,
        // create a new array of size 'n'
        particles = new Array(n),
        paper;

    // assign random locations (coordinates) for each particle
    for (var i = 0; i < n; ++i) {
        particles[i] = {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0
        };
    }

    // calling draw function
    draw('svg');

    var time0 = d3.now(), frames = 0, time1;

    d3.timer(function () {
        redraw();

        frames++;
        time1 = d3.now();
        if (time1 - time0 > 1000) {
            time0 = time1;
            frames = 0;
        }
    });

    // draw function
    function draw(type, r) {
        viz.select('.particles').remove();
        paper = viz.append(type)
            .classed('particles', true)
            .attr('width', width).attr('height', height).canvasResolution(r).canvas(true)
            .style('fill', '#808080')
            .style('stroke', '#808080');

        paper.append('g').classed('circles', true)
            .selectAll('circle')
            .data(particles)
            .enter()
            .append('circle').attr('r', radius)
            .style('stroke-width', 0);
    }

    // redraw function
    function redraw() {
        paper.select('.circles').selectAll('circle')
            .attr('cx', function (p) {
                p.x += p.vx;
                if (p.x < -maxDistance) p.x += width + maxDistance * 2;
                else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
                p.vx += 0.2 * (Math.random() - .5) - 0.01 * p.vx;
                return p.x;
            })
            .attr('cy', function (p) {
                p.y += p.vy;
                if (p.y < -maxDistance) p.y += height + maxDistance * 2;
                else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
                p.vy += 0.2 * (Math.random() - .5) - 0.01 * p.vy;
                return p.y;
            });

        paper.select('.lines').remove();

        var lines = paper.append('g').classed('lines', true),
            opacity;

        for (var i = 0; i < n; ++i) {
            for (var j = i + 1; j < n; ++j) {
                var pi = particles[i],
                    pj = particles[j],
                    dx = pi.x - pj.x,
                    dy = pi.y - pj.y,
                    d2 = dx * dx + dy * dy;
                if (d2 < maxDistance2) {
                    opacity = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                    lines.append('line')
                        .attr('x1', pi.x).attr('y1', pi.y).attr('x2', pj.x).attr('y2', pj.y)
                        .style('opacity', opacity);
                }
            }
        }
    }
}