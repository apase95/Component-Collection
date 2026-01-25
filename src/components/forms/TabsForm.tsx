import { Tabs, TabsList, TabsTrigger, TabsContent } from "../overlay/Tabs";
import { Input } from "../base/Input";
import { 
    PasswordToggleField, PasswordToggleFieldInput, 
    PasswordToggleFieldToggle, PasswordToggleFieldIcon 
} from "../base/PasswordToggleField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "../../libs/utils";
import { Button } from "../base/Button";


const ButtonForm = () => {
    return (
        <div className="w-full mt-6 flex items-center justify-end">
            <Button 
                variant="primary"
                className={cn(
                    "bg-[#3c3c3f] text-white border border-white/10", 
                    "hover:bg-[#3c3c3f]/30 hover:border-white/30"
                )}
            >
                Save
            </Button>
        </div>
    );
};


export const TabsForm = () => {
    return (
        <div className="w-110 bg-[#18181b] p-6 mt-12 rounded-xl border border-white/10 shadow-2xl">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full flex-center">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Account</h3>
                    
                    <div className="space-y-2">
                        <Input 
                            label="Name" 
                            defaultValue="Nooby Handsome" 
                            className="h-12"
                        />
                        <Input 
                            label="Username" 
                            defaultValue="@noobyhandsome95" 
                            className="h-12"
                        />
                    </div>

                    <ButtonForm />
                </TabsContent>

                <TabsContent value="password" className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Password</h3>
                    
                    <div className="space-y-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">Current password</label>
                            <PasswordToggleField>
                                <PasswordToggleFieldInput />
                                <PasswordToggleFieldToggle>
                                    <PasswordToggleFieldIcon visible={<FaEyeSlash />} hidden={<FaEye />} />
                                </PasswordToggleFieldToggle>
                            </PasswordToggleField>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300">New password</label>
                            <PasswordToggleField>
                                <PasswordToggleFieldInput />
                                <PasswordToggleFieldToggle>
                                    <PasswordToggleFieldIcon visible={<FaEyeSlash />} hidden={<FaEye />} />
                                </PasswordToggleFieldToggle>
                            </PasswordToggleField>
                        </div>
                    </div>

                    <ButtonForm />
                </TabsContent>
            </Tabs>
        </div>
    );
};