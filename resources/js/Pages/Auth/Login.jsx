
import SpinnerButton from '@/Components/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ canResetPassword }) {

    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    console.log(errors);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col flex-1 w-full lg:w-1/2 md:my-5">
                <div className="w-full max-w-md pt-10 mx-auto">
                    <a
                        href="#"
                        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                    >
                        <svg
                            className="stroke-current"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                                stroke=""
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back to Website
                    </a>
                </div>
                <div
                    className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto"
                >
                    <div>
                        <div className="mb-5 sm:mb-8">
                            <h1
                                className="mb-2 text-4xl font-bold text-gray-800 dark:text-white sm:text-title-md"
                            >
                                Login
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-white">
                                Enter your email and password to Login Into Dashboard !
                            </p>
                        </div>
                        <div>


                            <form onSubmit={submit}>
                                <div className="space-y-5">

                                    <div>
                                        <label
                                            htmlFor='email'
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white"
                                        >
                                            Email<span className="text-red-500 dark:text-white"> *</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            placeholder="info@gmail.com"
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />

                                        {errors.email && <span className="text-red-500 dark:text-white ">{errors.email}</span>}
                                    </div>


                                    <div>
                                        <label
                                            htmlFor='password'
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-white"
                                        >
                                            Password
                                            <span className="text-red-500 dark:text-white"> *</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                                value={data.password}
                                                name='password'
                                                id='password'
                                                onChange={(e) => setData("password", e.target.value)}
                                            />
                                            <span
                                                className="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <svg

                                                    className={showPassword ? "fill-current " : "hidden"}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
                                                        fill="#98A2B3"
                                                    />
                                                </svg>
                                                <svg

                                                    className={!showPassword ? "fill-current " : "hidden"}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z"
                                                        fill="#98A2B3"
                                                    />
                                                </svg>
                                            </span>

                                        </div>
                                        {errors.password && <span className="text-red-500 dark:text-white">{errors.password}</span>}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label
                                                htmlFor="remember"
                                                className="flex items-center text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-white"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id="remember"
                                                        className="sr-only"
                                                        value={data.remember}
                                                        onChange={() => setData("remember", !data.remember)}
                                                    />
                                                    <div
                                                        className={
                                                            data.remember === true ? "border-blue-500 mr-3 bg-blue-500 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] dark:border-gray-700"
                                                                : " 'bg-transparent border-gray-300 mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                                                        }

                                                    >
                                                        <span className={data.remember ? "" : "opacity-0"}>
                                                            <svg
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 14 14"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                                                    stroke="white"
                                                                    strokeWidth="1.94437"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                Keep me logged in
                                            </label>
                                        </div>

                                        {canResetPassword &&

                                            (

                                                <Link
                                                    href={route("password.request")}
                                                    className="text-sm text-blue-500 hover:text-blue-600 "
                                                >
                                                    Forgot password?
                                                </Link>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <SpinnerButton
                                            Text={"Login"}
                                            Disabled={processing}
                                            Type={"submit"}
                                            Icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                                </svg>
                                            }
                                        />
                                    </div>
                                </div>
                            </form>

                            <div className="mt-5">
                                <p
                                    className="text-sm font-normal text-center text-gray-700 dark:text-white sm:text-start"
                                >
                                    Don't have an account? {" "}
                                    <Link
                                        href={route("register")}
                                        className="text-blue-500 hover:text-blue-600 "
                                    > {"  "}
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div >
                </div >
            </div >


        </GuestLayout >
    );
}
