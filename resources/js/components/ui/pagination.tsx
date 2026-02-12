import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export default function Pagination({ links, className }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <div className={cn("flex flex-wrap justify-center gap-1", className)}>
            {links.map((link, key) => {
                // Parse label to handle HTML entities like &laquo;
                const label = link.label
                    .replace('&laquo; Previous', '')
                    .replace('Next &raquo;', '')
                    .trim();

                const isPrevious = link.label.includes('Previous');
                const isNext = link.label.includes('Next');

                if (link.url === null) {
                    return (
                        <Button
                            key={key}
                            variant="outline"
                            size="icon"
                            disabled
                            className="h-8 w-8 opacity-50"
                        >
                            {isPrevious ? <ChevronLeft className="h-4 w-4" /> :
                                isNext ? <ChevronRight className="h-4 w-4" /> :
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                        </Button>
                    );
                }

                return (
                    <Link key={key} href={link.url}>
                        <Button
                            variant={link.active ? "default" : "outline"}
                            size={isPrevious || isNext ? "icon" : "sm"}
                            className={cn("h-8 min-w-[2rem]", isPrevious || isNext ? "w-8 p-0" : "px-3")}
                        >
                            {isPrevious ? <ChevronLeft className="h-4 w-4" /> :
                                isNext ? <ChevronRight className="h-4 w-4" /> :
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
}
