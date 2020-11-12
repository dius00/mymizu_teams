import TeamRegistration from "./TeamRegistration";
import TeamStats from "./TeamStats";

export default function TeamDashboard() {
	return (
		<div className="container">
			<TeamStats />
			<TeamRegistration />
		</div>
	);
}
