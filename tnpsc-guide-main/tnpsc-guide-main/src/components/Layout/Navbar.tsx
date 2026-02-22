import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  GraduationCap,
  Menu,
  Search,
  Bell,
  User,
  Home,
  BookOpen,
  FileText,
  Brain,
  Bot,
  Users,
  BookMarked,
  LogOut,
  ZoomIn,
  ZoomOut,
  Bookmark,
  Shield
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/api/authService';
import { MONGODB_API_URL } from '@/services/api/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';

const menuItems = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Wizard AI', href: '/ai-chat', icon: Bot, highlight: true },
  { name: 'Syllabus', href: '/syllabus', icon: BookOpen },
  { name: 'திருக்குறள்', href: '/tirukural', icon: BookMarked },
  { name: 'Tamil Scholars', href: '/poets', icon: Users },
  { name: 'Previous Papers', href: '/previous-papers', icon: FileText },
  { name: 'School Books', href: '/books/standards', icon: GraduationCap },
  { name: 'Study Notes', href: '/notes', icon: FileText },
  { name: 'Quiz', href: '/quiz', icon: Brain, highlight: true },
];

const searchSuggestions = [
  { label: 'Syllabus', href: '/syllabus' },
  { label: 'Previous Year Questions', href: '/previous-papers' },
  { label: 'Books', href: '/books/standards' },
  { label: 'திருக்குறள்', href: '/tirukural' },
  { label: 'Study Notes', href: '/notes' },
  { label: 'Tamil Scholars', href: '/poets' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Wizard AI', href: '/ai-chat' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to TNPSC Wizard!', read: false },
    { id: 2, message: 'New syllabus updated!', read: false },
  ]);
  const [bookmarks, setBookmarks] = useState<{ id: string, text: string, createdAt: string }[]>([]);
  const [newBookmark, setNewBookmark] = useState('');
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Fetch bookmarks from MongoDB on mount or user change
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const userId = authService.getUserId();
        const response = await fetch(`${MONGODB_API_URL}/api/user-content/bookmarks`, {
          headers: userId ? { 'user-id': userId } : {}
        });
        const data = await response.json();
        if (data.success) {
          setBookmarks(data.data.map((b: any) => ({
            id: b._id,
            text: b.title || b.text || 'Untitled Bookmark',
            createdAt: b.createdAt
          })));
        }
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
      }
    };
    fetchBookmarks();
  }, [user]);

  // Bookmark functions
  const handleAddBookmark = async () => {
    if (!newBookmark.trim() || !user) return;

    try {
      const userId = authService.getUserId();
      const response = await fetch(`${MONGODB_API_URL}/api/user-content/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId || ''
        },
        body: JSON.stringify({
          documentId: '65d0f0f0f0f0f0f0f0f0f0f0', // Placeholder or real ID if applicable
          text: newBookmark.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        setBookmarks(prev => [{
          id: data.data._id,
          text: newBookmark.trim(),
          createdAt: new Date().toISOString()
        }, ...prev]);
        setNewBookmark('');
        toast({
          title: "Bookmark added",
          description: "Your note has been saved to your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save bookmark",
        variant: "destructive"
      });
    }
  };

  const handleRemoveBookmark = async (id: string) => {
    try {
      const userId = authService.getUserId();
      const response = await fetch(`${MONGODB_API_URL}/api/user-content/bookmarks/${id}`, {
        method: 'DELETE',
        headers: { 'user-id': userId || '' }
      });

      const data = await response.json();
      if (data.success) {
        setBookmarks(prev => prev.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  // Zoom functions
  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 10, 150);
    setZoomLevel(newZoom);
    document.body.style.zoom = `${newZoom}%`;
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 10, 70);
    setZoomLevel(newZoom);
    document.body.style.zoom = `${newZoom}%`;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const match = searchSuggestions.find(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      navigate(match.href);
      setSearchQuery('');
      setShowSuggestions(false);
    } else {
      toast({
        title: "No results found",
        description: `No matching content for "${searchQuery}"`,
      });
    }
  };

  const handleSuggestionClick = (href: string) => {
    navigate(href);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-primary text-primary-foreground sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-base md:text-xl font-bold whitespace-nowrap">TNPSC Wizard</span>
          </Link>

          {/* Menu Button - Left Side */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex">
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 md:w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.highlight
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-accent'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Bar - Desktop - Reduced to 24% width (60% of 40%) */}
          <div ref={searchRef} className="hidden md:flex items-center w-[24%] max-w-xs mx-2 lg:mx-4 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pl-7 md:pl-10 h-8 md:h-10 text-xs md:text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
              </div>
            </form>

            {/* Search Suggestions Dropdown - Shows on focus */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant z-50 overflow-hidden">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSuggestionClick(item.href)}
                    className="w-full flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 hover:bg-muted transition-colors text-left text-foreground"
                  >
                    <Search className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zoom Controls - Desktop */}
          <div className="hidden md:flex items-center gap-1 border border-primary-foreground/30 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground hover:bg-primary-foreground/10"
              title="Zoom Out"
            >
              <ZoomOut className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <span className="text-xs font-medium min-w-[3rem] text-center">{zoomLevel}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="h-7 w-7 md:h-8 md:w-8 text-primary-foreground hover:bg-primary-foreground/10"
              title="Zoom In"
            >
              <ZoomIn className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 p-0">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-border last:border-0 ${!notif.read ? 'bg-primary/5' : ''
                          }`}
                      >
                        <p className="text-sm">{notif.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No notifications
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Bookmarks */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
                  <Bookmark className="h-5 w-5" />
                  {bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                      {bookmarks.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="p-3 border-b border-border">
                  <h4 className="font-semibold text-sm mb-2">My Bookmarks</h4>
                  <div className="flex gap-2">
                    <Input
                      value={newBookmark}
                      onChange={(e) => setNewBookmark(e.target.value)}
                      placeholder="Save a hint or query..."
                      className="h-8 text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddBookmark()}
                    />
                    <Button size="sm" onClick={handleAddBookmark} className="h-8">
                      Add
                    </Button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="p-3 border-b border-border last:border-0 flex items-start justify-between gap-2"
                      >
                        <p className="text-sm flex-1">{bookmark.text}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveBookmark(bookmark.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No bookmarks yet. Save your hints and queries here!
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Admin Panel - Only visible to admins */}
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10" title="Admin Panel">
                  <Shield className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2 font-semibold border-b">
                  {user?.email || 'User'}
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/home" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Notifications - Mobile */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-0">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b border-border last:border-0 ${!notif.read ? 'bg-primary/5' : ''
                        }`}
                    >
                      <p className="text-sm">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${item.highlight
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'hover:bg-accent'
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* Admin Panel - Mobile */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg transition-colors bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
                    >
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}

                  <div className="pt-4 border-t">
                    <div className="p-3 text-sm text-muted-foreground mb-2">
                      {user?.email || 'User'}
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};