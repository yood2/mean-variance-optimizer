import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import AddStock from './add-stock';

export function PopoverButton() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Add Stock</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <AddStock />
            </PopoverContent>
        </Popover>
    );
}
