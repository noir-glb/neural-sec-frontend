"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, ChevronLeft, ChevronRight } from "lucide-react"

interface DatabaseDetectFeedProps {
  currentCamera: number
  onCameraChange: (camera: number) => void
}

export function DatabaseDetectFeed({ currentCamera, onCameraChange }: DatabaseDetectFeedProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isActive, setIsActive] = useState(true) // Auto-start
  const [isUsingIPCam, setIsUsingIPCam] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cameras = [
    { id: 1, name: "Camera 1 - Main Entrance" },
    { id: 2, name: "Camera 2 - Side Entrance" },
  ]

  const handlePrevCamera = () => {
    onCameraChange(currentCamera === 1 ? cameras.length : currentCamera - 1)
  }

  const handleNextCamera = () => {
    onCameraChange(currentCamera === cameras.length ? 1 : currentCamera + 1)
  }

  const handleToggle = () => {
    setIsActive((prev) => !prev)
  }

  useEffect(() => {
    const startCamera = async () => {
      try {
        setError(null)

        // Stop any existing before starting
        stopCamera()

        // For demo, use device webcam (add IP logic if needed per camera)
        const constraints = {
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          const playPromise = videoRef.current.play()
          if (playPromise !== undefined) {
            await playPromise.catch((playErr) => {
              if (playErr.name !== 'AbortError') {
                throw playErr // Re-throw non-abort errors
              }
            })
          }
        }
        setIsUsingIPCam(false)
      } catch (err) {
        console.error("Error starting camera:", err)
        setError("Unable to access camera.")
      }
    }

    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.srcObject = null
        videoRef.current.src = ""
        videoRef.current.load() // Reset video state
      }
    }

    if (isActive) startCamera()
    else stopCamera()

    return () => stopCamera()
  }, [isActive, currentCamera]) // Re-run on camera change

  return (
    <div 
      onClick={handleToggle}
      className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden h-full flex flex-col cursor-pointer"
    >
      {/* Video Feed */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <p className="text-red-400 mb-2">{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isActive ? "hidden" : ""}`}
          />
        )}

        {!isActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <Camera size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Live Feed - {cameras[currentCamera - 1].name}</p>
            <p className="text-xs text-gray-600">Detecting criminals from database...</p>
          </div>
        )}

        {/* Detection Overlay */}
        {isActive && !error && (
          <div className="absolute top-4 right-4 bg-red-600/20 border border-red-500 rounded px-2 py-1">
            <span className="text-xs text-red-400 font-semibold">DETECTING</span>
          </div>
        )}
      </div>

      {/* Camera Toggle Controls */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrevCamera(); }}
          className="p-1.5 hover:bg-slate-700 rounded transition-colors text-gray-400 hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <p className="text-white font-semibold text-xs">{cameras[currentCamera - 1].name}</p>
          <p className="text-xs text-gray-400">
            Camera {currentCamera} of {cameras.length}
          </p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); handleNextCamera(); }}
          className="p-1.5 hover:bg-slate-700 rounded transition-colors text-gray-400 hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}