import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showError } from "@/utils/toast";

const formSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  countryCode: z.string(),
});

interface Country {
  name: string;
  code: string;
}

const Login = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, sendOtp, countryCode } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      countryCode: countryCode,
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const formattedCountries = data
          .filter((country: any) => country.idd?.root && country.idd?.suffixes)
          .map((country: any) => ({
            name: country.name.common,
            code: `${country.idd.root}${country.idd.suffixes[0]}`,
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        showError("Failed to fetch countries");
        console.error("Error fetching countries:", error);
        // Fallback to some common country codes
        setCountries([
          { name: "United States", code: "+1" },
          { name: "United Kingdom", code: "+44" },
          { name: "India", code: "+91" },
          { name: "Japan", code: "+81" },
          { name: "Germany", code: "+49" },
        ]);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    login(values.phone, values.countryCode);
    await sendOtp();
    setLoading(false);
    navigate("/otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Gemini
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in with your phone number
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={countries.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          countries.length === 0 
                            ? "Loading countries..." 
                            : "Select country code"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px] overflow-y-auto">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;