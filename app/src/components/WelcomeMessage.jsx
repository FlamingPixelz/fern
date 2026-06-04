import "./Components.css";

export default function WelcomeMessage({ allPlants = [], waterToday = [] }) {
	return (
		<section>
			<div className="heading-bar welcome">
				<h2>Welcome Back!</h2>
				<div className="date">
					<p>Today is {new Date().toDateString()}.</p>
				</div>
			</div>
		</section>
	);
}
