import WeeklyBoard from "./WeeklyBoard";
import MonthlyBoard from "./MonthlyBoard";
import { Card, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

export default function Leaderboards({ currentUser }) {
	if (!currentUser) window.location = "/";

	const [listView, setListView] = useState("monthly");
	useEffect(() => {
		async function test() {
			const table = await db().ref("teams");
			table.once("value", data => console.log(data.val()));
		}

		test();
	}, []);

	return (
		<Card className="mt-4 mr-2 ml-2 mb-2" id="card">
			<Card.Header id="header">
				<Nav fill variant="tabs" defaultActiveKey="#monthly">
					<Nav.Item>
						<Nav.Link
							href="#weekly"
							onClick={() => setListView("weekly")}
							id="label-desc"
						>
							Weekly
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href="#monthly"
							onClick={() => setListView("monthly")}
							id="label-desc"
						>
							Monthly
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#alltimes" disabled id="label-desc">
							All Times
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body id="card">
				{listView === "weekly" && <WeeklyBoard />}
				{listView === "monthly" && <MonthlyBoard />}
			</Card.Body>
		</Card>
	);
}
