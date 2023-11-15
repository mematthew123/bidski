import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Props = {
  open: boolean;
  onClose: () => void;
  material: any;
  onUpdate: () => void;
};

export default function UpdateMaterialsModal({
  open,
  onClose,
  material,
  onUpdate,
}: Props) {
  const [primer, setPrimer] = useState('');
  const [primerPrice, setPrimerPrice] = useState(0);
  const [rollers, setRollers] = useState('');
  const [rollersPrice, setRollersPrice] = useState(0);
  const [brushes, setBrushes] = useState('');
  const [brushesPrice, setBrushesPrice] = useState(0);
  const [tape, setTape] = useState('');
  const [tapePrice, setTapePrice] = useState(0);
  const [caulk, setCaulk] = useState('');
  const [caulkPrice, setCaulkPrice] = useState(0);
  const [dropSheets, setDropSheets] = useState('');
  const [dropSheetsPrice, setDropSheetsPrice] = useState(0);
  const [cleaningSupplies, setCleaningSupplies] = useState('');
  const [cleaningSuppliesPrice, setCleaningSuppliesPrice] = useState(0);

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    // Pre-populate the form fields when the modal opens
    if (material) {
      setPrimer(material.primer);
      setPrimerPrice(material.primer_price);
      setRollers(material.rollers);
      setRollersPrice(material.rollers_price);
      setBrushes(material.brushes);
      setBrushesPrice(material.brushes_price);
      setTape(material.tape);
      setTapePrice(material.tape_price);
      setCaulk(material.caulk);
      setCaulkPrice(material.caulk_price);
      setDropSheets(material.drop_sheets);
      setDropSheetsPrice(material.drop_sheets_price);
      setCleaningSupplies(material.cleaning_supplies);
      setCleaningSuppliesPrice(material.cleaning_supplies_price);
    }
  }, [material]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const { data: user } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('materials')
      .update({
        primer,
        primer_price: primerPrice,
        rollers,
        rollers_price: rollersPrice,
        brushes,
        brushes_price: brushesPrice,
        tape,
        tape_price: tapePrice,
        caulk,
        caulk_price: caulkPrice,
        drop_sheets: dropSheets,
        drop_sheets_price: dropSheetsPrice,
        cleaning_supplies: cleaningSupplies,
        cleaning_supplies_price: cleaningSuppliesPrice,
      })
      .eq('user_id', material.user_id);

    console.log('User:', user);

    if (!error) {
      onClose();
      onUpdate(); // Call the callback function to update materials in view
    } else if (error) {
      console.error('Error updating materials:', error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={onClose} // Using the onClose prop to close the modal
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='px-4 py-5 sm:p-6'>
                  <div className='text-center'>
                    <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                      <CheckIcon
                        className='h-6 w-6 text-green-600'
                        aria-hidden='true'
                      />
                    </div>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-semibold leading-6 text-gray-900 my-4'
                    >
                      Edit Materials
                    </Dialog.Title>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                      {/* Repeat for each input field */}
                      <div>
                        <label
                          htmlFor='primer'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Primer
                        </label>
                        <input
                          id='primer'
                          type='text'
                          value={primer}
                          onChange={(e) => setPrimer(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label
                          htmlFor='primer_price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Primer Price
                        </label>
                        <input
                          id='primer_price'
                          type='number'
                          value={primerPrice}
                          onChange={(e) => setPrimerPrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Rollers
                        </label>
                        <input
                          id='rollers'
                          type='text'
                          value={rollers}
                          onChange={(e) => setRollers(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label
                          htmlFor='rollers_price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Rollers Price
                        </label>
                        <input
                          id='rollers_price'
                          type='number'
                          value={rollersPrice}
                          onChange={(e) => setRollersPrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Brushes
                        </label>
                        <input
                          id='brushes'
                          type='text'
                          value={brushes}
                          onChange={(e) => setBrushes(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label
                          htmlFor='brushes_price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Brushes Price
                        </label>
                        <input
                          id='brushes_price'
                          type='number'
                          value={brushesPrice}
                          onChange={(e) => setBrushesPrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Tape
                        </label>
                        <input
                          id='tape'
                          type='text'
                          value={tape}
                          onChange={(e) => setTape(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label
                          htmlFor='tape_price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Tape Price
                        </label>
                        <input
                          id='tape_price'
                          type='number'
                          value={tapePrice}
                          onChange={(e) => setTapePrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Caulk
                        </label>
                        <input
                          id='caulk'
                          type='text'
                          value={caulk}
                          onChange={(e) => setCaulk(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label
                          htmlFor='caulk_price'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Caulk Price
                        </label>
                        <input
                          id='caulk_price'
                          type='number'
                          value={caulkPrice}
                          onChange={(e) => setCaulkPrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Drop Sheets
                        </label>
                        <input
                          id='drop_sheets'
                          type='text'
                          value={dropSheets}
                          onChange={(e) => setDropSheets(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <label className='block text-sm font-medium text-gray-700'>
                          Drop Sheets Price
                        </label>
                        <input
                          id='drop_sheets_price'
                          type='number'
                          value={dropSheetsPrice}
                          onChange={(e) => setDropSheetsPrice(+e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />

                        <label className='block text-sm font-medium text-gray-700'>
                          Cleaning Supplies
                        </label>
                        <input
                          id='cleaning_supplies'
                          type='text'
                          value={cleaningSupplies}
                          onChange={(e) => setCleaningSupplies(e.target.value)}
                          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    onClick={handleSubmit}
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className='mt-3 w-full inline-flex justify-center rounded-md bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
