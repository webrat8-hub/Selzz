"use client"

import { useState, useEffect } from "react"
import { Shield, Bug, Zap, CheckCircle, Globe, ChevronLeft, ChevronRight } from "lucide-react"

// Bug types data
const BUG_TYPES = [
  { name: "DELAY INVISIBLE", code: "delayLow" },
  { name: "CRASH INVISIBLE", code: "crashHigh" },
  { name: "BLANK CLICK", code: "blankClick" },
  { name: "DELAY IOS", code: "delayIOS" },
  { name: "Force close Wa", code: "forceClose" },
]

export default function YaeMikoDashboard() {
  const [targetNumber, setTargetNumber] = useState("62xxxxxxxxxx")
  const [isLoading, setIsLoading] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  const [dailyLimit, setDailyLimit] = useState(5)
  const [showLimitWarning, setShowLimitWarning] = useState(false)

  const handleSendBug = () => {
    if (dailyLimit <= 0) {
      setShowLimitWarning(true)
      return
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setDailyLimit(prev => Math.max(0, prev - 1))
    }, 5000)
  }

  return (
    <div className="relative min-h-screen bg-[#0a0f1a] overflow-hidden">
      {/* Bokeh Background Effects */}
      <BokehBackground />
      
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
      
      {/* Limit Warning Overlay */}
      {showLimitWarning && <LimitWarningOverlay onClose={() => setShowLimitWarning(false)} />}
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto px-4 py-4">
        
        {/* Header */}
        <Header />
        
        {/* Profile Card */}
        <ProfileCard />
        
        {/* Action Section */}
        <ActionSection 
          targetNumber={targetNumber}
          setTargetNumber={setTargetNumber}
          onSendBug={handleSendBug}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />
        
        {/* Navigation Dots */}
        <NavigationDots activeNav={activeNav} setActiveNav={setActiveNav} />
        
        {/* Bottom Bar */}
        <BottomBar />
        
        {/* Free Bug Limit */}
        <FreeBugLimit currentLimit={dailyLimit} />
      </div>
    </div>
  )
}

// Bokeh Background Component
function BokehBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large bokeh circles */}
      <div className="absolute top-10 -left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 -left-10 w-72 h-72 rounded-full bg-purple-500/8 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      
      {/* Small floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-cyan-400/60 animate-float" />
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full bg-cyan-300/80 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-10 w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 right-10 w-1 h-1 rounded-full bg-purple-400/60 animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1a]/50 to-[#0a0f1a]" />
    </div>
  )
}

// Limit Warning Overlay Component
function LimitWarningOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-xl" onClick={onClose}>
      <div className="flex flex-col items-center gap-6 p-8 glass rounded-2xl border border-red-500/30 max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        {/* Warning Icon */}
        <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center glow-red">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-red-400">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
          </svg>
        </div>
        
        {/* Warning Text */}
        <div className="text-center space-y-3">
          <h3 className="font-[family-name:var(--font-orbitron)] text-lg text-red-400 font-bold tracking-wider">
            LIMIT HARIAN HABIS
          </h3>
          <p className="font-[family-name:var(--font-rajdhani)] text-sm text-gray-300 leading-relaxed">
            DAN LIMIT AKAN RESET KEMBALI 24 JAM KEDEPAN
          </p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/40 font-[family-name:var(--font-orbitron)] text-xs text-red-400 tracking-wider transition-all duration-300"
        >
          TUTUP
        </button>
      </div>
    </div>
  )
}

// Loading Overlay Component
function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1a]/95 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-8">
        {/* Cyber Loading Ring */}
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-400/50 animate-loading-spin" />
          {/* Inner glow */}
          <div className="absolute inset-4 rounded-full bg-cyan-500/10 animate-loading-pulse" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Bug className="w-12 h-12 text-cyan-400 animate-loading-pulse" />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h3 className="font-[family-name:var(--font-orbitron)] text-xl text-cyan-400 text-glow-cyan tracking-wider animate-cyber-flicker">
            BUG SEDANG DI KIRIM KE TARGET
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-cyan-900/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full animate-pulse" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  )
}

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between mb-4">
      {/* Shield Button */}
      <button className="w-10 h-10 rounded-full bg-[#1a2540]/80 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center hover:border-cyan-400/50 transition-all duration-300 hover:glow-cyan">
        <Shield className="w-5 h-5 text-cyan-400" />
      </button>
      
      {/* Title */}
      <h1 className="font-[family-name:var(--font-orbitron)] text-sm font-bold text-white tracking-wider text-glow-cyan">
        Yae Miko MENU BUG v3.0
      </h1>
      
      {/* Character Avatar */}
      <div className="flex items-center gap-2">
        <span className="font-[family-name:var(--font-rajdhani)] text-xs text-cyan-300 font-medium">Yae Miko</span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-400/30 overflow-hidden flex items-center justify-center backdrop-blur-sm">
          <YaeMikoAvatar />
        </div>
      </div>
    </header>
  )
}

// Yae Miko Character Avatar SVG
function YaeMikoAvatar() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Background glow */}
      <defs>
        <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c44dff" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb6c1" />
          <stop offset="50%" stopColor="#ff69b4" />
          <stop offset="100%" stopColor="#db7093" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#avatarGlow)" />
      {/* Simplified Yae Miko silhouette */}
      {/* Hair */}
      <ellipse cx="20" cy="15" rx="12" ry="10" fill="url(#hairGradient)" />
      <ellipse cx="10" cy="12" rx="4" ry="6" fill="url(#hairGradient)" /> {/* Left ear/hair */}
      <ellipse cx="30" cy="12" rx="4" ry="6" fill="url(#hairGradient)" /> {/* Right ear/hair */}
      {/* Face */}
      <ellipse cx="20" cy="20" rx="8" ry="9" fill="#ffecd4" />
      {/* Eyes */}
      <ellipse cx="17" cy="19" rx="1.5" ry="2" fill="#7c3aed" />
      <ellipse cx="23" cy="19" rx="1.5" ry="2" fill="#7c3aed" />
      {/* Eye shine */}
      <circle cx="17.5" cy="18.5" r="0.5" fill="white" />
      <circle cx="23.5" cy="18.5" r="0.5" fill="white" />
      {/* Smile */}
      <path d="M 17 24 Q 20 26 23 24" stroke="#db7093" strokeWidth="0.8" fill="none" />
      {/* Fox ears detail */}
      <path d="M 8 8 L 10 5 L 12 10" fill="#ffb6c1" />
      <path d="M 32 8 L 30 5 L 28 10" fill="#ffb6c1" />
    </svg>
  )
}

// Profile Card Component
function ProfileCard() {
  return (
    <div className="glass rounded-2xl p-4 mb-4 animate-pulse-glow">
      <div className="flex flex-col items-center gap-4">
        {/* Devil Skull Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600/30 to-red-900/50 border-2 border-red-500/40 flex items-center justify-center glow-red">
            <DevilSkullAvatar />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-red-600/80 rounded-full border border-red-400/50">
            <span className="font-[family-name:var(--font-orbitron)] text-[10px] text-white font-bold tracking-wider">
              FREE BUG
            </span>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <div className="flex items-center justify-center gap-4 w-full mt-2">
          {/* Total Bugs */}
          <StatIcon 
            icon={<Bug className="w-5 h-5" />}
            value="7"
            label="Total Bugs"
            color="cyan"
          />
          
          {/* Success Rate */}
          <StatIcon 
            icon={<Zap className="w-5 h-5" />}
            value="GACOR"
            label="Success Rate"
            color="green"
          />
          
          {/* Status */}
          <StatIcon 
            icon={<CheckCircle className="w-5 h-5" />}
            value="ACTIVE"
            label="Status"
            color="green"
          />
        </div>
      </div>
    </div>
  )
}

// Devil Skull Avatar SVG
function DevilSkullAvatar() {
  return (
    <svg viewBox="0 0 50 50" className="w-14 h-14">
      <defs>
        <linearGradient id="skullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4757" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>
        <filter id="skullGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Horns */}
      <path d="M 10 20 Q 5 10 8 5 Q 12 12 15 18" fill="url(#skullGradient)" filter="url(#skullGlow)" />
      <path d="M 40 20 Q 45 10 42 5 Q 38 12 35 18" fill="url(#skullGradient)" filter="url(#skullGlow)" />
      
      {/* Skull shape */}
      <ellipse cx="25" cy="28" rx="14" ry="12" fill="url(#skullGradient)" filter="url(#skullGlow)" />
      
      {/* Eye sockets */}
      <ellipse cx="19" cy="26" rx="4" ry="5" fill="#1a0a0a" />
      <ellipse cx="31" cy="26" rx="4" ry="5" fill="#1a0a0a" />
      
      {/* Eye glow */}
      <ellipse cx="19" cy="26" rx="2" ry="2.5" fill="#ff6b6b" opacity="0.8" />
      <ellipse cx="31" cy="26" rx="2" ry="2.5" fill="#ff6b6b" opacity="0.8" />
      
      {/* Nose */}
      <path d="M 23 32 L 25 35 L 27 32" fill="#1a0a0a" />
      
      {/* Teeth */}
      <rect x="20" y="37" width="3" height="4" rx="0.5" fill="#ffecd4" />
      <rect x="24" y="37" width="3" height="4" rx="0.5" fill="#ffecd4" />
      <rect x="28" y="37" width="3" height="4" rx="0.5" fill="#ffecd4" />
    </svg>
  )
}

// Stat Icon Component
function StatIcon({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: 'cyan' | 'green' | 'red' }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
    green: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    red: 'bg-red-500/20 border-red-500/40 text-red-400'
  }
  
  const glowClasses = {
    cyan: 'glow-cyan',
    green: 'glow-green',
    red: 'glow-red'
  }
  
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded-full ${colorClasses[color]} border flex items-center justify-center ${glowClasses[color]}`}>
        {icon}
      </div>
      <span className={`font-[family-name:var(--font-orbitron)] text-xs font-bold ${color === 'cyan' ? 'text-cyan-400' : color === 'green' ? 'text-emerald-400' : 'text-red-400'}`}>
        {value}
      </span>
      <span className="font-[family-name:var(--font-rajdhani)] text-[10px] text-gray-400 text-center">
        {label}
      </span>
    </div>
  )
}

// Action Section Component
function ActionSection({ 
  targetNumber, 
  setTargetNumber, 
  onSendBug,
  activeNav,
  setActiveNav
}: { 
  targetNumber: string; 
  setTargetNumber: (v: string) => void; 
  onSendBug: () => void;
  activeNav: number;
  setActiveNav: (n: number) => void;
}) {
  return (
    <div className="glass rounded-2xl p-4 mb-4 flex-1">
      {/* Target Number Input */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="font-[family-name:var(--font-orbitron)] text-xs text-cyan-300 tracking-wider">
            NOMOR TARGET
          </span>
        </div>
        <input
          type="text"
          value={targetNumber}
          onChange={(e) => setTargetNumber(e.target.value)}
          className="w-full px-4 py-3 bg-[#0d1a30]/80 rounded-xl border border-cyan-500/20 text-white font-[family-name:var(--font-rajdhani)] text-lg tracking-wider focus:outline-none focus:border-cyan-400/50 focus:glow-cyan transition-all duration-300 placeholder:text-gray-500"
          placeholder="62xxxxxxxxxx"
        />
      </div>
      
      {/* Feature Card with Slider */}
      <FeatureCard activeNav={activeNav} setActiveNav={setActiveNav} />
      
      {/* Send Bug Button */}
      <button
        onClick={onSendBug}
        className="w-full mt-4 py-4 bg-gradient-to-r from-pink-500/80 to-pink-600/80 hover:from-pink-400 hover:to-pink-500 rounded-xl border border-pink-400/30 font-[family-name:var(--font-orbitron)] text-sm text-white font-bold tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-pink"
      >
        KIRIM BUG
      </button>
    </div>
  )
}

// Feature Card Component with Slider
function FeatureCard({ activeNav, setActiveNav }: { activeNav: number; setActiveNav: (n: number) => void }) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe && activeNav < BUG_TYPES.length - 1) {
      setActiveNav(activeNav + 1)
    }
    if (isRightSwipe && activeNav > 0) {
      setActiveNav(activeNav - 1)
    }
  }

  const currentBug = BUG_TYPES[activeNav]

  return (
    <div className="relative bg-[#0d1a30]/60 rounded-xl border border-cyan-500/15 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a1525]/80 border-b border-cyan-500/10">
        <div className="flex items-center gap-2">
          <LadybugIcon />
          <span className="font-[family-name:var(--font-orbitron)] text-xs text-cyan-300 tracking-wider">
            PiLiH BUG
          </span>
        </div>
        <span className="font-[family-name:var(--font-rajdhani)] text-xs text-gray-500">
          {activeNav + 1}/{BUG_TYPES.length}
        </span>
      </div>
      
      {/* Content with pillars and swipe */}
      <div 
        className="flex items-stretch"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Left Pillar with Arrow */}
        <button 
          onClick={() => activeNav > 0 && setActiveNav(activeNav - 1)}
          className="w-8 bg-gradient-to-b from-gray-600/50 via-gray-500/30 to-gray-600/50 flex items-center justify-center hover:from-cyan-600/30 hover:via-cyan-500/20 hover:to-cyan-600/30 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>
        
        {/* Center Content */}
        <div className="flex-1 py-6 px-4 flex flex-col items-center justify-center min-h-[100px]">
          <span className="font-[family-name:var(--font-orbitron)] text-lg text-white font-bold tracking-wider text-glow-cyan text-center transition-all duration-300">
            {currentBug.name}
          </span>
          <span className="font-[family-name:var(--font-rajdhani)] text-sm text-cyan-400/80 mt-1 transition-all duration-300">
            {currentBug.code}
          </span>
        </div>
        
        {/* Right Pillar with Arrow */}
        <button 
          onClick={() => activeNav < BUG_TYPES.length - 1 && setActiveNav(activeNav + 1)}
          className="w-8 bg-gradient-to-b from-gray-600/50 via-gray-500/30 to-gray-600/50 flex items-center justify-center hover:from-cyan-600/30 hover:via-cyan-500/20 hover:to-cyan-600/30 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

// Ladybug Icon Component
function LadybugIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4">
      <ellipse cx="10" cy="12" rx="7" ry="6" fill="#ff4757" />
      <line x1="10" y1="6" x2="10" y2="18" stroke="#1a0a0a" strokeWidth="1" />
      <circle cx="7" cy="10" r="1.5" fill="#1a0a0a" />
      <circle cx="13" cy="10" r="1.5" fill="#1a0a0a" />
      <circle cx="8" cy="14" r="1" fill="#1a0a0a" />
      <circle cx="12" cy="14" r="1" fill="#1a0a0a" />
      <circle cx="10" cy="7" r="3" fill="#1a0a0a" />
      <path d="M 7 5 Q 6 2 8 3" stroke="#1a0a0a" strokeWidth="0.8" fill="none" />
      <path d="M 13 5 Q 14 2 12 3" stroke="#1a0a0a" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

// Navigation Dots Component
function NavigationDots({ activeNav, setActiveNav }: { activeNav: number; setActiveNav: (n: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {BUG_TYPES.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveNav(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            activeNav === i 
              ? 'bg-cyan-400 w-6 glow-cyan' 
              : 'bg-gray-600 hover:bg-gray-500 w-2'
          }`}
        />
      ))}
    </div>
  )
}

// Bottom Bar Component
function BottomBar() {
  return (
    <div className="glass rounded-xl p-3 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-3 h-3 text-cyan-400" />
            <ChevronRight className="w-3 h-3 text-cyan-400" />
          </div>
          <span className="font-[family-name:var(--font-orbitron)] text-xs text-cyan-300 tracking-wider">
            PiLiH SENDER
          </span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-[family-name:var(--font-rajdhani)] text-xs text-emerald-400 font-medium">
            67 sender online
          </span>
        </div>
      </div>
    </div>
  )
}

// Free Bug Limit Component
function FreeBugLimit({ currentLimit }: { currentLimit: number }) {
  const isLow = currentLimit <= 2
  const isEmpty = currentLimit === 0
  
  return (
    <div className="flex items-center justify-center">
      <div className={`px-4 py-2 rounded-full border transition-all duration-300 ${
        isEmpty 
          ? 'bg-red-500/20 border-red-500/30' 
          : isLow 
            ? 'bg-yellow-500/20 border-yellow-500/30' 
            : 'bg-[#1a2540]/60 border-cyan-500/20'
      }`}>
        <span className="font-[family-name:var(--font-rajdhani)] text-sm text-gray-400">
          limit free bug hari ini{" "}
          <span className={`font-bold transition-all duration-300 ${
            isEmpty 
              ? 'text-red-400' 
              : isLow 
                ? 'text-yellow-400' 
                : 'text-cyan-400'
          }`}>
            {currentLimit}/5
          </span>
        </span>
      </div>
    </div>
  )
}
