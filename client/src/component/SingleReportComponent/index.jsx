import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import SingleReport from '../../apis/SingleReport';

const SingleReportComponent = () => {
    const { id } = useParams();
    const [report, setReport] = useState([]);
    const [error, setError] = useState(false);

    const fetchSingleReport = async () => {
        try {
          setError(false); 
          const response = await SingleReport({id}); 
          setReport(response)
          console.log(response)
        } catch (error) {
          setError(true); 
        }
      }

      useEffect(() => {
        fetchSingleReport();
      }, []);

  return (
    <div>SingleReportComponent</div>
  )
}

export default SingleReportComponent