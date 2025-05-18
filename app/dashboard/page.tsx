"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { useEmotion } from "@/components/emotion-provider"
import { InterestSelector } from "@/components/interest-selector"
import { MoodDetector } from "@/components/mood-detector"
import { AIChatbot } from "@/components/ai-chatbot"
import { VoiceInteraction } from "@/components/voice-interaction"
import { AchievementSystem } from "@/components/achievement-system"
import { InteractiveLearningGame } from "@/components/interactive-learning-game"
import { PersonalizedLearningPath } from "@/components/personalized-learning-path"
import { ResponsiveNavbar } from "@/components/responsive-navbar"
import {
  Rocket,
  Brain,
  BookOpen,
  Users,
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Palette,
  Code,
  HeartPulse,
  Briefcase,
  ArrowRight,
  Star,
  Trophy,
  Bell,
  Clock,
  Music,
  Mic,
  PenTool,
  LineChartIcon,
  Target,
  Layers,
  Cpu,
  Database,
  GitBranch,
  Headphones,
  Brush,
  FileText,
} from "lucide-react"

// Custom icon components
const ClipboardCheck = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}

const Presentation = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  )
}

// Career-specific content
const careerContent = {
  developer: {
    title: "Developer Dashboard",
    description: "Track your coding journey and technical skill development",
    icon: <Code className="h-6 w-6" />,
    recommendations: [
      {
        title: "Advanced JavaScript Patterns",
        type: "course",
        difficulty: "Intermediate",
        progress: 35,
        image: "/placeholder.svg?height=100&width=180",
        description:
          "Master advanced JavaScript patterns including closures, currying, and functional programming concepts.",
      },
      {
        title: "Building Scalable APIs",
        type: "course",
        difficulty: "Advanced",
        progress: 0,
        image: "/placeholder.svg?height=100&width=180",
        description: "Learn how to design and build RESTful APIs that can scale to handle millions of requests.",
      },
      {
        title: "React Performance Optimization",
        type: "course",
        difficulty: "Intermediate",
        progress: 12,
        image: "/placeholder.svg?height=100&width=180",
        description: "Techniques to optimize React applications for better performance and user experience.",
      },
      {
        title: "Full-Stack E-commerce Project",
        type: "project",
        difficulty: "Advanced",
        progress: 0,
        image: "/placeholder.svg?height=100&width=180",
        description:
          "Build a complete e-commerce platform with user authentication, product catalog, and payment processing.",
      },
      {
        title: "Introduction to TypeScript",
        type: "course",
        difficulty: "Beginner",
        progress: 78,
        image: "/placeholder.svg?height=100&width=180",
        description:
          "Learn the fundamentals of TypeScript and how to use it to build type-safe JavaScript applications.",
      },
    ],
    activities: [
      {
        title: "Debug a complex algorithm",
        icon: <Cpu className="h-4 w-4" />,
        xp: 150,
        time: "30 min",
        description: "Analyze and fix bugs in a sorting algorithm implementation.",
      },
      {
        title: "Optimize database queries",
        icon: <Database className="h-4 w-4" />,
        xp: 200,
        time: "45 min",
        description: "Improve the performance of slow database queries in a web application.",
      },
      {
        title: "Refactor legacy code",
        icon: <GitBranch className="h-4 w-4" />,
        xp: 180,
        time: "60 min",
        description: "Modernize an outdated codebase using current best practices.",
      },
    ],
    skills: [
      {
        name: "JavaScript",
        level: 7,
        category: "Frontend",
        description: "Core language for web development",
        lastPracticed: "2 days ago",
      },
      {
        name: "React",
        level: 6,
        category: "Frontend",
        description: "Component-based UI library",
        lastPracticed: "1 day ago",
      },
      {
        name: "Node.js",
        level: 5,
        category: "Backend",
        description: "JavaScript runtime for server-side code",
        lastPracticed: "3 days ago",
      },
      {
        name: "SQL",
        level: 4,
        category: "Database",
        description: "Structured Query Language for databases",
        lastPracticed: "1 week ago",
      },
      {
        name: "System Design",
        level: 3,
        category: "Architecture",
        description: "Designing scalable software systems",
        lastPracticed: "2 weeks ago",
      },
    ],
    projects: [
      {
        name: "Personal Portfolio",
        progress: 85,
        deadline: "2 weeks",
        collaborators: 1,
        priority: "High",
        status: "On track",
        lastActivity: "2 days ago",
      },
      {
        name: "Task Management API",
        progress: 60,
        deadline: "1 month",
        collaborators: 3,
        priority: "Medium",
        status: "On track",
        lastActivity: "1 day ago",
      },
      {
        name: "E-commerce Frontend",
        progress: 30,
        deadline: "3 months",
        collaborators: 2,
        priority: "Low",
        status: "Behind schedule",
        lastActivity: "5 days ago",
      },
    ],
    events: [
      {
        name: "Web Dev Hackathon",
        date: "June 15-17, 2025",
        location: "Virtual",
        description: "48-hour hackathon focused on building innovative web applications.",
      },
      {
        name: "React Conference",
        date: "July 22-24, 2025",
        location: "San Francisco",
        description: "Annual conference featuring the latest React developments and best practices.",
      },
      {
        name: "Code Review Workshop",
        date: "May 30, 2025",
        location: "Online",
        description: "Learn effective code review techniques to improve code quality.",
      },
    ],
    insights: [
      {
        title: "Coding Patterns",
        description: "You excel at frontend development but could improve backend skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through project-based approaches with clear documentation",
      },
      {
        title: "Productivity",
        description: "Your peak coding hours are between 9am-12pm and 4pm-7pm",
      },
    ],
    chartData: [
      { date: "Apr 24", coding: 65, learning: 70 },
      { date: "Apr 25", coding: 60, learning: 65 },
      { date: "Apr 26", coding: 70, learning: 60 },
      { date: "Apr 27", coding: 75, learning: 75 },
      { date: "Apr 28", coding: 60, learning: 80 },
      { date: "Apr 29", coding: 80, learning: 65 },
      { date: "Apr 30", coding: 75, learning: 70 },
      { date: "May 01", coding: 85, learning: 75 },
      { date: "May 02", coding: 70, learning: 80 },
      { date: "May 03", coding: 75, learning: 85 },
      { date: "May 04", coding: 80, learning: 70 },
      { date: "May 05", coding: 85, learning: 75 },
      { date: "May 06", coding: 90, learning: 80 },
      { date: "May 07", coding: 85, learning: 85 },
    ],
    skillDistribution: [
      { name: "Frontend", value: 45 },
      { name: "Backend", value: 25 },
      { name: "Database", value: 15 },
      { name: "DevOps", value: 10 },
      { name: "Architecture", value: 5 },
    ],
    learningPath: [
      { name: "HTML/CSS", status: "completed" },
      { name: "JavaScript Basics", status: "completed" },
      { name: "React Fundamentals", status: "completed" },
      { name: "State Management", status: "in-progress" },
      { name: "Backend Integration", status: "in-progress" },
      { name: "Testing", status: "not-started" },
      { name: "Deployment", status: "not-started" },
      { name: "Performance Optimization", status: "not-started" },
    ],
  },
  musician: {
    title: "Musician Dashboard",
    description: "Track your musical journey and creative development",
    icon: <Music className="h-6 w-6" />,
    recommendations: [
      {
        title: "Advanced Music Theory",
        type: "course",
        difficulty: "Intermediate",
        progress: 45,
        image: "/placeholder.svg?height=100&width=180",
        description: "Explore advanced harmonic concepts, modal interchange, and complex rhythmic patterns.",
      },
      {
        title: "Studio Recording Techniques",
        type: "course",
        difficulty: "Advanced",
        progress: 0,
        image: "/placeholder.svg?height=100&width=180",
        description: "Learn professional recording techniques used in top studios around the world.",
      },
      {
        title: "Songwriting Workshop",
        type: "course",
        difficulty: "Beginner",
        progress: 90,
        image: "/placeholder.svg?height=100&width=180",
        description: "Develop your songwriting skills with structured exercises and feedback.",
      },
      {
        title: "Collaborative EP Project",
        type: "project",
        difficulty: "Intermediate",
        progress: 25,
        image: "/placeholder.svg?height=100&width=180",
        description: "Work with other musicians to create a 4-track EP from concept to release.",
      },
      {
        title: "Music Business Essentials",
        type: "course",
        difficulty: "Beginner",
        progress: 60,
        image: "/placeholder.svg?height=100&width=180",
        description: "Understand the business side of music including royalties, licensing, and distribution.",
      },
    ],
    activities: [
      {
        title: "Practice sight reading",
        icon: <FileText className="h-4 w-4" />,
        xp: 120,
        time: "20 min",
        description: "Improve your ability to read and play music notation in real-time.",
      },
      {
        title: "Record a cover song",
        icon: <Mic className="h-4 w-4" />,
        xp: 180,
        time: "60 min",
        description: "Record your interpretation of a song you admire to practice production skills.",
      },
      {
        title: "Mix a multi-track recording",
        icon: <Headphones className="h-4 w-4" />,
        xp: 200,
        time: "90 min",
        description: "Balance levels, add effects, and create a polished mix from raw tracks.",
      },
    ],
    skills: [
      {
        name: "Music Theory",
        level: 6,
        category: "Theory",
        description: "Understanding of musical structures and concepts",
        lastPracticed: "3 days ago",
      },
      {
        name: "Performance",
        level: 7,
        category: "Practical",
        description: "Live performance skills and stage presence",
        lastPracticed: "1 day ago",
      },
      {
        name: "Composition",
        level: 5,
        category: "Creative",
        description: "Creating original musical works",
        lastPracticed: "2 days ago",
      },
      {
        name: "Production",
        level: 4,
        category: "Technical",
        description: "Recording and producing music",
        lastPracticed: "1 week ago",
      },
      {
        name: "Ear Training",
        level: 6,
        category: "Practical",
        description: "Identifying musical elements by ear",
        lastPracticed: "4 days ago",
      },
    ],
    projects: [
      {
        name: "Original EP",
        progress: 70,
        deadline: "1 month",
        collaborators: 2,
        priority: "High",
        status: "On track",
        lastActivity: "1 day ago",
      },
      {
        name: "Live Performance Set",
        progress: 85,
        deadline: "2 weeks",
        collaborators: 4,
        priority: "High",
        status: "On track",
        lastActivity: "2 days ago",
      },
      {
        name: "Collaborative Remix",
        progress: 40,
        deadline: "3 months",
        collaborators: 3,
        priority: "Medium",
        status: "On track",
        lastActivity: "3 days ago",
      },
    ],
    events: [
      {
        name: "Songwriting Contest",
        date: "June 15-30, 2025",
        location: "Online",
        description: "International songwriting competition with industry judges and feedback.",
      },
      {
        name: "Music Production Workshop",
        date: "July 8-10, 2025",
        location: "Los Angeles",
        description: "Hands-on workshop with professional producers and engineers.",
      },
      {
        name: "Open Mic Night",
        date: "May 25, 2025",
        location: "Local Venue",
        description: "Opportunity to perform original material and network with local musicians.",
      },
    ],
    insights: [
      {
        title: "Musical Strengths",
        description: "You excel at performance and improvisation but could develop composition skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through ear training and practical application",
      },
      {
        title: "Creativity",
        description: "Your peak creative hours are in the evening between 7pm-11pm",
      },
    ],
    chartData: [
      { date: "Apr 24", practice: 75, composition: 60 },
      { date: "Apr 25", practice: 80, composition: 55 },
      { date: "Apr 26", practice: 65, composition: 70 },
      { date: "Apr 27", practice: 70, composition: 75 },
      { date: "Apr 28", practice: 85, composition: 60 },
      { date: "Apr 29", practice: 75, composition: 80 },
      { date: "Apr 30", practice: 80, composition: 70 },
      { date: "May 01", practice: 85, composition: 75 },
      { date: "May 02", practice: 70, composition: 85 },
      { date: "May 03", practice: 75, composition: 80 },
      { date: "May 04", practice: 80, composition: 75 },
      { date: "May 05", practice: 85, composition: 70 },
      { date: "May 06", practice: 90, composition: 75 },
      { date: "May 07", practice: 85, composition: 80 },
    ],
    skillDistribution: [
      { name: "Performance", value: 40 },
      { name: "Theory", value: 25 },
      { name: "Composition", value: 20 },
      { name: "Production", value: 15 },
    ],
    learningPath: [
      { name: "Basic Theory", status: "completed" },
      { name: "Instrument Proficiency", status: "completed" },
      { name: "Performance Skills", status: "completed" },
      { name: "Composition Basics", status: "in-progress" },
      { name: "Recording Techniques", status: "in-progress" },
      { name: "Advanced Theory", status: "not-started" },
      { name: "Music Business", status: "not-started" },
      { name: "Production Mastery", status: "not-started" },
    ],
  },
  artist: {
    title: "Artist Dashboard",
    description: "Track your artistic journey and creative development",
    icon: <Palette className="h-6 w-6" />,
    recommendations: [
      {
        title: "Color Theory Masterclass",
        type: "course",
        difficulty: "Intermediate",
        progress: 65,
        image: "/placeholder.svg?height=100&width=180",
        description: "Comprehensive exploration of color relationships, psychology, and application in visual art.",
      },
      {
        title: "Digital Illustration Techniques",
        type: "course",
        difficulty: "Advanced",
        progress: 10,
        image: "/placeholder.svg?height=100&width=180",
        description:
          "Advanced techniques for creating professional digital illustrations with industry-standard tools.",
      },
      {
        title: "Composition Fundamentals",
        type: "course",
        difficulty: "Beginner",
        progress: 100,
        image: "/placeholder.svg?height=100&width=180",
        description: "Master the principles of visual composition to create balanced and impactful artwork.",
      },
      {
        title: "Character Design Project",
        type: "project",
        difficulty: "Intermediate",
        progress: 40,
        image: "/placeholder.svg?height=100&width=180",
        description: "Create a cohesive set of character designs for an animated series concept.",
      },
      {
        title: "Art Business for Freelancers",
        type: "course",
        difficulty: "Beginner",
        progress: 25,
        image: "/placeholder.svg?height=100&width=180",
        description: "Learn how to market your art, price your work, and build a sustainable freelance career.",
      },
    ],
    activities: [
      {
        title: "Practice figure drawing",
        icon: <PenTool className="h-4 w-4" />,
        xp: 100,
        time: "30 min",
        description: "Improve your ability to draw the human figure accurately from reference or imagination.",
      },
      {
        title: "Create a color study",
        icon: <Palette className="h-4 w-4" />,
        xp: 120,
        time: "45 min",
        description: "Experiment with color combinations to develop your understanding of color harmony.",
      },
      {
        title: "Experiment with new medium",
        icon: <Brush className="h-4 w-4" />,
        xp: 150,
        time: "60 min",
        description: "Try a new artistic medium to expand your technical versatility.",
      },
    ],
    skills: [
      {
        name: "Drawing",
        level: 7,
        category: "Fundamental",
        description: "Foundation of visual art creation",
        lastPracticed: "1 day ago",
      },
      {
        name: "Color Theory",
        level: 5,
        category: "Theory",
        description: "Understanding color relationships and psychology",
        lastPracticed: "3 days ago",
      },
      {
        name: "Digital Art",
        level: 6,
        category: "Technical",
        description: "Creating art using digital tools",
        lastPracticed: "2 days ago",
      },
      {
        name: "Composition",
        level: 4,
        category: "Theory",
        description: "Arranging visual elements effectively",
        lastPracticed: "1 week ago",
      },
      {
        name: "Character Design",
        level: 6,
        category: "Specialized",
        description: "Creating compelling character designs",
        lastPracticed: "4 days ago",
      },
    ],
    projects: [
      {
        name: "Digital Art Portfolio",
        progress: 75,
        deadline: "1 month",
        collaborators: 1,
        priority: "High",
        status: "On track",
        lastActivity: "2 days ago",
      },
      {
        name: "Children's Book Illustrations",
        progress: 40,
        deadline: "3 months",
        collaborators: 2,
        priority: "Medium",
        status: "On track",
        lastActivity: "1 week ago",
      },
      {
        name: "Character Design Series",
        progress: 60,
        deadline: "2 months",
        collaborators: 1,
        priority: "High",
        status: "Slight delay",
        lastActivity: "3 days ago",
      },
    ],
    events: [
      {
        name: "Digital Art Exhibition",
        date: "June 10-20, 2025",
        location: "Online Gallery",
        description: "Virtual exhibition showcasing emerging digital artists from around the world.",
      },
      {
        name: "Character Design Workshop",
        date: "July 15, 2025",
        location: "New York",
        description: "Intensive workshop led by industry professionals from major animation studios.",
      },
      {
        name: "Art Portfolio Review",
        date: "May 28, 2025",
        location: "Virtual",
        description: "Get feedback on your portfolio from art directors and professional artists.",
      },
    ],
    insights: [
      {
        title: "Artistic Strengths",
        description: "You excel at character design and linework but could develop color theory",
      },
      {
        title: "Learning Style",
        description: "You learn best through visual demonstrations and practice",
      },
      {
        title: "Creativity",
        description: "Your peak creative hours are in the morning between 8am-11am",
      },
    ],
    chartData: [
      { date: "Apr 24", practice: 70, creation: 65 },
      { date: "Apr 25", practice: 65, creation: 75 },
      { date: "Apr 26", practice: 80, creation: 60 },
      { date: "Apr 27", practice: 75, creation: 70 },
      { date: "Apr 28", practice: 60, creation: 85 },
      { date: "Apr 29", practice: 70, creation: 75 },
      { date: "Apr 30", practice: 75, creation: 80 },
      { date: "May 01", practice: 80, creation: 75 },
      { date: "May 02", practice: 75, creation: 85 },
      { date: "May 03", practice: 70, creation: 90 },
      { date: "May 04", practice: 75, creation: 85 },
      { date: "May 05", practice: 80, creation: 80 },
      { date: "May 06", practice: 85, creation: 75 },
      { date: "May 07", practice: 80, creation: 85 },
    ],
    skillDistribution: [
      { name: "Drawing", value: 35 },
      { name: "Digital", value: 30 },
      { name: "Design", value: 20 },
      { name: "Color", value: 15 },
    ],
    learningPath: [
      { name: "Basic Drawing", status: "completed" },
      { name: "Perspective", status: "completed" },
      { name: "Anatomy", status: "completed" },
      { name: "Color Theory", status: "in-progress" },
      { name: "Digital Tools", status: "in-progress" },
      { name: "Character Design", status: "in-progress" },
      { name: "Environment Design", status: "not-started" },
      { name: "Professional Portfolio", status: "not-started" },
    ],
  },
  researcher: {
    title: "Researcher Dashboard",
    description: "Track your research journey and analytical development",
    icon: <Brain className="h-6 w-6" />,
    recommendations: [
      {
        title: "Advanced Research Methods",
        type: "course",
        difficulty: "Advanced",
        progress: 30,
        image: "/placeholder.svg?height=100&width=180",
        description: "Comprehensive coverage of qualitative and quantitative research methodologies.",
      },
      {
        title: "Data Analysis with R",
        type: "course",
        difficulty: "Intermediate",
        progress: 75,
        image: "/placeholder.svg?height=100&width=180",
        description: "Statistical analysis and data visualization using the R programming language.",
      },
      {
        title: "Scientific Writing Workshop",
        type: "course",
        difficulty: "Intermediate",
        progress: 50,
        image: "/placeholder.svg?height=100&width=180",
        description: "Improve your ability to communicate research findings clearly and effectively.",
      },
      {
        title: "Literature Review Project",
        type: "project",
        difficulty: "Advanced",
        progress: 15,
        image: "/placeholder.svg?height=100&width=180",
        description: "Conduct a comprehensive review of existing literature in your field of interest.",
      },
      {
        title: "Research Ethics",
        type: "course",
        difficulty: "Beginner",
        progress: 100,
        image: "/placeholder.svg?height=100&width=180",
        description: "Understand the ethical considerations and responsibilities in academic research.",
      },
    ],
    activities: [
      {
        title: "Analyze recent literature",
        icon: <BookOpen className="h-4 w-4" />,
        xp: 150,
        time: "45 min",
        description: "Review and analyze recent publications in your field to stay current.",
      },
      {
        title: "Design an experiment",
        icon: <Layers className="h-4 w-4" />,
        xp: 200,
        time: "90 min",
        description: "Create a well-structured experimental design to test your hypothesis.",
      },
      {
        title: "Practice statistical analysis",
        icon: <BarChart3 className="h-4 w-4" />,
        xp: 180,
        time: "60 min",
        description: "Apply statistical methods to sample datasets to improve your analytical skills.",
      },
    ],
    skills: [
      {
        name: "Research Methods",
        level: 7,
        category: "Methodology",
        description: "Designing and conducting research",
        lastPracticed: "2 days ago",
      },
      {
        name: "Data Analysis",
        level: 6,
        category: "Technical",
        description: "Analyzing and interpreting research data",
        lastPracticed: "1 day ago",
      },
      {
        name: "Scientific Writing",
        level: 5,
        category: "Communication",
        description: "Communicating research findings",
        lastPracticed: "3 days ago",
      },
      {
        name: "Critical Thinking",
        level: 7,
        category: "Cognitive",
        description: "Evaluating information and arguments",
        lastPracticed: "2 days ago",
      },
      {
        name: "Experimental Design",
        level: 6,
        category: "Methodology",
        description: "Creating effective experiments",
        lastPracticed: "1 week ago",
      },
    ],
    projects: [
      {
        name: "Research Paper",
        progress: 65,
        deadline: "2 months",
        collaborators: 3,
        priority: "High",
        status: "On track",
        lastActivity: "1 day ago",
      },
      {
        name: "Data Analysis Project",
        progress: 80,
        deadline: "3 weeks",
        collaborators: 2,
        priority: "Medium",
        status: "Ahead of schedule",
        lastActivity: "2 days ago",
      },
      {
        name: "Literature Review",
        progress: 50,
        deadline: "1 month",
        collaborators: 1,
        priority: "Medium",
        status: "On track",
        lastActivity: "3 days ago",
      },
    ],
    events: [
      {
        name: "Research Symposium",
        date: "June 20-22, 2025",
        location: "Boston",
        description: "Annual symposium featuring presentations from leading researchers in the field.",
      },
      {
        name: "Data Science Workshop",
        date: "July 10, 2025",
        location: "Online",
        description: "Hands-on workshop covering advanced data analysis techniques for researchers.",
      },
      {
        name: "Academic Writing Seminar",
        date: "May 15, 2025",
        location: "Chicago",
        description: "Intensive seminar on effective scientific writing for academic publications.",
      },
    ],
    insights: [
      {
        title: "Research Strengths",
        description: "You excel at critical analysis but could improve data visualization skills",
      },
      {
        title: "Learning Style",
        description: "You learn best through systematic study and practical application",
      },
      {
        title: "Productivity",
        description: "Your peak analytical hours are in the morning between 9am-1pm",
      },
    ],
    chartData: [
      { date: "Apr 24", research: 75, writing: 60 },
      { date: "Apr 25", research: 80, writing: 55 },
      { date: "Apr 26", research: 70, writing: 65 },
      { date: "Apr 27", research: 65, writing: 75 },
      { date: "Apr 28", research: 75, writing: 70 },
      { date: "Apr 29", research: 80, writing: 65 },
      { date: "Apr 30", research: 70, writing: 80 },
      { date: "May 01", research: 75, writing: 75 },
      { date: "May 02", research: 85, writing: 70 },
      { date: "May 03", research: 80, writing: 75 },
      { date: "May 04", research: 75, writing: 80 },
      { date: "May 05", research: 70, writing: 85 },
      { date: "May 06", research: 75, writing: 80 },
      { date: "May 07", research: 80, writing: 75 },
    ],
    skillDistribution: [
      { name: "Analysis", value: 40 },
      { name: "Methodology", value: 25 },
      { name: "Writing", value: 20 },
      { name: "Presentation", value: 15 },
    ],
    learningPath: [
      { name: "Research Basics", status: "completed" },
      { name: "Literature Review", status: "completed" },
      { name: "Research Design", status: "completed" },
      { name: "Data Collection", status: "in-progress" },
      { name: "Statistical Analysis", status: "in-progress" },
      { name: "Academic Writing", status: "in-progress" },
      { name: "Publication Process", status: "not-started" },
      { name: "Grant Writing", status: "not-started" },
    ],
  },
  educator: {
    title: "Educator Dashboard",
    description: "Track your teaching journey and educational development",
    icon: <BookOpen className="h-6 w-6" />,
    recommendations: [
      {
        title: "Advanced Pedagogical Methods",
        type: "course",
        difficulty: "Advanced",
        progress: 40,
        image: "/placeholder.svg?height=100&width=180",
        description: "Explore cutting-edge teaching methodologies based on the latest educational research.",
      },
      {
        title: "Educational Technology Integration",
        type: "course",
        difficulty: "Intermediate",
        progress: 65,
        image: "/placeholder.svg?height=100&width=180",
        description: "Learn to effectively incorporate technology tools into your teaching practice.",
      },
      {
        title: "Inclusive Classroom Strategies",
        type: "course",
        difficulty: "Intermediate",
        progress: 80,
        image: "/placeholder.svg?height=100&width=180",
        description: "Develop techniques to create learning environments that support all students.",
      },
      {
        title: "Curriculum Development Project",
        type: "project",
        difficulty: "Advanced",
        progress: 25,
        image: "/placeholder.svg?height=100&width=180",
        description: "Design a comprehensive curriculum aligned with educational standards and best practices.",
      },
      {
        title: "Student Assessment Techniques",
        type: "course",
        difficulty: "Beginner",
        progress: 90,
        image: "/placeholder.svg?height=100&width=180",
        description: "Master various assessment methods to effectively evaluate student learning.",
      },
    ],
    activities: [
      {
        title: "Create engaging lesson plan",
        icon: <BookOpen className="h-4 w-4" />,
        xp: 120,
        time: "45 min",
        description: "Design a lesson that incorporates active learning strategies to engage students.",
      },
      {
        title: "Design formative assessment",
        icon: <ClipboardCheck className="h-4 w-4" />,
        xp: 100,
        time: "30 min",
        description: "Create an assessment that provides meaningful feedback during the learning process.",
      },
      {
        title: "Explore new teaching tool",
        icon: <Layers className="h-4 w-4" />,
        xp: 80,
        time: "20 min",
        description: "Investigate and learn to use a new educational technology tool for your classroom.",
      },
    ],
    skills: [
      {
        name: "Pedagogy",
        level: 7,
        category: "Methodology",
        description: "Teaching methods and practices",
        lastPracticed: "1 day ago",
      },
      {
        name: "Curriculum Design",
        level: 6,
        category: "Planning",
        description: "Developing educational content",
        lastPracticed: "3 days ago",
      },
      {
        name: "Assessment",
        level: 5,
        category: "Evaluation",
        description: "Evaluating student learning",
        lastPracticed: "2 days ago",
      },
      {
        name: "Classroom Management",
        level: 6,
        category: "Practical",
        description: "Creating effective learning environments",
        lastPracticed: "1 day ago",
      },
      {
        name: "Educational Technology",
        level: 4,
        category: "Technical",
        description: "Using technology in education",
        lastPracticed: "1 week ago",
      },
    ],
    projects: [
      {
        name: "Course Curriculum",
        progress: 75,
        deadline: "1 month",
        collaborators: 2,
        priority: "High",
        status: "On track",
        lastActivity: "2 days ago",
      },
      {
        name: "Interactive Lesson Series",
        progress: 60,
        deadline: "2 weeks",
        collaborators: 1,
        priority: "Medium",
        status: "Slight delay",
        lastActivity: "3 days ago",
      },
      {
        name: "Student Assessment System",
        progress: 40,
        deadline: "2 months",
        collaborators: 3,
        priority: "Medium",
        status: "On track",
        lastActivity: "1 week ago",
      },
    ],
    events: [
      {
        name: "Education Innovation Conference",
        date: "June 5-7, 2025",
        location: "Chicago",
        description: "Conference showcasing innovative approaches to teaching and learning.",
      },
      {
        name: "Inclusive Teaching Workshop",
        date: "July 12, 2025",
        location: "Virtual",
        description: "Workshop focused on creating inclusive and equitable learning environments.",
      },
      {
        name: "EdTech Showcase",
        date: "May 20, 2025",
        location: "San Diego",
        description: "Exhibition of the latest educational technology tools and platforms.",
      },
    ],
    insights: [
      {
        title: "Teaching Strengths",
        description: "You excel at engaging presentation but could develop assessment techniques",
      },
      {
        title: "Teaching Style",
        description: "You're most effective with interactive, discussion-based approaches",
      },
      {
        title: "Productivity",
        description: "Your peak planning hours are in the evening between 6pm-9pm",
      },
    ],
    chartData: [
      { date: "Apr 24", teaching: 70, planning: 65 },
      { date: "Apr 25", teaching: 75, planning: 60 },
      { date: "Apr 26", teaching: 65, planning: 75 },
      { date: "Apr 27", teaching: 70, planning: 70 },
      { date: "Apr 28", teaching: 80, planning: 65 },
      { date: "Apr 29", teaching: 75, planning: 70 },
      { date: "Apr 30", teaching: 70, planning: 80 },
      { date: "May 01", teaching: 75, planning: 75 },
      { date: "May 02", teaching: 80, planning: 70 },
      { date: "May 03", teaching: 75, planning: 80 },
      { date: "May 04", teaching: 70, planning: 85 },
      { date: "May 05", teaching: 75, planning: 80 },
      { date: "May 06", teaching: 80, planning: 75 },
      { date: "May 07", teaching: 85, planning: 70 },
    ],
    skillDistribution: [
      { name: "Pedagogy", value: 35 },
      { name: "Content", value: 30 },
      { name: "Assessment", value: 20 },
      { name: "Technology", value: 15 },
    ],
    learningPath: [
      { name: "Teaching Fundamentals", status: "completed" },
      { name: "Classroom Management", status: "completed" },
      { name: "Lesson Planning", status: "completed" },
      { name: "Assessment Design", status: "in-progress" },
      { name: "Educational Technology", status: "in-progress" },
      { name: "Inclusive Education", status: "in-progress" },
      { name: "Curriculum Development", status: "not-started" },
      { name: "Educational Leadership", status: "not-started" },
    ],
  },
  entrepreneur: {
    title: "Entrepreneur Dashboard",
    description: "Track your business journey and entrepreneurial development",
    icon: <Briefcase className="h-6 w-6" />,
    recommendations: [
      {
        title: "Lean Startup Methodology",
        type: "course",
        difficulty: "Intermediate",
        progress: 70,
        image: "/placeholder.svg?height=100&width=180",
        description: "Learn how to build and validate business ideas with minimal resources and maximum learning.",
      },
      {
        title: "Business Model Innovation",
        type: "course",
        difficulty: "Advanced",
        progress: 25,
        image: "/placeholder.svg?height=100&width=180",
        description: "Explore innovative business models that disrupt industries and create sustainable value.",
      },
      {
        title: "Digital Marketing Strategy",
        type: "course",
        difficulty: "Intermediate",
        progress: 45,
        image: "/placeholder.svg?height=100&width=180",
        description: "Develop comprehensive digital marketing strategies to grow your business online.",
      },
      {
        title: "Pitch Deck Development",
        type: "project",
        difficulty: "Beginner",
        progress: 90,
        image: "/placeholder.svg?height=100&width=180",
        description: "Create a compelling pitch deck to attract investors and partners to your venture.",
      },
      {
        title: "Financial Modeling for Startups",
        type: "course",
        difficulty: "Advanced",
        progress: 10,
        image: "/placeholder.svg?height=100&width=180",
        description: "Build financial models to forecast growth, manage cash flow, and make data-driven decisions.",
      },
    ],
    activities: [
      {
        title: "Validate business idea",
        icon: <Target className="h-4 w-4" />,
        xp: 200,
        time: "90 min",
        description: "Test your business concept with potential customers to validate market demand.",
      },
      {
        title: "Develop marketing strategy",
        icon: <LineChartIcon className="h-4 w-4" />,
        xp: 150,
        time: "60 min",
        description: "Create a marketing plan to reach and engage your target audience.",
      },
      {
        title: "Practice pitch presentation",
        icon: <Presentation className="h-4 w-4" />,
        xp: 120,
        time: "45 min",
        description: "Refine your pitch to effectively communicate your business vision and value proposition.",
      },
    ],
    skills: [
      {
        name: "Business Strategy",
        level: 6,
        category: "Planning",
        description: "Developing business direction and goals",
        lastPracticed: "2 days ago",
      },
      {
        name: "Marketing",
        level: 5,
        category: "Growth",
        description: "Promoting products and services",
        lastPracticed: "1 day ago",
      },
      {
        name: "Financial Management",
        level: 4,
        category: "Operations",
        description: "Managing business finances",
        lastPracticed: "1 week ago",
      },
      {
        name: "Leadership",
        level: 7,
        category: "People",
        description: "Leading teams and organizations",
        lastPracticed: "3 days ago",
      },
      {
        name: "Product Development",
        level: 6,
        category: "Innovation",
        description: "Creating new products and services",
        lastPracticed: "4 days ago",
      },
    ],
    projects: [
      {
        name: "Business Plan",
        progress: 85,
        deadline: "2 weeks",
        collaborators: 2,
        priority: "High",
        status: "On track",
        lastActivity: "1 day ago",
      },
      {
        name: "Marketing Campaign",
        progress: 60,
        deadline: "1 month",
        collaborators: 3,
        priority: "Medium",
        status: "On track",
        lastActivity: "2 days ago",
      },
      {
        name: "Investor Pitch Deck",
        progress: 70,
        deadline: "3 weeks",
        collaborators: 1,
        priority: "High",
        status: "Slight delay",
        lastActivity: "3 days ago",
      },
    ],
    events: [
      {
        name: "Startup Pitch Competition",
        date: "June 18, 2025",
        location: "New York",
        description: "Opportunity to pitch your business to investors and win funding.",
      },
      {
        name: "Entrepreneurship Summit",
        date: "July 25-27, 2025",
        location: "San Francisco",
        description: "Conference featuring successful entrepreneurs and industry experts.",
      },
      {
        name: "Networking Mixer",
        date: "May 12, 2025",
        location: "Chicago",
        description: "Connect with fellow entrepreneurs, investors, and potential partners.",
      },
    ],
    insights: [
      {
        title: "Business Strengths",
        description: "You excel at vision and leadership but could develop financial analysis skills",
      },
      {
        title: "Working Style",
        description: "You're most effective when balancing strategic thinking with tactical execution",
      },
      {
        title: "Productivity",
        description: "Your peak strategic thinking hours are in the morning between 8am-11am",
      },
    ],
    chartData: [
      { date: "Apr 24", strategy: 75, execution: 60 },
      { date: "Apr 25", strategy: 70, execution: 65 },
      { date: "Apr 26", strategy: 65, execution: 75 },
      { date: "Apr 27", strategy: 70, execution: 70 },
      { date: "Apr 28", strategy: 80, execution: 65 },
      { date: "Apr 29", strategy: 75, execution: 70 },
      { date: "Apr 30", strategy: 70, execution: 80 },
      { date: "May 01", strategy: 75, execution: 75 },
      { date: "May 02", strategy: 80, execution: 70 },
      { date: "May 03", strategy: 75, execution: 80 },
      { date: "May 04", strategy: 70, execution: 85 },
      { date: "May 05", strategy: 75, execution: 80 },
      { date: "May 06", strategy: 85, execution: 75 },
      { date: "May 07", strategy: 80, execution: 80 },
    ],
    skillDistribution: [
      { name: "Leadership", value: 30 },
      { name: "Strategy", value: 25 },
      { name: "Marketing", value: 25 },
      { name: "Finance", value: 20 },
    ],
    learningPath: [
      { name: "Business Fundamentals", status: "completed" },
      { name: "Market Research", status: "completed" },
      { name: "Business Model", status: "completed" },
      { name: "Marketing Strategy", status: "in-progress" },
      { name: "Financial Planning", status: "in-progress" },
      { name: "Team Building", status: "in-progress" },
      { name: "Scaling Operations", status: "not-started" },
      { name: "Exit Strategy", status: "not-started" },
    ],
  },
}

// Interest-based content recommendations
const interestRecommendations = {
  tech: [
    {
      title: "Introduction to Machine Learning",
      type: "course",
      difficulty: "Intermediate",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn the fundamentals of machine learning algorithms and applications.",
    },
    {
      title: "Web Development Bootcamp",
      type: "course",
      difficulty: "Beginner",
      progress: 35,
      image: "/placeholder.svg?height=100&width=180",
      description: "Comprehensive introduction to modern web development technologies.",
    },
    {
      title: "Data Structures & Algorithms",
      type: "course",
      difficulty: "Advanced",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Master the core computer science concepts essential for technical interviews.",
    },
    {
      title: "Build a Full-Stack App",
      type: "project",
      difficulty: "Intermediate",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Create a complete web application with frontend, backend, and database components.",
    },
    {
      title: "Introduction to Cybersecurity",
      type: "course",
      difficulty: "Beginner",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn the basics of protecting systems and data from digital threats.",
    },
  ],
  creative: [
    {
      title: "Digital Illustration Fundamentals",
      type: "course",
      difficulty: "Beginner",
      progress: 60,
      image: "/placeholder.svg?height=100&width=180",
      description: "Master the basics of creating digital artwork with professional tools.",
    },
    {
      title: "Music Production Essentials",
      type: "course",
      difficulty: "Beginner",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn the fundamentals of recording, mixing, and producing music.",
    },
    {
      title: "Advanced UI/UX Design",
      type: "course",
      difficulty: "Intermediate",
      progress: 25,
      image: "/placeholder.svg?height=100&width=180",
      description: "Create intuitive and engaging user experiences for digital products.",
    },
    {
      title: "Create a Digital Portfolio",
      type: "project",
      difficulty: "Beginner",
      progress: 80,
      image: "/placeholder.svg?height=100&width=180",
      description: "Build a professional portfolio to showcase your creative work.",
    },
    {
      title: "Animation Principles",
      type: "course",
      difficulty: "Intermediate",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn the fundamental principles that bring movement to life.",
    },
  ],
  business: [
    {
      title: "Entrepreneurship Basics",
      type: "course",
      difficulty: "Beginner",
      progress: 100,
      image: "/placeholder.svg?height=100&width=180",
      description: "Essential knowledge for starting and running a successful business.",
    },
    {
      title: "Digital Marketing Strategy",
      type: "course",
      difficulty: "Intermediate",
      progress: 45,
      image: "/placeholder.svg?height=100&width=180",
      description: "Develop comprehensive digital marketing strategies to grow your business online.",
    },
    {
      title: "Financial Planning for Startups",
      type: "course",
      difficulty: "Intermediate",
      progress: 20,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn how to create financial projections and manage cash flow for new ventures.",
    },
    {
      title: "Create a Business Plan",
      type: "project",
      difficulty: "Beginner",
      progress: 65,
      image: "/placeholder.svg?height=100&width=180",
      description: "Develop a comprehensive business plan to guide your entrepreneurial journey.",
    },
    {
      title: "Leadership & Management",
      type: "course",
      difficulty: "Intermediate",
      progress: 30,
      image: "/placeholder.svg?height=100&width=180",
      description: "Develop the skills to effectively lead and manage teams in a business context.",
    },
  ],
  education: [
    {
      title: "Effective Teaching Methods",
      type: "course",
      difficulty: "Intermediate",
      progress: 50,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn research-based teaching strategies that enhance student learning.",
    },
    {
      title: "Curriculum Development",
      type: "course",
      difficulty: "Advanced",
      progress: 25,
      image: "/placeholder.svg?height=100&width=180",
      description: "Design comprehensive curricula aligned with educational standards and best practices.",
    },
    {
      title: "Educational Psychology",
      type: "course",
      difficulty: "Intermediate",
      progress: 70,
      image: "/placeholder.svg?height=100&width=180",
      description: "Understand how students learn and develop to create effective learning environments.",
    },
    {
      title: "Design a Learning Module",
      type: "project",
      difficulty: "Intermediate",
      progress: 40,
      image: "/placeholder.svg?height=100&width=180",
      description: "Create an interactive learning module on a topic of your choice.",
    },
    {
      title: "Assessment Strategies",
      type: "course",
      difficulty: "Intermediate",
      progress: 15,
      image: "/placeholder.svg?height=100&width=180",
      description: "Master various assessment methods to effectively evaluate student learning.",
    },
  ],
  health: [
    {
      title: "Nutrition Fundamentals",
      type: "course",
      difficulty: "Beginner",
      progress: 85,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn the basics of nutrition science and healthy eating principles.",
    },
    {
      title: "Mental Health First Aid",
      type: "course",
      difficulty: "Beginner",
      progress: 60,
      image: "/placeholder.svg?height=100&width=180",
      description: "Develop skills to provide initial support to someone experiencing mental health challenges.",
    },
    {
      title: "Exercise Science",
      type: "course",
      difficulty: "Intermediate",
      progress: 30,
      image: "/placeholder.svg?height=100&width=180",
      description: "Understand the physiological principles behind effective exercise programming.",
    },
    {
      title: "Create a Wellness Plan",
      type: "project",
      difficulty: "Beginner",
      progress: 75,
      image: "/placeholder.svg?height=100&width=180",
      description: "Design a comprehensive wellness plan addressing physical, mental, and emotional health.",
    },
    {
      title: "Healthcare Ethics",
      type: "course",
      difficulty: "Intermediate",
      progress: 0,
      image: "/placeholder.svg?height=100&width=180",
      description: "Explore ethical considerations in healthcare delivery and decision-making.",
    },
  ],
  impact: [
    {
      title: "Sustainable Development",
      type: "course",
      difficulty: "Intermediate",
      progress: 40,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn about creating environmentally sustainable and socially equitable development.",
    },
    {
      title: "Community Organizing",
      type: "course",
      difficulty: "Beginner",
      progress: 65,
      image: "/placeholder.svg?height=100&width=180",
      description: "Develop skills to mobilize communities around shared goals and challenges.",
    },
    {
      title: "Social Entrepreneurship",
      type: "course",
      difficulty: "Intermediate",
      progress: 20,
      image: "/placeholder.svg?height=100&width=180",
      description: "Learn how to create ventures that address social and environmental challenges.",
    },
    {
      title: "Design a Community Project",
      type: "project",
      difficulty: "Intermediate",
      progress: 55,
      image: "/placeholder.svg?height=100&width=180",
      description: "Create a project plan to address a specific need in your community.",
    },
    {
      title: "Environmental Justice",
      type: "course",
      difficulty: "Intermediate",
      progress: 10,
      image: "/placeholder.svg?height=100&width=180",
      description: "Explore the intersection of environmental issues and social justice.",
    },
  ],
}

// Mood-based activity suggestions
const moodActivities = {
  happy: [
    {
      title: "Take on a challenging project",
      icon: <Rocket className="h-4 w-4" />,
      xp: 200,
      time: "60-90 min",
      description: "Channel your positive energy into tackling a complex task that requires focus and creativity.",
    },
    {
      title: "Mentor a peer",
      icon: <Users className="h-4 w-4" />,
      xp: 150,
      time: "45-60 min",
      description: "Share your knowledge and experience with someone who could benefit from your guidance.",
    },
    {
      title: "Set ambitious goals",
      icon: <Star className="h-4 w-4" />,
      xp: 100,
      time: "30 min",
      description: "Use your positive mindset to define challenging but achievable goals for your future growth.",
    },
  ],
  sad: [
    {
      title: "Try a mindfulness exercise",
      icon: <Brain className="h-4 w-4" />,
      xp: 80,
      time: "15 min",
      description: "Practice mindfulness meditation to help center yourself and improve your emotional state.",
    },
    {
      title: "Connect with a friend",
      icon: <MessageSquare className="h-4 w-4" />,
      xp: 100,
      time: "30-45 min",
      description: "Reach out to someone you trust to talk about how you're feeling or just to chat.",
    },
    {
      title: "Work on something creative",
      icon: <Palette className="h-4 w-4" />,
      xp: 120,
      time: "45-60 min",
      description: "Express yourself through a creative activity like drawing, writing, or music.",
    },
  ],
  focused: [
    {
      title: "Deep dive into a complex topic",
      icon: <BookOpen className="h-4 w-4" />,
      xp: 180,
      time: "60-90 min",
      description: "Use your concentration to learn about a challenging subject that requires deep focus.",
    },
    {
      title: "Work on your priority task",
      icon: <Zap className="h-4 w-4" />,
      xp: 150,
      time: "45-60 min",
      description: "Tackle your most important task while your focus is strong to make significant progress.",
    },
    {
      title: "Document your insights",
      icon: <Lightbulb className="h-4 w-4" />,
      xp: 120,
      time: "30-45 min",
      description: "Capture your thoughts and ideas while your mind is clear and focused.",
    },
  ],
  tired: [
    {
      title: "Review and organize notes",
      icon: <BookOpen className="h-4 w-4" />,
      xp: 80,
      time: "20-30 min",
      description: "Do a light review of your materials to consolidate learning without taxing yourself.",
    },
    {
      title: "Watch an educational video",
      icon: <Rocket className="h-4 w-4" />,
      xp: 70,
      time: "15-30 min",
      description: "Learn passively by watching a video on a topic that interests you.",
    },
    {
      title: "Set up for tomorrow",
      icon: <Calendar className="h-4 w-4" />,
      xp: 60,
      time: "15 min",
      description: "Prepare your workspace and plan for tomorrow so you can start fresh.",
    },
  ],
  anxious: [
    {
      title: "Break down a big task into steps",
      icon: <Lightbulb className="h-4 w-4" />,
      xp: 100,
      time: "20-30 min",
      description: "Make overwhelming projects more manageable by dividing them into smaller, actionable steps.",
    },
    {
      title: "Try a breathing exercise",
      icon: <Brain className="h-4 w-4" />,
      xp: 70,
      time: "10 min",
      description: "Practice deep breathing techniques to help calm your nervous system.",
    },
    {
      title: "Organize your workspace",
      icon: <Briefcase className="h-4 w-4" />,
      xp: 90,
      time: "20-30 min",
      description: "Create order in your physical environment to help create mental clarity.",
    },
  ],
  neutral: [
    {
      title: "Explore a new topic",
      icon: <Sparkles className="h-4 w-4" />,
      xp: 120,
      time: "30-45 min",
      description: "Discover something new that might spark your interest and passion.",
    },
    {
      title: "Review your goals",
      icon: <BarChart3 className="h-4 w-4" />,
      xp: 100,
      time: "20-30 min",
      description: "Take time to reflect on your progress and adjust your goals as needed.",
    },
    {
      title: "Connect with peers",
      icon: <Users className="h-4 w-4" />,
      xp: 110,
      time: "30-45 min",
      description: "Reach out to others in your field to share ideas and build your network.",
    },
  ],
}

// Interest icons
const interestIcons = {
  tech: <Code className="h-5 w-5" />,
  creative: <Palette className="h-5 w-5" />,
  business: <Briefcase className="h-5 w-5" />,
  education: <BookOpen className="h-5 w-5" />,
  health: <HeartPulse className="h-5 w-5" />,
  impact: <Sparkles className="h-5 w-5" />,
}

// Notifications
const notifications = [
  {
    id: 1,
    title: "New Course Available",
    description: "Introduction to Machine Learning is now available",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Team Invitation",
    description: "You've been invited to join the Web Development team",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    description: "You've earned the 'First Steps' achievement",
    time: "3 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Mentor Session Scheduled",
    description: "Your session with Alex Chen is confirmed for tomorrow at 3pm",
    time: "4 hours ago",
    read: false,
  },
  {
    id: 5,
    title: "Project Deadline Approaching",
    description: "Your 'Portfolio Website' project is due in 3 days",
    time: "12 hours ago",
    read: false,
  },
]

// Function to get career-specific content
const getCareerContent = (careerType) => {
  return careerContent[careerType] || careerContent.developer
}

export default function DashboardPage() {
  const [showInterestSelector, setShowInterestSelector] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(notifications.filter((n) => !n.read).length)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [careerType, setCareerType] = useState("developer")
  const [careerData, setCareerData] = useState(careerContent.developer)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { user } = useAuth()
  const { currentEmotion } = useEmotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const chartRef = useRef(null)

  // Simulate loading and progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  // Check if user has selected interests and get career from URL
  useEffect(() => {
    if (!loading && user && (!user.interests || user.interests.length === 0)) {
      setShowInterestSelector(true)
    }

    // Get career from URL or localStorage
    const careerFromUrl = searchParams.get("career")
    const careerFromStorage = localStorage.getItem("selectedCareer")

    if (careerFromUrl && Object.keys(careerContent).includes(careerFromUrl)) {
      setCareerType(careerFromUrl)
      setCareerData(getCareerContent(careerFromUrl))
    } else if (careerFromStorage && Object.keys(careerContent).includes(careerFromStorage)) {
      setCareerType(careerFromStorage)
      setCareerData(getCareerContent(careerFromStorage))
    }
  }, [loading, user, searchParams])

  // Get primary interest
  const getPrimaryInterest = () => {
    if (user?.interests && user.interests.length > 0) {
      return user.interests[0]
    }
    return "tech" // Default
  }

  // Get recommendations based on primary interest
  const getRecommendations = () => {
    const primaryInterest = getPrimaryInterest()
    return interestRecommendations[primaryInterest] || interestRecommendations.tech
  }

  // Get activities based on mood
  const getActivities = () => {
    return moodActivities[currentEmotion || "neutral"] || moodActivities.neutral
  }

  // Get interest icon
  const getInterestIcon = () => {
    const primaryInterest = getPrimaryInterest()
    return interestIcons[primaryInterest] || interestIcons.tech
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0)
  }

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  // Handle skill click
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill)
  }

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  // Handle course click
  const handleCourseClick = (course) => {
    setSelectedCourse(course)
  }

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Loading your personalized Em-Sphere dashboard...</p>
        <div className="w-64 mt-4">
          <Progress value={progress} className="h-1" />
        </div>
      </div>
    )
  }

  if (showInterestSelector) {
    return (
      <div className="min-h-screen flex flex-col">
        <ResponsiveNavbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <InterestSelector onComplete={() => setShowInterestSelector(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Top Bar with Notifications */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold gradient-text">Em-Sphere {careerData.title || "Dashboard"}</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>

                  {showNotifications && (
                    <Card className="absolute right-0 mt-2 w-80 z-50 border-2 border-primary/20">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Notifications</CardTitle>
                          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Mark all as read
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="max-h-[300px] overflow-y-auto">
                        <div className="space-y-2">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`p-3 rounded-lg border ${
                                  !notification.read ? "bg-primary/5 border-primary/30" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-sm">{notification.title}</h4>
                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                  </div>
                                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-sm text-muted-foreground py-4">No notifications</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Level {user?.level || 1}</span>
                </Button>
              </div>
            </div>

            {/* Welcome Section */}
            <section className="mb-8">
              <Card className="border-2 border-primary/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Student"}!</h1>
                      <p className="text-muted-foreground">
                        {currentEmotion === "happy" &&
                          "You're radiating positive energy today! Let's channel that into something amazing."}
                        {currentEmotion === "sad" &&
                          "Even on challenging days, small steps forward matter. What's one thing you'd like to accomplish today?"}
                        {currentEmotion === "focused" &&
                          "You're in a great flow state! This is perfect for deep work on complex problems."}
                        {currentEmotion === "tired" &&
                          "It's okay to pace yourself today. Even small progress is still progress."}
                        {currentEmotion === "anxious" &&
                          "Taking things one step at a time can help manage overwhelm. What's your priority today?"}
                        {(!currentEmotion || currentEmotion === "neutral") &&
                          "Today is full of possibilities. What would you like to focus on?"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">Weekly Progress</p>
                        <p className="text-2xl font-bold">67%</p>
                      </div>
                      <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-primary/30 bg-primary/10 p-1">
                        <div className="h-full w-full rounded-full bg-background">
                          <Progress value={67} className="h-full w-full rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="learning">Learning Paths</TabsTrigger>
                <TabsTrigger value="games">Interactive Games</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Recommendations Column */}
                  <div className="md:col-span-2 space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {careerData.icon || getInterestIcon()}
                          <span className="ml-2">Recommended for You</span>
                        </CardTitle>
                        <CardDescription>Personalized content based on your career and interests</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {careerData.recommendations.slice(0, 4).map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer ${
                                selectedCourse?.title === item.title ? "border-primary bg-primary/5" : ""
                              }`}
                              onClick={() => handleCourseClick(item)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium">{item.title}</h3>
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              {item.progress > 0 && (
                                <div className="mt-2 mb-3">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{item.progress}%</span>
                                  </div>
                                  <Progress value={item.progress} className="h-1" />
                                </div>
                              )}
                              <div className="flex justify-between items-center mt-2">
                                <Badge variant="secondary">{item.difficulty}</Badge>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>

                              <AnimatePresence>
                                {selectedCourse?.title === item.title && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="mt-4 pt-4 border-t">
                                      <div className="flex items-start gap-3">
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                          <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                          <Button size="sm">
                                            {item.progress > 0 ? "Continue Learning" : "Start Learning"}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View All Recommendations
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Your Learning Journey</CardTitle>
                        <CardDescription>Track your progress and upcoming milestones</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="projects">
                          <TabsList className="mb-4">
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="skills">Skills</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                          </TabsList>

                          <TabsContent value="projects">
                            <div className="space-y-4">
                              {careerData.projects.map((project, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedProject?.name === project.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleProjectClick(project)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{project.name}</h3>
                                    <Badge>In Progress</Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                  </div>

                                  <AnimatePresence>
                                    {selectedProject?.name === project.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center">
                                            <p className="text-sm text-muted-foreground">Due in: {project.deadline}</p>
                                            <Button size="sm">Continue</Button>
                                          </div>
                                          <div className="mt-3 grid grid-cols-2 gap-2">
                                            <div className="text-sm">
                                              <span className="font-medium">Last activity:</span> {project.lastActivity}
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Collaborators:</span>{" "}
                                              {project.collaborators}
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Priority:</span> {project.priority}
                                            </div>
                                            <div className="text-sm">
                                              <span className="font-medium">Status:</span> {project.status}
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="skills">
                            <div className="space-y-4">
                              {careerData.skills.map((skill, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedSkill?.name === skill.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleSkillClick(skill)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{skill.name}</h3>
                                    <Badge variant="outline">{skill.category}</Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Proficiency</span>
                                      <span>{skill.level}/10</span>
                                    </div>
                                    <Progress value={skill.level * 10} className="h-2" />
                                  </div>

                                  <AnimatePresence>
                                    {selectedSkill?.name === skill.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center mb-3">
                                            <p className="text-sm text-muted-foreground">
                                              Last practiced: {skill.lastPracticed}
                                            </p>
                                            <Button size="sm">Practice Now</Button>
                                          </div>
                                          <p className="text-sm mb-3">{skill.description}</p>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-muted p-2 rounded-md text-center">
                                              <p className="text-xs text-muted-foreground">Next Level</p>
                                              <p className="font-medium">{skill.level + 1}/10</p>
                                            </div>
                                            <div className="bg-muted p-2 rounded-md text-center">
                                              <p className="text-xs text-muted-foreground">XP Needed</p>
                                              <p className="font-medium">{(10 - skill.level) * 100} XP</p>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="events">
                            <div className="space-y-4">
                              {careerData.events.map((event, index) => (
                                <div
                                  key={index}
                                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 ${
                                    selectedEvent?.name === event.name ? "border-primary bg-primary/5" : ""
                                  }`}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium">{event.name}</h3>
                                    <Badge variant="secondary">{event.date}</Badge>
                                  </div>

                                  <AnimatePresence>
                                    {selectedEvent?.name === event.name && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <div className="mt-4 pt-4 border-t">
                                          <div className="flex justify-between items-center mb-3">
                                            <p className="text-sm text-muted-foreground">Location: {event.location}</p>
                                            <Button size="sm">Register</Button>
                                          </div>
                                          <p className="text-sm">{event.description}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Brain className="h-5 w-5 mr-2 text-primary" />
                          Mood-Based Activities
                        </CardTitle>
                        <CardDescription>Suggested activities based on your current mood</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {getActivities().map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center p-3 rounded-lg border hover:border-primary/30 transition-colors cursor-pointer"
                            >
                              <div className="p-2 rounded-full bg-primary/10 mr-3">{activity.icon}</div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{activity.title}</span>
                                  <Badge variant="outline" className="ml-2">
                                    {activity.time}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-muted-foreground">+{activity.xp} XP</span>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    Start
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/skills">
                              <Brain className="h-4 w-4 mr-2" />
                              Skills
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/journal">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Journal
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/teams">
                              <Users className="h-4 w-4 mr-2" />
                              Teams
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/mentors">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Mentors
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/career-simulator">
                              <Rocket className="h-4 w-4 mr-2" />
                              Careers
                            </Link>
                          </Button>
                          <Button variant="outline" className="justify-start" asChild>
                            <Link href="/missions">
                              <Zap className="h-4 w-4 mr-2" />
                              Missions
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          Upcoming Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {careerData.events.slice(0, 2).map((event, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{event.name}</h3>
                                <Badge variant="outline">{event.date}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Calendar
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Learning Paths Tab */}
              <TabsContent value="learning">
                <PersonalizedLearningPath />
              </TabsContent>

              {/* Interactive Games Tab */}
              <TabsContent value="games">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Interactive Learning Games</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InteractiveLearningGame gameType="quiz" onComplete={() => {}} />
                    <InteractiveLearningGame gameType="memory" onComplete={() => {}} />
                    <InteractiveLearningGame gameType="coding" onComplete={() => {}} />
                  </div>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Learning Insights</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Activity Trends</CardTitle>
                        <CardDescription>Your learning patterns over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="h-full w-full" ref={chartRef}>
                          {/* Chart would be rendered here with actual data */}
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground">
                                Activity chart showing your{" "}
                                {careerType === "developer"
                                  ? "coding"
                                  : careerType === "musician"
                                    ? "practice"
                                    : "learning"}{" "}
                                patterns
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                      <CardHeader>
                        <CardTitle>Skill Development</CardTitle>
                        <CardDescription>Your progress across different skill areas</CardDescription>
                      </CardHeader>
                      <CardContent className="h-80">
                        <div className="h-full flex flex-col justify-center">
                          <div className="space-y-4">
                            {careerData.skills.map((skill, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{skill.name}</span>
                                  <span>{skill.level}/10</span>
                                </div>
                                <Progress value={skill.level * 10} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20 md:col-span-2">
                      <CardHeader>
                        <CardTitle>AI-Powered Recommendations</CardTitle>
                        <CardDescription>Personalized suggestions based on your learning patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {careerData.insights.map((insight, index) => (
                            <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                              <h3 className="font-medium mb-2 flex items-center">
                                <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                                {insight.title}
                              </h3>
                              <p className="text-sm">{insight.description}</p>
                            </div>
                          ))}

                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h3 className="font-medium mb-2 flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              Optimal Learning Times
                            </h3>
                            <p className="text-sm">
                              Based on your activity patterns, you're most productive in the morning. Consider
                              scheduling challenging learning tasks during this time for better results.
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <h3 className="font-medium mb-2 flex items-center">
                              <Target className="h-4 w-4 mr-2 text-primary" />
                              Recommended Focus Areas
                            </h3>
                            <p className="text-sm">
                              To achieve your career goals faster, we recommend focusing on{" "}
                              {careerType === "developer"
                                ? "backend development and database skills"
                                : careerType === "musician"
                                  ? "composition and music theory"
                                  : "advanced techniques in your field"}{" "}
                              in the coming weeks.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </main>

      <MoodDetector />
      <AIChatbot />
      <VoiceInteraction />
      <AchievementSystem />
    </div>
  )
}
