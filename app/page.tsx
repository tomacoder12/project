import TeamsClone from '@/components/main'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback="loading">
      <TeamsClone />
    </Suspense>
  )
}

export default page
