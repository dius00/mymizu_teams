import React, { useState } from "react";
import { Form, Button, Card, Alert, Nav } from "react-bootstrap";
import ocean from "../../Assets/bg2.jpg";

export default function TeamStats() {
	const [totalCarbon, setTotalCarbon] = useState(null);
	const [avgCarbon, setAvgCarbon] = useState(null);
	const [totalBottles, setTotalBottles] = useState(null);
	const [avgBottles, setAvgBottles] = useState(null);
	const [statsView, setStatsView] = useState("total");

	return (
		<div className="container-fluid">
		<Card className="mt-4 mr-2 ml-2 mb-2" id="card">
			<h3 className="text-center mb-4" id="title">
				My Team Stats
			</h3>
			<Card.Header id="header">
				<Nav fill variant="tabs" defaultActiveKey="#total">
					<Nav.Item>
						<Nav.Link
							href="#avg"
							onClick={() => setStatsView("avg")}
							id="label-desc"
						>
							Avg
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href="#total"
							onClick={() => setStatsView("total")}
							id="label-desc"
						>
							Total
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body id="card">
				{statsView === "avg" && (
					<span>
						<div id="div-inline">Avg. bottles saved: {avgBottles}</div>
						<div id="div-inline">Avg. C02 saved: {avgCarbon}</div>
					</span>
				)}
				{statsView === "total" && (
					<span>
						<div id="div-inline">Total bottles saved: {totalBottles}</div>
						<div id="div-inline">Total C02 saved: {totalCarbon}</div>
					</span>
				)}
			</Card.Body>
		</Card>
		</div>

		// <Card id="card">
		// 	<div className="text-center">
		// 		<h1>How's my team doing? </h1>
		// 	</div>
		// </Card>
	);
}
