"use client"

import { useAppStore } from "@/store/use-app-store"
import { useState } from "react"
import { ArrowLeft, MessageCircle, MessageSquare, Link as LinkIcon, Heart, Play, Save, Lock, GripVertical, Trash2, Plus } from "lucide-react"
import Link from "next/link"

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const { isInstagramConnected } = useAppStore()
  const [activeTab, setActiveTab] = useState<"comment" | "dm" | "resources">("comment")
  
  const [commentToggle, setCommentToggle] = useState(false)
  const [dmToggle, setDmToggle] = useState(false)

  const [resources, setResources] = useState([
    { id: 1, title: "Free AI Masterclass", url: "https://example.com/masterclass", active: true }
  ])

  return (
    <div className="space-y-6 max-h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/media" className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Automation Settings</h2>
          <p className="text-muted-foreground text-sm mt-1">Reel {params.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANE: Reel Preview */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
           <img 
              src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop&q=80" 
              alt="Reel preview" 
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20"
            />
            <div className="relative aspect-[9/16] w-full max-w-[280px] bg-black rounded-xl overflow-hidden border-4 border-border shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop&q=80" 
                alt="Reel thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                 <p className="text-sm font-medium line-clamp-2">Drop a 🔥 if you agree! Comment "course" and I'll DM you the link.</p>
                 <div className="flex items-center gap-4 mt-3 text-xs">
                    <span className="flex items-center gap-1"><Play className="w-4 h-4 fill-white" /> 24.5k</span>
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-white" /> 1.2k</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4 fill-white" /> 342</span>
                 </div>
              </div>
            </div>
        </div>

        {/* RIGHT PANE: Automation Tabs */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl flex flex-col overflow-hidden relative">
          
          {/* Tabs header */}
          <div className="flex items-center border-b border-border bg-background/50">
            <button 
              onClick={() => setActiveTab("comment")}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === "comment" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
            >
              <MessageCircle className="w-4 h-4" /> Comment Reply
            </button>
            <button 
              onClick={() => setActiveTab("dm")}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === "dm" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
            >
              <MessageSquare className="w-4 h-4" /> Direct Message
            </button>
            <button 
              onClick={() => setActiveTab("resources")}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${activeTab === "resources" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}
            >
              <LinkIcon className="w-4 h-4" /> Super Profile
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 relative">
             {/* If not connected Lock Overlay */}
            {!isInstagramConnected && (
              <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Connect Instagram to activate automation</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mb-6">You can view these settings, but to save and activate them you must connect your account.</p>
                <Link href="/dashboard/settings" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                  Connect Now
                </Link>
              </div>
            )}

            <div className={`space-y-6 ${!isInstagramConnected ? 'opacity-30 pointer-events-none' : ''}`}>
              
              {/* TAB: COMMENT */}
              {activeTab === "comment" && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-accent/20">
                    <div>
                      <h4 className="font-semibold">Enable Comment Automation</h4>
                      <p className="text-sm text-muted-foreground">Automatically reply to comments on this post.</p>
                    </div>
                    <button 
                      onClick={() => setCommentToggle(!commentToggle)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${commentToggle ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${commentToggle ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trigger Keywords</label>
                      <input type="text" placeholder="course, link, info (use * for all comments)" defaultValue="course, link" className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reply Content</label>
                      <textarea placeholder="Thanks {username}! Sent you a DM." defaultValue="Thanks {username}! Sent you a DM." className="w-full h-24 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-card border border-border shadow-inner">
                      <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Live Preview</h5>
                      <div className="flex gap-3 text-sm">
                         <div className="w-8 h-8 rounded-full bg-accent flex shrink-0" />
                         <div>
                            <span className="font-medium">user123</span> course pls!
                            <div className="mt-2 flex gap-3">
                               <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0" />
                               <div className="bg-accent p-2 rounded-2xl rounded-tl-sm">Thanks user123! Sent you a DM.</div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DM */}
              {activeTab === "dm" && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-accent/20">
                    <div>
                      <h4 className="font-semibold">Enable DM Automation</h4>
                      <p className="text-sm text-muted-foreground">Send a direct message triggered by the comment.</p>
                    </div>
                    <button 
                      onClick={() => setDmToggle(!dmToggle)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dmToggle ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${dmToggle ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-4">
                     <div className="space-y-2">
                      <label className="text-sm font-medium">Direct Message Content</label>
                      <textarea placeholder="Hey {username}! Here is your link..." defaultValue="Hey {username}! As promised, here is the link to the course: https://example.com/course" className="w-full h-32 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" />
                      <p className="text-xs text-muted-foreground">Personalize using {'{username}'} and attach your Super Profile resources below.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-card border border-border shadow-inner">
                      <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">DM Preview</h5>
                      <div className="flex items-end gap-2 justify-end text-sm">
                         <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                            Hey user123! As promised, here is the link to the course: https://example.com/course
                         </div>
                         <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: RESOURCES (Super Profile) */}
              {activeTab === "resources" && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">Super Profile Resources</h4>
                    <p className="text-sm text-muted-foreground pl-0">Attach structured links that display elegantly in Instagram DMs.</p>
                  </div>

                  <div className="space-y-3">
                    {resources.map((res, i) => (
                      <div key={res.id} className="group flex items-center gap-3 p-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
                        <div className="flex-1 space-y-1">
                          <input type="text" defaultValue={res.title} className="w-full bg-transparent font-medium text-sm outline-none border-b border-transparent focus:border-border" />
                          <input type="text" defaultValue={res.url} className="w-full bg-transparent text-xs text-muted-foreground outline-none border-b border-transparent focus:border-border" />
                        </div>
                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <button className="w-full py-4 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent/20 transition-all">
                      <Plus className="w-4 h-4" /> Add New Resource
                    </button>
                  </div>
                  
                  <div className="flex justify-start pt-4">
                      <div className="p-4 rounded-xl border border-border bg-card w-64 shadow-xl">
                          <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider text-center">DM Render Mockup</h5>
                          <div className="space-y-2">
                              {resources.map(r => (
                                  <div key={r.id} className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg text-center text-sm font-medium shadow-sm">
                                      {r.title}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-border flex justify-end bg-card">
              <button disabled={!isInstagramConnected} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-4 h-4" /> Save Automations
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}
