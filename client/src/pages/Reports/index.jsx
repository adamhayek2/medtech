import React from 'react'
import NavBar from '../../component/NavBar'
import SideNav from '../../component/SideNav'
import ReportCard from '../../component/ReportCard'

const Reports = () => {

  return (
    <div className='flex flex-col font-futur'>
      <NavBar/> 
      <div className='flex flex-row'>
        <SideNav/>
        <ReportCard name={"2131351"} patientName={"Adam Hayek"} id={1} status={0} report={{
   "blood_tests":[
      {
         "test_name":"Complete Blood Count (CBC)",
         "date":"2023-08-10",
         "result":{
            "hemoglobin":"14.2 g/dL",
            "white_blood_cells":"7.2 K/µL",
            "platelet_count":"250 K/µL"
         }
      },
      {
         "test_name":"Lipid Profile",
         "date":"2023-08-15",
         "result":{
            "total_cholesterol":"180 mg/dL",
            "hdl_cholesterol":"45 mg/dL",
            "ldl_cholesterol":"120 mg/dL",
            "triglycerides":"150 mg/dL"
         }
      }
   ],
   "scans":[
      {
         "scan_type":"X-ray",
         "date":"2023-07-25",
         "impression":"No abnormalities detected."
      },
      {
         "scan_type":"MRI",
         "date":"2023-08-05",
         "impression":"Mild inflammation in the left knee joint."
      }
   ],
   "appointments":[
      {
         "doctor":"Dr. Emily Smith",
         "appointment_date":"2023-09-02",
         "reason":"Follow-up on MRI results",
         "notes":"Prescribed physical therapy."
      },
      {
         "doctor":"Dr. Emily Smith",
         "appointment_date":"2023-09-15",
         "reason":"General check-up",
         "notes":"Discuss medication changes."
      }
   ],
   "medications":[
      {
         "medication_name":"Ibuprofen",
         "dosage":"400 mg",
         "frequency":"As needed for pain",
         "prescribed_by":"Dr. Emily Smith"
      },
      {
         "medication_name":"Lisinopril",
         "dosage":"10 mg",
         "frequency":"Once daily",
         "prescribed_by":"Dr. Emily Smith"
      }
   ]
}} date={"29/11/2023"}/>
      </div>
    </div>
  )
}

export default Reports