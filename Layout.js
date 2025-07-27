import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Calendar, 
  CheckSquare, 
  Settings, 
  Heart, 
  Home,
  Moon,
  Sun
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Calendar",
    url: createPageUrl("Calendar"),
    icon: Calendar,
  },
  {
    title: "Tasks",
    url: createPageUrl("Tasks"),
    icon: CheckSquare,
  },
  {
    title: "Mindfulness",
    url: createPageUrl("Mindfulness"),
    icon: Heart,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(false);

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --zen-primary: ${isDark ? '#6366f1' : '#4f46e5'};
            --zen-primary-light: ${isDark ? '#818cf8' : '#6366f1'};
            --zen-bg: ${isDark ? '#0f172a' : '#fefefe'};
            --zen-surface: ${isDark ? '#1e293b' : '#ffffff'};
            --zen-border: ${isDark ? '#334155' : '#e2e8f0'};
            --zen-text: ${isDark ? '#f1f5f9' : '#1e293b'};
            --zen-text-muted: ${isDark ? '#94a3b8' : '#64748b'};
            --zen-accent: #10b981;
            --zen-warning: #f59e0b;
            --zen-gradient: linear-gradient(135deg, var(--zen-primary) 0%, var(--zen-primary-light) 100%);
          }
          
          .zen-gradient {
            background: var(--zen-gradient);
          }
          
          .zen-glass {
            background: rgba(255, 255, 255, ${isDark ? '0.05' : '0.7'});
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, ${isDark ? '0.1' : '0.2'});
          }
          
          .zen-shadow {
            box-shadow: 0 8px 32px rgba(0, 0, 0, ${isDark ? '0.3' : '0.1'});
          }

          body {
            background: var(--zen-bg);
            color: var(--zen-text);
            transition: all 0.3s ease;
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full" style={{background: 'var(--zen-bg)'}}>
        <Sidebar className="border-r" style={{borderColor: 'var(--zen-border)', background: 'var(--zen-surface)'}}>
          <SidebarHeader className="p-6" style={{borderColor: 'var(--zen-border)'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 zen-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl" style={{color: 'var(--zen-text)'}}>ZenScheduler</h2>
                <p className="text-sm" style={{color: 'var(--zen-text-muted)'}}>Mindful time management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`rounded-xl transition-all duration-200 ${
                          location.pathname === item.url 
                            ? 'zen-gradient text-white shadow-lg' 
                            : 'hover:bg-opacity-10'
                        }`}
                        style={{
                          backgroundColor: location.pathname === item.url ? undefined : 'transparent',
                          color: location.pathname === item.url ? 'white' : 'var(--zen-text)'
                        }}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4" style={{borderColor: 'var(--zen-border)'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">U</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{color: 'var(--zen-text)'}}>User</p>
                  <p className="text-xs truncate" style={{color: 'var(--zen-text-muted)'}}>Stay mindful</p>
                </div>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg transition-colors"
                style={{color: 'var(--zen-text-muted)'}}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/70 backdrop-blur-lg border-b px-6 py-4 md:hidden" style={{borderColor: 'var(--zen-border)', background: 'var(--zen-surface)'}}>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold" style={{color: 'var(--zen-text)'}}>ZenScheduler</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}