'use client'
import React, { useEffect, useRef } from 'react'
import { IMessage, useMessage } from './messages-store'
import { LIMIT_MESSAGES } from '@/constant'

const InitMessages = ({ messages } : { messages : IMessage[] | undefined} ) => {

    const initState = useRef(false)
    const hasMore = (messages?.length ?? 0) >= LIMIT_MESSAGES

  useEffect(() => {

    if(!initState.current){
        useMessage.setState({ messages, hasMore })
    }

    initState.current = true

    // eslint-disable-next-line
  },[])  

  return (
    <></>
  )
}

export default InitMessages