import React from "react";
import Card from "./card.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center text-secondary">
			<h1 className="text-center mt-5 display-2 fw-lighter">todos</h1>
      <Card />
		</div>
	);
};

export default Home;
