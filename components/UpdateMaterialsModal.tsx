import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Props = {
  open: boolean;
  onClose: () => void;
  material: any;
};

export default function UpdateMaterialsModal({
  open,
  onClose,
  material,
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
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <CheckIcon
                      className='h-6 w-6 text-green-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900'
                    >
                      Edit Materials
                    </Dialog.Title>
                    <div className='mt-2'>
                      <form onSubmit={handleSubmit}>
                        <input
                          type='text'
                          value={primer}
                          onChange={(e) => setPrimer(e.target.value)}
                          placeholder='Primer'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='number'
                          value={primerPrice}
                          onChange={(e) =>
                            setPrimerPrice(parseInt(e.target.value))
                          }
                          placeholder='Primer Price'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='text'
                          value={rollers}
                          onChange={(e) => setRollers(e.target.value)}
                          placeholder='Rollers'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='number'
                          value={rollersPrice}
                          onChange={(e) =>
                            setRollersPrice(parseInt(e.target.value))
                          }
                          placeholder='Rollers Price'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='text'
                          value={brushes}
                          onChange={(e) => setBrushes(e.target.value)}
                          placeholder='Brushes'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='number'
                          value={brushesPrice}
                          onChange={(e) =>
                            setBrushesPrice(parseInt(e.target.value))
                          }
                          placeholder='Brushes Price'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='text'
                          value={tape}
                          onChange={(e) => setTape(e.target.value)}
                          placeholder='Tape'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='number'
                          value={tapePrice}
                          onChange={(e) =>
                            setTapePrice(parseInt(e.target.value))
                          }
                          placeholder='Tape Price'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='text'
                          value={caulk}
                          onChange={(e) => setCaulk(e.target.value)}
                          placeholder='Caulk'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                        <input
                          type='number'
                          value={caulkPrice}
                          onChange={(e) =>
                            setCaulkPrice(parseInt(e.target.value))
                          }
                          placeholder='Caulk Price'
                          className='my-4 block w-full border-gray-800 h-14 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg'
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <button
                    onClick={handleSubmit}
                    type='submit'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:col-start-2 sm:text-sm'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                    onClick={onClose}
                    ref={cancelButtonRef}
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
