"use client";

import { ReactNode } from 'react'
import { AuthProvider} from './AuthContext'

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>
}

export {AllProviders}
export * from './AuthContext'