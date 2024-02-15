
export type menuType = {
    name: string;
    href: string;
    trad: string;
};

export function NavbarMenu(): menuType[] {
    return [
        {
            name: "Create",
            href: "/createQr",
            trad: "saved.add"
        },
        {
            name: "MyQr",
            href: "/mylist",
            trad: "saved.title"
        },
        {
            name: "ScanQr",
            href: "/scanqr",
            trad: "scan"
        },
    ];
}
