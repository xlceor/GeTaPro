import { inter } from '@/app/ui/fonts'

interface ListnumProps {
  num: number | string; // o string, dependiendo de lo que esperas
}

export default function Listnum({ num }: ListnumProps) {
  return (
    <div className={`${inter.className} flex h-10 w-10 font-extrabold p-2 text-xl justify-center items-center bg-gray-800`}>
      {num}
    </div>
  );
}