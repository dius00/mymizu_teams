import WeeklyBoard from "./WeeklyBoard";
import MonthlyBoard from "./MonthlyBoard";

export default function Leaderboards() {

    return (
        <div className="leaderboards-container">
            <WeeklyBoard />
            <MonthlyBoard />
        </div>
    )
}