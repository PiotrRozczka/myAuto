import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <main className="flex w-screen justify-center">
      <Tabs defaultValue="login" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Login />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Register />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
