import { IHistoryPenjulan } from '../../models/historyPenjualan'
import { IStock } from '../../models/stock'

import { useEffect, useState } from 'react'

export interface ITableData {
  tableData: {
    header: string[]
    body: any[][]
  }
  isUseAction?: boolean
}

const StockTableView = (props: ITableData) => {
  const [tableBody, setTableBody] = useState<IHistoryPenjulan[]>([])

  useEffect(() => {
    const data: IHistoryPenjulan[] = []
    props.tableData.body.forEach((items: any) => {
      data.push(...items)
    })
    setTableBody(data)
  }, [])

  const dateTime = new Date()

  return (
    <div className='relative overflow-x-auto w-full'>
      <table className='w-full text-sm text-left text-gray-500 bg-gray-50'>
        <thead className='text-xs text-gray-700 uppercase w-full'>
          <tr>
            {props.tableData.header.map((item, index) => {
              return (
                <th key={index} scope='col' className='px-6 py-3'>
                  {item}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tableBody.length !== 0 &&
            tableBody.map((item: IHistoryPenjulan, index: number) => (
              <tr
                key={index}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>{item.namaObat || '_'}</td>
                <td className='px-6 py-4'>{item.batch || '_'}</td>
                <td className='px-6 py-4'>{item.total || '_'}</td>
                <td className='px-6 py-4'>{item.time || '_'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default StockTableView
