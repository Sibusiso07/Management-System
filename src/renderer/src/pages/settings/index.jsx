import { useState, useEffect, useContext } from 'react';

// Settings Context.
import { SettingsContext } from '@/context/SettingsContext';

// UI Components.
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Settings = () => {
  // Hook Settings context.
  const { printer, setPrinter } = useContext(SettingsContext);

  // State for printers
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(printer);

  // Function to fetch printers
  const fetchPrinters = async () => {
    const printers = await window.api.getPrinters();
    setPrinters(printers);
  };

  // Fetch printers when the component mounts
  useEffect(() => {
    fetchPrinters();
  }, []);

  // Sync selectedPrinter with context printer
  useEffect(() => {
    setSelectedPrinter(printer);
  }, [printer]);

  // Handle Selected Printer.
  const handleSelectPrinter = (printerName) => {
    setSelectedPrinter(printerName);
    setPrinter(printerName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-white">Printer Settings</h2>
        <div className="mt-6">
          <label className="block text-sm font-medium text-white">Select Printer</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white text-black font-medium rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {selectedPrinter || 'Select a printer'}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full mt-1 bg-white shadow-lg max-h-56 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
              <DropdownMenuSeparator />
              {printers.map((printer) => (
                <DropdownMenuItem
                  key={printer.name}
                  value={selectedPrinter}
                  onClick={() => handleSelectPrinter(printer.name)}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9"
                >
                  {printer.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Settings;
