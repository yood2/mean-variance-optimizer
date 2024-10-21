import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usePortfolio } from '@/context/PortfolioContext';

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
import { Stock } from '@/types/schema';

export default function AddStock() {
    const { portfolio, addStock } = usePortfolio();
    const tickers = Object.keys(portfolio);

    const formSchema = z.object({
        ticker: z
            .string()
            .min(1, 'Ticker is required')
            .refine((ticker) => !tickers.includes(ticker), {
                message: 'Ticker already exists in portfolio',
            }),
        quantity: z.string(),
        buyPrice: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ticker: '',
            quantity: '0',
            buyPrice: '0',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newStock: Stock = {
            ticker: values.ticker,
            quantity: parseInt(values.quantity),
            buyPrice: parseFloat(values.buyPrice),
        };
        addStock(newStock);
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
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    step="any"
                                    min={0}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="buyPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Buy Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    step="any"
                                    min={0}
                                />
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
