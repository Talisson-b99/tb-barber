'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import { Input } from './ui/input'

const inputSchema = z.object({
  search: z.string().min(2, { message: 'Campo obrigatório' }),
})

type SearchInput = z.infer<typeof inputSchema>

const SearchInput = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchInput>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      search: '',
    },
  })

  function handleSearch(data: SearchInput) {
    router.push(`/barbershops-search/search?q=${data.search}`)
  }
  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit(handleSearch)}>
      <div className="flex w-full flex-col gap-2">
        <Input
          className="flex-1 border px-3 py-2 shadow-sm outline-none focus-within:ring-violet-100 focus-within:transition-colors focus-within:duration-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
          placeholder="Buscar..."
          {...register('search')}
        />
        {errors.search?.message && <p>{errors.search?.message}</p>}
      </div>
      <Button size={'icon'} type="submit">
        <Search />
      </Button>
    </form>
  )
}

export default SearchInput
