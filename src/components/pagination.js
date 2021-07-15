import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { axios } from '../config/api';
import { TestList } from './test-list';

export const Pagination = (props) => {
    const match = props.match;
    const itemsToShow = 5;
    let count = 0;
    const { search, pathname } = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const page = new URLSearchParams(search).get('page');
        setCurrentPage(Number(page));
    }, [search]);

    const [maxPages, setMaxPages]= useState(1);
    const [database, setDatabase] = useState([]);
    useEffect(() => {
        getTestCount();
        getTestList((currentPage - 1) * 5, itemsToShow);
        // eslint-disable-next-line
    }, [currentPage]);

    const getTestCount = async () => {
        try {
            const res = await axios.get('/test-count');
            count = res.data.count;
            setMaxPages(Math.ceil(count / itemsToShow));
        } catch (err) {
            console.error(err);
        }
    }

    const getTestList = async (startIndex, numberOfItems) => {
        try {
            const res = await axios.get(`/test?startIndex=${startIndex}&numberOfItems=${numberOfItems}`);
            setDatabase(res.data.databaseMessage);
        } catch (err) {
            console.error(err);
        } 
    };

    return (
        <div className="column block">
            <TestList list={database} match={match} />

            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                <ul className="pagination-list">
                    <li><Link to={`${pathname}?page=1`} className="pagination-previous">First</Link></li>
                    { 
                        currentPage - 1 > 0 ? 
                        <li><Link to={`${pathname}?page=${currentPage - 1}`} className="pagination-link">{currentPage - 1}</Link></li>
                        : <span></span>
                    }
                    <li><Link to={`${pathname}?page=${currentPage}`} className="pagination-link is-current">{currentPage}</Link></li>
                    { 
                        currentPage >= maxPages ? 
                        <span></span>
                        : <li><Link to={`${pathname}?page=${currentPage + 1}`} className="pagination-link">{currentPage + 1}</Link></li>
                    }
                    <li><Link to={`${pathname}?page=${maxPages}`} className="pagination-next">Last</Link></li>
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    match: PropTypes.object.isRequired
};