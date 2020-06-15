import React, { Component } from 'react';
import ReactGA from 'react-ga';

const TrackedPage = (WrappedComponent, options={}) => {
	const trackPage = page => {
		ReactGA.set({page, ...options});
		ReactGA.pageview(page);
	};

	const HOC = class extends Component {
		componentDidMount() {
			const page = this.props.location.pathname + this.props.location.search;
			trackPage(page);
		}

		componentDidUpdate(prevProps) {
			const currentPage = prevProps.location.pathname + prevProps.location.search;
			const nextPage = this.props.locaiton.pathname + this.props.locaiton.search;

			if (currentPage != nextPage) {
				trackPage(nextPage);
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};

	return HOC;
};

export default TrackedPage;
