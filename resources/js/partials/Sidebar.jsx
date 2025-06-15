import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Sidebar({ sidebarToggle, ApplicationLogoIcon, ApplicationLogoLight, ApplicationLogoDark }) {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <aside
                className={`${sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'} sidebar fixed left-0 top-0 z-[9999] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0`}>
                <div
                    className={`flex items-center ${sidebarToggle ? 'justify-center' : 'justify-between'} gap-2 pt-8 sidebar-header pb-7`}
                >
                    <Link href={route("dashboard")}>
                        <span className={`logo ${sidebarToggle ? 'hidden' : ''}`} >
                            <img className="dark:hidden" src={ApplicationLogoLight} alt="Logo" />
                            <img
                                className="hidden dark:block"
                                src={ApplicationLogoDark}
                                alt="Logo"
                            />
                        </span>

                        <img
                            className={`logo-icon ${sidebarToggle ? 'lg:block' : 'hidden'}`}
                            src={ApplicationLogoIcon}
                            alt="Logo" />
                    </Link>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
                    <nav>
                        <div>
                            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                                <span className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}>MENU</span>

                                <svg
                                    className={`mx-auto fill-current menu-group-icon ${sidebarToggle ? 'lg:block hidden' : 'hidden'}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                                        fill=""
                                    />
                                </svg>
                            </h3>

                            <ul className="flex flex-col gap-4 mb-6">
                                <li>
                                    <Link href={route("dashboard")} className={`menu-item group ${route().current() === "dashboard" && "menu-item-active"}`}>


                                        <svg
                                            className={route().current() === "dashboard" && "menu-item-icon-active"}
                                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z" fill=""></path>
                                        </svg>

                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Dashboard
                                        </span>

                                        <svg
                                            className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                </li>


                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "demoDropdown") {
                                                setSelected(null);
                                            } else {
                                                setSelected("demoDropdown");
                                            }
                                        }}
                                        href="#"
                                        className={`menu-item group ${selected === "demoDropdown" ? "menu-item-active" : "menu-item-inactive"}`}

                                    >
                                        <svg
                                            className={`${selected === "demoDropdown" ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M14 2.75C14 2.33579 14.3358 2 14.75 2C15.1642 2 15.5 2.33579 15.5 2.75V5.73291L17.75 5.73291H19C19.4142 5.73291 19.75 6.0687 19.75 6.48291C19.75 6.89712 19.4142 7.23291 19 7.23291H18.5L18.5 12.2329C18.5 15.5691 15.9866 18.3183 12.75 18.6901V21.25C12.75 21.6642 12.4142 22 12 22C11.5858 22 11.25 21.6642 11.25 21.25V18.6901C8.01342 18.3183 5.5 15.5691 5.5 12.2329L5.5 7.23291H5C4.58579 7.23291 4.25 6.89712 4.25 6.48291C4.25 6.0687 4.58579 5.73291 5 5.73291L6.25 5.73291L8.5 5.73291L8.5 2.75C8.5 2.33579 8.83579 2 9.25 2C9.66421 2 10 2.33579 10 2.75L10 5.73291L14 5.73291V2.75ZM7 7.23291L7 12.2329C7 14.9943 9.23858 17.2329 12 17.2329C14.7614 17.2329 17 14.9943 17 12.2329L17 7.23291L7 7.23291Z"
                                                fill=""
                                            />
                                        </svg>


                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Demo Dropdown
                                        </span>


                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${selected === "demoDropdown" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`overflow-hidden transform translate ${selected === "demoDropdown" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="menu-dropdown-item group menu-dropdown-item-inactive"

                                                >
                                                    DD1
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="menu-dropdown-item group menu-dropdown-item-inactive"

                                                >
                                                    DD2
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </li>



                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === "demoDropdown2") {
                                                setSelected(null);
                                            } else {
                                                setSelected("demoDropdown2");
                                            }
                                        }}
                                        href="#"
                                        className={`menu-item group ${selected === "demoDropdown2" ? "menu-item-active" : "menu-item-inactive"}`}

                                    >
                                        <svg
                                            className={`${selected === "demoDropdown2" ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M14 2.75C14 2.33579 14.3358 2 14.75 2C15.1642 2 15.5 2.33579 15.5 2.75V5.73291L17.75 5.73291H19C19.4142 5.73291 19.75 6.0687 19.75 6.48291C19.75 6.89712 19.4142 7.23291 19 7.23291H18.5L18.5 12.2329C18.5 15.5691 15.9866 18.3183 12.75 18.6901V21.25C12.75 21.6642 12.4142 22 12 22C11.5858 22 11.25 21.6642 11.25 21.25V18.6901C8.01342 18.3183 5.5 15.5691 5.5 12.2329L5.5 7.23291H5C4.58579 7.23291 4.25 6.89712 4.25 6.48291C4.25 6.0687 4.58579 5.73291 5 5.73291L6.25 5.73291L8.5 5.73291L8.5 2.75C8.5 2.33579 8.83579 2 9.25 2C9.66421 2 10 2.33579 10 2.75L10 5.73291L14 5.73291V2.75ZM7 7.23291L7 12.2329C7 14.9943 9.23858 17.2329 12 17.2329C14.7614 17.2329 17 14.9943 17 12.2329L17 7.23291L7 7.23291Z"
                                                fill=""
                                            />
                                        </svg>


                                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                                            Demo Dropdown 2
                                        </span>


                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${selected === "demoDropdown2" && " menu-item-arrow-active"} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`overflow-hidden transform translate ${selected === "demoDropdown2" ? "block" : "hidden"}`}
                                    >
                                        <ul
                                            className={`flex flex-col gap-1 mt-2 menu-dropdown pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    className="menu-dropdown-item group menu-dropdown-item-inactive"

                                                >
                                                    DD1
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="menu-dropdown-item group menu-dropdown-item-inactive"

                                                >
                                                    DD2
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </li>

                            </ul >
                        </div >
                    </nav >
                </div >

            </aside >

        </>
    );
};


