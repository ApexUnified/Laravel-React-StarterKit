import SpinnerButton from '@/Components/SpinnerButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        email: '',
    });


    const [verificationSent, setVerificationSent] = useState(false);
    const [timer, setTimer] = useState(60);

    const timerRef = useRef(null);


    const email_input = useRef(null);

    useEffect(() => {
        email_input.current.focus();
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if (data.email === '') {
            email_input.current.required = true;
            email_input.current.reportValidity();
            return;
        }

        post(route('password.email'),
            {
                onFinish: () => reset('email'),
            }
        );
    };


    useEffect(() => {
        if (wasSuccessful) {
            setVerificationSent(true);

            timerRef.current = setInterval(() => {
                setTimer((t) => t - 1);
            }, 1000);
        }
    }, [wasSuccessful]);


    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerRef.current);
            setTimer(60);
            setVerificationSent(false);
        }
    }, [timer]);


    return (

        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="flex flex-col flex-1 w-full lg:w-1/2 md:my-5">
                <div className="w-full max-w-md pt-10 mx-auto">
                    <Link
                        href={route("login")}
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
                        Back to Login
                    </Link>
                </div>




                <div
                    className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto"
                >




                    <div>
                        <div className="mb-5 sm:mb-8">
                            <h1
                                className="mb-2 text-4xl font-bold text-gray-800 dark:text-white/90 sm:text-title-md"
                            >
                                Forgot Password
                            </h1>
                            <div className="mb-4 text-sm text-gray-600 dark:text-white">
                                Forgot your password? No problem. Just let us know your email
                                address and we will email you a password reset link that will
                                allow you to choose a new one.
                            </div>

                        </div>
                        <div>


                            <form onSubmit={submit}>
                                <div className="space-y-5">

                                    <div>
                                        <label
                                            htmlFor='email'
                                            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Email<span className="text-red-500 dark:text-white"> *</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            placeholder="info@gmail.com"
                                            ref={email_input}
                                        />

                                        {errors.email && <span className="text-red-500 dark:text-white">{errors.email}</span>}

                                    </div>




                                    <div>
                                        {verificationSent ? (
                                            <>
                                                <SpinnerButton
                                                    Text={"Email Verification Link"}
                                                    Icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                        </svg>
                                                    }
                                                    Type={"button"}
                                                    Action={submit}
                                                    Disabled={verificationSent}

                                                />

                                                <p className="text-gray-800 dark:text-white mt-3">Retry Will Be Available after <span className="text-green-800">{timer}</span> seconds</p>
                                            </>
                                        ) :

                                            (
                                                <SpinnerButton
                                                    Text={"Email Verification Link"}
                                                    Icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mx-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                        </svg>
                                                    }
                                                    Type={"button"}
                                                    Action={submit}
                                                    Disabled={processing}
                                                    Spinner={processing}
                                                />
                                            )}
                                    </div>
                                </div>
                            </form>

                            <div className="mt-5">
                                <p
                                    className="text-sm font-normal text-center text-gray-700 dark:text-white sm:text-start"
                                >
                                    Remembered Your Password? {" "}
                                    <Link
                                        href={route("login")}
                                        className="text-blue-500 hover:text-blue-600 "
                                    > {"  "}
                                        Back To Login
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
