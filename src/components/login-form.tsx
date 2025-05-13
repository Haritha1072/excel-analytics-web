import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoginModel } from "@/schemas/loginSchema";
import { AuthService } from "@/services/AuthService";
import { useState } from "react";
import { ButtonLoading } from "./ButtonLoading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    defaultValues: {
      email: "murali@yopmail.com",
      password: "rsmurali#1307",
    },
    mode: "all",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const onSubmit = async (data: LoginModel) => {
    try {
      setIsProcessing(true);
      const res = await authService.login(data);

      console.log(res);
      toast.success("Successfully logged in!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold">
            Welcome to Excel Analytics Platform
          </h1>
          <p className="text-sm text-muted-foreground">
            Please login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label
              htmlFor="email"
              className="after:text-red-500 after:content-['*'] gap-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="rounded-[3px]"
              aria-invalid={!!errors.email}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="password"
              className="after:text-red-500 after:content-['*'] gap-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="rounded-[3px]"
              aria-invalid={!!errors.password}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          {isProcessing ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" className="w-full rounded-[3px]">
              Login
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
