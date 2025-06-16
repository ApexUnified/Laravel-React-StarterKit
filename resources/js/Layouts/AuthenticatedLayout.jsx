import Header from '@/partials/Header';
import Overlay from '@/partials/Overlay';
import Preloader from '@/partials/Preloader';
import Sidebar from '@/partials/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import flatpickr from "flatpickr";
import ApplicationLogoIcon from 'asset/assets/images/logo/Favicon.png';
import ApplicationLogoLight from 'asset/assets/images/logo/SystemLogoLight.png';
import ApplicationLogoDark from 'asset/assets/images/logo/SystemLogo_ForGuest.png';
import Toast from '@/Components/Toast';
export default function AuthenticatedLayout({ children }) {


    useEffect(() => {
        // Init Flatpicker
        flatpickr(".datepicker", {
            mode: "range",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
            prevArrow:
                '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.25 6L9 12.25L15.25 18.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            nextArrow:
                '<svg class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.75 19L15 12.75L8.75 6.5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            onReady: (selectedDates, dateStr, instance) => {
                // eslint-disable-next-line no-param-reassign
                instance.element.value = dateStr.replace("to", "-");
                const customClass = instance.element.getAttribute("data-class");
                instance.calendarContainer.classList.add(customClass);
            },
            onChange: (selectedDates, dateStr, instance) => {
                // eslint-disable-next-line no-param-reassign
                instance.element.value = dateStr.replace("to", "-");
            },
        });



    }, []);

    const user = usePage().props.auth.user;
    const { flash } = usePage().props;
    const [loaded, setLoaded] = useState(true);
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [darkMode, setDarkMode] = useState(false);


    return (
        <>

            <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-gray-900">
                <Preloader loaded={loaded} setLoaded={setLoaded} />



                <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} ApplicationLogoIcon={ApplicationLogoIcon} ApplicationLogoLight={ApplicationLogoLight} ApplicationLogoDark={ApplicationLogoDark} />



                <div
                    className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto"
                >
                    <Overlay sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />



                    <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} darkMode={darkMode} setDarkMode={setDarkMode} ApplicationLogoIcon={ApplicationLogoIcon} ApplicationLogoLight={ApplicationLogoLight} ApplicationLogoDark={ApplicationLogoDark} user={user} />



                    <Toast
                        flash={flash}
                    />



                    <main>
                        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                            {children}
                        </div>
                    </main>

                </div>

            </div>

        </>
    );
}
