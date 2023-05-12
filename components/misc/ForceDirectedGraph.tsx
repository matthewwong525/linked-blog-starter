import * as d3 from "d3";
import { useEffect, useRef } from "react";
import styles from "../../styles/ForceDirectedGraph.module.css";

type Props = {
	backlinks: {
		[k: string]: {
			title: string;
			excerpt: string;
		};
	};
	title: string;
};

const ForceDirectedGraph = ({ backlinks, title }: Props) => {
	const graphRef = useRef<SVGSVGElement>(null);

	const getGraphView = () => {
		if (!graphRef.current) return;
		const svgElement = graphRef.current;
		const width = svgElement.getBoundingClientRect().width;
		const height = svgElement.getBoundingClientRect().height;

		const simulation = d3
			.forceSimulation()
			.force(
				"link",
				d3
					.forceLink()
					.id((d) => d.node)
					.distance(50)
			)
			.force("charge", d3.forceManyBody().strength(-500))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force(
				"collision",
				d3.forceCollide((d) => d.degree + 30)
			);

		const links = Object.values(backlinks).map((value) => ({
			source: value.title,
			target: title,
		}));

		const testNode = Object.values(backlinks).map((value) => ({
			node: value.title,
		}));

		const nodes = [
			{
				node: title,
			},
			...testNode,
		];

		const dragStarted = (event: any, d: any) => {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		};

		const dragged = (event: any, d: any) => {
			d.fx = event.x;
			d.fy = event.y;
		};

		const dragEnded = (event: any, d: any) => {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		};

		const link = d3
			.select(graphRef.current)
			.append("g")
			.attr("class", styles.link)
			.selectAll("line")
			.data(links)
			.enter()
			.append("line");

		const node = d3
			.select(graphRef.current)
			.append("g")
			.attr("class", styles.node)
			.selectAll("g")
			.data(nodes)
			.join("g")
			.on("mouseover", function () {
				d3.select(this).style("fill", "red");
			})
			.on("mouseout", function () {
				d3.select(this).style("fill", "black");
			})
			.on("click", function (e) {
				window.location.href = `/${e.target.__data__.node}`;
			})
			.call(
				d3
					.drag()
					.on("start", dragStarted)
					.on("drag", dragged)
					.on("end", dragEnded)
			);

		node.append("circle").attr("class", styles.node).attr("r", 8);
		node
			.append("text")
			.attr("x", 8)
			.attr("y", "0.31em")
			.attr("stroke", "black")
			.attr("class", styles.text)
			.attr("stroke-opacity", 0.3)
			.text((d) => d.node);

		simulation.nodes(nodes).on("tick", () => {
			link
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y);

			node.attr("transform", (d) => `translate(${d.x},${d.y})`);
		});

		simulation.force("link").links(links);
	};

	useEffect(() => {
		getGraphView();
	}, []);

	return <svg className="w-full h-full relative" ref={graphRef} />;
};

export default ForceDirectedGraph;