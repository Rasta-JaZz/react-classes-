import React from "react";

function Loader(props) {
	return (
		<div className="d-flex justify-content-center m-3">
			<div className="spinner-border text-info" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Loader;
