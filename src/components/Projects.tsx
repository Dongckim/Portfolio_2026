import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'

// YouTube iframe API types
declare global {
  interface Window {
    YT: {
      Player: new (
        element: HTMLElement | string,
        config: {
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
          }
        }
      ) => YTPlayer
    }
  }
  interface YTPlayer {
    setVolume: (volume: number) => void
  }
}

interface Project {
  id: number
  title: string
  description: string
  longDescription?: string
  iconType: 'sphere' | 'dots' | 'plane'
  youtubeUrl?: string // YouTube video ID
  gifs?: string[] // Array of GIF file paths
  technologies?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Spatial AI Agents',
    description:
      'Real-time intelligent agents operating in 3D environments, understanding spatial context and user intent through multimodal interaction.',
    longDescription: 'This project explores the development of AI agents that can understand and interact with 3D spatial environments in real-time. The agents use multimodal inputs including vision, audio, and spatial tracking to understand user intent and environmental context.',
    iconType: 'sphere' as const,
    youtubeUrl: 'dQw4w9WgXcQ', // YouTube video ID - replace with actual video ID
    gifs: ['/project/grab.gif', '/project1-gif2.gif'], // Add your GIF file paths
    technologies: ['React', 'Three.js', 'TensorFlow', 'WebRTC'],
  },
  {
    id: 2,
    title: 'Neural Interface Toolkit',
    description:
      'Framework for building AI-native spatial interfaces that adapt to user behavior and environmental context in XR spaces.',
    longDescription: 'A comprehensive toolkit for creating adaptive spatial interfaces in extended reality environments. The framework uses neural networks to learn user preferences and adapt interface elements in real-time.',
    iconType: 'dots' as const,
    youtubeUrl: 'dQw4w9WgXcQ', // YouTube video ID - replace with actual video ID
    gifs: ['/project/sync.gif'], // Add your GIF file paths
    technologies: ['PyTorch', 'Unity', 'OpenXR', 'C#'],
  },
  {
    id: 3,
    title: 'Embodied Computing Research',
    description:
      'Exploring computational experiences beyond traditional screens, integrating physical and digital interaction paradigms.',
    longDescription: 'Research into embodied computing experiences that transcend traditional screen-based interfaces. This project investigates how physical and digital interactions can be seamlessly integrated to create more natural computing experiences.',
    iconType: 'plane' as const,
    youtubeUrl: 'dQw4w9WgXcQ', // YouTube video ID - replace with actual video ID
    gifs: ['/project/blend.gif', '/project3-gif2.gif', '/project3-gif3.gif'], // Add your GIF file paths
    technologies: ['Arduino', 'Raspberry Pi', 'Python', 'Computer Vision'],
  },
  {
    id: 4,
    title: 'Project 4',
    description:
      'Description for project 4.',
    longDescription: 'Long description for project 4.',
    iconType: 'sphere' as const,
    youtubeUrl: 'dQw4w9WgXcQ',
    gifs: ['/project/aespa.gif'],
    technologies: ['Technology 1', 'Technology 2'],
  },
  {
    id: 5,
    title: 'Project 5',
    description:
      'Description for project 5.',
    longDescription: 'Long description for project 5.',
    iconType: 'dots' as const,
    youtubeUrl: 'dQw4w9WgXcQ',
    gifs: ['/project/logo.gif'],
    technologies: ['Technology 1', 'Technology 2'],
  },
  {
    id: 6,
    title: 'Project 6',
    description:
      'Description for project 6.',
    longDescription: 'Long description for project 6.',
    iconType: 'plane' as const,
    youtubeUrl: 'dQw4w9WgXcQ',
    gifs: ['/project/chatbot.gif'],
    technologies: ['Technology 1', 'Technology 2'],
  },
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  // Load YouTube iframe API and set volume for selected project
  useEffect(() => {
    if (!selectedProject?.youtubeUrl) return

    // Load YouTube iframe API if not already loaded
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer()
        return
      }

      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      // Wait for API to load
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT)
          initializePlayer()
        }
      }, 100)

      return () => clearInterval(checkYT)
    }

    const initializePlayer = () => {
      if (!selectedProject?.youtubeUrl) return

      // Wait a bit for iframe to be ready
      setTimeout(() => {
        const iframeId = `youtube-player-${selectedProject.id}`
        const iframeElement = document.getElementById(iframeId)
        
        if (!iframeElement) return

        try {
          new window.YT.Player(iframeId, {
            events: {
              onReady: (event: { target: YTPlayer }) => {
                // Set volume to 10%
                event.target.setVolume(10)
              },
            },
          })
        } catch (error) {
          console.log('YouTube player initialization:', error)
        }
      }, 800)
    }

    const cleanup = loadYouTubeAPI()
    return cleanup
  }, [selectedProject])

  return (
    <>
      <section
        className={`projects-section ${isVisible ? 'visible' : ''}`}
        id="projects"
      >
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal" onClick={handleCloseModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={handleCloseModal}>×</button>
            
            <div className="project-modal-header">
              <h2>{selectedProject.title}</h2>
              {selectedProject.technologies && (
                <div className="project-technologies">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>

            {selectedProject.longDescription && (
              <p className="project-long-description">{selectedProject.longDescription}</p>
            )}

            <div className="project-media-container">
              {selectedProject.youtubeUrl && (
                <div className="project-video">
                  <h3>Video</h3>
                  <iframe
                    id={`youtube-player-${selectedProject.id}`}
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeUrl}?autoplay=0&rel=0&enablejsapi=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="project-youtube-iframe"
                  />
                </div>
              )}

              {selectedProject.gifs && selectedProject.gifs.length > 0 && (
                <div className="project-gifs">
                  <h3>Demonstrations</h3>
                  <div className="gif-grid">
                    {selectedProject.gifs.map((gif, index) => (
                      <img 
                        key={index}
                        src={gif} 
                        alt={`${selectedProject.title} demonstration ${index + 1}`}
                        className="project-gif"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

