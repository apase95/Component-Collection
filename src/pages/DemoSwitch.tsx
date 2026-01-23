import { useState } from "react";
import { Switch } from "../components/base/Switch";


export default function Demo() {
    const [active, setActive] = useState(false);

    return (
        <div className="flex-center gap-3 mt-4">
            <Switch
                checked={active} 
                onCheckedChange={setActive} 
                size="lg" 
            />
            <span className="text-white">{active ? "ON" : "OFF"}</span>
        </div>
    );
}