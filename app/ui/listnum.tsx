import { inter } from '@/app/ui/fonts'

interface ListnumProps {
  num: number | string; // o string, dependiendo de lo que esperas
}

export default function Listnum({ num }: ListnumProps) {
  return (
    <div className={`${inter.className} flex h-full w-14 font-extrabold p-10 text-xl justify-center items-center shadow-inner rounded shadow-black/20`}>
      {num}
    </div>
  );
}