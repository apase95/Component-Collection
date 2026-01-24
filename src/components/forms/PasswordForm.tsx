import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    PasswordToggleField,
    PasswordToggleFieldInput,
    PasswordToggleFieldToggle,
    PasswordToggleFieldIcon,
} from "../base/PasswordToggleField";

export const PasswordForm = () => {
    return (
        <div className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    Password
                </label>
                <PasswordToggleField>
                    <PasswordToggleFieldInput placeholder="Enter password..." />
                    <PasswordToggleFieldToggle>
                        <PasswordToggleFieldIcon
                            visible={<FaEyeSlash className="h-4 w-4" />}
                            hidden={<FaEye className="h-4 w-4" />}
                        />
                    </PasswordToggleFieldToggle>
                </PasswordToggleField>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    Confirm Password (Disabled)
                </label>
                <PasswordToggleField className="opacity-50 cursor-not-allowed">
                    <PasswordToggleFieldInput 
                        disabled 
                        placeholder="Password is locked" 
                        value="secretpassword"
                    />
                    <PasswordToggleFieldToggle disabled>
                        <PasswordToggleFieldIcon
                            visible={<FaEyeSlash className="h-4 w-4" />}
                            hidden={<FaEye className="h-4 w-4" />}
                        />
                    </PasswordToggleFieldToggle>
                </PasswordToggleField>
            </div>
        </div>
    );
};