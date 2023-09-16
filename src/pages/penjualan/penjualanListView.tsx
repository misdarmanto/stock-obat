import { useEffect, useState } from 'react'
import { Breadcrumb } from '../../components/breadCumber'
import MainLayout from '../../layout/mainLayout'
import { Collections, firebaseCRUD } from '../../firebase/firebaseFunctions'
import { useNavigate } from 'react-router-dom'
import { IAppContextModel, useAppContext } from '../../context/app.context'
import { IStock } from '../../models/stock'
import { IHistoryPenjulan } from '../../models/historyPenjualan'

const ProductTerjualListView = () => {
  const navigation = [{ title: 'Create', href: '', active: true }]
  const navigate = useNavigate()

  const [namaObat, setnamaObat] = useState('')
  const [time, setTime] = useState('')
  const [batch, setBatch] = useState('')
  const [total, setTotal] = useState<number>(0)
  const { setErrorApp }: IAppContextModel = useAppContext()
  const [isLoading, setIsLoading] = useState(true)
  const [stockList, setStockList] = useState<IStock[]>([])
  const [obatSelected, setObatSelected] = useState<IStock | any>()

  const getStokObat = async () => {
    try {
      const result = await firebaseCRUD.getCollectionData({
        collectionName: Collections.STOCKS
      })
      if (result) {
        setStockList(result)
        setObatSelected(result[0])
      }
    } catch (error: any) {
      setErrorApp({ isError: true, message: error.message })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getStokObat()
  }, [])

  const handleSubmit = async () => {
    try {
      const checkField = obatSelected === null || total === 0 || time === ''
      if (checkField) {
        throw Error('mohon lengkapi semua data')
      }
      const newTotalStock = obatSelected?.stock - total
      if (newTotalStock < 0) {
        throw Error('stock tidak cukup')
      }

      const payload: IHistoryPenjulan = {
        namaObat: obatSelected?.namaObat,
        time: time,
        batch: obatSelected?.batch,
        total: total,
        obatId: obatSelected?.id
      }

      await firebaseCRUD.createData({
        collectionName: Collections.HISTORY_PENJUALAN,
        data: payload
      })

      await firebaseCRUD.updateDocumentData({
        collectionName: Collections.STOCKS,
        documentId: obatSelected.id,
        data: { stock: newTotalStock }
      })

      console.log(payload)

      navigate('/history')
    } catch (error: any) {
      setErrorApp({ isError: true, message: error.message })
    }
  }

  if (isLoading) return <div>loading...</div>

  return (
    <MainLayout>
      <Breadcrumb title={'Penjualan Obat'} navigation={navigation} />
      <div className='bg-white rounded p-5 sm:p-10'>
        <div className='sm:my-6 flex flex-col sm:flex-row gap-5'>
          <div className='w-full sm:w-1/2'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              Nama Obat
            </label>
            <select
              onChange={(e) => setObatSelected(JSON.parse(e.target.value))}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              {stockList.map((item: IStock, index: number) => (
                <option key={index} value={JSON.stringify(item)}>
                  {item.namaObat}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full sm:w-1/2'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>Jumlah</label>
            <input
              type='number'
              min={0}
              value={total}
              onChange={(e) => setTotal(+e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              required
            />
          </div>
        </div>
        <div className='sm:my-6 flex flex-col sm:flex-row gap-5'>
          <div className='w-full sm:w-1/2'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              Tgl Penjualan
            </label>
            <input
              type='date'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              required
            />
          </div>
        </div>
        <div className='flex flex-row justify-end mt-5 sm:mt-2'>
          <button
            type='button'
            onClick={handleSubmit}
            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded'
          >
            Submit
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProductTerjualListView
