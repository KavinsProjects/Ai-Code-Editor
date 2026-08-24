import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/dashboard-sidebar";
import { getAllPlayGroundDataForUsers } from ".";

export default async function DashboardLayout({
    children

}: {

    children: React.ReactNode
}) {

    const playgroundData = await getAllPlayGroundDataForUsers();

    const technologyInconMap: Record<string, string> = {
        REACT : "Zap",
        NEXTJS : "Lighbulb",
        HONO : "FlameIncon",
        EXPRESSJS : "Database",
        VUE : "compass",
        ANGULAR : "Terminal"
    }

    const formattedPlaygroundData = (playgroundData ?? []).map((itm)=>({
        id:itm.id,
        name:itm.title,
        starred:false,
        icon:technologyInconMap[itm.template] || ""


    }));

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full overflow-x-hidden">
                <DashboardSidebar initialPlaygroundData={formattedPlaygroundData}/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
