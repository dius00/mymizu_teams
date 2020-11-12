import TeamRegistration from "./TeamRegistration";
import TeamStats from "./TeamStats";

export default function TeamDashboard() {

    // need some way to check if current logged in user already is part of a team here

    const team = true; // just for testing, remove later :)

    return (
      <div className="w-100 d-flex justify-content-center teamdashboard-container">
            <h1>Team Dashboard</h1>
            { !team &&
                <TeamRegistration />
            }
            { team &&
                <TeamStats />
            }
        </div>
    )
}