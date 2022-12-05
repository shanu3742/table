import { useEffect, useState } from 'react';
import employee from '../../Assets/Data/employe.json'
import style from './DynamicTable.module.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillEdit } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BsSearch } from 'react-icons/bs';


const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function ReactTable() {
    let range = 10;
    const [pagenumber, setPageNumber] = useState(0)
    const [employeDetils, setEmployeDetails] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [sortBy, setSortBy] = useState('id');

    const [editableUserIndex,setEditableUserIndex]= useState()
    const [editableUserData,setEditableUserData] =useState(
      {}
    )

    console.log(employeDetils[editableUserIndex])
    console.log(editableUserData,editableUserIndex)
    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    useEffect(() => {
        setEditableUserData(  {
            ...employeDetils[editableUserIndex]
          })
    },[editableUserIndex])

    useEffect(() => {
        setEmployeDetails(employee.slice(pagenumber * 10, pagenumber * 10 + range + 1).sort((a, b) => a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0))
    }, [pagenumber, range, sortBy])


    console.log(employee)

    let employeKey = [];

    for (let key in employee[0]) {
        employeKey.push(key)
    }

    const onSearch = (event) => {
        event.preventDefault()
        if (searchValue === '') {
            return
        }

        let result = employee.filter((e) => e.fName.includes(searchValue))

        setEmployeDetails(result)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (i) => {
        setOpen(true)
        setEditableUserIndex(i)
    };
    const handleClose = () => setOpen(false);

    const updateData = (event,e) => {
        let updatedObject = {...editableUserData ,[e]:event.target.value}
     console.log(updatedObject)
setEditableUserData(updatedObject)
    }


    const updateUserData = () => {
        setOpen(false)
        setEmployeDetails((p) => [...p,p[editableUserIndex]= editableUserData])
    }
    return (
        <div className={style['table-container']}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modelStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        update employe data
                    </Typography>
                   <div className={style['updateDetails-container']}>
                    {
                        employeKey.map((el,i) => {
                            return  <div  className={style['updateDetails-container-inputbox']}>
                                <label htmlFor={`${el}`} className={style['updateDetails-container-label']}>{el}</label >
                                <input  disabled={el==='id'|| el==='DOJ'?true:false} value={editableUserData[el]===undefined?0:editableUserData[el]} onChange={(e) => updateData(e,el)}/>
                            </div>
                        })
                    }
                    <button onClick={updateUserData}>update details</button>
                   </div>
                </Box>
            </Modal>
            <div className={style['table-search__container']}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">sortBy</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortBy}
                            label="sortBy"
                            onChange={handleChange}
                        >
                            <MenuItem value={'id'}>id</MenuItem>
                            <MenuItem value={'salary'}>salary</MenuItem>
                            <MenuItem value={'attendece'}>attendece</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <form onSubmit={onSearch}>
                    <input placeholder='search employee by first name' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} title='search employee' />
                    <button type='submit'><BsSearch /></button>
                </form>
            </div>
            <>
                {
                    employeDetils.length === 0 ? <div>user not found</div> : <>  <table className={style['table']}>
                        <thead className={style['table-header']}>
                            <tr>
                                {
                                    employeKey.map((el) => {
                                        return <th>{el.toUpperCase()}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeDetils?.map((el, i) => {
                                    return <tr key={`${el.fName}${i}`} style={{ background: el.attendece > 25 ? 'rgb(177, 238, 177)' : el.attendece < 25 ? "rgb(240, 167, 162)" : "rgb(243, 206, 138)" }}>
                                        {
                                            employeKey.map((empKey, index) => {
                                                return <>
                                                    <td key={`${empKey}${index}`} >
                                                        <div className={style['td-item']}>
                                                            <span>{el[empKey]} </span>
                                                            <span> {index === employeKey.length - 1 && <div><AiFillEdit onClick={() =>handleOpen(i)} /></div>}</span>
                                                        </div>

                                                    </td>

                                                </>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                        <div className={style['navigation']}>

                            <div className={style['navigationButton']}>


                                <div onClick={() => setPageNumber((p) => p - 1)}><AiOutlineArrowLeft /></div>
                                <div>  {pagenumber}</div>
                                <div onClick={() => setPageNumber((p) => p + 1)}><AiOutlineArrowRight /></div>


                            </div>
                        </div></>
                }
            </>

        </div>
    );
}

export default ReactTable;