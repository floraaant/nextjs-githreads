import React from "react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function NotFound(){
    return(
        <Alert className='my-8'>
        <AlertTriangle />
        <AlertTitle>404 Not Found.</AlertTitle>
        <AlertDescription>The post may be deleted or deactivated, or does not exist.</AlertDescription>
      </Alert>
    )
}