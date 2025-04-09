import { twMerge } from 'tailwind-merge'

export function Title({ lbl, className }: { lbl: string; className?: string }) {
  return <h1 className={twMerge('text-2xl font-bold leading-none', className)}>{lbl}</h1>
}
