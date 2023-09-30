import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as tf from '@tensorflow/tfjs';
import { ReactComponent as BloodTestSVG } from "../../resources/svg/blood-test.svg";
import { ReactComponent as ScansSVG } from "../../resources/svg/scan.svg";
import { ReactComponent as NotFoundSVG } from "../../resources/svg/not_found.svg";
import * as loadingSVG from '../../resources/animations/loading.json'
import SingleReport from '../../apis/SingleReport';
import PageTitle from '../PageTite';
import Button from '../base/Button';
import Medication from '../base/Medication';
import EditReportModal from '../modals/EditReportModal';
import Predict from '../../apis/Predict';
import ApproveReport from '../../apis/ApproveReport';

const model_url = '/model/model.json'

const SingleReportComponent = () => {
    const { id } = useParams();
    const [report, setReport] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [selectEditType, SetSelectEditType] = useState('blood_tests')
    const [error, setError] = useState(false);
    const [model, setModel] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
  
    const fetchSingleReport = async () => {
        try {
          setLoading(true);
          setError(false); 
          const response = await SingleReport({id}); 
          setReport(response)
          setLoading(false);
        } catch (error) {
          setError(true); 
        }
    }

    const predict = async () => {
        setLoading(true)
        console.log(loading)
        if (model) {
          const inputTensor = tf.browser.fromPixels(document.getElementById('img'));
          const resizedInput = tf.image.resizeBilinear(inputTensor, [256, 256]);
          const input = resizedInput.expandDims(0);
          const prediction = model.predict(input);
          const predictionValues = await prediction.data(); 
    
          const predictedClassIndex = predictionValues.indexOf(Math.max(...predictionValues));
    
          const classaNames = ['blunt force', 'bullet', 'skintears'];
          const predictedClassName = classaNames[predictedClassIndex];
          console.log(predictedClassName);

          try {
            setError(false); 
            const response = await Predict({ id, predictedClassName}); 
            setReport(response)
            setLoading(false);
          } catch (error) {
            setError(true); 
          }
        }
    };

    const approveReport = async () => {
        try {
          setError(false); 
          const response = await ApproveReport({id}); 
          setReport(response)
          console.log(response)
        } catch (error) {
          setError(true); 
        }
    }
      

    useEffect(() => {
    fetchSingleReport();
    async function loadModel() {
        const loadedModel = await tf.loadLayersModel(model_url);
        setModel(loadedModel);
    }
    loadModel();
    }, []);

    const openModalHandler = (type) => {
    setOpenModal(true);
    SetSelectEditType(type)
    }
    const isDoctor = localStorage.getItem('role') === 'doctor';

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loadingSVG,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

  return (
    <div className='min-h-screen w-5/6 ml-auto'>
    {report.length === 0 || error ?
        loading ? <div className="w-full h-full flex flex-col items-center justify-center">
            <Lottie options={defaultOptions} height={430} width={515} />
            </div> : 
                <div className='w-full h-full flex flex-col items-center'>
                    <NotFoundSVG width={'400px'} height={'400px'} className='opacity-50'/>
                    <div className='text-[36px] font-bold text-primary opacity-1'>No Recored found</div>
              </div>
            :
        <div className='min-h-screen flex flex-col gap-14 bg-grey p-14'>
            <div className='w-full flex flex-row justify-between'>
            <PageTitle title={`${report.patient_name}'s report`}/>
            </div>
            <div className='flex flex-row gap-10'>
                <div className='w-1/5 flex flex-col h-full gap-10'>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center' onClick={() =>{navigate(`/patient/${report.patient.id}`)}}>
                        <h1 className='text-[22px] font-bold text-primary'>{report.patient_name}</h1>
                        <Button label={'View Profile'} BgColor={'bg-primary'} textColor={'text-white'} />
                    </div>
                    <div className='flex flex-col px-16 py-8 bg-white rounded-lg gap-[22px] items-center'>
                        <h1 className='text-[#7D7D7D]'>Status:</h1>
                        <p className=' text-[22px] text-primary font-bold'> {report.patient.status.name}</p>
                    </div>
                    <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-[22px] items-center '>
                        <h1 className='text-[22px] font-bold text-primary'>Informations</h1>
                        <div className='flex flex-col items-center gap-1'>
                            <p className='text-[#7D7D7D]'>Gender: {report.gender}</p>
                            <p className='text-[#7D7D7D]'>Age: {report.patient.age}</p>
                            <p className='text-[#7D7D7D]'>Blood type: {report.blood_type}</p>
                            <p className='text-[#7D7D7D]'>Contact: {report.patient.phone_number}</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="w-4/5 flex justify-center items-center">
                        <Lottie options={defaultOptions} height={400} width={500} />
                    </div>
                    ) : (
                        <div className='w-4/5 flex flex-col gap-10'>
                        {report.report_data === null ? (
                            <div className='w-full h-14' onClick={ () => predict()}>
                                <img src={`data:image/jpeg;base64,${report.image}`} alt="" className='hidden' id='img'/>
                                <Button label={'Predict'} BgColor={'bg-primary'} textColor={'text-white'}/>
                            </div>
                        ) : (
                            <div className='w-full flex flex-col gap-10'>
                                {report.approved_by_doctor_id === 0 || report.approved_by_doctor_id === null ? 
                                    <div className='w-full h-14' onClick={ () => approveReport()}>
                                        <Button label={'approve'} BgColor={'bg-primary'} textColor={'text-white'}/>
                                    </div>
                                : null}
                                <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-10 items-start '>
                                    <h1 className='text-[22px] font-bold text-primary'>Tests</h1>
                                    <div className='flex flex-row items-center gap-10 flex-wrap'>
                                    {report.report_data.blood_tests.map((tem) => (
                                        <div className='flex flex-row items-center gap-3'>
                                            <BloodTestSVG/>
                                            <div className='flex flex-col '>
                                                <div className='text-[18px]'>{tem.name}</div>
                                                <div className='text-base text-[#7D7D7D] italic'>{tem.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                    <div className='w-full flex flex-row justify-end'>
                                        {report.approved_by_doctor_id !== 0 || isDoctor ? 
                                            <div className='w-32 h-12' onClick={() => openModalHandler('blood_tests')}>
                                                <Button label={'Edit'} BgColor={'bg-primary'} textColor={'text-white'} buttonWidth={'w-24'}/>
                                            </div>: ""
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-10 items-start '>
                                    <h1 className='text-[22px] font-bold text-primary'>Scans</h1>
                                    <div className='flex flex-row items-center gap-10 flex-wrap'>
                                    {report.report_data.scans.map((tem) => (
                                        <div className='flex flex-row items-center gap-3'>
                                            <ScansSVG/>
                                            <div className='flex flex-col '>
                                                <div className='text-[18px]'>{tem.name}</div>
                                                <div className='text-base text-[#7D7D7D] italic'>{tem.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                    <div className='w-full flex flex-row justify-end'>
                                        {report.approved_by_doctor_id !== 0 || isDoctor ? 
                                            <div className='w-32 h-12' onClick={() => openModalHandler('scans')}>
                                                <Button label={'Edit'} BgColor={'bg-primary'} textColor={'text-white'} buttonWidth={'w-24'}/>
                                            </div>: ""
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col px-14 py-8 bg-white rounded-lg gap-10 items-start '>
                                    <h1 className='text-[22px] font-bold text-primary'>Prescreption</h1>
                                    <div className='flex flex-row items-center gap-10 flex-wrap'>
                                    {report.report_data.medications.map((tem) => (
                                        <Medication name={tem.name} frequency={tem.frequency} dosage={tem.dosage}/>
                                    ))}
                                    </div>
                                    {report.approved_by_doctor_id !== 0 || isDoctor ? 
                                        <div className='w-full flex flex-row justify-end border-[1px] border-dashed border-primary rounded-lg h-12' onClick={() => openModalHandler('medications')}>
                                            <Button label={"Edit"} BgColor={"bg-primary/20"} textColor={"text-black"}/>
                                        </div>: ""
                                    }
                                </div>
                                <EditReportModal open = {openModal} onClose={() => setOpenModal(false)} reportData={report} type={selectEditType}/>       
                            </div>
                        )}
                        </div>
                    )}
            </div>
        </div>}
    </div>
  )
}

export default SingleReportComponent