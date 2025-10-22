"use client"

import { useEffect, useRef, useState } from "react"

interface VideoStreamProps {
  cameraId: string
  ipStreamUrl?: string // optional IP webcam URL
  isActive?: boolean // Controlled active state from parent (default false)
  deviceId?: string // Optional specific device ID for getUserMedia
  onToggle?: (active: boolean) => void // Optional callback for parent
}

export default function VideoStream({ 
  cameraId, 
  ipStreamUrl, 
  isActive: controlledActive = false, 
  deviceId,
  onToggle 
}: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [internalActive, setInternalActive] = useState(false)
  const [isUsingIPCam, setIsUsingIPCam] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use controlled or internal state
  const isActive = controlledActive !== undefined ? controlledActive : internalActive

  useEffect(() => {
    const startCamera = async () => {
      try {
        setError(null)

        // Stop any existing before starting
        stopCamera()

        // 1️⃣ Try IP camera first
        if (ipStreamUrl) {
          try {
            const response = await fetch(ipStreamUrl, { method: "HEAD", cache: "no-store" })
            if (response.ok && videoRef.current) {
              videoRef.current.src = ipStreamUrl
              videoRef.current.load() // Explicit load after src change
              const playPromise = videoRef.current.play()
              if (playPromise !== undefined) {
                await playPromise.catch((playErr) => {
                  if (playErr.name !== 'AbortError') {
                    throw playErr // Re-throw non-abort errors
                  }
                })
              }
              setIsUsingIPCam(true)
              return
            }
          } catch {
            console.warn(`IP camera ${cameraId} not reachable, falling back to device cam.`)
          }
        }

        // 2️⃣ Fallback to device webcam
        const constraints = {
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, ...(deviceId && { deviceId: { exact: deviceId } }) },
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
                throw playErr
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
      setIsUsingIPCam(false)
    }

    if (isActive) startCamera()
    else stopCamera()

    return () => stopCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, ipStreamUrl, deviceId])

  const handleToggle = () => {
    const newActive = !isActive
    if (controlledActive === undefined) {
      setInternalActive(newActive)
    }
    onToggle?.(newActive)
  }

  return (
    <div
      onClick={handleToggle}
      className="overflow-hidden rounded-lg bg-slate-800 shadow-lg cursor-pointer transition-transform hover:scale-[1.01] h-full flex flex-col"
    >
      <div className="flex-1 relative bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleToggle(); }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
              >
                Retry
              </button>
            </div>
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
            <div className="mb-2 text-4xl">📹</div>
            <p className="text-lg font-semibold text-white">Camera {cameraId}</p>
            <p className="text-sm text-slate-400">Click to Turn ON</p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-700 p-4 flex-shrink-0">
        <p className="text-sm text-slate-300">
          {isActive ? (
            <>
              <span className="font-semibold text-green-400">● Live</span> - Camera {cameraId}{" "}
              {isUsingIPCam && <span className="text-xs text-slate-400">(IP Cam)</span>}
            </>
          ) : (
            <span className="font-semibold text-red-400">● Offline - Camera {cameraId}</span>
          )}
        </p>
      </div>
    </div>
  )
}