'use client' // Required for Next.js 13+ App Router

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
  }
}

const YouTubeAudio = ({ videoId }) => {
  const playerRef = useRef(null) as any
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Load YouTube API script dynamically
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    document.body.appendChild(script)

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Show controls to enable PiP
          modestbranding: 1,
          rel: 0,
          playsinline: 1, // Important for mobile
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
          },
        },
      })
    }

    return () => {
      // Cleanup: Remove YouTube API script if component unmounts
      delete window.onYouTubeIframeAPIReady
    }
  }, [])

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div>
      <button onClick={togglePlay} className='p-2 bg-blue-500 text-white rounded-lg'>
        {isPlaying ? 'Pause' : 'Play'} Audio
      </button>

      <div
        id='yt-player'
        style={{
          width: '300px', // Make the video visible
          height: '170px', // Small enough to not interfere
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 1000,
        }}
      ></div>
    </div>
  )
}

export default YouTubeAudio
