import TeamRegistration from "./TeamRegistration";
import TeamStats from "./TeamStats";

export default function TeamDashboard() {

    return (
        <div className="teamdashboard-container">
            <TeamRegistration />
            <TeamStats />
        </div>
    )
}