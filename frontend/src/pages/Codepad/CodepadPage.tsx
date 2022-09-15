import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Typography,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemText,
} from '@mui/material'

import { useSocket } from '../../context/SocketContext'
import Header from '../../components/Header'
import { DifficultyType } from '../../enums/Difficulty'
import { HOME } from '../../constants/directory'

interface LocationState {
  roomId: string
  difficulty: DifficultyType
}

const CodepadPage = () => {
  const navigate = useNavigate()
  const { socket, setSocket } = useSocket()
  const { roomId, difficulty } = useLocation().state as LocationState
  const [dialogueOpen, setDialogueOpen] = useState(false)

  useEffect(() => {
    socket!.on('matchLost', (data) => {
      setDialogueOpen(true)
    })
  }, [socket])

  const handleLeaveRoom = () => {
    socket!.disconnect()
    setSocket(null)
  }

  const handleHomeButton = () => {
    socket!.disconnect()
    setSocket(null)

    navigate(HOME)
  }

  return (
    <div>
      <Header enableHeaderButtons={false} handleLeaveRoom={handleLeaveRoom} />
      <Typography>Codepad Page</Typography>
      <Typography>Room ID: {roomId}</Typography>
      <Typography>Difficulty: {difficulty}</Typography>
      <Dialog open={dialogueOpen}>
        <DialogTitle>Uhoh! Your match left!</DialogTitle>
        <ListItem button onClick={handleHomeButton}>
          <ListItemText primary={'Home'} />
        </ListItem>
      </Dialog>
    </div>
  )
}

export default CodepadPage
