import Dependents from "../../components/Dependents";
import CardForm from "../../components/CardForm";

export default function ClientDashboard() {

  return (
    <div className='grid-container flex flex-col h-full overflow-hidden'>
      <div
      style={{ display: 'grid' }} 
      className='h-[90%] gap-4'>
        <div
            className="grid-item bg-slate-200 mx-2 mt-2"
            style={{ gridRow: '1', gridColumn: '1' }}
        >
          <div className="bg-gray-700 p-4 flex flex-col items-center">
            <img src='#' alt='Some image' className="w-full h-32 object-cover mb-4" />
            <h2 className="text-xl mb-2">Package Name</h2>
            <p className="text-sm mb-4">Package Details</p>
            <p className="text-xl mb-2">Package Price</p>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div
              className="grid-item w-[50%] ml-2"
              style={{ gridRow: '2', gridColumn: '1' }}
          >
           <Dependents />
          </div>
          <div
            className="grid-item w-[50%] mr-2"
            style={{ gridRow: '2', gridColumn: '2' }}
          >
            <CardForm />
          </div>
        </div>
      </div>
      <button 
      className="justify-center py-2 mx-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save all
      </button>
    </div>
  );
}
