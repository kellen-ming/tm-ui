"use client";

import { ComparisonTable } from "@/components/feature/comparison-table";
import { Button, ButtonProps } from "@/components/ui/tm-button";

import { getComparePlansTableGroups } from "./compare-plans-table-data";

function HeaderItem({
  title,
  buttonText,
  buttonProps,
}: {
  title: string;
  buttonText: string;
  buttonProps?: ButtonProps;
}) {
  return (
    <div className='flex flex-col items-start gap-lg '>
      <h4 className='text-2xl font-semibold text-white'>{title}</h4>
      <Button size='sm' {...buttonProps} className='w-full px-4'>
        {buttonText}
      </Button>
    </div>
  );
}

const DEFAULT_COURIERS_COUNT = "1,356";

export default function TablePage() {
  return (
    <div className='w-full min-h-screen bg-gray-900 text-white py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl font-bold mb-8 text-center'>Pricing Comparison</h1>

        <ComparisonTable
          className='bg-bgc-primary-black-default rounded-md  '
          tableClassName=''
          stickyHeader
          columns={[
            {
              key: "free",
              header: (
                <HeaderItem title='Free' buttonText='Get started free' buttonProps={{ variant: "secondary-white" }} />
              ),
            },
            {
              key: "basic",
              header: (
                <HeaderItem title='Basic' buttonText='Get started free' buttonProps={{ variant: "secondary-white" }} />
              ),
            },
            {
              key: "pro",
              header: <HeaderItem title='Pro' buttonText='Get started free' buttonProps={{ variant: "linear" }} />,
            },
            {
              key: "enterprise",
              header: <HeaderItem title='Enterprise' buttonText='Get started free' />,
            },
          ]}
          groups={getComparePlansTableGroups(DEFAULT_COURIERS_COUNT)}
        />
      </div>
    </div>
  );
}
