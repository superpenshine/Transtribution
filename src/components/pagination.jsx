import React, { Component } from 'react';
import './pagination.css';
import classNames from 'classnames';

class Pagination extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.numPages == nextProps.numPages &&
            this.props.currentPage == nextProps.currentPage) {
            return false;
        }
        return true;
    }

    range = (start, end) => {
        return [...Array(end - start).keys()].map(i => start + i);
    }

    nearestInt = (x) => {
        return (x + 0.5) | 0;
    }

    addScaledPagesAfter = (curr, n, arr, scales) => {
        scales.forEach(
            h => {
                let x = curr + this.nearestInt(h * (n - curr));
                arr.includes(x) ? null : arr.push(x);
            });

        return arr;
    }

    // Get array of pages based on curr page
    pageNumbers = () => {
        const n = this.props.numPages;
        const curr = this.props.currentPage;
        const beforeScale = [0.2, 0.4, 0.6];
        const afterScale = [0.25, 0.5, 0.75];
        const fixedPages = [2, 3, 4, 5, 10];
        let nums = [1];

        if (n <= 0) {
            return [];
        }

        if (n < 16) {
            nums.push(...this.range(Math.max(curr - 3, 2), Math.min(curr + 5, n) + 1));
        }
        // For larger number of pages
        else {
            // First page fixed
            if (curr == 1) {
                nums.push(...fixedPages);
            }
            // If curr is small, show few pages after the curr and few for jumps, 
            // Ex: (1, curr, curr+1, ..., curr+5, curr+0.25(n-curr), curr+0.5(n-curr), curr+0.75(n-curr))
            else if (curr < 8) {
                nums.push(...this.range(curr, curr + 6));
                nums = this.addScaledPagesAfter(curr, n, nums, afterScale);
            }
            // If curr is large, use the following paging scheme, 
            // Ex: (1, 0.2curr, 0.4curr, 0.6curr, curr, curr+1, curr+2, curr+0.25(n-curr), curr+0.5(n-curr), curr+0.75(n-curr))
            else {
                beforeScale.forEach(
                    h => nums.push(this.nearestInt(h * curr))
                );
                if (curr < n - 4) {
                    nums.push(...this.range(curr, curr + 3));
                    nums = this.addScaledPagesAfter(curr, n, nums, afterScale);
                }
                // Fixed window for last few pages
                else {
                    nums.push(...this.range(n - 4, n + 1));
                }
            }
        }

        return nums;
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

    // For prev/next page
    // <span aria-hidden="true">&laquo;</span>
    // <span aria-hidden="true">&raquo;</span>

    render() {
        let prevBtnClass = classNames({
            "pagination-sm": true, 
            "paginateBtn": true, 
            "disabled": this.disablePrev()
        })

        let nextBtnClass = classNames({
            "pagination-sm": true, 
            "paginateBtn": true, 
            "disabled": this.disableNext()
        })

        return (
            <nav className={ "justify-content-center paginationNavbar" }>
                <div className={ prevBtnClass }
                    onClick={ this.disablePrev() ? null : this.handelPrevPage }>
                    <button className="page-link"
                            aria-label="Previous"
                            tabIndex="-1">上一页
                    </button>
                </div>
                <ul className='pagination pagination-sm scrollable'>
                    { this.pageNumbers().map(number => 
                        <li className={ this.getPageNavClass(number) } key={ number }>
                            <button className='page-link' 
                                    onClick={ () => this.props.paginate(number) }
                                    tabIndex="-1">
                                { this.highlightCurrentPage(number) }
                            </button>
                        </li>) 
                    }
                </ul>
                <div className={ nextBtnClass }
                     onClick={ this.disableNext() ? null : this.handelNextPage }>
                    <button className="page-link"
                            aria-label="Next"
                            tabIndex="-1">下一页
                    </button>
                </div>
            </nav>
        );
    };
}

export default Pagination;



