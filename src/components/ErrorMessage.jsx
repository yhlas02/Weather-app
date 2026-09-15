import { TriangleAlert } from "lucide-react"

export default function ErrorMessage() {
    return (
        <div className="error-message">
            <TriangleAlert size={40} color="red"/>
            <p>Something went wrong or an incorrect city name was entered. <br /> Please try again!</p>
        </div>
    )
}