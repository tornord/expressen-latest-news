import React, { Fragment, useState } from "react";
import "./App.css";

function App() {
	var [state, setState] = useState(null);
	if (!state) {
		fetch("http://localhost:3001")
			.then((resp) => resp.json())
			.then((resp) => {
				setState(resp);
			});
	}
	if (!state) {
		return <h3 className="th-box">Loading ...</h3>;
	}
	return (
		<Fragment>
			<h3 className="th-box">Senaste nytt</h3>
			<ul>
				{state.map((d, i) => (
					<li key={i}>
						<a href={d.link}>
							<time className="number">{new Date(d.pubDate).toLocaleTimeString("sv-SE").slice(0, 5)}</time>
							<span className="title">{d.title}</span>
						</a>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

export default App;
