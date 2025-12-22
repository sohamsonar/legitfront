import { Home, File, Upload, Settings } from 'lucide-react';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Files', icon: File, href: '#' },
  { name: 'Upload', icon: Upload, href: '#', active: true },
  { name: 'Settings', icon: Settings, href: '#' },
];

export function Sidebar() {
  return (
   <div className="w-64 bg-card border-r border-border flex flex-col ml-4">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <span>YA</span>
          </div>
          <div>
            <h2 className="text-foreground">Your App</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={item.active ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3"
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          Help & feedback
        </Button>
      </div>
    </div>
  );
}
