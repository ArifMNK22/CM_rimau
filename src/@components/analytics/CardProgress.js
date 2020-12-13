import React, { useEffect } from 'react';
import { CProgress } from '@coreui/react';
import Card from './Card';

export default (props) => {
  const {h, title } =  props;
    const [allProgress, setallProgress] = React.useState([]);
    
  useEffect(() => {
    setallProgress([
        {name: 'Total Changes', value: 44},
        {name: 'Emergency/Urgent', value: 30},
        {name: 'Failed Fallback', value: 70},
        {name: 'Non Compliant', value: 50},
      ]);
  }, []);
    
    const EachProgress = ({progress}) => (
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">{progress.name || 'Data'}</div>
            <div className={`col-sm-12`}>
                <CProgress color="success" value={progress.value} className="mb-3" />
            </div>
          </div>
        </div>
      );

  const ListOfProgress = () => allProgress.map((progress,idx)=><EachProgress key={idx} progress={progress}/>);
  return <Card Header={title} Body={ListOfProgress} />;
  };

  