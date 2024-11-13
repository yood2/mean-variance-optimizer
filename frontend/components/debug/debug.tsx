import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Debug() {
    const { portfolio, tickers } = usePortfolio();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 lg:flex">
                    Debug
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Current State</DialogTitle>
                    <DialogDescription>
                        <p>
                            Tickers:
                            <pre>{JSON.stringify(tickers, null, 2)}</pre>
                            <br />
                        </p>
                        <p>
                            Portfolio:
                            <pre>{JSON.stringify(portfolio, null, 2)}</pre>
                        </p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
