import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import { authService } from "../services/authService";

const registerSchema = z
  .object({
    name: z.string().min(2, "name must contain at least 2 characters"),
    email: z.string().email("invalid email"),
    password: z.string().min(6, "password must contain at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.literal(true, { message: "you must accept the terms" }),
  })
  // the two passwords have to be the same
  .refine((data) => data.password === data.confirmPassword, {
    message: "the two passwords are different",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

    const onSubmit = async (data: RegisterForm) => {
        try {
            // the backend only needs these three
            await authService.register({ name: data.name, email: data.email, password: data.password });
            Swal.fire({ icon: "success", title: "Account created !", text: "You can sign in now." });
            navigate("/login");
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Could not create the account",
                text: error.response?.data?.error || "Something went wrong",
            });
        }
    };

    return (
        
        <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-65 left-1/2 h-140 w-215 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.24)_0%,rgba(124,92,255,0.14)_40%,rgba(11,10,26,0)_72%)]" />

        <div className="relative mx-auto max-w-content px-10 pt-23 pb-24">
            <div className="mx-auto max-w-[480px]">
            <div className="mb-9 text-center">
                <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-violet-soft">
                Get started
                </p>

                <h1 className="mb-4 font-display text-[44px] leading-[1.08] font-bold tracking-[-0.035em]">
                Create your <span className="headline-gradient">account</span>
                </h1>

                <p className="text-[17px] leading-[1.65] text-cream/64">
                Somewhere to keep the notes you have not finished yet.
                </p>
            </div>

            {/* form card, inside a 1px gradient border */}
            <div className="rounded-[26px] bg-[linear-gradient(140deg,rgba(124,92,255,0.6),rgba(236,72,153,0.4)_55%,rgba(255,255,255,0.06))] p-px">
                <div className="rounded-[25px] bg-surface p-9.5">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} >
                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Name
                    <input
                        type="text"
                        placeholder="Mira Advani"
                        { ...register("name") }
                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                    {
                        errors.name && (
                            <span className="font-normal text-[13px] text-red-500" >
                                {errors.name.message}
                            </span>
                        )
                    }
                    </label>

                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Email
                    <input
                        type="email"
                        placeholder="you@example.com"
                        { ...register("email") }

                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />

                    {
                        errors.email && (
                            <span className="font-normal text-[13px] text-red-500" >
                                {errors.email.message}
                            </span>
                        )
                    }
                    </label>

                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Password
                    <input
                        type="password"
                        placeholder="At least 8 characters"
                        { ...register("password") }

                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                    {
                        errors.password && (
                            <span className="font-normal text-[13px] text-red-500" >
                                {errors.password.message}
                            </span>
                        )
                    }
                    </label>

                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                    Confirm password
                    <input
                        type="password"
                        placeholder="Type it once more"
                        { ...register("confirmPassword") }

                        className="rounded-[14px] border border-white/12 bg-field px-4 py-3.5 font-sans text-[16px] text-cream outline-none transition-colors duration-160 focus:border-violet"
                    />
                    {
                        errors.confirmPassword && (
                            <span className="font-normal text-[13px] text-red-500" >
                                {errors.confirmPassword.message}
                            </span>
                        )
                    }
                    </label>

                    <label className="flex items-start gap-2.5 text-[13px] leading-[1.6] text-cream/70">
                    <input
                        type="checkbox"
                        { ...register("terms") }

                        className="mt-1 size-4 shrink-0 rounded-[5px] border border-white/20 bg-field accent-violet"
                    />
                    I agree to the terms and the privacy policy.
                    </label>

                    {
                        errors.terms && (
                            <span className="font-normal text-[13px] text-red-500" >
                                {errors.terms.message}
                            </span>
                        )
                    }

                    <button type="submit" disabled={isSubmitting} className="brand-gradient mt-1 inline-flex cursor-pointer items-center justify-center rounded-full px-7.5 py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(124,92,255,0.38)] transition-transform duration-160 hover:-translate-y-0.5"  >
                        { isSubmitting ? 'creating ...' : 'Create account' }
                    </button>
                </form>
                </div>
            </div>

            <p className="mt-7 text-center text-[15px] text-cream/60">
                Already have an account?{" "}
                <Link
                to="/login"
                className="font-semibold text-violet-soft no-underline transition-colors duration-160 hover:text-[#F0ABFC]"
                >
                Sign in &rarr;
                </Link>
            </p>
            </div>
        </div>
        </section>
        
    );
}

export default Register;
