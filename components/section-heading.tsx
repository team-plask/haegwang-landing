import Image from "next/image";

export const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <div className="container mx-auto max-w-7xl py-1 md:py-3">
            <h2 className="relative text-brand text-xl md:text-3xl tracking-tighter lg:max-w-xl font-bold text-left w-fit">
                {title}
                <Image 
                    src="/logo/logo_symbol.png" 
                    alt="Logo Symbol"
                    className="absolute top-0 right-0 h-3 w-3 md:h-4 md:w-4 -mt-3 -mr-5" // Adjust size and position as needed
                />
            </h2>
            <p className="text-muted-foreground text-left text-md font-light md:text-lg py-1 md:py-2">{subtitle}</p>
        </div>
    );
};