'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { changeOrerstatus } from './actions'


const LABEL_MAP: Record< keyof typeof OrderStatus, string> = {
    awaiting_shipment: 'Awaiting Shipment',
    fulfilled: 'Fullfilled',
    shipped: 'Shipped',
}

const StatusDropdown = ({ id, orderStatus } : {id: string, orderStatus: OrderStatus}) => {

    const router = useRouter()

    const { mutate } = useMutation({
        mutationKey: ['change-order-status'],
        mutationFn: changeOrerstatus,
        onSuccess: () => {
          router.refresh()},
    })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'
        className='w-52 flex justify-between items-center'>
            {
                LABEL_MAP[orderStatus]
            }
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />

        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        {
            Object.keys(OrderStatus).map((status) => (
              <DropdownMenuItem key={status} className={cn('flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100', {
                'bg-zinc-100': status === orderStatus,
              })} onClick={() => mutate({ id, newStatus: status as OrderStatus}) } >
                <Check className={cn('mr-2 h-4 w-4 text-primary', orderStatus == status ? 'opacity-100' : 'opacity-0')} />
              {LABEL_MAP[status as OrderStatus]}
              </DropdownMenuItem>
            ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default StatusDropdown
