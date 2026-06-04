import './PlantListItem.css';

export default function WelcomeMessage({ allPlants = [], waterToday = [] }) {
	const plantsInGoodHealth = allPlants.filter(p => p.health === "happy").length;
	const plantsInBadHealth = allPlants.filter(p => p.health === "sad").length;
	return (
		<section>
			<div className="heading-bar">
				<h2>Welcome Back!</h2>
				<div className = "date">
					<p>Today is {new Date().toDateString()}.</p>						
				</div>
			</div>
			{/* <div className="welcome-message">
				<p>Plants to water today: {waterToday.length}</p>
				<p>Plants in good health: {plantsInGoodHealth}</p>
				<p>Plants that need some more love: {plantsInBadHealth}</p>
			</div> */}
		</section>
	);
}
