import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectSeparator,
} from "../overlay/Select";

export const SelectForm = () => {
    return (
        <div className="w-60 mt-12">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select food..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    
                    <SelectSeparator />
                    
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="aubergine">Aubergine</SelectItem>
                    <SelectItem value="broccoli">Broccoli</SelectItem>
                    <SelectItem value="carrot" disabled>Carrot (Sold out)</SelectItem>
                    <SelectItem value="courgette">Courgette</SelectItem>
                    <SelectItem value="leek">Leek</SelectItem>
                    
                    <SelectSeparator />
                    
                    <SelectLabel>Meat</SelectLabel>
                    <SelectItem value="beef">Beef</SelectItem>
                    <SelectItem value="chicken">Chicken</SelectItem>
                    <SelectItem value="lamb">Lamb</SelectItem>
                    <SelectItem value="pork">Pork</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};