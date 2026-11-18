import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import { authService } from "../services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const signUpSchema = z.object({
  name: z.string().min(2, "name must contain at least 2 characters"),
  email: z.string().email("invalid email"),
  phone: z.string().min(6, "phone must contain at least 6 characters"),
  password: z.string().min(6, "password must contain at least 6 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;


// Sign up. Same card treatment as sign in, four fields instead of two.
function SignUp() {

  const navigate = useNavigate();

   const user = authService.getCurrentUser();
    
    useEffect(()=>{

        if(user){
            navigate('/dashboard')
            return;
        }

    }, [ user ])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: SignUpForm) => {
    try {
      await authService.register(data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your account is ready !",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Could not create the account",
        text: err.response?.data?.error || "Something went wrong",
      });
      console.log(err);
    }
  };
  
  return (
     <section className="flex justify-center">
          <div className="w-full max-w-[440px] px-8 pt-14 pb-26">
            <div className="mb-6.5 text-center">
              <h1 className="mb-2.5 text-[40px] leading-[1.04] font-semibold tracking-[-0.045em]">
                Create your account
              </h1>
              <p className="text-[16px] text-ink-3">Free, and takes about thirty seconds.</p>
            </div>

            <div className="rounded-[26px] border border-ink/7 bg-surface p-7.5 shadow-[0_1px_2px_rgba(19,19,22,0.04),0_30px_60px_-30px_rgba(19,19,22,0.26)]">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Full name
                  <input
                    type="text"
                    placeholder="Your name"
                    { ...register('name') }
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.name && (
                    <span className="text-[13px] text-[#C2410C]">{errors.name.message}</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Email
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.email && (
                    <span className="text-[13px] text-[#C2410C]">{errors.email.message}</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Phone
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register('phone')}
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.phone && (
                    <span className="text-[13px] text-[#C2410C]">{errors.phone.message}</span>
                  )}
                </label>

                <label className="flex flex-col gap-1.75 text-[13px] font-medium text-ink-2">
                  Password
                  <input
                    type="password"
                    placeholder="At least 8 characters"
                    {...register('password')}
                    className="rounded-[13px] border border-ink/8 bg-canvas px-3.75 py-3.25 font-sans text-[16px] text-ink outline-none transition-all duration-160 focus:border-accent focus:bg-surface"
                  />
                  {errors.password && (
                    <span className="text-[13px] text-[#C2410C]">{errors.password.message}</span>
                  )}
                </label>

                <button
                  type="submit"
                  className="mt-1 cursor-pointer rounded-[14px] border-none bg-ink px-7 py-3.75 font-sans text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(19,19,22,0.1),0_12px_24px_-14px_rgba(19,19,22,0.6)] transition-all duration-180 hover:-translate-y-px"
                >
                  { isSubmitting ? 'loading...' : 'Create account' }
                </button>

                <p className="text-[13px] leading-[1.55] text-ink-4">
                  By creating an account you agree to the terms and the listing rules.
                </p>
              </form>

              <p className="mt-4.5 text-center text-[14px] text-ink-3">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold text-accent no-underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
  );
}

export default SignUp;
