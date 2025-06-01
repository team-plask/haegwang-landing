import Link from 'next/link';
import Image from 'next/image';

const defaultMembers = [
    {
        name: 'Méschac Irung',
        role: 'Creator',
        avatar: 'https://avatars.githubusercontent.com/u/47919550?v=4',
    },
    {
        name: 'Théo Balick',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/68236786?v=4',
    },
    {
        name: 'Glodie Lukose',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/99137927?v=4',
    },
    {
        name: 'Bernard Ngandu',
        role: 'Backend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/31113941?v=4',
    },
]

interface TeamMember {
    name: string;
    role: string | null;
    avatar: string | null;
    slug?: string;
}

export default function Team({ members: teamData }: { members: TeamMember[] }) {
    const members = teamData || defaultMembers;

    const groupedMembers = members.reduce((acc, member) => {
        const role = member.role || 'Unassigned'; // Group members with null/undefined roles under 'Unassigned'
        if (!acc[role]) {
            acc[role] = [];
        }
        acc[role].push(member);
        return acc;
    }, {} as Record<string, TeamMember[]>);

    return (
        <>
            {Object.entries(groupedMembers).map(([role, roleMembers]) => (
                <div key={role} className="pb-4 md:pb-8">
                    <h3 className="mb-2 md:mb-4 text-lg md:text-xl font-semibold text-muted-foreground capitalize">{role}</h3>
                    <div className="grid grid-cols-2 gap-4 border-t py-6 md:py-12 md:grid-cols-6">
                        {roleMembers.map((member, index) => {
                            const content = (
                                <div className="flex flex-col items-center group cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-brand/5">
                                    <div className="relative size-20 md:size-28  p-0.5 overflow-hidden">
                                        <div className="relative w-full h-full overflow-hidden">
                                            <img 
                                                className="absolute inset-0 w-full h-full object-cover object-top" 
                                                src={member.avatar as string} 
                                                alt={member.name} 
                                                height="460" 
                                                width="460" 
                                                loading="lazy" 
                                            />
                                        </div>
                                        {/* 호버 시 로고 표시 */}
                                        <div className="absolute top-1 left-1 md:top-2 md:left-2 opacity-0 group-hover:opacity-100 transition-opacity delay-[100ms] duration-300">
                                            <Image
                                                src="/logo/logo_symbol.png"
                                                alt=""
                                                width={30}
                                                height={30}
                                                className="md:w-8 md:h-8 opacity-30"
                                            />
                                        </div>
                                    </div>
                                    <span className="mt-2 md:mt-4 block text-sm md:text-lg group-hover:text-brand transition-colors duration-300">{member.name}</span>
                                    <span className="text-muted-foreground block text-xs md:text-sm">{member.role}</span>
                                </div>
                            );

                            return member.slug ? (
                                <Link key={index} href={`/lawyers/${member.slug}`}>
                                    {content}
                                </Link>
                            ) : (
                                <div key={index}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </>
    );
}
