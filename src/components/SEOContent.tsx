import React, { memo } from 'react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Rocket, 
  ChevronRight, 
  BookOpen, 
  Star, 
  Sparkles, 
  Users, 
  GraduationCap,
  Terminal,
  FolderOpen,
  Play,
  Keyboard,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const SEOContent = memo(function SEOContent() {
  const detailedLanguages = [
    {
      name: 'Python',
      color: 'blue',
      title: 'A professional Python environment in your browser',
      desc: 'Python is known for its clarity and power. Our online editor gives you a clean workspace for everything from quick scripts to data analysis. Whether you are working with fundamental logic or complex libraries, LiveCompile removes the friction of local setup. It is built to be fast, reliable, and always available whenever inspiration strikes.',
      features: ['Instant execution', 'Clean syntax highlighting', 'Standard library support', 'Advanced error reporting']
    },
    {
      name: 'JavaScript',
      color: 'amber',
      title: 'Modern JavaScript playground for fast prototyping',
      desc: 'JavaScript is the engine of the web. We provide a workspace optimized for modern ES6+ development. Test your asynchronous logic, DOM manipulations, and complex scripts with real-time feedback. Our integrated web preview lets you see exactly how your code behaves in a live environment, making it the perfect tool for frontend experiments.',
      features: ['ES6+ Support', 'Async/Await ready', 'Live DOM preview', 'Detailed console output']
    },
    {
      name: 'C++ & Systems',
      color: 'indigo',
      title: 'High-performance C++ execution without the setup',
      desc: 'C++ development shouldn\'t require fighting with compilers. We handle the heavy lifting securely on our servers, giving you instant feedback on your code. Perfect for algorithmic challenges and systems programming practice, our environment provides the speed and reliability needed for performance-critical logic.',
      features: ['Fast server-side compilation', 'Standard Library (STL)', 'Algorithmic focus', 'Low-latency output']
    },
    {
      name: 'Java',
      color: 'rose',
      title: 'The reliable Java editor for modern development',
      desc: 'Java is the foundation of many large-scale systems. Our online editor offers a stable environment for practicing object-oriented principles and complex data structures. We manage the JVM lifecycle so you can focus entirely on your code architecture. It is a straightforward, no-nonsense tool for building and testing Java logic.',
      features: ['Full OOP support', 'No-setup JVM', 'Standard API access', 'Clean output stream']
    }
  ];

  return (
    <section id="features" className="bg-bg py-32 px-6 md:px-12 border-t border-border relative overflow-hidden">
      {/* Decorative background elements re-introduced with subtle colors */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* About Us Section */}
        <div id="about-us" className="mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Users className="w-3 h-3" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-6 leading-tight">
                Built for those who <span className="text-blue-600 dark:text-blue-400">Code</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-6 italic border-l-4 border-blue-500/20 pl-6 py-2">
                "We believe that tools should stay out of your way. Our goal is to provide a workspace that just works, wherever you are."
              </p>
              <p className="text-lg text-muted leading-relaxed mb-6">
                LiveCompile started with a simple idea: coding should be accessible without the headache of local installations and configuration files. We built a platform that puts the power of a professional IDE directly in your browser. Whether you are learning your first language or testing a complex algorithm, LiveCompile provides the environment you need without the noise.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-blue-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink mb-1">Focused Learning</h4>
                    <p className="text-sm text-muted leading-relaxed">Skip the installation guides. Start writing code instantly in a clean, professional environment designed for clarity and speed.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-emerald-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink mb-1">Consistent Environments</h4>
                    <p className="text-sm text-muted leading-relaxed">Get the same performance on any device. Our cloud-native architecture ensures your code runs exactly the same way, whether you're on a laptop or a tablet.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full aspect-square bg-surface rounded-[60px] border border-border flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Code2 className="w-40 h-40 text-muted/10 transition-all duration-700 group-hover:scale-105 group-hover:text-blue-500/10" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="space-y-3 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="h-1.5 w-full bg-bg border border-border rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[70%]" />
                  </div>
                  <div className="h-1.5 w-full bg-bg border border-border rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[90%]" />
                  </div>
                  <div className="h-1.5 w-full bg-bg border border-border rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[50%]" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 p-8 bg-surface border border-border rounded-3xl shadow-lg group-hover:shadow-blue-500/10 transition-all">
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tighter italic">Always Free</div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest text-center mt-1">Open Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Ecosystems Section */}
        <div id="languages" className="mb-32 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink text-center whitespace-nowrap">
              Vibrant <span className="text-blue-600 dark:text-blue-400">Ecosystems</span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { 
                name: 'Python', 
                color: 'blue', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
                features: ['AI & Data Science', 'Rapid Prototyping', 'Scripting'],
                description: 'The world\'s most popular language for data and AI, fully supported with our optimized runtime.'
              },
              { 
                name: 'JavaScript', 
                color: 'amber', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                features: ['Modern ES6+', 'Full-Stack Web', 'Lightning Fast'],
                description: 'Build responsive web apps and robust server-side logic with our integrated Node.js environment.'
              },
              { 
                name: 'C++', 
                color: 'indigo', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
                features: ['Performance Critical', 'Systems Programming', 'Low-level Control'],
                description: 'For high-performance applications where every millisecond counts.'
              },
              { 
                name: 'Rust', 
                color: 'orange', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
                features: ['Memory Safety', 'Modern Concurrency', 'Zero-cost Abstractions'],
                description: 'The future of systems programming with guaranteed memory safety and modern tooling.'
              }
            ].map(lang => (
              <div 
                key={lang.name} 
                className={cn(
                  "flex flex-col md:flex-row gap-8 p-10 rounded-[40px] bg-surface border transition-all duration-500 group overflow-hidden relative",
                  lang.color === 'blue' ? "hover:border-blue-500/30 border-border" :
                  lang.color === 'amber' ? "hover:border-amber-500/30 border-border" :
                  lang.color === 'indigo' ? "hover:border-indigo-500/30 border-border" :
                  "hover:border-orange-500/30 border-border"
                )}
              >
                {/* Decorative background glow */}
                <div className={cn(
                  "absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700",
                  lang.color === 'blue' ? "bg-blue-500" :
                  lang.color === 'amber' ? "bg-amber-500" :
                  lang.color === 'indigo' ? "bg-indigo-500" :
                  "bg-orange-500"
                )} />

                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center p-2.5 shadow-sm group-hover:scale-110 transition-transform">
                      <img src={lang.icon} alt={lang.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ink">{lang.name}</h3>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        lang.color === 'blue' ? "text-blue-500" :
                        lang.color === 'amber' ? "text-amber-500" :
                        lang.color === 'indigo' ? "text-indigo-500" :
                        "text-orange-500"
                      )}>Premium Workspace</span>
                    </div>
                  </div>
                  <p className="text-muted leading-relaxed mb-8">{lang.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {lang.features.map(f => (
                      <div key={f} className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg border border-border text-xs font-medium text-muted group-hover:text-ink transition-colors">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          lang.color === 'blue' ? "bg-blue-500" :
                          lang.color === 'amber' ? "bg-amber-500" :
                          lang.color === 'indigo' ? "bg-indigo-500" :
                          "bg-orange-500"
                        )} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 w-full h-[300px] md:h-auto min-h-[260px] bg-bg rounded-[32px] border border-border flex items-center justify-center overflow-hidden relative group/code">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-surface/50" />
                  <Code2 className="w-24 h-24 text-muted/5 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-6 left-6 right-6 p-5 bg-surface border border-border rounded-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className={cn(
                      "text-[10px] font-mono mb-2",
                      lang.color === 'blue' ? "text-blue-500" :
                      lang.color === 'amber' ? "text-amber-500" :
                      lang.color === 'indigo' ? "text-indigo-500" :
                      "text-orange-500"
                    )}>// {lang.name} Core</p>
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-bg border border-border rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full w-[80%] transition-all duration-1000",
                          lang.color === 'blue' ? "bg-blue-500" :
                          lang.color === 'amber' ? "bg-amber-500" :
                          lang.color === 'indigo' ? "bg-indigo-500" :
                          "bg-orange-500"
                        )} />
                      </div>
                      <div className="h-1.5 w-[60%] bg-bg border border-border rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-ink text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Star className="w-3 h-3 text-muted" />
            Fast. Reliable. Simple.
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-ink mb-8 leading-tight">
            Code without <span className="text-muted">Constraints</span>
          </h2>
          <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed font-medium">
            We removed the barriers between you and your code. LiveCompile is a professional workspace that lives in your browser, combining high-speed execution with a refined, distraction-free interface.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Cpu, color: 'blue', title: 'Fast Execution', text: 'Our backend handles the heavy lifting, providing near-instant results for every line of code you write.' },
            { icon: Globe, color: 'emerald', title: 'Accessible Anywhere', text: 'Work from any device with a browser. Your projects are always ready and waiting exactly where you left them.' },
            { icon: Shield, color: 'purple', title: 'Secure Environment', text: 'Every project runs in an isolated container, keeping your code private and your workspace clean.' }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-3xl bg-surface border border-border group transition-all duration-300 hover:border-ink/20">
              <div className={cn(
                "w-14 h-14 rounded-2xl border border-border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform",
                feature.color === 'blue' ? "bg-blue-500/10" : feature.color === 'emerald' ? "bg-emerald-500/10" : "bg-purple-500/10"
              )}>
                <feature.icon className={cn(
                  "w-7 h-7",
                  feature.color === 'blue' ? "text-blue-600 dark:text-blue-400" : feature.color === 'emerald' ? "text-emerald-600 dark:text-emerald-400" : "text-purple-600 dark:text-purple-400"
                )} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-ink">{feature.title}</h3>
              <p className="text-muted leading-relaxed text-lg">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Detailed Language Deep-Dives */}
        <div className="space-y-32 mb-32">
          {detailedLanguages.map((lang, index) => (
            <div key={lang.name} className={cn(
              "flex flex-col lg:flex-row gap-16 items-center",
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            )}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shadow-sm",
                    lang.color === 'blue' ? "text-blue-500" :
                    lang.color === 'amber' ? "text-amber-500" :
                    lang.color === 'indigo' ? "text-indigo-500" :
                    "text-rose-500"
                  )}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-muted uppercase tracking-widest">{lang.name} Workspace</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-ink leading-tight">{lang.title}</h3>
                <p className="text-lg text-muted leading-relaxed mb-8">
                  {lang.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lang.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        lang.color === 'blue' ? "bg-blue-500" :
                        lang.color === 'amber' ? "bg-amber-500" :
                        lang.color === 'indigo' ? "bg-indigo-500" :
                        "bg-rose-500"
                      )} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full h-[400px] bg-surface rounded-[40px] border border-border flex items-center justify-center overflow-hidden relative group">
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                  lang.color === 'blue' ? "bg-blue-500/5" :
                  lang.color === 'amber' ? "bg-amber-500/5" :
                  lang.color === 'indigo' ? "bg-indigo-500/5" :
                  "bg-rose-500/5"
                )} />
                <Code2 className="w-32 h-32 text-muted/5 transition-all duration-700 group-hover:scale-110" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-bg border border-border rounded-2xl shadow-xl">
                  <p className={cn(
                    "text-xs font-mono mb-2",
                    lang.color === 'blue' ? "text-blue-500" :
                    lang.color === 'amber' ? "text-amber-500" :
                    lang.color === 'indigo' ? "text-indigo-500" :
                    "text-rose-500"
                  )}>// {lang.name} Logic</p>
                  <div className="h-1.5 w-3/4 bg-surface rounded mb-2 overflow-hidden">
                    <div className={cn(
                      "h-full w-3/4",
                      lang.color === 'blue' ? "bg-blue-500/20" :
                      lang.color === 'amber' ? "bg-amber-500/20" :
                      lang.color === 'indigo' ? "bg-indigo-500/20" :
                      "bg-rose-500/20"
                    )} />
                  </div>
                  <div className="h-1.5 w-1/2 bg-surface rounded overflow-hidden">
                    <div className={cn(
                      "h-full w-1/2",
                      lang.color === 'blue' ? "bg-blue-500/10" :
                      lang.color === 'amber' ? "bg-amber-500/10" :
                      lang.color === 'indigo' ? "bg-indigo-500/10" :
                      "bg-rose-500/10"
                    )} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Us Bento Grid - Refined */}
        <div id="about-us-bento" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-32 scroll-mt-24 px-4 md:px-0">
          <div className="col-span-2 bg-surface rounded-[32px] md:rounded-[40px] border border-border p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
              <Zap className="w-24 md:w-32 h-24 md:h-32 text-amber-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-ink">Built for Speed</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-lg">
                Our infrastructure is optimized for immediate execution. We use cloud containers that spin up in milliseconds, ensuring you spend more time writing code and less time waiting.
              </p>
              <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-600">Node v22</div>
                <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-600">Python 3.12</div>
                <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-purple-500/5 border border-purple-500/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-purple-600">Rust 1.78</div>
                <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-rose-600">Java 21</div>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-8">
            <div className="bg-surface rounded-[32px] md:rounded-[40px] border border-border p-6 md:p-8 flex flex-col justify-between group transition-colors hover:border-blue-500/30">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-600">
                <Globe className="w-5 md:w-6 h-5 md:h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-ink mb-1 text-blue-600">12+</div>
                <div className="text-[9px] md:text-[11px] font-bold text-muted uppercase tracking-widest">Global Regions</div>
              </div>
            </div>

            <div className="bg-surface rounded-[32px] md:rounded-[40px] border border-border p-6 md:p-8 flex flex-col justify-between group transition-colors hover:border-emerald-500/30">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600">
                <Shield className="w-5 md:w-6 h-5 md:h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-ink mb-1 text-emerald-600">256-bit</div>
                <div className="text-[9px] md:text-[11px] font-bold text-muted uppercase tracking-widest">Encryption</div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div id="documentation" className="mb-32 scroll-mt-24">
          <div className="bg-surface rounded-[40px] border border-border p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <BookOpen className="w-64 h-64 text-blue-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4 font-display text-ink">
                    <BookOpen className="w-10 h-10 text-blue-600" />
                    Documentation
                  </h2>
                  <p className="text-lg text-muted">A clear guide to help you get the most out of your workspace.</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-6 py-3 rounded-2xl bg-bg border border-border flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold uppercase tracking-widest text-ink">Core Features</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-ink">1. Language Support</h4>
                    <p className="text-muted leading-relaxed">
                      We support major languages including Python, JavaScript, Java, and C++. Each environment is pre-configured with the standard libraries needed to run your code immediately.
                    </p>
                  </div>
                  
                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <FolderOpen className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-ink">2. Project Management</h4>
                    <p className="text-muted leading-relaxed">
                      Manage your files through the integrated sidebar. Create, rename, or delete files to organize your logic. Our environment supports multi-file structures for more complex prototyping.
                    </p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-ink">3. Integrated Console</h4>
                    <p className="text-muted leading-relaxed">
                      See your results instantly in the terminal. We stream output directly from our secure backend, providing you with a responsive experience that mirrors a local terminal.
                    </p>
                  </div>
                  
                  <div className="group">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Keyboard className="w-6 h-6 text-rose-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-ink">4. Workflow Shortcuts</h4>
                    <p className="text-muted leading-relaxed">
                      Speed up your development with shortcuts. Use <kbd className="px-2 py-1 bg-bg border border-border rounded text-xs font-mono mx-1">Ctrl+Enter</kbd> to run your code and <kbd className="px-2 py-1 bg-bg border border-border rounded text-xs font-mono mx-1">Ctrl+S</kbd> to save progress manually.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20 p-10 rounded-[32px] bg-blue-500/5 border border-blue-500/10 shadow-sm">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="shrink-0 w-20 h-20 bg-surface border border-blue-500/20 rounded-3xl flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-ink">Privacy & Security</h4>
                    <p className="text-muted leading-relaxed">
                      Your code runs in a secure, isolated container. We prioritize your privacy and ensure that every execution environment is wiped clean after use, providing a fresh start every time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Conversion Section */}
        <div className="bg-surface rounded-[60px] p-12 md:p-24 border border-border relative overflow-hidden text-center group">
          <div className="absolute inset-0 bg-blue-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-600/20 group-hover:rotate-12 transition-transform duration-500">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-8 text-ink leading-tight">
              Focus on the code. <br className="hidden md:block" /> We'll handle the rest.
            </h3>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-12">
              Join the community of developers using LiveCompile for fast, reliable, and accessible programming. Start your next project in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => {
                  document.getElementById('ide-container')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-3 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                Open Editor
              </button>
              <button 
                onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-bg hover:bg-surface border border-border text-ink font-bold rounded-2xl transition-all active:scale-95 text-lg"
              >
                View Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SEOContent;
