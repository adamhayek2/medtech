import React, {useState, useEffect} from 'react'
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'
import GetSpecificReports from '../../apis/GetSpecificReports';


const SinglePatientComponent = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(false);

  const fetchReports = async () => {
    try {
      setError(false); 
      const response = await GetSpecificReports(); 
      setReports(response)
    } catch (error) {
      setError(true); 
    }
  }
  useEffect(() => {
      fetchReports();
  }, []);

  return (
    <div>
    </div>
  )
}

export default SinglePatientComponent
