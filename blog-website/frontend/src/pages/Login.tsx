import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import { authService } from "../services/authService";

// the rules of the form, exactly like in the forms lesson
const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must contain at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;


function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      await authService.login(data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome back !",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Could not sign in",
        text: error.response?.data?.error || "Something went wrong",
      });
      console.log(error);
    }
  };

  return (
   
    <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-65 left-1/2 h-140 w-215 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.28)_0%,rgba(11,10,26,0)_70%)]" />

        <div className="relative mx-auto max-w-content px-10 pt-23 pb-24">
        <div className="mx-auto max-w-[480px]">
            <div className="mb-9 text-center">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-violet-soft">
                Welcome back
            </p>

            <h1 className="mb-4 font-display text-[44px] leading-[1.08] font-bold tracking-[-0.035em]">
                Sign in to <span className="headline-gradient">fieldnotes</span>
            </h1>

            <p className="text-[17px] leading-[1.65] text-cream/64">
                Pick up where you left off &mdash; your drafts are waiting.
            </p>
            </div>

            {/* form card, inside a 1px gradient border */}
            <div className="rounded-[26px] bg-[linear-gradient(140deg,rgba(124,92,255,0.6),rgba(236,72,153,0.4)_55%,rgba(255,255,255,0.06))] p-px">
            <div className="rounded-[25px] bg-surface p-9.5">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} >
                    <label className="flex flex-col gap-2.25 text-[13px] font-semibold text-cream/80">
                        Email
                        <input
                            type="email"
                            placeholder="you@example.com"
                            { ...register('email') }
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
                            placeholder="••••••••"
                            { ...register('password') }
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="brand-gradient mt-1 inline-flex cursor-pointer items-center justify-center rounded-full px-7.5 py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(124,92,255,0.38)] transition-transform duration-160 hover:-translate-y-0.5"
                    >
                        { isSubmitting ? 'signing in ...' : 'Sign in' }
                    </button>
                </form>
            </div>
            </div>

            <p className="mt-7 text-center text-[15px] text-cream/60">
            New here?{" "}
            <Link
                to="/register"
                className="font-semibold text-violet-soft no-underline transition-colors duration-160 hover:text-[#F0ABFC]"
            >
                Create an account &rarr;
            </Link>
            </p>
        </div>
        </div>
    </section>
  
  );
}

export default Login;
