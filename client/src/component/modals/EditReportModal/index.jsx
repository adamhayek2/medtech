import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../base/Input';
import Button from '../../base/Button';
import EditStaffInfos from '../../../apis/EditStaffProfile';
import EditReport from '../../../apis/EditReport';

const EditReportModal = ({open, onClose, reportData, type}) => {
    const { id } = useParams();
    const [bloodTest, setBloodTest] = useState(reportData.report_data.blood_tests);
    const [scan, setScan] = useState(reportData.report_data.scans);
    const [medication,setMedications] = useState(reportData.report_data.medications);
    const [error, setError] = useState();

    const handleObjectChange = (index, field, value) => {
        if (type === 'blood_tests') {
            const newBloodTest = [...bloodTest];
            newBloodTest[index][field] = value;
            setBloodTest(newBloodTest);
        } else if (type === 'scans') {
            const newScan = [...scan];
            newScan[index][field] = value;
            setScan(newScan);
        }else{
            const newMedications = [...medication];
            newMedications[index][field] = value;
            setMedications(newMedications);
        }
        };

    const addObject = () => {
        type === 'blood_tests' ? setBloodTest([...bloodTest, { name: '', date: '' }]) : type === 'scans' ? setScan([...scan, { name: '', date: '' }]) : setMedications([...medication, { name: '', frequency: '', value: '' }]);
    };

    const edit = async (e) => {
        e.preventDefault();
        const appoitments = reportData.report_data.appoitments
        const newReport = {'blood_tests': bloodTest, 'scans': scan, 'medications': medication, 'appointments': appoitments }
        try { 
            setError(false); 
            const response = await EditReport(id, newReport );
            onClose();
          } catch (error) {
            console.error('Failed to create', error);
            setError(true); 
          }
       console.log(bloodTest);
    }

    if(!open) return null

    return (
        <div onClick={onClose} className='flex flex-row justify-end fixed w-full min-h-full bg-[#000000]/30 z-10 top-0 left-0 overflow-y-scroll'>
            <form 
                onClick={(e) => { e.stopPropagation() }}
                onSubmit={edit}
                className={`flex flex-col bg-white w-1/4 p-10 justify-center items-center transition-transform duration-[0.2s] ease-[ease-in-out] gap-6 ${!open ? 'translate-x-full' : 'translate-x-0'}`}
            >
                {type === 'blood_tests' &&
                    bloodTest.map((index, i) => (
                        <div key={i} className="flex flex-row justify-between w-full gap-2">
                        <Input
                            name="Name"
                            value={index.name}
                            type="text"
                            onChange={(e) => handleObjectChange(i, 'name', e.target.value)}
                            placeholder="Name"
                            theme="blue"
                        />
                        <Input
                            name="Date"
                            value={index.date}
                            type="date"
                            onChange={(e) => handleObjectChange(i, 'date', e.target.value)}
                            placeholder="Date"
                            theme="blue"
                        />
                        </div>
                    ))}
                {type === 'scans' &&
                scan.map((index, i) => (
                    <div key={i} className="flex flex-row justify-between w-full gap-3">
                    <Input
                        name="Scan Type"
                        value={index.name}
                        type="text"
                        onChange={(e) => handleObjectChange(i, 'name', e.target.value)}
                        placeholder="Scan Type"
                        theme="blue"
                    />
                    <Input
                        name="Date"
                        value={index.date}
                        type="date"
                        onChange={(e) => handleObjectChange(i, 'date', e.target.value)}
                        placeholder="Date"
                        theme="blue"
                    />
                    </div>
                ))}
                {type === 'medications' &&
                medication.map((index, i) => (
                    <div key={i} className="flex flex-col justify-between w-full gap-3">
                    <Input
                        name="Name"
                        value={index.name}
                        type="text"
                        onChange={(e) => handleObjectChange(i, 'name', e.target.value)}
                        placeholder="Name"
                        theme="blue"
                    />
                    <Input
                        name="Dosage"
                        value={index.dosage}
                        type="text"
                        onChange={(e) => handleObjectChange(i, 'dosage', e.target.value)}
                        placeholder="Dosage"
                        theme="blue"
                    />
                    <Input
                        name="frequency"
                        value={index.frequency}
                        type="text"
                        onChange={(e) => handleObjectChange(i, 'frequency', e.target.value)}
                        placeholder="Frequency"
                        theme="blue"
                    />
                    </div>
                ))}
                    
                    <div
                        className='bg-primary/30 w-10 h-10 rounded-full text-lg text-primary r-0 flex justify-center items-center'
                        onClick={addObject}
                        >+
                    </div>
                    <div className='w-full h-[56px]'>
                        <Button label={'Submit'} BgColor={'bg-primary'} textColor={'text-white'} />
                    </div>
            </form>
        </div>
    )
}

export default EditReportModal