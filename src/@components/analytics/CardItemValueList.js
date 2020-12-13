import React from 'react';
import Card from './Card';

export default (props) => {

    const { h, datakey, title } = props;

    const Table = () => (
        <table width="100%">
            <tr>{h[`${datakey}`]?.labels?.map((n)=>(<th>{n}</th>))}</tr>
            {h[`${datakey}`]?.data?.map((n)=>(
                <tr>
                    <td>{n.name}</td>
                    <td>{n.value}</td>
                </tr>    
            ))}
        </table>
    )
    return <Card Header={title} Body={Table} />;
};

  