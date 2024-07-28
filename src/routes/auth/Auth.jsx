import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import { useAuthLoginMutation } from "@/redux/api/auth-api";
import { loginUser } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [login, { data, isLoading, isSuccess }] = useAuthLoginMutation();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleLoginUser = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    login(user);
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    return date.toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: true
    });
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (isSuccess) {
        dispatch(loginUser(data?.payload?.access_token));
        toast.success("Login successfully", {
          description: getCurrentDateTime(),
          duration: 3000,
          position: 'top-right',
        });
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong", {
          description: getCurrentDateTime(),
          position: 'top-right',
        });
      }
      setIsFormSubmitted(false);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleLoginUser} className="flex h-screen flex-col items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <Toaster position="top-right" />
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-2 pt-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-2 pt-4">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
