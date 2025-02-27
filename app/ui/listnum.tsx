import { inter } from '@/app/ui/fonts'

interface ListnumProps {
  num: number; // o string, dependiendo de lo que esperas
}

export default function Listnum({ num }: ListnumProps) {
  return (
    <div className={`${inter.className} flex h-10 w-10 justify-center items-center bg-slate-600`}>
      {num}
    </div>
  );
}