import { motion } from 'framer-motion'

export default function PageHeader({ title, description, eyebrow = 'ENVAI Platform', action }) {
  return (
    <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-envai-green">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 dark:text-white md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {action}
    </motion.header>
  )
}
