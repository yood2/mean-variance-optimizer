import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usePortfolio } from '@/context/PortfolioContext';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function AddStock() {
    return (
        <Dialog>
            <DialogTrigger>Add Stock</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Stock</DialogTitle>
                    <DialogDescription>
                        <AddStockForm />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function AddStockForm() {
    const { portfolio, addStock } = usePortfolio();
    const tickers = Object.keys(portfolio);

    const formSchema = z.object({
        ticker: z
            .string()
            .min(1, 'Ticker is required')
            .refine((ticker) => !tickers.includes(ticker), {
                message: 'Ticker already exists in portfolio',
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ticker: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        addStock(values.ticker);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="ticker"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ticker</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
