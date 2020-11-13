import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Modal } from "react-bootstrap";
import axios from "axios"




export default function TeamRegistration({currentUser}) {

	const teamNameRef = useRef();
	const username1Ref = useRef();
	const username2Ref = useRef();
	const username3Ref = useRef();
	const username4Ref = useRef();
  const username5Ref = useRef();
  
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const submitTeam = async event => {
    event.preventDefault();
    // setError("");

		console.log("submitting team form...");
		try {
      const members = [];
      username1Ref.current.value && members.push(username1Ref.current.value)
      username2Ref.current.value && members.push(username2Ref.current.value)
      username3Ref.current.value && members.push(username3Ref.current.value)
      username4Ref.current.value && members.push(username4Ref.current.value)
      username5Ref.current.value && members.push(username5Ref.current.value)
      const test = teamNameRef.current.value;
      const res = await axios({
        method: 'POST',
        url: `http://localhost:5001/mymizuteams/us-central1/checkTeamAndCreate?name=${test}`,
        data: members,
      });
      const message = String(res.data);
      console.log(message, !message === "Your team has been created!");

      if(!message === "Your team has been created!") {
        setAlert(message);
        console.log("here")
      }

			// TODO:
			// verify all usernames exist
			// submit team info to our db
		} catch (error) {
      console.log(error)
		}
  };
  return (
  <div className="container-fluid">
  <div className="text-center">
  <Card id="card" >
				{/* <Card.Header>Featured</Card.Header>  */}
				<div className="text-center">
					<img
						id="logo"
						src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
						alt="my mizu logo"
					></img>
					<Card.Body>

              <Card.Title id="title">Welcome to mymizu teams{currentUser && <p><h2><strong> {currentUser.displayName}</strong></h2></p>}</Card.Title>
							<Card.Text id="label-desc">
                Create a team and get started
                
							</Card.Text>
    <Button variant="primary" onClick={handleShow} id="submit_button">
      Create Your Team
    </Button>
    
    </Card.Body>
    </div>
    </Card>

<Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create Your Team</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
    {alert && <Alert variant="danger">{alert}</Alert>}
    </div>
    <Form onSubmit={submitTeam} className="text-left">
      <Form.Group id="form">
        <Form.Label id="label">Team name</Form.Label>
        <Form.Control
          type="username"
          ref={teamNameRef}
          placeholder="Enter a team name"
        />
      </Form.Group>
      <Form.Group id="form">
        <Form.Label id="label">Team admin</Form.Label>
        <Form.Control
          type="username"
          ref={username1Ref}
          placeholder="Enter your mymizu username"
        />
      </Form.Group>
      <Form.Group id="form">
        <Form.Label id="label">Teammates</Form.Label>
        <Form.Control
          type="username"
          ref={username2Ref}
          placeholder="Enter a teammate's username"
        />
      </Form.Group>
      <Form.Group id="form">
        <Form.Control
          type="username"
          ref={username3Ref}
          placeholder="Enter a teammate's username"
        />
      </Form.Group>
      <Form.Group id="form">
        <Form.Control
          type="username"
          ref={username4Ref}
          placeholder="Enter a teammate's username"
        />
      </Form.Group>
      <Form.Group id="form">
        <Form.Control
          type="username"
          ref={username5Ref}
          placeholder="Enter a teammate's username"
        />
      </Form.Group>
      <div className="d-flex justify-content-center landing-container" id="button">
        <Button className="m-2" variant="primary" type="submit" id="form_button" >Create team</Button>
        <Button className="m-2" variant="secondary" onClick={handleClose}  id="form_button" >
        Close
      </Button>
      </div>
    </Form>
</Modal.Body>
</Modal>
  </div>



</div>
);
}
/*
	return (
		<div className="container-fluid">
			<Card id="card" className="p-4">
				<div className="text-center">
        <img
						id="logo"
						src="//s3.amazonaws.com/appforest_uf/f1605150684387x698733875171169100/teams_logo.png"
						alt="my mizu logo"
					></img>
          <h3 className="text-center mb-4" id="title">
						Oh no, you are currently not in a team!
					</h3>
					<h3 className="text-center mb-4" id="title">
						Create one, and join the race!
					</h3>
					<Form onSubmit={submitTeam} className="text-left">
						<Form.Group id="form">
							<Form.Label id="label">Team name</Form.Label>
							<Form.Control
								type="username"
								ref={teamNameRef}
								placeholder="Enter a team name"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Label id="label">Team admin</Form.Label>
							<Form.Control
								type="username"
								ref={username1Ref}
								placeholder="Enter your mymizu username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Label id="label">Teammates</Form.Label>
							<Form.Control
								type="username"
								ref={username2Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username3Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username4Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<Form.Group id="form">
							<Form.Control
								type="username"
								ref={username5Ref}
								placeholder="Enter a teammate's username"
							/>
						</Form.Group>
						<div className="text-center" id="button">
							<Button type="submit">Create team</Button>
						</div>
					</Form>
				</div>
			</Card>
		</div>
	);
}
*/