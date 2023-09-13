import React, {useState, useEffect} from 'react'
import { useDebounce } from "@uidotdev/usehooks";
import PageTitle from '../PageTite'
import ReportCard from '../ReportCard'
import GetReports from '../../apis/GetReports'
import SearchInput from '../base/SearchInput'

const ReportsComponent = () => {
    const [reports, setReport] = useState([]);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);

    const fetchReports = async () => {
      try {
        const response = await GetReports(); 
        setError(false); 
        setReport(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
    }

    const fetchSearchResult = async () => {
      try {
        const response = [
          {
              "id": 2,
              "report_data": {
                  "blood_tests": [
                      {
                          "test_name": "Complete Blood Count (CBC)",
                          "date": "2023-08-10",
                          "result": {
                              "hemoglobin": "14.2 g/dL",
                              "white_blood_cells": "7.2 K/µL",
                              "platelet_count": "250 K/µL"
                          }
                      },
                      {
                          "test_name": "Lipid Profile",
                          "date": "2023-08-15",
                          "result": {
                              "total_cholesterol": "180 mg/dL",
                              "hdl_cholesterol": "45 mg/dL",
                              "ldl_cholesterol": "120 mg/dL",
                              "triglycerides": "150 mg/dL"
                          }
                      }
                  ],
                  "scans": [
                      {
                          "scan_type": "X-ray",
                          "date": "2023-07-25",
                          "impression": "No abnormalities detected."
                      },
                      {
                          "scan_type": "MRI",
                          "date": "2023-08-05",
                          "impression": "Mild inflammation in the left knee joint."
                      }
                  ],
                  "appointments": [
                      {
                          "doctor": "Dr. Emily Smith",
                          "appointment_date": "2023-09-02",
                          "reason": "Follow-up on MRI results",
                          "notes": "Prescribed physical therapy."
                      },
                      {
                          "doctor": "Dr. Emily Smith",
                          "appointment_date": "2023-09-15",
                          "reason": "General check-up",
                          "notes": "Discuss medication changes."
                      }
                  ],
                  "medications": [
                      {
                          "medication_name": "Ibuprofen",
                          "dosage": "400 mg",
                          "frequency": "As needed for pain",
                          "prescribed_by": "Dr. Emily Smith"
                      },
                      {
                          "medication_name": "Lisinopril",
                          "dosage": "10 mg",
                          "frequency": "Once daily",
                          "prescribed_by": "Dr. Emily Smith"
                      }
                  ]
              },
              "status": 1,
              "approved_by_doctor_id": 1,
              "patient_id": 1,
              "created_at": null,
              "updated_at": null,
              "full_name": "nabiha nabiha",
              "patient": {
                  "id": 1,
                  "first_name": "nabiaha",
                  "last_name": "nabiha",
                  "age": 25,
                  "gender_id": 1,
                  "phone_number": "+961123456",
                  "status_id": 1,
                  "blood_type_id": 1
              }
          }
      ]
        setError(false); 
        setReport(response)
      } catch (error) {
        console.error('error:', error);
        setError(true); 
      }
    }

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchSearchResult();
    } else {
      fetchReports();
    }
  }, [debouncedSearchValue]);
  
  return (
    <div className='min-h-screen w-5/6 flex flex-col gap-14 bg-grey p-14 ml-auto'>
        <div className='w-full flex flex-row justify-between'>
          <PageTitle title={"Reports"}/>
          <SearchInput onChange={(e) => {setSearchValue(e.target.value)}}/>
        </div>
        <div className='flex flex-row flex-wrap gap-10 justify-between'>
            {reports.map((report) => (
              <ReportCard key={report.id} patientName={report.full_name} id={report.id} status={report.status} report={report.report_data} date={report.created_at}/>
            ))}
        </div>
    </div>
  )
}

export default ReportsComponent




