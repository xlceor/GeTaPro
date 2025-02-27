import {inter} from '@/app/ui/fonts'
export default function Listnum({num}) {
    return (
      <div className={`${inter.className} flex h-10 w-10 justify-center items-center bg-slate-600`}>
          {num}
      </div>
    );
  }