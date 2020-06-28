//decorator === HOC ===Higher Order Component
import React from "react";

export default Original =>
	class DecoratorAccordion extends React.Component {
		state = {
			openItemId: null
		};

		toggleOpenItem = openItemId =>
			this.setState({
				openItemId:
					this.state.openItemId === openItemId ? null : openItemId
			});

		render() {
			return (
				<Original
					{...this.props}
					{...this.state}
					toggleOpenItem={this.toggleOpenItem}
				/>
			);
		}
	};
