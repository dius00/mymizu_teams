import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Nav, Container } from "react-bootstrap";
import forest from "../../assets/bg-forest.jpg";
import sea from "../../assets/bg-sea.jpg";


export default function TeamStats({teamStats}) {
  const [statsView, setStatsView] = useState("total");


	return (
		<div className="container-fluid">
		<Card className="mt-4 mr-2 ml-2 mb-2" id="card">
    <div className="text-center">
        <img
						id="logo"
						src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
						alt="my mizu logo"
					></img></div>
			<h3 className="text-center mb-4" id="title">
				My Weekly Team Stats
        
			</h3>
			<Card.Header >
				<Nav fill variant="tabs" defaultActiveKey="#total">
					<Nav.Item>
						<Nav.Link
							href="#avg"
							onClick={() => setStatsView("avg")}
							id="label-desc"
						>
							Per person avg.
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							href="#total"
							onClick={() => setStatsView("total")}
							id="label-desc"
						>
							Team Total
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body id="card" c>
        
				{statsView === "avg" && (
					<span className="d-flex flex-row justify-content-around align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center text-white" style={{
             height:"400px",
             width:"400px",
             backgroundImage: `url(${sea})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "10px",
            }}>
              <h1 >Bottles saved </h1>
              <h1>{((teamStats.weekly_water/500)/teamStats.members.length).toFixed(1)}</h1>
           </div>
           <div className="d-flex flex-column justify-content-center align-items-center text-white" style={{
             height:"400px",
             width:"400px",
             backgroundImage: `url(${forest})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "10px",
            }}>
              <h1 >CO<small>2</small> saved </h1>
              <h1>{(((teamStats.weekly_water/500)/teamStats.members.length)*82.8).toFixed(1)} gr</h1>
           </div>					</span>
				)}
				{statsView === "total" && (
					<span className="d-flex flex-row justify-content-around align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center text-white" style={{
             height:"400px",
             width:"400px",
             backgroundImage: `url(${sea})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "10px",
            }}>
              <h1>Bottles saved </h1>
              <h1>{(teamStats.weekly_water/500).toFixed(1)}</h1>
           </div>
           <div className="d-flex flex-column justify-content-center align-items-center text-white" style={{
             height:"400px",
             width:"400px",
             backgroundImage: `url(${forest})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "10px",
            }}>
              <h1>CO<small>2</small> saved </h1>
              <h1>{((teamStats.weekly_water/500)*82.8).toFixed(1)} gr</h1>
           </div>
          </span> 
          )}
			</Card.Body>
		</Card>
		</div>
	);
}
