import { Search, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';

import { Button } from '../ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card px-8 flex items-center justify-between">
      <div className="flex items-center gap-8 flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Files</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search..." 
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          Docs
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          Quick action
        </Button>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm">U</span>
        </div>
      </div>
    </header>
  );
}
