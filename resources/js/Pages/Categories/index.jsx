import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BreadCrumb from '@/Components/BreadCrumb'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import Table from '@/Components/Table';
import { Label } from '@headlessui/react';

export default function index({ categories }) {


    // Bulk Delete Form Data
    const { props } = usePage();
    const { data: BulkselectedIds, setData: setBulkSelectedIds, delete: BulkDelete, reset: resetBulkSelectedIds } = useForm({
        ids: [],
    });


    // Single Delete Form Data
    const { data: SingleSelectedId, setData: setSingleSelectedId, delete: SingleDelete, reset: resetSingleSelectedId } = useForm({
        id: null,
    })

    const columns = [
        { key: 'name', label: 'Category Name' },
        { key: 'added_at', label: 'Created At' },
    ];



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

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={BulkDelete}
                                SingleDeleteMethod={SingleDelete}
                                EditRoute={"category.edit"}
                                BulkDeleteRoute={"category.deletebyselection"}
                                SearchRoute={"category.index"}
                                SingleDeleteRoute={"category.destroy"}
                                items={categories}
                                props={props}
                                columns={columns}
                            />
                        </>
                    }
                />








            </AuthenticatedLayout >
        </>
    );

}

