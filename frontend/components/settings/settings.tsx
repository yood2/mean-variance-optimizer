import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarCheckboxItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar';
import AddStock from './add-stock';

export default function Settings() {
    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onSelect={(e) => e.preventDefault()}>
                            <AddStock />
                            <MenubarShortcut>⌘N</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Remove Stock <MenubarShortcut>⌘R</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                        <MenubarCheckboxItem checked>
                            Show Table
                        </MenubarCheckboxItem>
                        <MenubarSeparator />
                        <MenubarCheckboxItem checked>
                            Show Chart
                        </MenubarCheckboxItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>
    );
}
