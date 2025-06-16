import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BreadCrumb from '@/partials/BreadCrumb'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function index({ categories }) {

    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        category_ids: [],
    });


    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        category_id: null,
    })



    // Searching Logic
    const [search, setSearch] = useState(props.search ?? "");
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [BulkActionDropdown, setBulkActionDropdown] = useState(false);
    const [openBulkActionDropdownOptions, setOpenBulkActionDropdownOptions] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [DeleteBulkSelectedProcessing, setDeleteBulkSelectedProcessing] = useState(false);
    const [DeleteSelectedBuilkConfirmationModal, setDeleteSelectedBuilkConfirmationModal] = useState(false);


    const [DeleteSingleConfirmationModal, setDeleteSingleConfirmationModal] = useState(false);
    const [DeleteSingleProcessing, setDeleteSingleProcessing] = useState(false);

    const dropdownRefs = useRef({});
    const searchInputRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
                (ref) => ref && ref.contains(event.target)
            );

            if (!isClickInsideAnyDropdown) {
                setOpenDropdownId(null);
                setOpenBulkActionDropdownOptions(false);
            }
        };

        document.addEventListener('click', handleClickOutside);


        if (search !== "") {
            searchInputRef.current.focus();
        }

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (selectedIds.length === 0) {
            setBulkActionDropdown(false);
            setBulkSelectedIds("category_ids", []);
            setSingleSelectedId("category_id", null);
        }
        else {
            setBulkActionDropdown(true)
            setBulkSelectedIds("category_ids", selectedIds);
            setSingleSelectedId("category_id", selectedIds[0]);
        };

    }, [selectedIds]);


    const handleSelectAll = () => {
        if (selectedIds.length === categories.data.length) setSelectedIds([]);
        else setSelectedIds(categories.data.map(item => item.id));
    }
    const handleSelect = (id) => {
        if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(item => item !== id));
        else setSelectedIds([...selectedIds, id]);
    }

    const SingleDeleteMethod = () => {
        setDeleteSingleProcessing(true);
        SingleDelete(route("category.destroy", SingleSelectedId["category_id"]), {
            onSuccess: () => {
                setDeleteSingleProcessing(false);
                setDeleteSingleConfirmationModal(false);
                resetSingleSelectedId("category_id");
            },
            onError: () => {
                setDeleteSingleProcessing(false);
            }
        })
    }

    const deleteSelectedBulkMethod = () => {
        setDeleteBulkSelectedProcessing(true);

        BulkDelete(route("category.deleteBySelectetion"), {
            onSuccess: () => {
                setDeleteSelectedBuilkConfirmationModal(false);
                setDeleteBulkSelectedProcessing(false);
                setSelectedIds([]);
                resetBulkSelectedIds("category_ids");
            },

            onError: () => {
                setDeleteBulkSelectedProcessing(false);
            }
        });
    }

    const performSearch = useCallback(
        debounce((value) => {
            router.get(route("category.index", { search: value }, { preserveState: true, preserveScroll: true }));
        }, 500),
        []
    );


    const handlePagination = (url) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };


    return (
        <>
            <AuthenticatedLayout>
                <Head title="Category" />

                <BreadCrumb
                    header={"Category"}
                    parent={"Dashboard"}
                    parent_link={route("dashboard")}
                    child={"Category"}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={"Create Category"}
                                    URL={route("category.create")}
                                    Icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                    }
                                />
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">


                                <div className="flex flex-col gap-2 px-5 mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">


                                    <div ref={dropdownRefs.current["00000"]}>

                                        {BulkActionDropdown && (
                                            <>

                                                <div className='p-3 text-white cursor-pointer '
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenBulkActionDropdownOptions(!openBulkActionDropdownOptions)
                                                        setOpenDropdownId("00000");
                                                    }}
                                                >
                                                    <p className="text-lg font-medium text-gray-900 dark:text-white"
                                                    >...</p>
                                                </div>

                                                {openBulkActionDropdownOptions &&
                                                    (
                                                        <>

                                                            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
                                                                    <li>
                                                                        <button onClick={
                                                                            () => {
                                                                                setDeleteSelectedBuilkConfirmationModal(true);
                                                                            }
                                                                        } className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Delete


                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-2 size-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                            </svg>

                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>


                                                        </>
                                                    )}

                                            </>
                                        )}


                                    </div>



                                    <div className="flex gap-3 sm:flex-row sm:items-center">
                                        <form>
                                            <div className="relative">
                                                <span className="absolute -translate-y-1/2 pointer-events-none top-1/2 left-4">
                                                    <svg className="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z" fill=""></path>
                                                    </svg>
                                                </span>
                                                <input type="search"
                                                    ref={searchInputRef}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setSearch(value);
                                                        performSearch(value);
                                                    }} placeholder="Search..."
                                                    value={search}
                                                    className="dark:bg-dark-900 shadow-theme-xs focus:border-blue-300 focus:ring-blue-500/10 dark:focus:border-blue-800 h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="relative z-0 px-5 sm:px-6">
                                    <div className="overflow-x-auto custom-scrollbar">
                                        <div className="relative ">

                                            <table className="min-w-full  min-h-[200px] ">
                                                <thead className="py-3 border-gray-100 border-y dark:border-gray-800">
                                                    <tr>
                                                        <th className="py-3 pr-5 font-normal whitespace-nowrap sm:pr-6">
                                                            <div className="flex items-center me-4">
                                                                <input onChange={() => handleSelectAll()} type="checkbox" value=""
                                                                    className="w-6 h-6 mx-2 text-blue-600 rounded-lg cursor-pointer border-slate-300 bg-slate-50 focus:ring-blue-500 dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                    checked={(selectedIds.length === categories.data.length && categories.data.length !== 0)}

                                                                />

                                                            </div>
                                                        </th>

                                                        <th className="py-3 pr-5 font-normal whitespace-nowrap sm:pr-6">
                                                            <div className="flex items-center">
                                                                <p className="text-gray-500 text-theme-sm dark:text-gray-400">Category Name</p>
                                                            </div>
                                                        </th>

                                                        <th className="px-5 py-3 font-normal whitespace-nowrap sm:px-6">
                                                            <div className="flex items-center">
                                                                <p className="text-gray-500 text-theme-sm dark:text-gray-400">Created At</p>
                                                            </div>
                                                        </th>


                                                        <th className="px-5 py-3 font-normal whitespace-nowrap sm:px-6">
                                                            <div className="flex items-center">
                                                                <p className="text-gray-500 text-theme-sm dark:text-gray-400">Action</p>
                                                            </div>
                                                        </th>
                                                    </tr></thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                    {categories.data.map((category, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="py-3 pr-5 whitespace-nowrap sm:pr-5">
                                                                    <div className="flex items-center col-span-3">
                                                                        <div className="flex items-center me-4">
                                                                            <input type="checkbox" value={category.id}
                                                                                className="w-6 h-6 mx-2 text-blue-600 rounded-lg cursor-pointer singleSelect border-slate-300 bg-slate-50 focus:ring-blue-500 dark:focus:ring-white dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                onChange={() => handleSelect(category.id)}
                                                                                checked={selectedIds.includes(category.id)}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </td>


                                                                <td className="py-3 pr-5 whitespace-nowrap sm:pr-5">
                                                                    <div className="flex items-center col-span-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <div>
                                                                                <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                                                                                    {category.name}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-3 whitespace-nowrap sm:px-6">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-700 text-theme-sm dark:text-gray-400">
                                                                            {category.added_at}
                                                                        </p>
                                                                    </div>
                                                                </td>

                                                                <td className="px-5 py-3 whitespace-nowrap sm:px-6">
                                                                    <div className="flex items-center justify-start ">
                                                                        <div ref={(el) => dropdownRefs.current[category.id] = el} className="relative">

                                                                            <button
                                                                                onClick={() => setOpenDropdownId(prev => (prev === category.id ? null : category.id))}
                                                                                className="text-white transition bg-blue-700  dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 shadow-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-800"
                                                                            >
                                                                                Action
                                                                                <svg className="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                                                </svg>
                                                                            </button>

                                                                            {openDropdownId === category.id && (
                                                                                <div
                                                                                    className={`absolute right-0 mt-2 rounded-lg bg-slate-50 w-44  dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/10 shadow-lg z-[9999] ${openDropdownId === 1 ? 'mt-0 mb-5' : ''
                                                                                        }`}
                                                                                >

                                                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                                                        <li>
                                                                                            <Link href={route("category.edit", category.id)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                                                Edit
                                                                                            </Link>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button type='button'
                                                                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                                                onClick={() => {
                                                                                                    setSelectedIds([]);
                                                                                                    setSelectedIds([category.id]);
                                                                                                    setDeleteSingleConfirmationModal(true);
                                                                                                }}
                                                                                            >
                                                                                                Delete
                                                                                            </button>
                                                                                        </li>

                                                                                    </ul>
                                                                                </div>
                                                                            )}

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}


                                                    {categories.data.length === 0 && (
                                                        <tr>
                                                            <td colSpan={7} className="text-center">
                                                                <p className='text-gray-900 dark:text-white'>
                                                                    No data found
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    )}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {categories.data.length > 0 && (
                                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            {/* Previous Button */}
                                            <button
                                                disabled={!categories.links[0].url}
                                                onClick={() => handlePagination(categories.links[0].url)}
                                                className={`text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border px-2 py-2 font-medium sm:px-3.5
                                                ${!categories.links[0].url
                                                        ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200'
                                                    }`}
                                            >
                                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715Z" />
                                                </svg>
                                                <span className="hidden sm:inline"> Previous </span>
                                            </button>

                                            {/* Page Numbers */}
                                            <ul className="hidden items-center gap-0.5 sm:flex">
                                                {categories.links.slice(1, -1).map((link, idx) => (
                                                    <li key={idx}>
                                                        <button
                                                            onClick={() => handlePagination(link.url)}
                                                            disabled={(!link.url || link.active)}
                                                            className={`text-theme-sm flex h-10 w-10 items-center justify-center rounded-lg font-medium
                                                ${link.active
                                                                    ? "bg-blue-500/[0.08] text-blue-500"
                                                                    : "text-gray-700 hover:bg-blue-500/[0.08] hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
                                                                }`}
                                                        >
                                                            {link.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Next Button */}
                                            <button
                                                disabled={!categories.links[categories.links.length - 1].url}
                                                onClick={() => handlePagination(categories.links[categories.links.length - 1].url)}
                                                className={`text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border px-2 py-2 font-medium sm:px-3.5
                    ${!categories.links[categories.links.length - 1].url
                                                        ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200'
                                                    }`}
                                            >
                                                <span className="hidden sm:inline"> Next </span>
                                                <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}



                            </div>
                        </>
                    }
                />


                {/* Modals */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        {/* Bulk Delete Modal */}

                        {DeleteSelectedBuilkConfirmationModal && (
                            <>
                                <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto modal z-99999">
                                    <div className="modal-close-btn fixed inset-0 h-full w-full dark:bg-gray-900 backdrop-blur-[32px]"></div>
                                    <div className="flex flex-col px-4 py-4 overflow-y-auto no-scrollbar">
                                        <div className="relative w-full max-w-[507px] rounded-3xl bg-white p-6 dark:bg-gray-800 lg:p-10">
                                            <div className="text-center">
                                                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                                                    Are You Sure?
                                                </h4>
                                                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                    You Wont Be Able To Revert This Action
                                                </p>

                                                <div className="flex items-center justify-center w-full gap-3 mt-8">
                                                    <button onClick={() => {

                                                        setDeleteBulkSelectedProcessing(false);
                                                        setDeleteSelectedBuilkConfirmationModal(false)
                                                    }}
                                                        type="button" className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">

                                                        Close

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-2 size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                        </svg>

                                                    </button>

                                                    <PrimaryButton
                                                        Type={"button"}
                                                        Text={"Yes Delete it!"}
                                                        Spinner={DeleteBulkSelectedProcessing}
                                                        Disabled={DeleteBulkSelectedProcessing}
                                                        Action={() => deleteSelectedBulkMethod()}
                                                        Icon={
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>

                                                        }

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}



                        {/* Sengle Delete Modal */}
                        {DeleteSingleConfirmationModal && (
                            <>
                                <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto modal z-99999">
                                    <div className="modal-close-btn fixed inset-0 h-full w-full dark:bg-gray-900 backdrop-blur-[32px]"></div>
                                    <div className="flex flex-col px-4 py-4 overflow-y-auto no-scrollbar">
                                        <div className="relative w-full max-w-[507px] rounded-3xl bg-white p-6 dark:bg-gray-800 lg:p-10">
                                            <div className="text-center">
                                                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
                                                    Are You Sure?
                                                </h4>
                                                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                    You Wont Be Able To Revert This Action
                                                </p>

                                                <div className="flex items-center justify-center w-full gap-3 mt-8">
                                                    <button onClick={() => {

                                                        setDeleteSingleProcessing(false);
                                                        setDeleteSingleConfirmationModal(false)
                                                    }}
                                                        type="button" className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">

                                                        Close

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-2 size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                        </svg>

                                                    </button>

                                                    <PrimaryButton
                                                        Type={"button"}
                                                        Text={"Yes Delete it!"}
                                                        Spinner={DeleteSingleProcessing}
                                                        Disabled={DeleteSingleProcessing}
                                                        Action={() => SingleDeleteMethod()}
                                                        Icon={
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>

                                                        }

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div >
                </div >





            </AuthenticatedLayout >
        </>
    );

}

