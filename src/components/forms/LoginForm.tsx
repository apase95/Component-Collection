import { Button } from '../base/Button';
import { Input } from '../base/Input';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '../data-display/Card';

export default function LoginForm() {
    return (
        <div className="flex-center min-h-screen p4">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription className='p-0 pt-2'>Put your info</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="grid-form">
                        <Input label="Email" placeholder="name@example.com" />
                        <Input label="Password" type="password" />
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
