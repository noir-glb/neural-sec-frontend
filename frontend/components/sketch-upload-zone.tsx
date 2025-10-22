"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Upload, Check, X } from "lucide-react"

interface SketchUploadZoneProps {
  onConfirm?: (uploadedImage: string, backendImage: string) => void
}

interface MatchResult {
  matchedImage: string
  matchConfidence?: number
}

export function SketchUploadZone({ onConfirm }: SketchUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [backendImage, setBackendImage] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fake backend result for now (comment out fetchMatch below when ready)
  const fakeMatchResult: MatchResult = {
    matchedImage: "/api/sketch-match-result.jpg", // Replace with fake image path
    matchConfidence: 95,
  }

  const fetchMatch = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('sketch', file)

      const response = await fetch('/api/sketch-match', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result: MatchResult = await response.json()
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      throw err
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG, JPG, SVG)')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Create preview URL for uploaded image
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
    setError(null)

    // Start upload process
    setIsUploading(true)
    setUploadProgress(0)

    // Simulated progress update (replace with real progress if using XMLHttpRequest)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100 || !isUploading) {
          clearInterval(interval)
          return Math.min(prev, 100)
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      let result: MatchResult
      // For now, use fake data - uncomment fetchMatch below when backend is ready
      result = fakeMatchResult

      // result = await fetchMatch(file) // Uncomment this line and comment the result = fakeMatchResult above when backend is ready

      // Simulate completion delay for smooth UI transition
      await new Promise(resolve => setTimeout(resolve, 500))

      clearInterval(interval)
      setIsUploading(false)
      setBackendImage(result.matchedImage)
      if (result.matchConfidence !== undefined) {
        console.log(`Match confidence: ${result.matchConfidence}%`)
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to process sketch. Please try again.')
      clearInterval(interval)
      setIsUploading(false)
      setUploadProgress(0)
      // Clean up preview on error
      URL.revokeObjectURL(imageUrl)
      setUploadedImage(null)
      setError('Upload failed. Please try again.')
    }
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
    if (onConfirm && uploadedImage && backendImage) {
      onConfirm(uploadedImage, backendImage)
    }
  }

  const handleReset = () => {
    // Clean up object URLs to prevent memory leaks
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }
    if (backendImage) {
      URL.revokeObjectURL(backendImage)
    }
    setUploadedImage(null)
    setBackendImage(null)
    setIsConfirmed(false)
    setUploadProgress(0)
    setIsUploading(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (!uploadedImage || isUploading) {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          isDragging ? "border-blue-500 bg-blue-500/10" : "border-slate-700 bg-slate-900/50 hover:border-slate-600"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
          <h3 className="text-lg font-semibold text-white mb-2">Drag sketch here or Browse</h3>
          <p className="text-gray-400 mb-6">Supported formats: PNG, JPG, SVG (Max 5MB)</p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <label
              htmlFor="file-upload"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              Browse Files
            </label>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {isUploading && (
            <div className="mt-8 w-full">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2 flex justify-between">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-sm text-red-300">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (uploadedImage && !isConfirmed) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
        <h3 className="text-lg font-semibold text-white mb-6">Sketch Uploaded Successfully</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-4 font-medium">Your Sketch</p>
            <div className="relative w-full max-w-md h-80 bg-slate-800 rounded-lg overflow-hidden border-2 border-dashed border-slate-700">
              <img
                src={uploadedImage}
                alt="Uploaded sketch"
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>
          
          {backendImage && (
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-400 mb-4 font-medium">Database Match</p>
              <div className="relative w-full max-w-md h-80 bg-slate-800 rounded-lg overflow-hidden border-2 border-dashed border-green-700/50">
                <img
                  src={backendImage}
                  alt="Matched image"
                  className="w-full h-full object-contain p-6"
                />
                <div className="absolute top-4 right-4 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Match Found
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleConfirm}
            disabled={!backendImage}
            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
          >
            <Check size={20} />
            {backendImage ? "Confirm Match" : "Processing..."}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            <X size={20} />
            Upload New Sketch
          </button>
        </div>
      </div>
    )
  }

  if (isConfirmed) {
    return (
      <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/50 rounded-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
            <Check size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Match Confirmed!</h3>
            <p className="text-green-400 mt-1">Target identified successfully</p>
          </div>
        </div>
        <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
          The sketch has been matched with the database. You can now proceed with live detection or save to case file.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Start New Search
          </button>
        </div>
      </div>
    )
  }

  return null
}