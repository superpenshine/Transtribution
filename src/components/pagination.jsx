
import React, { Component } from 'react';

class Pagination extends Component {

	// Get array of pages
	pageNumbers = () => {
		// console.log(Array(this.props.numPages).keys());
		return [...Array(this.props.numPages).keys()].map(x => ++x);
	}

	// Highlight current page
	highlightCurrentPage = (page) => {
		return page === this.props.currentPage ? <b>{ page }</b> : page; 
	}

	// Disable current page nav link
	getPageNavClass = (page) => {
		return page === this.props.currentPage ? 'page-item disabled' : 'page-item';
	}

	handelPrevPage = () => {
		this.props.paginate(this.props.currentPage - 1);
	}

	handelNextPage = () => {
		this.props.paginate(this.props.currentPage + 1);
	}

	disablePrev = () => {
		return this.props.currentPage <= 1;
	}

	disableNext = () => {
		return this.props.currentPage >= this.props.numPages;
	}

	render() {
		const disablePrev = this.disablePrev();
		const disableNext = this.disableNext();
		return (
			<nav>
				<ul className='pagination pagination-sm justify-content-center'>
					<li className={ disablePrev ? 'page-item disabled' : 'page-item' }
						onClick={ disablePrev ? null : this.handelPrevPage }>
						<button className="page-link" aria-label="Previous" tabIndex="-1">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</button>
					</li>

					{ this.pageNumbers().map(number => 
						<li className={ this.getPageNavClass(number) } key={ number }>
							<button className='page-link' 
									onClick={ () => this.props.paginate(number) }
									tabIndex="-1">
										{ this.highlightCurrentPage(number) }
							</button>
						</li>) 
					}

					<li className={ disableNext ? 'page-item disabled' : 'page-item' }
						onClick={ disableNext ? null : this.handelNextPage }>
						<button className="page-link" aria-label="Next" tabIndex="-1">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</button>
					</li>
				</ul>
			</nav>
		);
	};
}

export default Pagination



