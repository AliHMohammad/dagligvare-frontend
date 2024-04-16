import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";


type Props = {
	value: string,
	handleChange: (newValue: string) => void;
	handleReset: () => void;
	placeholder?: string
}

export default function SearchBar({ value, handleChange, handleReset, placeholder }: Props) {


	return (
		<>
			<div className={"flex gap-4"}>
				<Input placeholder={placeholder} type="text" value={value} onChange={(e) => handleChange(e.target.value)} />
				{value && <Button onClick={() => handleReset()}>Reset</Button>}
			</div>
		</>
	);

}

