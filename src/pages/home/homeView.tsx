import { BsDatabase } from 'react-icons/bs'
import MainLayout from '../../layout/mainLayout'
import { useEffect, useState } from 'react'
import { Collections, firebaseCRUD } from '../../firebase/firebaseFunctions'
import { IAppContextModel, useAppContext } from '../../context/app.context'
import { IStock } from '../../models/stock'
import { it } from 'node:test'

const bgColors = ['bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-rose-500']
const obatList = ['obatA 343', 'obatB 33', 'obatC 65', 'obatD 676', 'obatE 5445']

const HomeView = () => {
  const { setErrorApp }: IAppContextModel = useAppContext()
  const [stockList, setStockList] = useState<IStock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getStokObat = async () => {
    try {
      const result = await firebaseCRUD.getCollectionData({
        collectionName: Collections.STOCKS
      })
      setStockList(result)
    } catch (error: any) {
      setErrorApp({ isError: true, message: error.message })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getStokObat()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <MainLayout>
      <div className='flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5'>
        {stockList.map((item, index) => {
          return (
            <CardInfo key={index} className={bgColors[index]}>
              <BsDatabase className='text-white group-hover:text-white mr-3 flex-shrink-0 h-6 w-6' />
              <p className='font-extrabold text-white'>
                {item.namaObat} {item.stock}
              </p>
            </CardInfo>
          )
        })}
      </div>
    </MainLayout>
  )
}

const CardInfo = ({ children, className }: { children: any; className?: string }) => (
  <div
    className={`bg-blue-500 w-full md:max-w-xs sm:mr-2 my-2 sm:my-3 flex p-6 rounded-lg shadow`}
  >
    {children}
  </div>
)

export default HomeView
