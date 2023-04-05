/** @format */

export function scatterPlot() {
	const width = 920;
	const height = 570;

	const tooltip = d3
		.select("#scatter-plot")
		.append("div")
		.attr("id", "tooltip")
		.style("opacity", 0);

	const legend = d3
		.select("#scatter-plot")
		.append("div")
		.attr("id", "legend")
		.style("opacity", 0.9)
		.style("position", "absolute")
		.style("width", "210px")
		.style("background-color", "white")
		.style("border", "1px solid black")
		.style("padding", "6px");

	const svg = d3
		.select("#scatter-plot")
		.append("svg")
		.attr("display", "block")
		.attr("width", width)
		.attr("height", height + 10);

	let dataArray = [];

	fetch(
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			dataArray = data;
			console.log(dataArray[0]);
			const xScale = d3
				.scaleLinear()
				.domain([
					d3.min(dataArray, (d) => d.Year - 1),
					d3.max(dataArray, (d) => d.Year + 1),
				])
				.range([0, width - 50]);

			const yScale = d3
				.scaleTime()
				.domain(d3.extent(dataArray, (d) => new Date(d.Seconds * 1000)))
				.range([0, height - 16]);

			const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
			const yAxis = d3
				.axisLeft(yScale)
				.tickFormat(d3.timeFormat("%M:%S"));

			svg.append("g")
				.call(xAxis)
				.attr("id", "x-axis")
				.attr("transform", "translate(35, 554)");

			svg.append("g")
				.call(yAxis)
				.attr("id", "y-axis")
				.attr("transform", "translate(35, 0)");

			svg.selectAll("circle")
				.data(dataArray)
				.enter()
				.append("circle")
				.attr("cx", (d, i) => xScale(d.Year) + 35)
				.attr("cy", (d, i) => yScale(new Date(d.Seconds * 1000)))
				.attr("r", 5)
				.attr("class", "dot")
				.attr("data-xvalue", (d, i) => d.Year)
				.attr("data-yvalue", (d, i) => new Date(d.Seconds * 1000))
				.style("opacity", 0.6)
				.style("fill", (d, i) => {
					if (d.Doping === "") {
						return "blue";
					} else {
						return "red";
					}
				})
				.on("mouseover", (event, d) => {
					tooltip.style("opacity", 0.9);
					tooltip.attr("data-year", d.Year);
					tooltip.html(
						d.Nationality +
							": " +
							d.Name +
							"<br/>" +
							"Year: " +
							d.Year +
							", Time: " +
							d.Time +
							(d.Doping ? "<br/><br/>" + d.Doping : "")
					);

					tooltip.style("left", event.pageX + "px");
					tooltip.style("top", event.pageY - 20 + "px");
				})
				.on("mouseout", function (d) {
					tooltip.transition().duration(200).style("opacity", 0);
				});

			legend
				.append("text")
				.text("No doping allegations")
				.style("font-size", "12px");

			legend
				.append("svg")
				.attr("id", "svgLegend")
				.attr("width", 18)
				.attr("height", 18)
				.append("rect")
				.attr("width", 18)
				.attr("height", 18)
				.style("opacity", 0.9)
				.style("fill", "blue");

			legend.append("br");

			legend
				.append("text")
				.text("Riders with doping allegations")
				.style("font-size", "12px");

			legend
				.append("svg")
				.attr("id", "svgLegend")
				.attr("width", 18)
				.attr("height", 18)
				.append("rect")
				.attr("width", 18)
				.attr("height", 18)
				.style("opacity", 0.9)
				.style("fill", "red");
		});
}
