import { useEffect, useState } from 'react';
import employee from '../../Assets/Data/employe.json'
import style from './DynamicTable.module.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight ,AiFillEdit} from 'react-icons/ai';

function ReactTable() {
    let range = 10;
    const [pagenumber, setPageNumber] = useState(0)
    const [employeDetils, setEmployeDetails] = useState()
    const [searchValue,setSearchValue] = useState('')


    useEffect(() => {
        setEmployeDetails(employee.slice(pagenumber * 10, pagenumber * 10 + range + 1))
    }, [pagenumber, range])


    console.log(employee)

    let employeKey = [];

    for (let key in employee[0]) {
        employeKey.push(key)
    }

    const onSearch  = () => {
        let result = employee.filter((e) => e.fName.includes(searchValue))

        setEmployeDetails(result)
    }

    return (
        <div className={style['table-container']}>
            <div><input placeholder='search employee' value={searchValue} onChange={(e) =>setSearchValue(e.target.value) }/><div onClick={onSearch}>search</div></div>
            <table className={style['table']}>
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
                            return <tr key={`${el.fName}${i}`} style={{background:el.attendece>25?'green':el.attendece<25?"red":"orange"}}>
                                {
                                    employeKey.map((empKey, index) => {
                                        return <>
                                        <td key={`${empKey}${index}`} >
                                            <div className={style['td-item']}>
                                            <span>{el[empKey]} </span> 
                                           <span> {index === employeKey.length-1 && <div><AiFillEdit /></div>}</span>
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
            </div>

        </div>
    );
}

export default ReactTable;