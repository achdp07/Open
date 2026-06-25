import { Download } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {

  const [active, setActive] = useState('AI');

  const tabs = [
    'A propos',
    'Programme',
    'Regles',
    'Equipe',
    'Updates',
  ];

  return (

    <div className="w-full flex justify-center py-4">
      <div className=" w-fit flex items-center justify-between gap-6 bg-white
        border border-slate-200 rounded-full shadow-sm p-2">

        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all
                ${
                active === tab
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-500 hover:bg-slate-50'
              }
              `}
            >
              {tab}
            </button>

          ))}

        </div>

        <button className=" flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
             px-8 py-3 rounded-full font-semibold transition-all"
        > <Download size={18} /> Download
         </button>

      </div>

    </div>

  );
}