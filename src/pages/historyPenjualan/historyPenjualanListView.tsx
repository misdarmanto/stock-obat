import MainLayout from '../../layout/mainLayout'
import { Breadcrumb } from '../../components/breadCumber'
import { Link } from 'react-router-dom'
import { IAppContextModel, useAppContext } from '../../context/app.context'
import { Collections, firebaseCRUD } from '../../firebase/firebaseFunctions'
import { useEffect, useState } from 'react'
import { IStock } from '../../models/stock'
import moment from 'moment'
import * as XLSX from 'xlsx'
import StockTableView from './stockTableView'
import { IHistoryPenjulan } from '../../models/historyPenjualan'

const HistoryPenjualanListView = () => {
  const navigation = [{ title: 'History Penjualan Obat', href: '', active: true }]
  const { setErrorApp }: IAppContextModel = useAppContext()
  const [historyPenjualan, setHistoryPenjualan] = useState<IHistoryPenjulan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const tableData = {
    header: ['No', 'nama', 'batch', 'terjual', 'tgl'],
    body: [historyPenjualan]
  }

  const download = async () => {
    try {
      let xlsRows: any[] = []
      historyPenjualan.map((value: IHistoryPenjulan) => {
        let documentItem = {
          namaObat: value.namaObat,
          batch: value.batch,
          total: value.total,
          time: value.time
        }
        xlsRows.push(documentItem)
      })

      let xlsHeader = ['Nama Obat', 'Batch', 'Stok', 'Tgl']
      let createXLSLFormatObj = []
      createXLSLFormatObj.push(xlsHeader)
      xlsRows.map((value: IHistoryPenjulan, i) => {
        let innerRowData = []
        innerRowData.push(value.namaObat)
        innerRowData.push(value.batch)
        innerRowData.push(value.total)
        innerRowData.push(value.time)
        createXLSLFormatObj.push(innerRowData)
      })

      /* File Name */
      let filename = `Data History Penjualan ${moment().format('DD-MM-YYYY')}.xlsx`

      /* Sheet Name */
      let ws_name = 'Sheet1'
      if (typeof console !== 'undefined') console.log(new Date())
      let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj)

      XLSX.utils.book_append_sheet(wb, ws, ws_name)
      XLSX.writeFile(wb, filename)
    } catch (error) {
      console.log(error)
    }
  }

  const getStokObat = async () => {
    try {
      const result = await firebaseCRUD.getCollectionData({
        collectionName: Collections.HISTORY_PENJUALAN
      })

      setHistoryPenjualan(result)
      console.log('________history')
      console.log(result)
    } catch (error: any) {
      setErrorApp({ isError: true, message: error.message })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getStokObat()
  }, [])

  if (isLoading) return <div>loading...</div>

  return (
    <MainLayout>
      <Breadcrumb title={'History'} navigation={navigation} />
      <div className='flex flex-col gap-2 md:flex-row justify-between mb-5 md:px-0'>
        <div className='flex flex-row flex-wrap gap-2'>
          <div>
            <button
              type='button'
              onClick={download}
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded'
            >
              Download
            </button>
          </div>
        </div>
        <div className='w-full  md:w-1/5'>
          <input
            name='search'
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder='Cari data'
            type='text'
          />
        </div>
      </div>
      <StockTableView tableData={tableData} />
    </MainLayout>
  )
}

export default HistoryPenjualanListView
