import Icons from './Icons.jsx';

// export default function Sidebar() {
//   return (
//     <section className="w-[7%]  h-[90vh] bg-[#1E1F25] flex flex-col items-center justify-center">
//       <Icons></Icons>
//     </section>
//   );
// }

import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="absolute mt-5 h-10 xs:block bg-[#1E1F25] rounded-r-full sm:hidden">
        <img className="h-[75%]" src="/src/assets/icons/right-arrow.png" alt="Open sidebar" />
      </button>
      <div className={`fixed left-0 h-full w-full bg-[#1E1F25] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:static sm:bg-transparent sm:w-auto`}>
        <button onClick={() => setIsOpen(false)} className="mt-5 ml-5 h-10 xs:block sm:hidden">
          <img className="h-8" src="/src/assets/icons/close.png" alt="Close sidebar" />
        </button>
      </div>
      <section className=" w-20 h-[90vh] bg-[#1E1F25] flex flex-col gap-10 items-center justify-center xs:hidden">
        <Icons></Icons>
      </section>
    </div>
  );
}
