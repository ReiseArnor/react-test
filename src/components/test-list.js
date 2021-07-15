import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export const TestList = (props) => {
    const list = props.list;
    const match = props.match;
    return (
        <div className="column is-9">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Value</th>
                        <th >Link  </th>
                    </tr>
                </thead>
                <tbody>
                    {
                    list.map( (data, index) =>
                        <tr key={index}>
                            <th>{data.id}</th>
                            <td>{data.value}</td>
                            <td ><Link to={`${match.url}/${data.id}`}>go to</Link></td>
                        </tr> 
                        )
                    }
                </tbody>
            </table>
        </div>
        
    );
};

TestList.propTypes = {
    list: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired
};