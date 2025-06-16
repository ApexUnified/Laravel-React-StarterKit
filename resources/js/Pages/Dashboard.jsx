import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Overlay from '@/partials/Overlay';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Card
                Content={
                    <>

                        <div className="grid grid-cols-1 gap-5 my-10 sm:grid-cols-2 md:grid-cols-4">
                            {/* First 8 cards - 2 rows, 4 per row */}
                            <Card
                                Content={""}
                                CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                            />
                            <Card

                                Content={""}
                                CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                            />
                            <Card
                                Content={""}
                                CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                            />

                            <Card
                                Content={""}
                                CustomCss="w-full p-3 min-h-[200px] bg-gray-900/10 dark:bg-gray-800"
                            />

                            {/* Row 3: first card - takes 1/3 (col-span-1 on md:4-cols), second card - takes 2/3 (col-span-3) */}

                            <div className="md:col-span-2">
                                <Card
                                    Content={""}
                                    CustomCss="w-full p-3 min-h-[300px] bg-gray-900/10 dark:bg-gray-800"
                                />
                            </div>


                            <div className="md:col-span-2">
                                <Card
                                    Content={""}
                                    CustomCss="w-full p-3 min-h-[300px] bg-gray-900/10 dark:bg-gray-800"
                                />
                            </div>



                            <div className="md:col-span-4">
                                <Card
                                    Content={""}
                                    CustomCss="w-full p-3 min-h-[500px] bg-gray-900/10 dark:bg-gray-800"
                                />
                            </div>
                        </div>







                    </>
                }
            />
        </AuthenticatedLayout>
    );
}
