export default function ClientDashboard() {
  return (
    <div className='h-full w-full overflow-hidden flex flex-col'>
      <div
        className='gap-3 flex-grow grid'
        style={{ gridTemplateColumns: '40% 60%', gridTemplateRows: 'repeat(5, 1fr)' }}
      >
        <div
          className="bg-slate-200 ml-2 mt-2"
          style={{ gridColumn: '1', gridRow: '1 / span 5' }}
        >
          <p>Part 1</p>
        </div>
        <div
          className="mr-4 mt-2 border-white"
          style={{ gridColumn: '2', gridRow: '1' }}
        >
          <div className="flex items-center justify-center">
            <div className="flex space-x-4">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">Button 1</Button>
              <Button className="bg-green-500 text-white px-4 py-2 rounded">Button 2</Button>
              <Button className="bg-red-500 text-white px-4 py-2 rounded">Button 3</Button>
            </div>
          </div>
        </div>
        <div
          className="mr-4  bg-green-400"
          style={{ gridColumn: '2', gridRow: '2 / span 4' }}
        >
          <p>Part 3</p>
        </div>
      </div>
      <Button className="bg-yellow-300 self-center m-4 p-2">Next</Button>
    </div>
  );
}
