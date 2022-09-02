import React, { useEffect, useState, useCallback, ChangeEvent } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

const countperpageArr = [20, 30, 50, 100]

const columns = [
    {
        name: 'Symbol',
        accessor: 'symbol',
        width: '5%'
    },
    {
        name: 'Name',
        accessor: 'companyname',
        width: '30%'
    },
    {
        name: 'Last',
        accessor: 'stocklastprice',
        width: '8%'
    },
    {
        name: 'Change',
        accessor: 'stockchangeprice',
        width: '8%'
    },
    {
        name: '%Chg',
        accessor: 'stockpercchange',
        width: '8%'
    },
    {
        name: 'IV Ratio',
        accessor: 'iv',
        width: '8%'
    },
    {
        name: 'Option',
        accessor: 'optionstotvol',
        width: '10%'
    },
    {
        name: '%Put',
        accessor: 'percputvolume',
        width: '8%'
    },
    {
        name: '%Cal',
        accessor: 'perccallvolume',
        width: '8%'
    },
    {
        name: '%Vol',
        accessor: 'putcallratio',
        width: '8%'
    },
    {
        name: 'Date',
        accessor: 'quotedate',
        width: '10%'
    },
]

const MostActiveSymbols = () => {

    const [ symbolData, setSymbolData ] = useState<any[]>([])
    const [ countPerPage, setCountPerPage ] = useState(countperpageArr[0])
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ totalCount, setTotalCount ] = useState(0)
    const [ lastPageNum, setLastPageNum ] = useState(0)
    const [ searchVal, setSearchVal ] = useState({
        symbol: '',
        companyname: '',
        stocklastpricefrom: '',
        stocklastpriceto: '',
        stockchangepricefrom: '', 
        stockchangepriceto: '',
        stockpercchangefrom: '', 
        stockpercchangeto: '',
        ivfrom: '', 
        ivto: '',
        optionstotvolfrom: '', 
        optionstotvolto: '',
        percputvolumefrom: '', 
        percputvolumeto: '',
        perccallvolumefrom: '', 
        perccallvolumeto: '',
        putcallratiofrom: '', 
        putcallratioto: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8080/api/options-summary',
        {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            params: {
                offset: currentPage * countPerPage,
                limit: countPerPage,
                searchquery: searchVal
            }
        })
        .then(res => {
            setSymbolData(res.data.data)
            const count = res.data.count
            setTotalCount(count)
            setCurrentPage(res.data.offset / countPerPage)
            setLastPageNum(Math.floor(count / countPerPage) - (count % countPerPage ? 0 : 1))
        })
        .catch(err => console.log(err))
    }, [currentPage, countPerPage])

    const searchQuery = useCallback(debounce((currentPage, countPerPage, searchVal) => 
        axios.get('http://localhost:8080/api/options-summary',
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            params: {
                offset: currentPage * countPerPage,
                limit: countPerPage,
                searchquery: searchVal
            }
        })
        .then(res => {
            setSymbolData(res.data.data)
            setCurrentPage(res.data.offset / countPerPage)
            const count = res.data.count
            setTotalCount(count)
            setLastPageNum(Math.floor(count / countPerPage) - (count % countPerPage ? 0 : 1))
        })
    , 800), [])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        console.log(input)
        setSearchVal({...searchVal, [e.target.name]: e.target.value});
        searchQuery(currentPage, countPerPage, {...searchVal, [e.target.name]: e.target.value});
    }

    const onCountPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountPerPage(parseInt(e.target.value))
    }

    const onHeaderClicked = (colName: string) => {
        axios.get('http://localhost:8080/api/options-summary',
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            params: {
                offset: currentPage * countPerPage,
                limit: countPerPage,
                sortBy: colName,
                searchquery: searchVal
            }
        })
        .then(res => {
            setSymbolData(res.data.data)
        })
    }

    return (
        <div className='mx-5 lg:mx-[5%] xl:mx-[10%] mb-5'>
            <div className='flex my-2'>
                <p className='grow font-["Roboto", Sans-serif] text-[30px] font-bold text-[#6ec1e4]'>
                    Most Active Symbols
                </p>
                <div className='flex-none flex justify-around items-center text-["Poppens", Sans-serif] text-bold text-sm'>
                    <p className='mr-2'>total {totalCount}</p>
                    <p>{currentPage * countPerPage + 1} - {currentPage * countPerPage + symbolData.length}</p>
                    <button className='page-btn' disabled={!currentPage} onClick={() => setCurrentPage(0)}>First</button>
                    <button className='page-btn' disabled={!currentPage} onClick={() => setCurrentPage(currentPage-1)}>Prev</button>
                    <select className='border border-purple-600 rounded-lg mx-4 px-3 outline-none' value={countPerPage} onChange={onCountPerPageChange}>
                    {
                        countperpageArr.map((num) => 
                            <option key={num.toString()}>{num}</option>
                        )
                    }
                    </select>
                    <button className='page-btn' disabled={currentPage === lastPageNum} onClick={() => setCurrentPage(currentPage+1)}>Next</button>
                    <button className='page-btn' disabled={currentPage === lastPageNum} onClick={() => setCurrentPage(lastPageNum)}>Last</button>
                </div>
            </div>
            <table className='w-full mb-5 table-fixed border-collapse border border-black text-sm text-slate-800 cursor-default'>
                <thead>
                    <tr className='hover:bg-slate-100 h-8 border border-b-2 border-slate-500'>
                    {
                        columns.map((col) =>
                            <th key={col.name} className={`px-2 border border-slate-500`} style={{width: col.width}} onClick={() => onHeaderClicked(col.accessor)}>{col.name}</th>
                        )
                    }
                    </tr>
                </thead>
                <tbody>
                    <tr className='h-8'>
                        <td className='px-2 border border-slate-300'><input type='text' className='outline-none w-full' placeholder='Search...' name='symbol' value={searchVal.symbol} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-full' placeholder='Search...' name='companyname' value={searchVal.companyname} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='stocklastpricefrom' value={searchVal.stocklastpricefrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='stocklastpriceto' value={searchVal.stocklastpriceto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='stockchangepricefrom' value={searchVal.stockchangepricefrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='stockchangepriceto' value={searchVal.stockchangepriceto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='stockpercchangefrom' value={searchVal.stockpercchangefrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='stockpercchangeto' value={searchVal.stockpercchangeto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='ivfrom' value={searchVal.ivfrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='ivto' value={searchVal.ivto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='optionstotvolfrom' value={searchVal.optionstotvolfrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='optionstotvolto' value={searchVal.optionstotvolto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='percputvolumefrom' value={searchVal.percputvolumefrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='percputvolumeto' value={searchVal.percputvolumeto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='perccallvolumefrom' value={searchVal.perccallvolumefrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='perccallvolumeto' value={searchVal.perccallvolumeto} onChange={handleChange} /></td>
                        <td className='px-2 py-1 border border-slate-300'><input type='text' className='outline-none w-2/5' placeholder='from' name='putcallratiofrom' value={searchVal.putcallratiofrom} onChange={handleChange} />{' - '}<input type='text' className='outline-none w-2/5' placeholder='to' name='putcallratioto' value={searchVal.putcallratioto} onChange={handleChange} /></td><td className='px-2 py-1 border border-slate-300'></td>
                    </tr>
                {
                    symbolData.map((item, index) => 
                        <tr key={item.symbol} className={`hover:bg-slate-100 ${index % 2 ? 'bg-slate-300' : ''}`}>
                        {
                            columns.map((col) => {
                                if(col.accessor === 'quotedate')
                                    return <td key={col.accessor} className='px-2 py-1 border border-slate-300'>{new Date(item.quotedate).toLocaleDateString()}</td>
                                else if(col.accessor === 'stockpercchange' || col.accessor === 'iv' || col.accessor === 'percputvolume' || col.accessor === 'perccallvolume' || col.accessor === 'putcallratio')
                                    return <td key={col.accessor} className='px-2 py-1 border border-slate-300'>{`${(item[col.accessor]*100).toFixed(2)}%`}</td>
                                else return <td key={col.accessor} className='px-2 py-1 border border-slate-300'>{item[col.accessor]}</td>
                            })
                        }
                        </tr>
                    )
                }
                </tbody>
            </table>
            <div className='mb-2 w-full flex flex-col items-center text-["Poppens", Sans-serif] text-bold text-xl'>
                <p>total {totalCount}</p>
                <p>{currentPage * countPerPage + 1} - {currentPage * countPerPage + symbolData.length}</p>
            </div>
            <div className='w-full flex justify-center'>
                <button className='page-btn' disabled={!currentPage} onClick={() => setCurrentPage(0)}>First</button>
                <button className='page-btn' disabled={!currentPage} onClick={() => setCurrentPage(currentPage-1)}>Prev</button>
                <select className='border border-purple-600 rounded-lg mx-4 px-3 outline-none' value={countPerPage} onChange={onCountPerPageChange}>
                {
                    countperpageArr.map((num) => 
                        <option key={num.toString()}>{num}</option>
                    )
                }
                </select>
                <button className='page-btn' disabled={currentPage === lastPageNum} onClick={() => setCurrentPage(currentPage+1)}>Next</button>
                <button className='page-btn' disabled={currentPage === lastPageNum} onClick={() => setCurrentPage(lastPageNum)}>Last</button>
            </div>
        </div>
    )
}

export default MostActiveSymbols